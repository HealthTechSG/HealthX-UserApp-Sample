import { Modal } from 'antd';
import React from 'react';

import { CancelButton, SubmitButton } from '@/common/components';
import { useNotification } from '@/common/hooks';
import { useDeletePatientImmunizationMutation } from '@/services/Patient/PatientService';

//* Props ----------------------------------------------------------------------
interface PatientImmunizationDeleteModalProps {
  id: string;
  open: boolean;
  onDelete: () => void;
  onCancel: () => void;
}

//* FC -------------------------------------------------------------------------
const PatientImmunizationDeleteModal: React.FC<
  PatientImmunizationDeleteModalProps
> = ({ id, onCancel, onDelete, open }) => {
  const [triggerMutation, { isLoading }] =
    useDeletePatientImmunizationMutation();
  const { showError, showSuccess } = useNotification();

  const handleSubmit = () => {
    triggerMutation(id)
      .unwrap()
      .then(() => {
        showSuccess('Patient immunization record deleted successfully!');
        onDelete();
      })
      .catch((error) => {
        console.error(error);
        showError(error);
      });
  };

  //* JSX ----------------------------------------------------------------------
  return (
    <Modal
      centered
      footer={[
        <CancelButton key="cancel" onClick={onCancel} />,
        <SubmitButton
          key="delete"
          danger
          disabled={isLoading}
          loading={isLoading}
          onClick={handleSubmit}
          type="primary"
        >
          Yes, Delete.
        </SubmitButton>,
      ]}
      onCancel={onCancel}
      open={open}
      title="Confirm Delete?"
    >
      Are you sure you want to delete this patient immunization record?
    </Modal>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientImmunizationDeleteModal;
