import { useAuthenticator } from '@aws-amplify/ui-react';

import { getAppIdFromUrl } from '@/utils/getAppIdFromUrl';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const { authStatus } = useAuthenticator();

  const redirectTologin = () => {
    const appId = getAppIdFromUrl();
    window.location.href = `${import.meta.env.VITE_LOGIN_BASE_URL}/${appId}?redirect=${encodeURIComponent(window.location.origin)}/apps/${appId}`;
  };

  // Ignore authentication in development as we don't have a cognito setup.
  if (import.meta.env.DEV) {
    return children;
  }

  if (authStatus === 'configuring') {
    return <div>Loading...</div>;
  }

  if (authStatus === 'unauthenticated') {
    redirectTologin();
  }

  return children;
};

export default ProtectedRoute;
