import { Card, Alert } from 'antd';
import React from 'react';

import EducationTable from './EducationTable';
import { BasePage, AddButton } from '@/common/components';
import { RouteMap } from '@/configs';

//* FC -------------------------------------------------------------------------
const PatientListPage: React.FC = () => (
  <BasePage
    actions={<AddButton href={RouteMap.EducationPaths.EducationCreate} />}
  >
    <Card>
      <Alert
        className="mb-4"
        message={
          <p>
            This is a custom resource that is generated from the{' '}
            <b>FHIR Nexus API Template</b>.
          </p>
        }
        showIcon
        type="info"
      />

      <EducationTable />
    </Card>
  </BasePage>
);

//* Export ---------------------------------------------------------------------
export default PatientListPage;
