import { Card, Flex, Form } from 'antd';
import React, { useEffect } from 'react';
import { generatePath, useParams, useNavigate } from 'react-router-dom';

import {
  BasePage,
  CancelButton,
  LoadingOverlay,
  SubmitButton,
} from '@/common/components';
import { useNotification } from '@/common/hooks';
import { DateUtils } from '@/common/utils';
import { RouteMap } from '@/configs';
import { EducationFormBody } from '@/features/Education/components/EducationAdd';
import {
  useGetEducationByIdQuery,
  useUpdateEducationMutation,
} from '@/services/Education/EducationService';

const { EducationPaths } = RouteMap;

//* FC -------------------------------------------------------------------------
const EducationEditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const educationId = id!;

  const navigate = useNavigate();
  const educationDetailsPath = generatePath(EducationPaths.EducationView, {
    id: educationId,
  });

  const { showError, showSuccess } = useNotification();
  const [form] = Form.useForm();

  const { data, isError, isFetching } = useGetEducationByIdQuery(educationId);
  const [triggerMutation, { isLoading: isSaving }] =
    useUpdateEducationMutation();

  //* Submit -------------------------------------------------------------------
  const onFormFinish = (values: any) => {
    triggerMutation({
      ...data,
      ...values,
    })
      .unwrap()
      .then(() => {
        showSuccess('Education updated successfully!');
        navigate(educationDetailsPath);
      })
      .catch((error) => {
        console.error(error);
        showError(error);
      });
  };

  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...DateUtils.transformDatesInObject(data, ['graduateDate']),
      });
    }
  }, [data, form]);

  //* JSX ----------------------------------------------------------------------
  return (
    <BasePage breadcrumbParams={{ id: educationId }}>
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
              <EducationFormBody />
            </LoadingOverlay>
          </Card>

          <Card size="small">
            <Flex gap="small">
              <SubmitButton loading={isFetching || isSaving} />
              <CancelButton href={educationDetailsPath} />
            </Flex>
          </Card>
        </Flex>
      </Form>
    </BasePage>
  );
};

//* Export ---------------------------------------------------------------------
export default EducationEditPage;
