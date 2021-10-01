import React from 'react';
import Dashboard from '../pages/Dashboard';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';

export interface RouteInterface {
  path: string;
  component: React.ComponentType;
  exact?: boolean;
}

export enum RouteNames {
  DASHBOARD = '/',
  SIGNIN = '/signin',
  SIGNUP = '/signup',
}

export const publicRoutes: RouteInterface[] = [
  { path: RouteNames.SIGNIN, exact: true, component: SignIn },
  { path: RouteNames.SIGNUP, exact: true, component: SignUp },
];

export const privateRoutes: RouteInterface[] = [
  { path: RouteNames.DASHBOARD, exact: true, component: Dashboard },
];
