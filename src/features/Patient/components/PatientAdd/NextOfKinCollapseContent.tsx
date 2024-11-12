import { Form, Input, Flex, Row, Col, Select } from 'antd';
import React from 'react';

import {
  DynamicFieldAddButton,
  DynamicFieldDeleteButton,
} from '@/common/components';

//* FC -------------------------------------------------------------------------
const NextOfKinCollapseContent: React.FC = () => (
  <Form.List name="nextOfKinList">
    {(fields, { add, remove }) => (
      <Flex gap="small" vertical>
        {fields.map(({ key, name, ...fieldProps }, index) => (
          <Row key={key} gutter={8}>
            <Col span={8}>
              <Form.Item
                {...fieldProps}
                label={index === 0 ? 'Name' : undefined}
                name={[name, 'name']}
                rules={[{ required: true }]}
              >
                <Input placeholder="Name" />
              </Form.Item>
            </Col>
            <Col span={7}>
              <Form.Item
                {...fieldProps}
                label={index === 0 ? 'Relationship' : undefined}
                name={[name, 'relationship']}
                rules={[{ required: true }]}
              >
                <Select
                  options={[
                    { label: 'Parent', value: 'parent' },
                    { label: 'Spouse', value: 'spouse' },
                    { label: 'Child', value: 'child' },
                    { label: 'Sibling', value: 'sibling' },
                    { label: 'Relative', value: 'relative' },
                    { label: 'Others', value: 'others' },
                  ]}
                  placeholder="Relationship"
                />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                {...fieldProps}
                label={index === 0 ? 'Contact Num' : undefined}
                name={[name, 'contactNumber']}
                rules={[{ required: true }]}
              >
                <Input placeholder="Contact Num" />
              </Form.Item>
            </Col>
            <Col span={1}>
              <Form.Item label={index === 0 ? ' ' : undefined}>
                <DynamicFieldDeleteButton onClick={() => remove(name)} />
              </Form.Item>
            </Col>
          </Row>
        ))}

        <DynamicFieldAddButton onClick={() => add()}>
          Add Next of Kin
        </DynamicFieldAddButton>
      </Flex>
    )}
  </Form.List>
);

//* Export ---------------------------------------------------------------------
export default NextOfKinCollapseContent;
