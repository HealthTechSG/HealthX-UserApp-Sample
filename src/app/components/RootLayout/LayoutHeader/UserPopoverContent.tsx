import { UserOutlined, LogoutOutlined } from '@ant-design/icons';
import { useAuthenticator } from '@aws-amplify/ui-react';
import { Flex, Divider, Button, Avatar } from 'antd';
import React from 'react';

import { useModal, useNotification } from '@/common/hooks';

//* FC -------------------------------------------------------------------------
const UserPopoverContent: React.FC = () => {
  const modal = useModal();
  const { showSuccess } = useNotification();
  const { signOut, user } = useAuthenticator();

  const onLogoutClick = () => {
    modal.confirm({
      title: 'Logout',
      content: 'Are you sure you want to logout?',
      onOk: async () => {
        signOut();
        showSuccess('Logout Success');
      },
    });
  };

  //* JSX ----------------------------------------------------------------------
  return (
    <Flex align="center" className="min-w-32 p-2" gap="small" vertical>
      <Avatar icon={<UserOutlined />} size="large" />
      <h3 className="uppercase">
        {user?.username ?? 'Cognito Auth Unavailable'}
      </h3>
      <Divider className="m-1" />
      <Button
        block
        icon={<LogoutOutlined />}
        onClick={onLogoutClick}
        type="primary"
      >
        Logout
      </Button>
    </Flex>
  );
};

//* Export ---------------------------------------------------------------------
export default UserPopoverContent;
