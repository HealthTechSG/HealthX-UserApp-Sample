/* eslint-disable import/first */
/* eslint-disable import/order */
/* Disable ESLint for this file, so we can group the imports in a nicer way */
//* ----------------------------------------------------------------------------
import { useEffect, useState } from 'react';

//* App Providers --------------------------------------------------------------
import ReduxProvider from './providers/ReduxProvider';
import AntdProvider from './providers/AntdProvider';
import RouterProvider from './providers/RouterProvider';

//* Styling --------------------------------------------------------------------
import '@/configs/theme/SynapxeTheme.css';
import '@/configs/theme/AntdTheme.css';

//* Localization ---------------------------------------------------------------
import { i18n } from '../i18n';
import { onChangeDocumentLanguage } from '../utils/language';
import { Authenticator } from '@aws-amplify/ui-react';
import { getAppIdFromUrl } from '@/utils/getAppIdFromUrl';
import { getCognitoConfig } from '@/services/Authentication/getCognitoConfig';
import { Amplify } from 'aws-amplify';
import { cognitoUserPoolsTokenProvider } from 'aws-amplify/auth/cognito';
import { cookieStorage } from '@/services/Authentication/cookieStorage';

//* ----------------------------------------------------------------------------
//* The App FC
//* ----------------------------------------------------------------------------
const App = () => {
  const [cognito, setCognito] = useState<{
    status: 'loading' | 'success' | 'error';
    error?: Error;
  }>({
    status: 'loading',
    error: undefined,
  });

  // i18n setup
  useEffect(() => {
    onChangeDocumentLanguage(i18n.language);
  }, []);

  // Cognito setup
  useEffect(() => {
    const initCognito = async () => {
      try {
        // 1) Get appId from URL
        const appId = getAppIdFromUrl();
        if (!appId) {
          throw new Error('App ID not found in URL');
        }

        // Step 2: Fetch Cognito configuration
        const cognitoConfig = await getCognitoConfig(appId);

        // Step 3: Configure Amplify
        Amplify.configure({
          Auth: {
            Cognito: {
              userPoolId: cognitoConfig.userPoolId,
              userPoolClientId: cognitoConfig.userPoolClientId,
            },
          },
        });

        // Step 4. Configure the token provider
        cognitoUserPoolsTokenProvider.setKeyValueStorage(cookieStorage);

        setCognito({ status: 'success' });
      } catch (error) {
        console.error('Error initializing Cognito:', error);
        setCognito({
          status: 'error',
          error: error instanceof Error ? error : new Error('Unknown error'),
        });
      }
    };

    if (!import.meta.env.DEV) initCognito();
  }, []);

  if (!import.meta.env.DEV && cognito.status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!import.meta.env.DEV && cognito.status === 'error') {
    return <div>Error initializing Cognito: {cognito.error?.message}</div>;
  }

  //* JSX ----------------------------------------------------------------------
  return (
    <Authenticator.Provider>
      <ReduxProvider>
        <AntdProvider>
          <RouterProvider />
        </AntdProvider>
      </ReduxProvider>
    </Authenticator.Provider>
  );
};

//* Export ---------------------------------------------------------------------
export default App;
