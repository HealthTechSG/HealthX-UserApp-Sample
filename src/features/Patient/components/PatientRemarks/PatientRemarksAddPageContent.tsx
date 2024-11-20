import { Card, Flex, Form } from 'antd';
import React from 'react';
import { useParams, generatePath, useNavigate } from 'react-router-dom';

import PatientRemarksFormBody from './PatientRemarksFormBody';
import { CancelButton, SubmitButton } from '@/common/components';
import { useNotification } from '@/common/hooks';
import { RouteMap } from '@/configs';
import { useCreatePatientRemarksMutation } from '@/services/Patient/PatientService';
import { PatientNextOfKin } from '@/services/Patient/PatientTypes';

const { PatientPaths } = RouteMap;

//* FC -------------------------------------------------------------------------
const PatientRemarksAddPageContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const patientId = id!;

  const navigate = useNavigate();
  const { showError, showSuccess } = useNotification();
  const [form] = Form.useForm();

  const [triggerMutation, { isLoading }] = useCreatePatientRemarksMutation();

  const patientRemarksListPath = generatePath(PatientPaths.PatientRemarksList, {
    id: patientId,
  });

  //* Submit -------------------------------------------------------------------
  const onFormFinish = (values: PatientNextOfKin) => {
    values.patientId = patientId;

    triggerMutation(values)
      .unwrap()
      .then(() => {
        showSuccess('Patient remarks added successfully!');
        navigate(patientRemarksListPath, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        showError(error);
      });
  };

  //* JSX ----------------------------------------------------------------------
  return (
    <Form
      disabled={isLoading}
      form={form}
      layout="vertical"
      onFinish={onFormFinish}
      size="large"
    >
      <Flex gap="small" vertical>
        <Card>
          <PatientRemarksFormBody />
        </Card>

        <Card size="small">
          <Flex gap="small">
            <SubmitButton loading={isLoading} />
            <CancelButton href={patientRemarksListPath} />
          </Flex>
        </Card>
      </Flex>
    </Form>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientRemarksAddPageContent;
