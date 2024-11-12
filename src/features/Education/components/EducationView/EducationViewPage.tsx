import { Card } from 'antd';
import React from 'react';
import { useParams } from 'react-router-dom';

import EducationViewDetail from './EducationViewDetail';
import { BasePage } from '@/common/components';

//* FC -------------------------------------------------------------------------
const EducationViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const educationId = id!;

  //* JSX ----------------------------------------------------------------------
  return (
    <BasePage>
      <Card>
        <EducationViewDetail educationId={educationId} />
      </Card>
    </BasePage>
  );
};

//* Export ---------------------------------------------------------------------
export default EducationViewPage;
