import { UserInterface } from '../../../interfaces/input/user.interface';

// Describe state
export interface AuthState {
  isAuth: boolean;
  user: UserInterface;
  isLoading: boolean;
  error: any;
  accessToken: string | null;
}

// Describe actions
export enum AuthActionsEnum {
  SET_AUTH = 'SET_AUTH',
  SET_USER = 'SET_USER',
  SET_IS_LOADING = 'SET_IS_LOADING',
  SET_ERROR = 'SET_ERROR',
  SET_TOKEN = 'SET_TOKEN',
}

export interface SetAuthAction {
  type: AuthActionsEnum.SET_AUTH;
  payload: boolean;
}
export interface SetUserAction {
  type: AuthActionsEnum.SET_USER;
  payload: UserInterface;
}
export interface SetIsLoadingAction {
  type: AuthActionsEnum.SET_IS_LOADING;
  payload: boolean;
}
export interface SetErrorAction {
  type: AuthActionsEnum.SET_ERROR;
  payload: Object | null;
}
export interface SetTokenAction {
  type: AuthActionsEnum.SET_TOKEN;
  payload: string | null;
}

// Combine Actions
export type AuthActions =
  | SetAuthAction
  | SetUserAction
  | SetIsLoadingAction
  | SetErrorAction
  | SetTokenAction;
