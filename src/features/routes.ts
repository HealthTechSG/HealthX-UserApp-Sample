import { RouteObject } from 'react-router-dom';

import { CustomInventoryRoutes } from './CustomInventory';
import { EducationRoutes } from './Education';
import { HomeRoutes } from './Home';
import { PatientRoutes } from './Patient';
import type { BasePageRouteObject } from '@/common/types';

const ROUTES: BasePageRouteObject[] = [
  // Home
  ...HomeRoutes,

  // Patient CRUD
  ...PatientRoutes,

  // Education CRUD
  ...EducationRoutes,

  // Custom Inventory CRUD
  ...CustomInventoryRoutes,
];

export default ROUTES as RouteObject[];
