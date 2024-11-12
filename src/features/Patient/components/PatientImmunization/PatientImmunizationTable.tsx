import React from 'react';
import { useParams } from 'react-router-dom';

import { BaseStaticTable } from '@/common/components';
import { usePatientImmunizationTable } from '@/features/Patient/hooks';
import { useGetPatientImmunizationByPatientIdQuery } from '@/services/Patient/PatientService';

//* FC -------------------------------------------------------------------------
const PatientImmunizationTable: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const patientId = id!;

  const { columns } = usePatientImmunizationTable(patientId);

  //* Query --------------------------------------------------------------------
  const { data, isError, isFetching } =
    useGetPatientImmunizationByPatientIdQuery(patientId);

  //* JSX ----------------------------------------------------------------------
  return (
    <BaseStaticTable
      columns={columns}
      dataSource={data?.entry}
      error={isError}
      loading={isFetching}
    />
  );
};

//* Export ---------------------------------------------------------------------
export default PatientImmunizationTable;
