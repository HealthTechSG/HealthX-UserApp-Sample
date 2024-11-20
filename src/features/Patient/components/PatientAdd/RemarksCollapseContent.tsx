import { Form, Input } from 'antd';
import React from 'react';

//* FC -------------------------------------------------------------------------
const RemarksCollapseContent: React.FC = () => (
  <Form.Item name="remarks">
    <Input.TextArea placeholder="Remarks (optional)" rows={5} />
  </Form.Item>
);

//* Export ---------------------------------------------------------------------
export default RemarksCollapseContent;
