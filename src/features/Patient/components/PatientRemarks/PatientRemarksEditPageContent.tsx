import { Card, Flex, Form } from 'antd';
import React, { useEffect } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import PatientRemarksFormBody from './PatientRemarksFormBody';
import {
  CancelButton,
  SubmitButton,
  LoadingOverlay,
} from '@/common/components';
import { useNotification } from '@/common/hooks';
import { RouteMap } from '@/configs';
import {
  useGetPatientRemarksByIdQuery,
  useUpdatePatientRemarksMutation,
} from '@/services/Patient/PatientService';
import { PatientRemarks } from '@/services/Patient/PatientTypes';

const { PatientPaths } = RouteMap;

//* FC -------------------------------------------------------------------------
const PatientRemarksEditPageContent: React.FC = () => {
  const { id, referenceId } = useParams<{ id: string; referenceId: string }>();
  const patientId = id!;
  const remarksId = referenceId!;

  const navigate = useNavigate();
  const { showError, showSuccess } = useNotification();
  const [form] = Form.useForm();

  const { data, isError, isFetching } =
    useGetPatientRemarksByIdQuery(remarksId);

  const [triggerMutation, { isLoading: isSaving }] =
    useUpdatePatientRemarksMutation();

  const patientRemarksListPath = generatePath(PatientPaths.PatientRemarksList, {
    id: patientId,
  });

  //* Submit -------------------------------------------------------------------
  const onFormFinish = (values: PatientRemarks) => {
    values.patientId = patientId;

    triggerMutation({
      ...data,
      ...values,
    })
      .unwrap()
      .then(() => {
        showSuccess('Patient remarks successfully!');
        navigate(patientRemarksListPath, { replace: true });
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
            <PatientRemarksFormBody />
          </LoadingOverlay>
        </Card>

        <Card size="small">
          <Flex gap="small">
            <SubmitButton disabled={isError} loading={isFetching || isSaving} />
            <CancelButton href={patientRemarksListPath} />
          </Flex>
        </Card>
      </Flex>
    </Form>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientRemarksEditPageContent;
