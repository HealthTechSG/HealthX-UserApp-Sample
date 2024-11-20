import React from 'react';
import { useParams } from 'react-router-dom';

import { BaseStaticTable } from '@/common/components';
import { usePatientAllergyTable } from '@/features/Patient/hooks';
import { useGetPatientAllergyListByPatientIdQuery } from '@/services/Patient/PatientService';

//* FC -------------------------------------------------------------------------
const PatientAllergyTable: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const patientId = id!;

  const { columns } = usePatientAllergyTable(patientId);

  //* Query --------------------------------------------------------------------
  const { data, isError, isFetching } =
    useGetPatientAllergyListByPatientIdQuery(patientId);

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
export default PatientAllergyTable;
