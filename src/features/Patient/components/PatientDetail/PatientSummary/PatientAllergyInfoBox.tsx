import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Alert, Typography } from 'antd';
import { get } from 'lodash-es';
import React from 'react';

import { PatientAllergyLabels } from '@/features/Patient/constants';
import type { PatientAllergy } from '@/services/Patient/PatientTypes';

const { Text } = Typography;
const { type: TypeOptionLabels } = PatientAllergyLabels.options;

//* Props ----------------------------------------------------------------------
interface PatientAllergyInfoBoxProps {
  allergy: PatientAllergy;
}

//* FC -------------------------------------------------------------------------
const PatientAllergyInfoBox: React.FC<PatientAllergyInfoBoxProps> = ({
  allergy,
}) => {
  const { name, type } = allergy;
  const typeLabel = get(TypeOptionLabels, type, type);

  //* JSX ----------------------------------------------------------------------
  return (
    <Alert
      icon={<ExclamationCircleOutlined />}
      message={
        <>
          <Text type="danger">{typeLabel}:</Text> {name}
        </>
      }
      showIcon
      type="error"
    />
  );
};

//* Export ---------------------------------------------------------------------
export default PatientAllergyInfoBox;
