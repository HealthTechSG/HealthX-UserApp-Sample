import { Form, Input, Flex, Row, Col, Select } from 'antd';
import React from 'react';

import {
  DynamicFieldAddButton,
  DynamicFieldDeleteButton,
} from '@/common/components';
import { PatientLabels } from '@/features/Patient/constants';

const { fields: FieldLabel, options } = PatientLabels;
const { contact: ContactLabel } = FieldLabel;
const { relationship: RelationshipOptionsLabel } = options;

//* FC -------------------------------------------------------------------------
const ContactCollapseContent: React.FC = () => (
  <Form.List name="contactList">
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
                label={index === 0 ? ContactLabel.relationship : undefined}
                name={[name, 'relationship']}
                rules={[{ required: true }]}
              >
                <Select
                  options={Object.entries(RelationshipOptionsLabel).map(
                    ([value, label]) => ({
                      label,
                      value,
                    }),
                  )}
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
          Add Contact
        </DynamicFieldAddButton>
      </Flex>
    )}
  </Form.List>
);

//* Export ---------------------------------------------------------------------
export default ContactCollapseContent;
