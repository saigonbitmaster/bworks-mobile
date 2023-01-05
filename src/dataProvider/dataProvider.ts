import { API_URL } from './../constants';
import { stringify } from 'query-string';
import * as fetchUtils from './fetch';
import { DataProvider } from './types';
import { filterTransform } from './utils';
import { getToken } from './authProvider';
/**
 * Maps react-admin queries to a REST API
 *
 * This REST dialect is similar to the one of FakeRest
 *
 * @see https://github.com/marmelab/FakeRest
 *
 * @example
 *
 * getList     => GET http://my.api.url/posts?sort=['title','ASC']&range=[0, 24]
 * getOne      => GET http://my.api.url/posts/123
 * getMany     => GET http://my.api.url/posts?filter={id:[123,456,789]}
 * update      => PUT http://my.api.url/posts/123
 * create      => POST http://my.api.url/posts
 * delete      => DELETE http://my.api.url/posts/123
 *
 * @example
 *
 * import * as React from "react";
 * import { Admin, Resource } from 'react-admin';
 * import {dataProvider} from 'ra-nest-rest';
 *
 * import { PostList } from './posts';
 *
 * const App = () => (
 *     <Admin dataProvider={simpleRestProvider('http://path.to.my.api/')}>
 *         <Resource name="posts" list={PostList} />
 *     </Admin>
 * );
 *
 * export default App;
 */
const provider = (
  apiUrl: string,
  // token: string,
  httpClient = fetchUtils.fetchJson,
  countHeader = 'Content-Range',
): DataProvider => ({
  getList: async (resource, params) => {
    const { page = 1, perPage = 25 } = params.pagination || {};

    const rangeStart = (page - 1) * perPage;
    const rangeEnd = page * perPage - 1;

    const query = {
      range: JSON.stringify([rangeStart, rangeEnd]),
      filter: JSON.stringify(filterTransform(params.filter)),
    };
    if (params.sort) {
      let { field } = params.sort;
      const { order } = params.sort;
      field = field == 'id' ? '_id' : field;
      query.sort = JSON.stringify([field, order]);
    }

    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const options =
      countHeader === 'Content-Range'
        ? {
            // Chrome doesn't return `Content-Range` header if no `Range` is provided in the request.
            headers: new Headers({
              Range: `${resource}=${rangeStart}-${rangeEnd}`,
              Authorization: `Bearer ${await getToken()}`,
            }),
          }
        : {};

    return httpClient(url, options).then(({ headers, json }) => {
      if (!headers.has(countHeader)) {
        throw new Error(
          `The ${countHeader} header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare ${countHeader} in the Access-Control-Expose-Headers header?`,
        );
      }
      return {
        data: json.map((resource) => ({ ...resource, id: resource._id })),
        total:
          countHeader === 'Content-Range'
            ? parseInt(headers.get('content-range').split('/').pop(), 10)
            : parseInt(headers.get(countHeader.toLowerCase())),
      };
    });
  },

  getOne: async (resource, params) => {
    const options = {
      headers: new Headers({
        Authorization: `Bearer ${await getToken()}`,
      }),
    };
    const url = `${apiUrl}/${resource}/${params.id}`;
    return httpClient(url, options).then(({ json }) => {
      return {
        data: { ...json, id: json._id },
      };
    });
  },

  getMany: async (resource, params) => {
    const query = {
      filter: JSON.stringify({ _id: params.ids }),
    };
    const options = {
      headers: new Headers({
        Authorization: `Bearer ${await getToken()}`,
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    return httpClient(url, options).then(({ json }) => ({
      data: json.map((resource) => ({ ...resource, id: resource._id })),
    }));
  },

  getManyReference: async (resource, params) => {
    const { page, perPage } = params.pagination;
    const { field, order } = params.sort;

    const rangeStart = (page - 1) * perPage;
    const rangeEnd = page * perPage - 1;

    const query = {
      sort: JSON.stringify([field, order]),
      range: JSON.stringify([(page - 1) * perPage, page * perPage - 1]),
      filter: JSON.stringify({
        ...params.filter,
        [params.target]: params.id,
      }),
    };
    const url = `${apiUrl}/${resource}?${stringify(query)}`;
    const options =
      countHeader === 'Content-Range'
        ? {
            // Chrome doesn't return `Content-Range` header if no `Range` is provided in the request.
            headers: new Headers({
              Range: `${resource}=${rangeStart}-${rangeEnd}`,
              Authorization: `Bearer ${await getToken()}`,
            }),
          }
        : {
            headers: new Headers({
              Authorization: `Bearer ${await getToken()}`,
            }),
          };

    return httpClient(url, options).then(({ headers, json }) => {
      if (!headers.has(countHeader)) {
        throw new Error(
          `The ${countHeader} header is missing in the HTTP Response. The simple REST data provider expects responses for lists of resources to contain this header with the total number of results to build the pagination. If you are using CORS, did you declare ${countHeader} in the Access-Control-Expose-Headers header?`,
        );
      }
      return {
        data: json.map((resource) => ({ ...resource, id: resource._id })),
        total:
          countHeader === 'Content-Range'
            ? parseInt(headers.get('content-range').split('/').pop(), 10)
            : parseInt(headers.get(countHeader.toLowerCase())),
      };
    });
  },

  update: async (resource, params) => {
    const options = {
      headers: new Headers({
        Authorization: `Bearer ${await getToken()}`,
      }),
    };
    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'PUT',
      body: JSON.stringify(params.data),
      ...options,
    }).then(({ json }) => ({ data: { ...json, id: json._id } }));
  },

  // simple-rest doesn't handle provide an updateMany route, so we fallback to calling update n times instead
  updateMany: async (resource, params) => {
    const options = {
      headers: new Headers({
        Authorization: `Bearer ${await getToken()}`,
      }),
    };
    return Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: 'PUT',
          body: JSON.stringify(params.data),
          ...options,
        }),
      ),
    ).then((responses) => ({ data: responses.map(({ json }) => json.id) }));
  },

  create: async (resource, params) => {
    const options = {
      headers: new Headers({
        Authorization: `Bearer ${await getToken()}`,
      }),
    };
    return httpClient(`${apiUrl}/${resource}`, {
      method: 'POST',
      body: JSON.stringify(params.data),
      ...options,
    }).then(({ json }) => ({ data: { ...params.data, id: json._id } }));
  },

  delete: async (resource, params) => {
    return httpClient(`${apiUrl}/${resource}/${params.id}`, {
      method: 'DELETE',
      headers: new Headers({
        'Content-Type': 'text/plain',
        Authorization: `Bearer ${await getToken()}`,
      }),
    }).then(({ json }) => ({ data: { ...json, id: json._id } }));
  },

  // simple-rest doesn't handle filters on DELETE route, so we fallback to calling DELETE n times instead
  deleteMany: async (resource, params) => {
    const token = await getToken();
    return Promise.all(
      params.ids.map((id) =>
        httpClient(`${apiUrl}/${resource}/${id}`, {
          method: 'DELETE',
          headers: new Headers({
            'Content-Type': 'text/plain',
            Authorization: `Bearer ${token}`,
          }),
        }),
      ),
    ).then((responses) => ({
      data: responses.map(({ json }) => json.id),
    }));
  },
});

const dataProvider = provider(API_URL);
export default dataProvider;
