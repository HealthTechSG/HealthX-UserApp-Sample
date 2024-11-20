import { Card, Flex, Form } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import { useParams, generatePath, useNavigate } from 'react-router-dom';

import PatientAllergyFormBody from './PatientAllergyFormBody';
import { CancelButton, SubmitButton } from '@/common/components';
import { useNotification } from '@/common/hooks';
import { RouteMap } from '@/configs';
import { useCreatePatientAllergyMutation } from '@/services/Patient/PatientService';
import { PatientAllergy } from '@/services/Patient/PatientTypes';

const { PatientPaths } = RouteMap;

//* FC -------------------------------------------------------------------------
const PatientAllergyAddPageContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const patientId = id!;

  const navigate = useNavigate();
  const { showError, showSuccess } = useNotification();
  const [form] = Form.useForm();

  const [triggerMutation, { isLoading }] = useCreatePatientAllergyMutation();

  const patientAllergyListPath = generatePath(PatientPaths.PatientAllergyList, {
    id: patientId,
  });

  //* Submit -------------------------------------------------------------------
  const onFormFinish = (values: PatientAllergy) => {
    values.patientId = patientId;

    triggerMutation(values)
      .unwrap()
      .then(() => {
        showSuccess('PatientAllergy added successfully!');
        navigate(patientAllergyListPath, { replace: true });
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
      initialValues={{ recordedDate: dayjs() }}
      layout="vertical"
      onFinish={onFormFinish}
      size="large"
    >
      <Flex gap="small" vertical>
        <Card>
          <PatientAllergyFormBody />
        </Card>

        <Card size="small">
          <Flex gap="small">
            <SubmitButton loading={isLoading} />
            <CancelButton href={patientAllergyListPath} />
          </Flex>
        </Card>
      </Flex>
    </Form>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientAllergyAddPageContent;
