import { Card, Flex, Form } from 'antd';
import React, { useEffect } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import PatientAllergyFormBody from './PatientAllergyFormBody';
import {
  CancelButton,
  SubmitButton,
  LoadingOverlay,
} from '@/common/components';
import { useNotification } from '@/common/hooks';
import { DateUtils } from '@/common/utils';
import { RouteMap } from '@/configs';
import {
  useGetPatientAllergyByIdQuery,
  useUpdatePatientAllergyMutation,
} from '@/services/Patient/PatientService';
import { PatientAllergy } from '@/services/Patient/PatientTypes';

const { PatientPaths } = RouteMap;

//* FC -------------------------------------------------------------------------
const PatientAllergyEditPageContent: React.FC = () => {
  const { id, referenceId } = useParams<{ id: string; referenceId: string }>();
  const patientId = id!;
  const allergyId = referenceId!;

  const navigate = useNavigate();
  const { showSuccess } = useNotification();
  const [form] = Form.useForm();

  const { data, isError, isFetching } =
    useGetPatientAllergyByIdQuery(allergyId);

  const [triggerMutation, { isLoading: isSaving }] =
    useUpdatePatientAllergyMutation();

  const patientAllergyListPath = generatePath(PatientPaths.PatientAllergyList, {
    id: patientId,
  });

  //* Submit -------------------------------------------------------------------
  const onFormFinish = (values: PatientAllergy) => {
    values.patientId = patientId;

    triggerMutation({
      ...data,
      ...values,
    })
      .unwrap()
      .then(() => {
        showSuccess('Patient updated successfully!');
        navigate(patientAllergyListPath, { replace: true });
      });
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue(
        DateUtils.transformDatesInObject(data, ['recordedDate']),
      );
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
            <PatientAllergyFormBody />
          </LoadingOverlay>
        </Card>

        <Card size="small">
          <Flex gap="small">
            <SubmitButton disabled={isError} loading={isFetching || isSaving} />
            <CancelButton href={patientAllergyListPath} />
          </Flex>
        </Card>
      </Flex>
    </Form>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientAllergyEditPageContent;
