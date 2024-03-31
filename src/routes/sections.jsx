import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

import PublicRoute from './PublicRoute';
import ProtectedRoute from './ProtectedRoute';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const ChatPage = lazy(() => import('src/pages/chats'));
export const TransactionListPage = lazy(() => import('src/pages/transactionListView'));
export const RecordsPage = lazy(() => import('src/pages/records'));
export const EventsPage = lazy(() => import('src/pages/events'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <ProtectedRoute>
              <Outlet />
            </ProtectedRoute>
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user', element: <UserPage /> },
        { path: 'records', element: <RecordsPage /> },
        { path: 'chats', element: <ChatPage /> },
        { path: 'products', element: <ProductsPage /> },
        { path: 'blog', element: <BlogPage /> },
        { path: 'transaction-lists', element: <TransactionListPage /> },
        { path: 'events-calender', element: <EventsPage /> },
      ],
    },
    {
      path: 'login',
      element: (
        <PublicRoute>
          <LoginPage />
        </PublicRoute>
      ),
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
