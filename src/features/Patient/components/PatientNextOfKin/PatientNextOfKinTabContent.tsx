import { Flex } from 'antd';
import React from 'react';
import { useParams, generatePath } from 'react-router-dom';

import PatientNextOfKinTable from './PatientNextOfKinTable';
import { AddButton } from '@/common/components';
import { RouteMap } from '@/configs';

const { PatientPaths } = RouteMap;

//* FC -------------------------------------------------------------------------
const PatientNextOfKinTabContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const addPath = generatePath(PatientPaths.PatientNextOfKinAdd, { id });

  //* JSX ----------------------------------------------------------------------
  return (
    <Flex gap="middle" vertical>
      <Flex align="center" justify="space-between">
        <h2>Next of Kin</h2>
        <AddButton href={addPath} />
      </Flex>
      <PatientNextOfKinTable />
    </Flex>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientNextOfKinTabContent;
