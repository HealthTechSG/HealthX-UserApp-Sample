import { Card, Flex } from 'antd';
import React from 'react';

import PatientAllergyInfo from './PatientAllergyInfo';
import PatientSummaryInfo from './PatientSummaryInfo';

//* Props ----------------------------------------------------------------------
interface PatientSummaryCardProps {
  patientId: string;
}

//* The FC ---------------------------------------------------------------------
const PatientSummaryCard: React.FC<PatientSummaryCardProps> = ({
  patientId,
}) => (
  <Card>
    <Flex gap="small" justify="space-between">
      <PatientSummaryInfo patientId={patientId} />
      <PatientAllergyInfo patientId={patientId} />
    </Flex>
  </Card>
);
//* Export ---------------------------------------------------------------------
export default PatientSummaryCard;
