import React, { useState } from 'react';

import EducationDeleteModal from './EducationDeleteModal';
import { DeleteButton } from '@/common/components';

//* Props ----------------------------------------------------------------------
interface EducationDeleteButtonProps {
  id: string;
  onDelete?: () => void;
}

//* FC -------------------------------------------------------------------------
const EducationDeleteButton: React.FC<EducationDeleteButtonProps> = ({
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
      <EducationDeleteModal
        id={id}
        onCancel={() => setOpen(false)}
        onDelete={handleDelete}
        open={open}
      />
    </>
  );
};

//* Export ---------------------------------------------------------------------
export default EducationDeleteButton;
