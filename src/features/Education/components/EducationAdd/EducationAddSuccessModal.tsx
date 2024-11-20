import { Modal, Alert } from 'antd';
import React from 'react';
import { generatePath } from 'react-router-dom';

import { RedirectButton, BackButton } from '@/common/components';
import { RouteMap } from '@/configs';

const { EducationPaths } = RouteMap;

//* Props ----------------------------------------------------------------------
interface EducationAddSuccessModalProps {
  open: boolean;
  educationId?: string;
}

//* FC -------------------------------------------------------------------------
const EducationAddSuccessModal: React.FC<EducationAddSuccessModalProps> = ({
  educationId,
  open,
}) => {
  const listingPath = generatePath(EducationPaths.EducationList);

  const detailPath = generatePath(EducationPaths.EducationView, {
    id: educationId,
  });

  //* JSX ----------------------------------------------------------------------
  return (
    <Modal
      closable={false}
      footer={[
        <BackButton key="list" href={listingPath}>
          Back to listing
        </BackButton>,
        <RedirectButton key="detail" href={detailPath} type="primary">
          Go to details
        </RedirectButton>,
      ]}
      open={open}
    >
      <Alert
        description="Education record has been created successfully."
        message="Success!"
        showIcon
        type="success"
      />
    </Modal>
  );
};

//* Export ---------------------------------------------------------------------
export default EducationAddSuccessModal;
