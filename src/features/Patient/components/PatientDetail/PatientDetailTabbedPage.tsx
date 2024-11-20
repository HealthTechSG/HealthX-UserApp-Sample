import { Flex } from 'antd';
import React from 'react';
import { useParams, generatePath } from 'react-router';

import PatientProfileTabContent from './PatientProfileTabContent';
import { PatientSummaryCard } from './PatientSummary';
import PatientContactTabContent from '../PatientContact/PatientContactTabContent';
import { BasePage, BaseTabbedCard } from '@/common/components';
import { BreadcrumbItem } from '@/common/types';
import { RouteMap } from '@/configs/navigation';
import { useGetPatientByIdQuery } from '@/services/Patient/PatientService';

const { PatientPaths } = RouteMap;

//* Props ----------------------------------------------------------------------
type TabKey = 'profile' | 'allergy' | 'nextOfKin' | 'immunization' | 'remarks';

interface PatientDetailTabbedPageProps {
  activeTab: TabKey;
}

//* The FC ---------------------------------------------------------------------
const PatientDetailTabbedPage: React.FC<PatientDetailTabbedPageProps> = ({
  activeTab,
}) => {
  const { id } = useParams<{ id: string }>();
  const patientId = id!;

  const { data } = useGetPatientByIdQuery(patientId);

  // Sample code for overriding the page title and breadcrumbs.
  const renderPageTitle = (pageTitle: React.ReactNode) =>
    data?.mrn ? `${pageTitle} (${data?.mrn})` : pageTitle;

  const renderBreadcrumb = (breadcrumbs: BreadcrumbItem[]) =>
    breadcrumbs.map((breadcrumb) => {
      if (data?.mrn && breadcrumb.key === 'patientDetails') {
        return { ...breadcrumb, title: `${breadcrumb.title} (${data?.mrn})` };
      }

      return breadcrumb;
    });

  //* Tabs ---------------------------------------------------------------------
  const tabList = [
    {
      key: 'profile' as TabKey,
      title: 'Profile',
      content: <PatientProfileTabContent />,
      href: generatePath(PatientPaths.PatientDetail, { id: patientId }),
    },
    {
      key: 'contact' as TabKey,
      title: 'Contact',
      content: <PatientContactTabContent />,
      href: generatePath(PatientPaths.PatientDetail, { id: patientId }),
    },
  ];

  //* JSX ----------------------------------------------------------------------
  return (
    <BasePage
      renderBreadcrumb={renderBreadcrumb}
      renderPageTitle={renderPageTitle}
    >
      <Flex gap="middle" vertical>
        <PatientSummaryCard patientId={patientId} />
        <BaseTabbedCard initialActiveTab={activeTab} tabList={tabList} />
      </Flex>
    </BasePage>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientDetailTabbedPage;
