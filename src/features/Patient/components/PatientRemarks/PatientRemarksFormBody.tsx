import { Form, Row, Col, Input } from 'antd';
import React from 'react';

//* FC -------------------------------------------------------------------------
const PatientRemarksFormBody: React.FC = () => (
  <Row gutter={16}>
    <Col span={24}>
      <Form.Item label="Remarks" name="remarks" rules={[{ required: true }]}>
        <Input.TextArea rows={5} />
      </Form.Item>
    </Col>
  </Row>
);

//* Export ---------------------------------------------------------------------
export default PatientRemarksFormBody;
