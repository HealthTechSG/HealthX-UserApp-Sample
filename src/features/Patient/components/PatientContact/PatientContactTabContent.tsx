import { Flex } from 'antd';
import React from 'react';

import PatientContactTable from './PatientContactTable';

//* FC -------------------------------------------------------------------------
const PatienContactTabContent: React.FC = () => (
  //* JSX ----------------------------------------------------------------------
  <Flex gap="middle" vertical>
    <Flex align="center" justify="space-between">
      <h2>Contact</h2>
    </Flex>
    <PatientContactTable />
  </Flex>
);
//* Export ---------------------------------------------------------------------
export default PatienContactTabContent;
