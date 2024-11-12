import React from 'react';
import { RouteObject } from 'react-router-dom';

import { BreadcrumbItem } from '@/common/types';

export interface BasePageRouteObject extends Omit<RouteObject, 'handle'> {
  handle: {
    noWrap?: boolean;
    pageTitle?: React.ReactNode;
    breadcrumbs?: BreadcrumbItem[];
  };
}
