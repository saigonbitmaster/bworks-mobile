import { ReactNode, ReactElement, ComponentType } from 'react';

export type UserCheck = (payload: object, pathName: string, routeParams?: object) => void;

export const AUTH_LOGIN = 'AUTH_LOGIN';
export const AUTH_CHECK = 'AUTH_CHECK';
export const AUTH_ERROR = 'AUTH_ERROR';
export const AUTH_LOGOUT = 'AUTH_LOGOUT';
export const AUTH_GET_PERMISSIONS = 'AUTH_GET_PERMISSIONS';

export type AuthActionType =
  | typeof AUTH_LOGIN
  | typeof AUTH_LOGOUT
  | typeof AUTH_ERROR
  | typeof AUTH_CHECK
  | typeof AUTH_GET_PERMISSIONS;

/**
 * data types
 */

export type Identifier = string | number;

export type RaRecord = {
  id: Identifier;
  [key: string]: any;
};

export type SortPayload = {
  field: string;
  order: string;
};
export type FilterPayload = {
  [k: string]: any;
};
export type PaginationPayload = {
  page: number;
  perPage: number;
};
export type ValidUntil = Date;
/**
 * i18nProvider types
 */

export const I18N_TRANSLATE = 'I18N_TRANSLATE';
export const I18N_CHANGE_LOCALE = 'I18N_CHANGE_LOCALE';

export type Translate = (key: string, options?: any) => string;

export type Locale = {
  locale: string;
  name: string;
};

export type I18nProvider = {
  translate: Translate;
  changeLocale: (locale: string, options?: any) => Promise<void>;
  getLocale: () => string;
  getLocales?: () => Locale[];
  [key: string]: any;
};

export type UserIdentity = {
  id: Identifier;
  fullName?: string;
  avatar?: string;
  [key: string]: any;
};

/**
 * authProvider types
 */
export type AuthProvider = {
  login: (params: any) => Promise<{ redirectTo?: string | boolean } | void | any>;
  logout: (params: any) => Promise<void | false | string>;
  checkAuth: (params: any) => Promise<void>;
  checkError: (error: any) => Promise<void>;
  getIdentity?: () => Promise<UserIdentity>;
  getPermissions: (params: any) => Promise<any>;
  [key: string]: any;
};

export type LegacyAuthProvider = (type: AuthActionType, params?: any) => Promise<any>;

/**
 * dataProvider types
 */

export type DataProvider<ResourceType extends string = string> = {
  getList: <RecordType extends RaRecord = any>(
    resource: ResourceType,
    params: GetListParams,
  ) => Promise<GetListResult<RecordType>>;

  getOne: <RecordType extends RaRecord = any>(
    resource: ResourceType,
    params: GetOneParams,
  ) => Promise<GetOneResult<RecordType>>;

  getMany: <RecordType extends RaRecord = any>(
    resource: ResourceType,
    params: GetManyParams,
  ) => Promise<GetManyResult<RecordType>>;

  getManyReference: <RecordType extends RaRecord = any>(
    resource: ResourceType,
    params: GetManyReferenceParams,
  ) => Promise<GetManyReferenceResult<RecordType>>;

  update: <RecordType extends RaRecord = any>(
    resource: ResourceType,
    params: UpdateParams,
  ) => Promise<UpdateResult<RecordType>>;

  updateMany: <RecordType extends RaRecord = any>(
    resource: ResourceType,
    params: UpdateManyParams,
  ) => Promise<UpdateManyResult<RecordType>>;

  create: <RecordType extends RaRecord = any>(
    resource: ResourceType,
    params: CreateParams,
  ) => Promise<CreateResult<RecordType>>;

  delete: <RecordType extends RaRecord = any>(
    resource: ResourceType,
    params: DeleteParams<RecordType>,
  ) => Promise<DeleteResult<RecordType>>;

  deleteMany: <RecordType extends RaRecord = any>(
    resource: ResourceType,
    params: DeleteManyParams<RecordType>,
  ) => Promise<DeleteManyResult<RecordType>>;

  [key: string]: any;
};

export type GetListParams = {
  pagination: PaginationPayload;
  sort: SortPayload;
  filter: any;
  meta?: any;
};
export type GetListResult<RecordType extends RaRecord = any> = {
  data: RecordType[];
  total?: number;
  pageInfo?: {
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
  };
};

export type GetOneParams<RecordType extends RaRecord = any> = {
  id: RecordType['id'];
  meta?: any;
};
export type GetOneResult<RecordType extends RaRecord = any> = {
  data: RecordType;
};

export type GetManyParams = {
  ids: Identifier[];
  meta?: any;
};
export type GetManyResult<RecordType extends RaRecord = any> = {
  data: RecordType[];
};

export type GetManyReferenceParams = {
  target: string;
  id: Identifier;
  pagination: PaginationPayload;
  sort: SortPayload;
  filter: any;
  meta?: any;
};
export type GetManyReferenceResult<RecordType extends RaRecord = any> = {
  data: RecordType[];
  total?: number;
  pageInfo?: {
    hasNextPage?: boolean;
    hasPreviousPage?: boolean;
  };
};

export type UpdateParams<T = any> = {
  id: Identifier;
  data: Partial<T>;
  previousData: T;
  meta?: any;
};
export type UpdateResult<RecordType extends RaRecord = any> = {
  data: RecordType;
};

export type UpdateManyParams<T = any> = {
  ids: Identifier[];
  data: T;
  meta?: any;
};
export type UpdateManyResult<RecordType extends RaRecord = any> = {
  data?: RecordType['id'][];
};

export type CreateParams<T = any> = {
  data: T;
  meta?: any;
};
export type CreateResult<RecordType extends RaRecord = any> = {
  data: RecordType;
};

export type DeleteParams<RecordType extends RaRecord = any> = {
  id: Identifier;
  previousData?: RecordType;
  meta?: any;
};
export type DeleteResult<RecordType extends RaRecord = any> = {
  data: RecordType;
};

export type DeleteManyParams<RecordType extends RaRecord = any> = {
  ids: RecordType['id'][];
  meta?: any;
};
export type DeleteManyResult<RecordType extends RaRecord = any> = {
  data?: RecordType['id'][];
};

export type DataProviderResult<RecordType extends RaRecord = any> =
  | CreateResult<RecordType>
  | DeleteResult<RecordType>
  | DeleteManyResult
  | GetListResult<RecordType>
  | GetManyResult<RecordType>
  | GetManyReferenceResult<RecordType>
  | GetOneResult<RecordType>
  | UpdateResult<RecordType>
  | UpdateManyResult;

export type MutationMode = 'pessimistic' | 'optimistic' | 'undoable';
export type OnSuccess = (response?: any, variables?: any, context?: any) => void;
export type onError = (error?: any, variables?: any, context?: any) => void;
export type TransformData = (data: any, options?: { previousData: any }) => any | Promise<any>;

export type UseDataProviderOptions = {
  action?: string;
  fetch?: string;
  meta?: object;
  mutationMode?: MutationMode;
  onSuccess?: OnSuccess;
  onError?: onError;
  enabled?: boolean;
};

export type LegacyDataProvider = (type: string, resource: string, params: any) => Promise<any>;

export type RecordToStringFunction = (record: any) => string;

export type ResourceDefinition = {
  readonly name: string;
  readonly options?: any;
  readonly hasList?: boolean;
  readonly hasEdit?: boolean;
  readonly hasShow?: boolean;
  readonly hasCreate?: boolean;
  readonly icon?: any;
  readonly recordRepresentation?: ReactElement | RecordToStringFunction | string;
};

/**
 * Misc types
 */

export type Dispatch<T> = T extends (...args: infer A) => any ? (...args: A) => void : never;

export type ResourceElement = ReactElement<ResourceProps>;
export type RenderResourcesFunction = (permissions: any) =>
  | ReactNode // (permissions) => <><Resource /><Resource /><Resource /></>
  | Promise<ReactNode> // (permissions) => fetch().then(() => <><Resource /><Resource /><Resource /></>)
  | ResourceElement[] // // (permissions) => [<Resource />, <Resource />, <Resource />]
  | Promise<ResourceElement[]>; // (permissions) => fetch().then(() => [<Resource />, <Resource />, <Resource />])
export type AdminChildren = RenderResourcesFunction | ReactNode;

export type TitleComponent = string | ReactElement<any>;
export type CatchAllComponent = ComponentType<{ title?: TitleComponent }>;

export type LoginComponent = ComponentType<any> | ReactElement<any>;
export type DashboardComponent = ComponentType<any>;

export type CoreLayoutProps = {
  children?: ReactNode;
  dashboard?: DashboardComponent;
  menu?: ComponentType<{
    hasDashboard?: boolean;
  }>;
  title?: TitleComponent;
};

export type LayoutComponent = ComponentType<CoreLayoutProps>;
export type LoadingComponent = ComponentType<{
  loadingPrimary?: string;
  loadingSecondary?: string;
}>;

export type ResourceComponentInjectedProps = {
  permissions?: any;
  resource?: string;
  options?: any;
  hasList?: boolean;
  hasEdit?: boolean;
  hasShow?: boolean;
  hasCreate?: boolean;
};

export type ResourceOptions = {
  label?: string;
  [key: string]: any;
};

export type ResourceProps = {
  intent?: 'route' | 'registration';
  name: string;
  list?: ComponentType<any> | ReactElement;
  create?: ComponentType<any> | ReactElement;
  edit?: ComponentType<any> | ReactElement;
  show?: ComponentType<any> | ReactElement;
  icon?: ComponentType<any>;
  recordRepresentation?: ReactElement | RecordToStringFunction | string;
  options?: ResourceOptions;
};

export type Exporter = (
  data: any,
  fetchRelatedRecords: (data: any, field: string, resource: string) => Promise<any>,
  dataProvider: DataProvider,
  resource?: string,
) => void | Promise<void>;

export type SetOnSave = (onSave?: (values: object, redirect: any) => void) => void;

export type FormFunctions = {
  setOnSave?: SetOnSave;
};
