import { Flex } from 'antd';
import React from 'react';
import { useParams, generatePath } from 'react-router-dom';

import PatientAllergyTable from './PatientAllergyTable';
import { AddButton } from '@/common/components';
import { RouteMap } from '@/configs';

const { PatientPaths } = RouteMap;

//* FC -------------------------------------------------------------------------
const PatientAllergyTabContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const addPath = generatePath(PatientPaths.PatientAllergyAdd, { id });

  //* JSX ----------------------------------------------------------------------
  return (
    <Flex gap="middle" vertical>
      <Flex align="center" justify="space-between">
        <h2>Allergy & Intolerance</h2>
        <AddButton href={addPath} />
      </Flex>
      <PatientAllergyTable />
    </Flex>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientAllergyTabContent;
