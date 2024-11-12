import { Form, Input, Flex, Row, Col, Select } from 'antd';
import React from 'react';

import {
  DynamicFieldAddButton,
  DynamicFieldDeleteButton,
} from '@/common/components';

//* FC -------------------------------------------------------------------------
const AllergyCollapseContent: React.FC = () => (
  <Form.List name="allergyList">
    {(fields, { add, remove }) => (
      <Flex gap="small" vertical>
        {fields.map(({ key, name, ...fieldProps }, index) => (
          <Row key={key} gutter={8}>
            <Col span={5}>
              <Form.Item
                {...fieldProps}
                label={index === 0 ? 'Name' : undefined}
                name={[name, 'name']}
                rules={[{ required: true }]}
              >
                <Input placeholder="Name" />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                {...fieldProps}
                label={index === 0 ? 'Description' : undefined}
                name={[name, 'description']}
              >
                <Input placeholder="Description" />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                {...fieldProps}
                label={index === 0 ? 'Type' : undefined}
                name={[name, 'type']}
                rules={[{ required: true }]}
              >
                <Select
                  options={[
                    { label: 'Allergy', value: 'allergy' },
                    { label: 'Intolerance', value: 'intolerance' },
                  ]}
                  placeholder="Type"
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                {...fieldProps}
                label={index === 0 ? 'Category' : undefined}
                name={[name, 'category']}
                rules={[{ required: true }]}
              >
                <Select
                  options={[
                    { label: 'Food', value: 'food' },
                    { label: 'Medication', value: 'medication' },
                    { label: 'Environment', value: 'environment' },
                    { label: 'Biologic', value: 'biologic' },
                  ]}
                  placeholder="Category"
                />
              </Form.Item>
            </Col>
            <Col span={4}>
              <Form.Item
                {...fieldProps}
                label={index === 0 ? 'Severity' : undefined}
                name={[name, 'severity']}
                rules={[{ required: true }]}
              >
                <Select
                  options={[
                    { label: 'Mild', value: 'mild' },
                    { label: 'Moderate', value: 'moderate' },
                    { label: 'Severe', value: 'severe' },
                  ]}
                  placeholder="Severity"
                />
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
          Add Allergy / Intolerance
        </DynamicFieldAddButton>
      </Flex>
    )}
  </Form.List>
);

//* Export ---------------------------------------------------------------------
export default AllergyCollapseContent;
