import { Card, Flex, Form } from 'antd';
import React from 'react';
import { useParams, generatePath, useNavigate } from 'react-router-dom';

import PatientNextOfKinFormBody from './PatientNextOfKinFormBody';
import { CancelButton, SubmitButton } from '@/common/components';
import { useNotification } from '@/common/hooks';
import { RouteMap } from '@/configs';
import { useCreatePatientNextOfKinMutation } from '@/services/Patient/PatientService';
import { PatientNextOfKin } from '@/services/Patient/PatientTypes';

const { PatientPaths } = RouteMap;

//* FC -------------------------------------------------------------------------
const PatientNextOfKinAddPageContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const patientId = id!;

  const navigate = useNavigate();
  const { showError, showSuccess } = useNotification();
  const [form] = Form.useForm();

  const [triggerMutation, { isLoading }] = useCreatePatientNextOfKinMutation();

  const patientNextOfKinListPath = generatePath(
    PatientPaths.PatientNextOfKinList,
    {
      id: patientId,
    },
  );

  //* Submit -------------------------------------------------------------------
  const onFormFinish = (values: PatientNextOfKin) => {
    values.patientId = patientId;

    triggerMutation(values)
      .unwrap()
      .then(() => {
        showSuccess('Patient next-of-kin added successfully!');
        navigate(patientNextOfKinListPath, { replace: true });
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
          <PatientNextOfKinFormBody />
        </Card>

        <Card size="small">
          <Flex gap="small">
            <SubmitButton loading={isLoading} />
            <CancelButton href={patientNextOfKinListPath} />
          </Flex>
        </Card>
      </Flex>
    </Form>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientNextOfKinAddPageContent;
