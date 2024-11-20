import React, { useState } from 'react';

import PatientImmunizationDeleteModal from './PatientImmunizationDeleteModal';
import { DeleteButton } from '@/common/components';

//* Props ----------------------------------------------------------------------
interface PatientImmunizationDeleteButtonProps {
  id: string;
}

//* FC -------------------------------------------------------------------------
const PatientImmunizationDeleteButton: React.FC<
  PatientImmunizationDeleteButtonProps
> = ({ id }) => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    setOpen(false);
  };

  //* JSX ----------------------------------------------------------------------
  return (
    <>
      <DeleteButton
        onClick={() => {
          setOpen(true);
        }}
      />
      <PatientImmunizationDeleteModal
        id={id}
        onCancel={() => setOpen(false)}
        onDelete={handleDelete}
        open={open}
      />
    </>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientImmunizationDeleteButton;
