import {
  Form,
  Row,
  Col,
  Input,
  Checkbox,
  Radio,
  DatePicker,
  Select,
} from 'antd';
import React from 'react';

import { PatientLabels } from '@/features/Patient/constants';

const { fields: FieldLabel, options } = PatientLabels;
const {
  gender: GenderOptionLabel,
  idType: IdTypeOptionLabel,
  maritalStatus: MaritalStatusOptionLabel,
} = options;

//* FC -------------------------------------------------------------------------
// This is shared between PatientAdd and PatientEdit form.
const PatientParticularsFormBody: React.FC = () => (
  <Row gutter={16}>
    <Col span={12}>
      <Form.Item
        label={FieldLabel.mrn}
        name="mrn"
        rules={[{ required: true }]}
        tooltip="Medical Record Number"
      >
        <Input />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item label=" " name="isInactive" valuePropName="checked">
        <Checkbox>Inactive</Checkbox>
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item
        label={FieldLabel.name}
        name="name"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item label={FieldLabel.birthdate} name="birthdate">
        <DatePicker />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item
        label={FieldLabel.gender}
        name="gender"
        rules={[{ required: true }]}
      >
        <Radio.Group
          options={[
            { value: 'male', label: GenderOptionLabel.male },
            { value: 'female', label: GenderOptionLabel.female },
            { value: 'unknown', label: GenderOptionLabel.unknown },
          ]}
        />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item
        label={FieldLabel.maritalStatus}
        name="maritalStatus"
        rules={[{ required: true }]}
      >
        <Select
          options={[
            { value: 'single', label: MaritalStatusOptionLabel.single },
            { value: 'married', label: MaritalStatusOptionLabel.married },
            { value: 'divorced', label: MaritalStatusOptionLabel.divorced },
            { value: 'widowed', label: MaritalStatusOptionLabel.widowed },
          ]}
        />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item
        label={FieldLabel.idType}
        name="idType"
        rules={[{ required: true }]}
      >
        <Select
          options={[
            { value: 'citizen', label: IdTypeOptionLabel.citizen },
            { value: 'pr', label: IdTypeOptionLabel.pr },
            { value: 'passholder', label: IdTypeOptionLabel.passholder },
            { value: 'foreigner', label: IdTypeOptionLabel.foreigner },
          ]}
        />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item
        label={FieldLabel.idNumber}
        name="idNumber"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item
        label={FieldLabel.contactNumber}
        name="contactNumber"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item
        label={FieldLabel.email}
        name="email"
        rules={[{ type: 'email' }]}
      >
        <Input />
      </Form.Item>
    </Col>
  </Row>
);

//* Export ---------------------------------------------------------------------
export default PatientParticularsFormBody;
