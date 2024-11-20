import React from 'react';
import { useParams } from 'react-router-dom';

import { BaseStaticTable } from '@/common/components';
import { usePatientNextOfKinTable } from '@/features/Patient/hooks';
import { useGetPatientNextOfKinListByPatientIdQuery } from '@/services/Patient/PatientService';

//* FC -------------------------------------------------------------------------
const PatientNextOfKinTable: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const patientId = id!;

  const { columns } = usePatientNextOfKinTable(patientId);

  //* Query --------------------------------------------------------------------
  const { data, isError, isFetching } =
    useGetPatientNextOfKinListByPatientIdQuery(patientId);

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
export default PatientNextOfKinTable;
