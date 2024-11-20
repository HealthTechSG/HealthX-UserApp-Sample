import React from 'react';
import { useParams } from 'react-router-dom';

import { BaseStaticTable } from '@/common/components';
import { usePatientRemarksTable } from '@/features/Patient/hooks';
import { useGetPatientRemarksListByPatientIdQuery } from '@/services/Patient/PatientService';

//* FC -------------------------------------------------------------------------
const PatientRemarksTable: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const patientId = id!;

  const { columns } = usePatientRemarksTable(patientId);

  //* Query --------------------------------------------------------------------
  const { data, isError, isFetching } =
    useGetPatientRemarksListByPatientIdQuery(patientId);

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
export default PatientRemarksTable;
