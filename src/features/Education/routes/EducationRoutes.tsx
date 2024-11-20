import {
  EducationListPage,
  EducationAddPage,
  EducationEditPage,
  EducationViewPage,
} from '../components';
import type { BasePageRouteObject } from '@/common/types';
import { RouteMap } from '@/configs';

const { EducationPaths } = RouteMap;

//* The Const ------------------------------------------------------------------
const EducationRoutes: BasePageRouteObject[] = [
  {
    path: EducationPaths.EducationList,
    element: <EducationListPage />,
    handle: {
      pageTitle: 'Education List',
      breadcrumbs: [{ title: 'Education List' }],
    },
  },
  {
    path: EducationPaths.EducationCreate,
    element: <EducationAddPage />,
    handle: {
      pageTitle: 'Add New Education',
      breadcrumbs: [
        { title: 'Education List', path: EducationPaths.EducationList },
        { title: 'Add New Education' },
      ],
    },
  },
  {
    path: EducationPaths.EducationView,
    element: <EducationViewPage />,
    handle: {
      pageTitle: 'Education Details',
      breadcrumbs: [
        { title: 'Education List', path: EducationPaths.EducationList },
        { title: 'Education Details' },
      ],
    },
  },
  {
    path: EducationPaths.EducationEdit,
    element: <EducationEditPage />,
    handle: {
      pageTitle: 'Edit Education Info',
      breadcrumbs: [
        { title: 'Education List', path: EducationPaths.EducationList },
        { title: 'Education Details', path: EducationPaths.EducationView },
        { title: 'Edit Education Info' },
      ],
    },
  },
];

//* Export ---------------------------------------------------------------------
export default EducationRoutes;
