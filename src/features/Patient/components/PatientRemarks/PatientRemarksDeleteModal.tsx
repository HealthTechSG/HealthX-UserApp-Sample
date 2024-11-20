import { Modal } from 'antd';
import React from 'react';

import { CancelButton, SubmitButton } from '@/common/components';
import { useNotification } from '@/common/hooks';
import { useDeletePatientRemarksMutation } from '@/services/Patient/PatientService';

//* Props ----------------------------------------------------------------------
interface PatientRemarksDeleteModalProps {
  id: string;
  open: boolean;
  onDelete: () => void;
  onCancel: () => void;
}

//* FC -------------------------------------------------------------------------
const PatientRemarksDeleteModal: React.FC<PatientRemarksDeleteModalProps> = ({
  id,
  onCancel,
  onDelete,
  open,
}) => {
  const [triggerMutation, { isLoading }] = useDeletePatientRemarksMutation();
  const { showError, showSuccess } = useNotification();

  const handleSubmit = () => {
    triggerMutation(id)
      .unwrap()
      .then(() => {
        showSuccess('Patient remarks deleted successfully!');
        onDelete();
      })
      .catch((error) => {
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
      Are you sure you want to delete this patient remarks record?
    </Modal>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientRemarksDeleteModal;
