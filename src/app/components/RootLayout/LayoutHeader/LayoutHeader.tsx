import { UserOutlined, SettingOutlined, BellOutlined } from '@ant-design/icons';
import { Layout, Flex, Button } from 'antd';
import React from 'react';

import UserPopover from './UserPopover';

const { Header } = Layout;

//* FC -------------------------------------------------------------------------
const LayoutHeader: React.FC = () => (
  <Header className="h-14 pr-4" id="rootLayoutHeader">
    <Flex align="center" className="h-full" gap="small" justify="end">
      <Button icon={<BellOutlined />} shape="circle" />
      <Button icon={<SettingOutlined />} shape="circle" />
      <UserPopover>
        <Button icon={<UserOutlined />} shape="circle" />
      </UserPopover>
    </Flex>
  </Header>
);

//* Export ---------------------------------------------------------------------
export default LayoutHeader;
