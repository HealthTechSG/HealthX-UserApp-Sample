import type { DescriptionsProps } from 'antd';
import { Descriptions, Flex, Alert } from 'antd';
import { get } from 'lodash-es';
import React from 'react';
import { useParams, generatePath, useNavigate } from 'react-router-dom';

import { PatientDeleteButton } from '../PatientDelete';
import { EditButton, LoadingOverlay } from '@/common/components';
import { DateUtils } from '@/common/utils';
import { RouteMap } from '@/configs';
import { PatientLabels } from '@/features/Patient/constants';
import { useGetPatientByIdQuery } from '@/services/Patient/PatientService';

const { PatientPaths } = RouteMap;
const { fields: FieldLabel, options } = PatientLabels;
const {
  gender: GenderOptions,
  idType: IdTypeOptions,
  maritalStatus: MaritalStatusOptions,
} = options;

//* FC -------------------------------------------------------------------------
const PatientProfileTabContent: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const patientId = id!;

  const navigate = useNavigate();

  //* Query --------------------------------------------------------------------
  const { data, isError, isFetching } = useGetPatientByIdQuery(patientId);

  const items: DescriptionsProps['items'] = [
    {
      key: 'mrn',
      label: FieldLabel.mrn,
      children: data?.mrn,
    },
    {
      key: 'name',
      label: FieldLabel.name,
      children: data?.name,
    },
    {
      key: 'dob',
      label: FieldLabel.birthdate,
      children: `${DateUtils.formatDate(data?.birthdate)}`,
    },
    {
      key: 'gender',
      label: FieldLabel.gender,
      children: data?.gender
        ? get(GenderOptions, data.gender, data.gender)
        : null,
    },
    {
      key: 'maritalStatus',
      label: FieldLabel.maritalStatus,
      children: data?.maritalStatus
        ? get(MaritalStatusOptions, data.maritalStatus, data.maritalStatus)
        : null,
      span: 2,
    },
    {
      key: 'idType',
      label: FieldLabel.idType,
      children: data?.idType
        ? get(IdTypeOptions, data.idType, data.idType)
        : null,
    },
    {
      key: 'isNumber',
      label: FieldLabel.idNumber,
      children: data?.idNumber,
      span: 2,
    },
    {
      key: 'contactNumber',
      label: FieldLabel.contactNumber,
      children: data?.contactNumber,
    },
    {
      key: 'email',
      label: FieldLabel.email,
      children: data?.email,
    },
  ];

  const onDelete = () => {
    navigate(PatientPaths.PatientList);
  };

  //* JSX ----------------------------------------------------------------------
  return (
    <LoadingOverlay isError={isError} isLoading={isFetching}>
      <Flex gap="small" vertical>
        {!data?.active ? (
          <Alert message="This patient is marked as Inactive." type="error" />
        ) : null}

        <Descriptions
          extra={
            <Flex gap="small">
              <EditButton
                href={generatePath(PatientPaths.PatientEdit, {
                  id: patientId,
                })}
              />
              <PatientDeleteButton id={patientId} onDelete={onDelete} />
            </Flex>
          }
          items={items}
          layout="vertical"
          title="Patient Profile"
        />
      </Flex>
    </LoadingOverlay>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientProfileTabContent;
