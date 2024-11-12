import { Flex } from 'antd';
import React from 'react';
import { useParams, generatePath } from 'react-router-dom';

import PatientRemarksTable from './PatientRemarksTable';
import { AddButton } from '@/common/components';
import { RouteMap } from '@/configs';

const { PatientPaths } = RouteMap;

//* FC -------------------------------------------------------------------------
const PatientRemarksTabContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const addPath = generatePath(PatientPaths.PatientRemarksAdd, { id });

  //* JSX ----------------------------------------------------------------------
  return (
    <Flex gap="middle" vertical>
      <Flex align="center" justify="space-between">
        <h2>Patient Remarks</h2>
        <AddButton href={addPath} />
      </Flex>
      <PatientRemarksTable />
    </Flex>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientRemarksTabContent;
