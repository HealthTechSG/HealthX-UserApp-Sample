import { Form, Row, Col, Input, DatePicker } from 'antd';
import React from 'react';

import { EducationLabels as Labels } from '@/features/Education/constants';

//* FC -------------------------------------------------------------------------
// This is shared between PatientAdd and PatientEdit form.
const EducationFormBody: React.FC = () => (
  <Row gutter={16}>
    <Col span={12}>
      <Form.Item
        label={Labels.subject}
        name="subject"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item
        label={Labels.institute}
        name="institute"
        rules={[{ required: true }]}
      >
        <Input />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item label={Labels.study} name="study" rules={[{ required: true }]}>
        <Input />
      </Form.Item>
    </Col>
    <Col span={12}>
      <Form.Item label={Labels.graduateDate} name="graduateDate">
        <DatePicker />
      </Form.Item>
    </Col>
  </Row>
);

//* Export ---------------------------------------------------------------------
export default EducationFormBody;
