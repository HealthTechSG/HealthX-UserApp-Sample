import { Modal, Alert } from 'antd';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { RedirectButton, BackButton } from '@/common/components';
import { RouteMap } from '@/configs';

const { PatientPaths } = RouteMap;

//* Props ----------------------------------------------------------------------
interface PatientAddSuccessModalProps {
  open: boolean;
  patientId?: string;
}

//* FC -------------------------------------------------------------------------
const PatientAddSuccessModal: React.FC<PatientAddSuccessModalProps> = ({
  open,
  patientId,
}) => {
  const patientListingPath = generatePath(PatientPaths.PatientList);

  const patientDetailsPath = generatePath(PatientPaths.PatientDetail, {
    id: patientId,
  });

  //* JSX ----------------------------------------------------------------------
  return (
    <Modal
      closable={false}
      footer={[
        <BackButton key="list" href={patientListingPath}>
          Back to listing
        </BackButton>,
        <RedirectButton key="detail" href={patientDetailsPath} type="primary">
          Go to details
        </RedirectButton>,
      ]}
      open={open}
    >
      <Alert
        description="Patient record has been created successfully."
        message="Success!"
        showIcon
        type="success"
      />
    </Modal>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientAddSuccessModal;
