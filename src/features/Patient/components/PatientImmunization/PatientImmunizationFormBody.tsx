import {
  Form,
  Row,
  Col,
  Input,
  DatePicker,
  Select,
  Divider,
  Typography,
} from 'antd';
import React from 'react';

import { PatientImmunizationLabels } from '@/features/Patient/constants';

const { fields: FieldLabels, options } = PatientImmunizationLabels;
const { informationSource: InfoSourceLabels } = options;

//* FC -------------------------------------------------------------------------
const PatientImmunizationFormBody: React.FC = () => (
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
    <Col span={6}>
      <Form.Item
        label={FieldLabels.vaccineDate}
        name="vaccineDate"
        rules={[{ required: true }]}
      >
        <DatePicker className="w-full" />
      </Form.Item>
    </Col>
    <Col span={6}>
      <Form.Item
        label={FieldLabels.informationSource}
        name="informationSource"
        rules={[{ required: true }]}
      >
        <Select
          options={[
            { value: 'provider', label: InfoSourceLabels.provider },
            { value: 'record', label: InfoSourceLabels.record },
            { value: 'recall', label: InfoSourceLabels.recall },
            { value: 'school', label: InfoSourceLabels.school },
          ]}
        />
      </Form.Item>
    </Col>

    <Col span={12}>
      <Form.Item
        label={FieldLabels.productName}
        name="productName"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
    </Col>
    <Col span={6}>
      <Form.Item
        label={FieldLabels.manufacturerName}
        name="manufacturerName"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
    </Col>
    <Col span={6}>
      <Form.Item label={FieldLabels.lotNumber} name="lotNumber">
        <Input />
      </Form.Item>
    </Col>
    <Col span={24}>
      <Form.Item label={FieldLabels.note} name="note">
        <Input />
      </Form.Item>
    </Col>

    <Col span={24}>
      <Divider />
      <Typography.Title level={5}>Reaction (if any)</Typography.Title>
    </Col>
    <Col span={18}>
      <Form.Item label={FieldLabels.reaction} name="reaction">
        <Input />
      </Form.Item>
    </Col>
    <Col span={6}>
      <Form.Item
        dependencies={['reaction']}
        label={FieldLabels.reactionDate}
        name="reactionDate"
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!getFieldValue('reaction') || value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Please enter reaction date!'));
            },
          }),
        ]}
      >
        <DatePicker className="w-full" />
      </Form.Item>
    </Col>
  </Row>
);

//* Export ---------------------------------------------------------------------
export default PatientImmunizationFormBody;
