import { Card, Flex, Form } from 'antd';
import React, { useState } from 'react';

import EducationAddSuccessModal from './EducationAddSuccessModal';
import EducationFormBody from './EducationFormBody';
import { BasePage, CancelButton, SubmitButton } from '@/common/components';
import { useNotification } from '@/common/hooks';
import { RouteMap } from '@/configs';
import { useCreateEducationMutation } from '@/services/Education/EducationService';

const { EducationPaths } = RouteMap;

//* FC -------------------------------------------------------------------------
const EducationAddPage: React.FC = () => {
  const { showError } = useNotification();

  const [triggerMutation, { isLoading }] = useCreateEducationMutation();

  //* Form Params --------------------------------------------------------------
  const [form] = Form.useForm();

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [newEducationId, setNewEducationId] = useState('');

  //* Form Handlers ------------------------------------------------------------
  const onFormFinish = (values: any) => {
    triggerMutation(values)
      .unwrap()
      .then((data) => {
        // Success
        setNewEducationId(data.id);
        setSuccessModalOpen(true);
      })
      .catch((error) => {
        console.error(error);
        showError(error);
      });
  };

  // TODO: Add a confirmation modal before cancel (if form is dirty)

  //* JSX ----------------------------------------------------------------------
  return (
    <BasePage>
      <EducationAddSuccessModal
        educationId={newEducationId}
        open={successModalOpen}
      />

      <Form
        disabled={isLoading}
        form={form}
        layout="vertical"
        onFinish={onFormFinish}
        size="large"
      >
        <Flex gap="small" vertical>
          <Card>
            <EducationFormBody />
          </Card>

          <Card size="small">
            <Flex gap="small">
              <SubmitButton loading={isLoading} />
              <CancelButton href={EducationPaths.EducationList} />
            </Flex>
          </Card>
        </Flex>
      </Form>
    </BasePage>
  );
};

//* Export ---------------------------------------------------------------------
export default EducationAddPage;
