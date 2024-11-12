import { Form, Row, Col, Input, Select } from 'antd';
import React from 'react';

import { PatientNextOfKinLabels } from '@/features/Patient/constants';

const { fields: FieldLabels, options } = PatientNextOfKinLabels;
const { relationship: RelationshipOptionLabels } = options;

//* FC -------------------------------------------------------------------------
const PatientNextOfKinFormBody: React.FC = () => (
  <Row gutter={16}>
    <Col span={12}>
      <Form.Item
        label={FieldLabels.name}
        name="name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item
        label={FieldLabels.relationship}
        name="relationship"
        rules={[{ required: true }]}
      >
        <Select
          options={[
            { value: 'parent', label: RelationshipOptionLabels.parent },
            { value: 'spouse', label: RelationshipOptionLabels.spouse },
            { value: 'child', label: RelationshipOptionLabels.child },
            { value: 'sibling', label: RelationshipOptionLabels.sibling },
            { value: 'relative', label: RelationshipOptionLabels.relative },
            { value: 'others', label: RelationshipOptionLabels.others },
          ]}
        />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item
        label={FieldLabels.contactNumber}
        name="contactNumber"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
    </Col>
  </Row>
);

//* Export ---------------------------------------------------------------------
export default PatientNextOfKinFormBody;
