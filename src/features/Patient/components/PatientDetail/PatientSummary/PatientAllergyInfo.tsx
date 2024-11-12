import { Flex, Alert } from 'antd';
import { isEmpty } from 'lodash-es';
import React from 'react';

import PatientAllergyInfoBox from './PatientAllergyInfoBox';
import { LoadingOverlay } from '@/common/components';
import { useGetPatientAllergyListByPatientIdQuery } from '@/services/Patient/PatientService';

//* Props ----------------------------------------------------------------------
interface PatientAllergyInfoProps {
  patientId: string;
}

//* FC -------------------------------------------------------------------------
const PatientAllergyInfo: React.FC<PatientAllergyInfoProps> = ({
  patientId,
}) => {
  //* Query --------------------------------------------------------------------
  const { data, isError, isFetching, isSuccess } =
    useGetPatientAllergyListByPatientIdQuery(patientId);

  //* JSX ----------------------------------------------------------------------
  return (
    <LoadingOverlay isLoading={isFetching}>
      <Flex gap="small" justify="flex-end" wrap>
        {isError ? (
          <Alert message="Error loading allergy data." showIcon type="error" />
        ) : null}

        {isSuccess && isEmpty(data?.entry) ? (
          <Alert message="No recorded allergy" type="info" />
        ) : null}

        {data?.entry?.map((allergy) => (
          <PatientAllergyInfoBox key={allergy.id} allergy={allergy} />
        ))}
      </Flex>
    </LoadingOverlay>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientAllergyInfo;
