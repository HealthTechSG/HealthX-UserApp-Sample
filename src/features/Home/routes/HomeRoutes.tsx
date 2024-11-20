import { HomePage } from '../components';
import ProtectedRoute from '@/common/components/ProtectedRoute';
import type { BasePageRouteObject } from '@/common/types';
import { RouteMap } from '@/configs';

const HomeRoutes: BasePageRouteObject[] = [
  {
    path: RouteMap.RootPath,
    element: (
      <ProtectedRoute>
        <HomePage />
      </ProtectedRoute>
    ),
    handle: {
      pageTitle: 'Home',
      breadcrumbs: [{ title: 'Home' }],
    },
  },
];

export default HomeRoutes;
