import { Card, Flex, Form } from 'antd';
import React, { useState } from 'react';

import AllergyCollapseContent from './AllergyCollapseContent';
import NextOfKinCollapseContent from './NextOfKinCollapseContent';
import PatientAddSuccessModal from './PatientAddSuccessModal';
import PatientParticularsFormBody from './PatientParticularsFormBody';
import RemarksCollapseContent from './RemarksCollapseContent';
import {
  BasePage,
  CancelButton,
  SubmitButton,
  SingleItemCollapse,
} from '@/common/components';
import { useNotification } from '@/common/hooks';
import { RouteMap } from '@/configs';
import { usePatientAddForm } from '@/features/Patient/hooks';

const { PatientPaths } = RouteMap;

//* FC -------------------------------------------------------------------------
const PatientAddPage: React.FC = () => {
  const { showError } = useNotification();

  //* Form Params --------------------------------------------------------------
  const [form] = Form.useForm();
  const { handleSubmit, isLoading } = usePatientAddForm();

  const [successModalOpen, setSuccessModalOpen] = useState(false);
  const [newPatientId, setNewPatientId] = useState('');

  //* Form Handlers ------------------------------------------------------------
  const onFormFinish = (values: any) => {
    handleSubmit(values)
      .then((patientId) => {
        // Success
        setNewPatientId(patientId);
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
      <PatientAddSuccessModal
        open={successModalOpen}
        patientId={newPatientId}
      />

      <Form
        disabled={isLoading}
        form={form}
        layout="vertical"
        onFinish={onFormFinish}
        size="large"
      >
        <Flex gap="small" vertical>
          <Card title="Patient Particulars">
            <PatientParticularsFormBody />
          </Card>

          <SingleItemCollapse defaultOpen title="Allergy & Intolerance">
            <AllergyCollapseContent />
          </SingleItemCollapse>

          <SingleItemCollapse defaultOpen title="Next of Kin">
            <NextOfKinCollapseContent />
          </SingleItemCollapse>

          <SingleItemCollapse defaultOpen title="Remarks">
            <RemarksCollapseContent />
          </SingleItemCollapse>

          <Card size="small">
            <Flex gap="small">
              <SubmitButton loading={isLoading} />
              <CancelButton href={PatientPaths.PatientList} />
            </Flex>
          </Card>
        </Flex>
      </Form>
    </BasePage>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientAddPage;
