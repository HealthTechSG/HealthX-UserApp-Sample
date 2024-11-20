import React, { useState } from 'react';

import PatientDeleteModal from './PatientDeleteModal';
import { DeleteButton } from '@/common/components';

//* Props ----------------------------------------------------------------------
interface DeletePatientButtonProps {
  id: string;
  onDelete?: () => void;
}

//* FC -------------------------------------------------------------------------
const PatientDeleteButton: React.FC<DeletePatientButtonProps> = ({
  id,
  onDelete = () => {},
}) => {
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    setOpen(false);
    onDelete();
  };

  //* JSX ----------------------------------------------------------------------
  return (
    <>
      <DeleteButton
        onClick={() => {
          setOpen(true);
        }}
      />
      <PatientDeleteModal
        id={id}
        onCancel={() => setOpen(false)}
        onDelete={handleDelete}
        open={open}
      />
    </>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientDeleteButton;
