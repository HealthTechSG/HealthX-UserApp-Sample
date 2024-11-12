import { Card, Flex, Form } from 'antd';
import React from 'react';
import { useParams, generatePath, useNavigate } from 'react-router-dom';

import PatientImmunizationFormBody from './PatientImmunizationFormBody';
import { CancelButton, SubmitButton } from '@/common/components';
import { useNotification } from '@/common/hooks';
import { RouteMap } from '@/configs';
import { useCreatePatientImmunizationMutation } from '@/services/Patient/PatientService';
import { PatientImmunization } from '@/services/Patient/PatientTypes';

const { PatientPaths } = RouteMap;

//* FC -------------------------------------------------------------------------
const PatientImmunizationAddPageContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const patientId = id!;

  const navigate = useNavigate();
  const { showError, showSuccess } = useNotification();
  const [form] = Form.useForm();

  const [triggerMutation, { isLoading }] =
    useCreatePatientImmunizationMutation();

  const listPath = generatePath(PatientPaths.PatientImmunizationList, {
    id: patientId,
  });

  //* Submit -------------------------------------------------------------------
  const onFormFinish = (values: PatientImmunization) => {
    values.patientId = patientId;

    triggerMutation(values)
      .unwrap()
      .then(() => {
        showSuccess('Patient Immunization record added successfully!');
        navigate(listPath, { replace: true });
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
          <PatientImmunizationFormBody />
        </Card>

        <Card size="small">
          <Flex gap="small">
            <SubmitButton loading={isLoading} />
            <CancelButton href={listPath} />
          </Flex>
        </Card>
      </Flex>
    </Form>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientImmunizationAddPageContent;
