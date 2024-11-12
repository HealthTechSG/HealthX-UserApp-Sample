import React, { useState } from 'react';

import PatientRemarksDeleteModal from './PatientRemarksDeleteModal';
import { DeleteButton } from '@/common/components';

//* Props ----------------------------------------------------------------------
interface PatientRemarksDeleteButtonProps {
  id: string;
}

//* FC -------------------------------------------------------------------------
const PatientRemarksDeleteButton: React.FC<PatientRemarksDeleteButtonProps> = ({
  id,
}) => {
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
      <PatientRemarksDeleteModal
        id={id}
        onCancel={() => setOpen(false)}
        onDelete={handleDelete}
        open={open}
      />
    </>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientRemarksDeleteButton;
