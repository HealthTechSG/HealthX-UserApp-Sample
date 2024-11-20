import { Form, Row, Col, Input, Radio, DatePicker, Select } from 'antd';
import React from 'react';

import { PatientAllergyLabels } from '@/features/Patient/constants';

const { fields: FieldLabels, options } = PatientAllergyLabels;
const {
  category: CategoryOptionLabels,
  severity: SeverityOptionLabels,
  type: TypeOptionLabels,
} = options;

//* FC -------------------------------------------------------------------------
const PatientAllergyFormBody: React.FC = () => (
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
      <Form.Item label={FieldLabels.description} name="description">
        <Input />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item
        label={FieldLabels.type}
        name="type"
        rules={[{ required: true }]}
      >
        <Radio.Group
          options={[
            { value: 'allergy', label: TypeOptionLabels.allergy },
            { value: 'intolerance', label: TypeOptionLabels.intolerance },
          ]}
        />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item
        label={FieldLabels.category}
        name="category"
        rules={[{ required: true }]}
      >
        <Select
          options={[
            { value: 'food', label: CategoryOptionLabels.food },
            { value: 'medication', label: CategoryOptionLabels.medication },
            { value: 'environment', label: CategoryOptionLabels.environment },
            { value: 'biologic', label: CategoryOptionLabels.biologic },
          ]}
        />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item
        label={FieldLabels.severity}
        name="severity"
        rules={[{ required: true }]}
      >
        <Radio.Group
          options={[
            { value: 'mild', label: SeverityOptionLabels.mild },
            { value: 'moderate', label: SeverityOptionLabels.moderate },
            { value: 'severe', label: SeverityOptionLabels.severe },
          ]}
        />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item label={FieldLabels.recordedDate} name="recordedDate">
        <DatePicker />
      </Form.Item>
    </Col>
    <Col span={24}>
      <Form.Item label={FieldLabels.note} name="note">
        <Input />
      </Form.Item>
    </Col>
  </Row>
);

//* Export ---------------------------------------------------------------------
export default PatientAllergyFormBody;
