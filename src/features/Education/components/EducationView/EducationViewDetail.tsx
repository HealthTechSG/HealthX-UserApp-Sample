import type { DescriptionsProps } from 'antd';
import { Descriptions, Flex } from 'antd';
import React from 'react';
import { generatePath, useNavigate } from 'react-router-dom';

import { EducationDeleteButton } from '../EducationDelete';
import { EditButton, LoadingOverlay } from '@/common/components';
import { DateUtils } from '@/common/utils';
import { RouteMap } from '@/configs';
import { EducationLabels as Labels } from '@/features/Education/constants';
import { useGetEducationByIdQuery } from '@/services/Education/EducationService';

const { EducationPaths } = RouteMap;

//* Props ----------------------------------------------------------------------
interface EducationViewDetailProps {
  educationId: string;
}

//* FC -------------------------------------------------------------------------
const EducationViewDetail: React.FC<EducationViewDetailProps> = ({
  educationId,
}) => {
  const navigate = useNavigate();

  //* Query --------------------------------------------------------------------
  const { data, isError, isFetching } = useGetEducationByIdQuery(educationId);

  const items: DescriptionsProps['items'] = [
    {
      key: 'subject',
      label: Labels.subject,
      children: data?.subject,
    },
    {
      key: 'institute',
      label: Labels.institute,
      children: data?.institute,
    },
    {
      key: 'study',
      label: Labels.study,
      children: data?.study,
    },
    {
      key: 'graduateDate',
      label: Labels.graduateDate,
      children: `${DateUtils.formatDate(data?.graduateDate)}`,
    },
  ];

  const onDelete = () => {
    navigate(EducationPaths.EducationList);
  };

  //* JSX ----------------------------------------------------------------------
  return (
    <LoadingOverlay isError={isError} isLoading={isFetching}>
      <Flex gap="small" vertical>
        <Descriptions
          extra={
            <Flex gap="small">
              <EditButton
                href={generatePath(EducationPaths.EducationEdit, {
                  id: educationId,
                })}
              />
              <EducationDeleteButton id={educationId} onDelete={onDelete} />
            </Flex>
          }
          items={items}
          layout="vertical"
          title="Education Details"
        />
      </Flex>
    </LoadingOverlay>
  );
};

//* Export ---------------------------------------------------------------------
export default EducationViewDetail;
