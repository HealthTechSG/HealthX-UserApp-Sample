import { Flex } from 'antd';
import React from 'react';
import { useParams, generatePath } from 'react-router-dom';

import PatientImmunizationTable from './PatientImmunizationTable';
import { AddButton } from '@/common/components';
import { RouteMap } from '@/configs';

const { PatientPaths } = RouteMap;

//* FC -------------------------------------------------------------------------
const PatientImmunizationTabContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const addPath = generatePath(PatientPaths.PatientImmunizationAdd, { id });

  //* JSX ----------------------------------------------------------------------
  return (
    <Flex gap="middle" vertical>
      <Flex align="center" justify="space-between">
        <h2>Immunization</h2>
        <AddButton href={addPath} />
      </Flex>
      <PatientImmunizationTable />
    </Flex>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientImmunizationTabContent;
