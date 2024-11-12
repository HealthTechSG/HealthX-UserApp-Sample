import React, { useState } from 'react';

import PatientNextOfKinDeleteModal from './PatientNextOfKinDeleteModal';
import { DeleteButton } from '@/common/components';

//* Props ----------------------------------------------------------------------
interface PatientNextOfKinDeleteButtonProps {
  id: string;
}

//* FC -------------------------------------------------------------------------
const PatientNextOfKinDeleteButton: React.FC<
  PatientNextOfKinDeleteButtonProps
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
      <PatientNextOfKinDeleteModal
        id={id}
        onCancel={() => setOpen(false)}
        onDelete={handleDelete}
        open={open}
      />
    </>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientNextOfKinDeleteButton;
