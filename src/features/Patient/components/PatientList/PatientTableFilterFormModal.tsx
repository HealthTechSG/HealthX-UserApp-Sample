import { omitBy, isEmpty } from 'lodash-es';
import React from 'react';

import PatientTableFilterFormBody from './PatientTableFilterFormBody';
import { TableFilterFormModal } from '@/common/components';

//* Props ----------------------------------------------------------------------
interface PatientTableFilterFormModalProps {
  open: boolean;
  onCancel: () => void;
  filterValues: Record<string, string>;
  onSubmit: (values: Record<string, string>) => void;
}

//* FC -------------------------------------------------------------------------
const PatientTableFilterFormModal: React.FC<
  PatientTableFilterFormModalProps
> = ({ filterValues, onCancel, onSubmit, open }) => {
  //* Props and Handlers -------------------------------------------------------
  const initialValues = {
    gender: 'all',
    active: 'true',
    ...filterValues,
  };

  const onModalSubmit = (values: Record<string, string>) => {
    const nonEmptyValues = omitBy(
      values,
      (value) => isEmpty(value) || value === 'all',
    );

    onSubmit(nonEmptyValues);
  };

  //* JSX ----------------------------------------------------------------------
  return (
    <TableFilterFormModal
      initialValues={initialValues}
      onCancel={onCancel}
      onSubmit={onModalSubmit}
      open={open}
      title="Advanced Search"
    >
      <PatientTableFilterFormBody />
    </TableFilterFormModal>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientTableFilterFormModal;
