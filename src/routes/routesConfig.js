import { lazy } from 'react';
import RoutesString from './routesString';
const Error404Page = lazy(() => import('../pages/NotFound'));
const DashboardLayout = lazy(() => import('../components/DashboardLayout'));
const CreatePage = lazy(() => import('../pages/PageCreate'));

export const routesConfig = [
  {
    page: Error404Page,
    path: RoutesString.Error404,
    exact: true
  },
  {
    layout: DashboardLayout,
    path: RoutesString.DashboardLayout,
    routes: [
      {
        page: CreatePage,
        path: RoutesString.CreatePage,
        exact: true,
      }
    ]
  },
  {
    page: Error404Page,
    path: '*'
  }
];
