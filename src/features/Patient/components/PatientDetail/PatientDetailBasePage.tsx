import { Flex } from 'antd';
import React from 'react';
import { useParams } from 'react-router';

import PatientSummaryCard from './PatientSummary/PatientSummaryCard';
import { BasePage } from '@/common/components';
import { BreadcrumbItem } from '@/common/types';
import { useGetPatientByIdQuery } from '@/services/Patient/PatientService';

//* Props ----------------------------------------------------------------------
interface PatientDetailChildPageProps {
  children: React.ReactNode;
}

//* FC -------------------------------------------------------------------------
const PatientDetailBasePage: React.FC<PatientDetailChildPageProps> = ({
  children,
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

  //* JSX ----------------------------------------------------------------------
  return (
    <BasePage
      breadcrumbParams={{ id: patientId }}
      renderBreadcrumb={renderBreadcrumb}
      renderPageTitle={renderPageTitle}
    >
      <Flex gap="small" vertical>
        <PatientSummaryCard patientId={patientId} />
        {children}
      </Flex>
    </BasePage>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientDetailBasePage;
