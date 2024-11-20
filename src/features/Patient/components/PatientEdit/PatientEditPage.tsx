import { Card, Flex, Form } from 'antd';
import React, { useEffect } from 'react';
import { generatePath, useNavigate, useParams } from 'react-router-dom';

import { PatientParticularsFormBody } from '../PatientAdd';
import {
  BasePage,
  CancelButton,
  SubmitButton,
  LoadingOverlay,
} from '@/common/components';
import { useNotification } from '@/common/hooks';
import { DateUtils } from '@/common/utils';
import { RouteMap } from '@/configs';
import {
  useGetPatientByIdQuery,
  useUpdatePatientMutation,
} from '@/services/Patient/PatientService';

const { PatientPaths } = RouteMap;

//* FC -------------------------------------------------------------------------
const PatientEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const patientId = id!;

  const navigate = useNavigate();
  const { showError, showSuccess } = useNotification();
  const [form] = Form.useForm();

  const { data, isError, isFetching } = useGetPatientByIdQuery(patientId);
  const [triggerMutation, { isLoading: isSaving }] = useUpdatePatientMutation();

  const patientDetailsPath = generatePath(PatientPaths.PatientDetail, {
    id,
    appid: sessionStorage.getItem('appId'),
  });

  //* Submit -------------------------------------------------------------------
  const onFormFinish = (values: any) => {
    triggerMutation({
      ...data,
      ...values,
      active: !values?.isInactive,
    })
      .unwrap()
      .then(() => {
        showSuccess('Patient updated successfully!');
        navigate(patientDetailsPath, { replace: true });
      })
      .catch((error) => {
        console.error(error);
        showError(error);
      });
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...DateUtils.transformDatesInObject(data, ['birthdate']),
        isInactive: !data.active,
      });
    }
  }, [data, form]);

  //* JSX ----------------------------------------------------------------------
  return (
    <BasePage breadcrumbParams={{ id: patientId }}>
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
              <PatientParticularsFormBody />
            </LoadingOverlay>
          </Card>

          <Card size="small">
            <Flex gap="small">
              <SubmitButton
                disabled={isError}
                loading={isFetching || isSaving}
              />
              <CancelButton href={patientDetailsPath} />
            </Flex>
          </Card>
        </Flex>
      </Form>
    </BasePage>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientEditPage;
