import { Card, Flex, Form } from 'antd';
import React, { useEffect } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import PatientNextOfKinFormBody from './PatientNextOfKinFormBody';
import {
  CancelButton,
  SubmitButton,
  LoadingOverlay,
} from '@/common/components';
import { useNotification } from '@/common/hooks';
import { RouteMap } from '@/configs';
import {
  useGetPatientNextOfKinByIdQuery,
  useUpdatePatientNextOfKinMutation,
} from '@/services/Patient/PatientService';
import { PatientNextOfKin } from '@/services/Patient/PatientTypes';

const { PatientPaths } = RouteMap;

//* FC -------------------------------------------------------------------------
const PatientNextOfKinEditPageContent: React.FC = () => {
  const { id, referenceId } = useParams<{ id: string; referenceId: string }>();
  const patientId = id!;
  const nextOfKinId = referenceId!;

  const navigate = useNavigate();
  const { showError, showSuccess } = useNotification();
  const [form] = Form.useForm();

  const { data, isError, isFetching } =
    useGetPatientNextOfKinByIdQuery(nextOfKinId);

  const [triggerMutation, { isLoading: isSaving }] =
    useUpdatePatientNextOfKinMutation();

  const patientNextOfKinListPath = generatePath(
    PatientPaths.PatientNextOfKinList,
    { id: patientId },
  );

  //* Submit -------------------------------------------------------------------
  const onFormFinish = (values: PatientNextOfKin) => {
    values.patientId = patientId;

    triggerMutation({
      ...data,
      ...values,
    })
      .unwrap()
      .then(() => {
        showSuccess('Patient updated successfully!');
        navigate(patientNextOfKinListPath, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        showError(error);
      });
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);

  //* JSX ----------------------------------------------------------------------
  return (
    <Form
      disabled={isFetching || isSaving}
      form={form}
      layout="vertical"
      onFinish={onFormFinish}
      size="large"
    >
      <Flex gap="small" vertical>
        <Card>
          <LoadingOverlay isError={isError} isLoading={isFetching}>
            <PatientNextOfKinFormBody />
          </LoadingOverlay>
        </Card>

        <Card size="small">
          <Flex gap="small">
            <SubmitButton disabled={isError} loading={isFetching || isSaving} />
            <CancelButton href={patientNextOfKinListPath} />
          </Flex>
        </Card>
      </Flex>
    </Form>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientNextOfKinEditPageContent;
