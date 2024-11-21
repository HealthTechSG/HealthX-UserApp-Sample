import { Form, Row, Col, Input, Radio, DatePicker, Select } from 'antd';
import React from 'react';

import { PatientLabels } from '@/features/Patient/constants';

const { fields: FieldLabel, options } = PatientLabels;
const { gender: GenderOptionLabel, relationship: RelationshipOptionLabel } =
  options;

//* FC -------------------------------------------------------------------------
const PatientTableFilterFormBody: React.FC = () => (
  <Row gutter={16}>
    <Col span={12}>
      <Form.Item label={FieldLabel.mrn} name="mrn">
        <Input addonBefore="Exact" />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item label={FieldLabel.name} name="name">
        <Input addonBefore="Contains" />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item label={FieldLabel.active} name="active">
        <Radio.Group buttonStyle="solid" optionType="button">
          <Radio value="all">All</Radio>
          <Radio value="true">Active</Radio>
          <Radio value="false">Inactive</Radio>
        </Radio.Group>
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item label={FieldLabel.birthdate} name="birthdate">
        <DatePicker />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item label={FieldLabel.gender} name="gender">
        <Radio.Group
          buttonStyle="solid"
          options={[
            { value: 'all', label: 'All' },
            { value: 'male', label: GenderOptionLabel.male },
            { value: 'female', label: GenderOptionLabel.female },
            { value: 'unknown', label: GenderOptionLabel.unknown },
          ]}
          optionType="button"
        />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item label={FieldLabel.contactNumber} name="contactNumber">
        <Input addonBefore="Exact" />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item label={FieldLabel.email} name="email">
        <Input addonBefore="Exact" />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item label={FieldLabel.contact.relationship} name="relationship">
        <Select
          options={Object.entries(RelationshipOptionLabel).map(
            ([key, val]) => ({
              label: val,
              value: key,
            }),
          )}
        />
      </Form.Item>
    </Col>
  </Row>
);

//* Export ---------------------------------------------------------------------
export default PatientTableFilterFormBody;
