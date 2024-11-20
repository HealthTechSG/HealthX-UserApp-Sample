import React from 'react';
import { useParams } from 'react-router-dom';

import { BaseStaticTable } from '@/common/components';
import { usePatientContactTable } from '@/features/Patient/hooks';
import { useGetPatientByIdQuery } from '@/services/Patient/PatientService';

//* FC -------------------------------------------------------------------------
const PatientContactTable: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const patientId = id!;

  const { columns } = usePatientContactTable();

  //* Query --------------------------------------------------------------------
  const { data, isError, isFetching } = useGetPatientByIdQuery(patientId);

  //* JSX ----------------------------------------------------------------------
  return (
    <BaseStaticTable
      columns={columns}
      dataSource={data?.contactList.map((contact, index) => ({
        ...contact,
        id: index,
      }))}
      error={isError}
      loading={isFetching}
    />
  );
};

//* Export ---------------------------------------------------------------------
export default PatientContactTable;
