import { Card, Flex, Form } from 'antd';
import React, { useEffect } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import PatientImmunizationFormBody from './PatientImmunizationFormBody';
import {
  CancelButton,
  SubmitButton,
  LoadingOverlay,
} from '@/common/components';
import { useNotification } from '@/common/hooks';
import { DateUtils } from '@/common/utils';
import { RouteMap } from '@/configs';
import {
  useGetPatientImmunizationByIdQuery,
  useUpdatePatientImmunizationMutation,
} from '@/services/Patient/PatientService';
import { PatientImmunization } from '@/services/Patient/PatientTypes';

const { PatientPaths } = RouteMap;

//* FC -------------------------------------------------------------------------
const PatientImmunizationEditPageContent: React.FC = () => {
  const { id, referenceId } = useParams<{ id: string; referenceId: string }>();
  const patientId = id!;
  const immunizationId = referenceId!;

  const navigate = useNavigate();
  const { showSuccess } = useNotification();
  const [form] = Form.useForm();

  const { data, isError, isFetching } =
    useGetPatientImmunizationByIdQuery(immunizationId);

  const [triggerMutation, { isLoading: isSaving }] =
    useUpdatePatientImmunizationMutation();

  const listPath = generatePath(PatientPaths.PatientImmunizationList, {
    id: patientId,
  });

  //* Submit -------------------------------------------------------------------
  const onFormFinish = (values: PatientImmunization) => {
    values.patientId = patientId;

    triggerMutation({
      ...data,
      ...values,
    })
      .unwrap()
      .then(() => {
        showSuccess('Patient Immunization record updated successfully!');
        navigate(listPath, { replace: true });
      });
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue(
        DateUtils.transformDatesInObject(data, ['vaccineDate', 'reactionDate']),
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
            <PatientImmunizationFormBody />
          </LoadingOverlay>
        </Card>

        <Card size="small">
          <Flex gap="small">
            <SubmitButton disabled={isError} loading={isFetching || isSaving} />
            <CancelButton href={listPath} />
          </Flex>
        </Card>
      </Flex>
    </Form>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientImmunizationEditPageContent;
