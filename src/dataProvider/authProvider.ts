import { API_URL } from './../constants';
// import { stringify } from "query-string";
import { loadString, remove, saveString } from './storage';
import * as fetchUtils from './fetch';

export type AuthProvider = {
  login: (params: any) => Promise<{ redirectTo?: string | boolean } | void | any>;
  logout: (params: any) => Promise<void | false | string>;
  checkAuth: (params: any) => Promise<void>;
  checkError: (error: any) => Promise<void>;
  getIdentity?: () => Promise<UserIdentity>;
  getPermissions: (params: any) => Promise<any>;
  [key: string]: any;
};

const TOKEN_KEY = 'access_token';
const USERNAME_KEY = 'username';
const FULL_NAME_KEY = 'full_name';

export const getToken = (): Promise<string> => {
  return loadString(TOKEN_KEY) || '';
};

const authProvider = (loginUrl): AuthProvider => ({
  login: ({ username, password }) => {
    const finalUrl = `${API_URL}${loginUrl}`;
    return fetchUtils
      .fetchJson(finalUrl, {
        method: 'POST',
        body: JSON.stringify({ username: username, password: password }),
      })
      .then(async ({ json }) => {
        await saveString(USERNAME_KEY, username);
        await saveString(TOKEN_KEY, json.access_token);
        await saveString(FULL_NAME_KEY, json.fullName);
        return json;
      });
  },
  logout: () => {
    remove(USERNAME_KEY);
    remove(TOKEN_KEY);
    remove(FULL_NAME_KEY);
    return Promise.resolve();
  },
  checkError: () => Promise.resolve(),
  checkAuth: () => (localStorage.getItem('username') ? Promise.resolve() : Promise.reject()),
  getPermissions: () => Promise.reject('Unknown method'),
  getIdentity: async () => {
    return {
      id: 'user',
      fullName: await loadString(FULL_NAME_KEY),
      //avatar:
      avatar: 'https://marmelab.com/images/avatars/adrien.jpg',
    };
  },
});

export const auth = authProvider('/auth/login');

export default authProvider;
