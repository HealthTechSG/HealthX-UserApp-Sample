import React from 'react';

import { AddButton } from '@/common/components';
import { RouteMap } from '@/configs';

const { PatientPaths } = RouteMap;

//* FC -------------------------------------------------------------------------
const PatientAddButton: React.FC = () => (
  <AddButton href={PatientPaths.PatientCreate}>Register New Patient</AddButton>
);

//* Export ---------------------------------------------------------------------
export default PatientAddButton;
