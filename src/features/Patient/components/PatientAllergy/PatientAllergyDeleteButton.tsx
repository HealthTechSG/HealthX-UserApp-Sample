import React, { useState } from 'react';

import PatientAllergyDeleteModal from './PatientAllergyDeleteModal';
import { DeleteButton } from '@/common/components';

//* Props ----------------------------------------------------------------------
interface PatientAllergyDeleteButtonProps {
  id: string;
}

//* FC -------------------------------------------------------------------------
const PatientAllergyDeleteButton: React.FC<PatientAllergyDeleteButtonProps> = ({
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
      <PatientAllergyDeleteModal
        id={id}
        onCancel={() => setOpen(false)}
        onDelete={handleDelete}
        open={open}
      />
    </>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientAllergyDeleteButton;
