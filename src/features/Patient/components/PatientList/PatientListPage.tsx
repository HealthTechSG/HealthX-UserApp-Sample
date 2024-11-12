import { Card } from 'antd';
import React from 'react';

import PatientAddButton from './PatientAddButton';
import PatientTable from './PatientTable';
import { BasePage } from '@/common/components';

//* FC -------------------------------------------------------------------------
const PatientListPage: React.FC = () => (
  <BasePage actions={<PatientAddButton />}>
    <Card>
      <PatientTable />
    </Card>
  </BasePage>
);

//* Export ---------------------------------------------------------------------
export default PatientListPage;
