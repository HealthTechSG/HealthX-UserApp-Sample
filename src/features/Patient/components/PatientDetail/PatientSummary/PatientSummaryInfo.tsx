import { Flex } from 'antd';
import { get } from 'lodash-es';
import React from 'react';

import { LoadingOverlay } from '@/common/components';
import { DateUtils } from '@/common/utils';
import { PatientLabels } from '@/features/Patient/constants';
import { useGetPatientByIdQuery } from '@/services/Patient/PatientService';

// TODO: Can we map this using FHIR value sets?
const { gender: GenderOptions, idType: IdTypeOptions } = PatientLabels.options;

//* Props ----------------------------------------------------------------------
interface PatientSummaryInfoProps {
  patientId: string;
}

//* FC -------------------------------------------------------------------------
const PatientSummaryInfo: React.FC<PatientSummaryInfoProps> = ({
  patientId,
}) => {
  //* Query --------------------------------------------------------------------
  const { data, isError, isFetching } = useGetPatientByIdQuery(patientId);

  const { birthdate, gender, idType, mrn, name } = data || {};

  const displayBirthDate = birthdate
    ? DateUtils.formatDate(birthdate)
    : '(DoB unknown)';

  const displayGender = gender ? get(GenderOptions, gender, gender) : null;
  const displayIdType = idType ? get(IdTypeOptions, idType, idType) : null;

  //* JSX ----------------------------------------------------------------------
  return (
    <LoadingOverlay isError={isError} isLoading={isFetching}>
      <Flex gap="small" vertical>
        <h2>{name || 'Name'}</h2>
        <div className="text-nowrap">
          {`${mrn} | ${displayBirthDate} | ${displayGender} | ${displayIdType}`}
        </div>
      </Flex>
    </LoadingOverlay>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientSummaryInfo;
