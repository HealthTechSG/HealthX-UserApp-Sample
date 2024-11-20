import Cookies from 'js-cookie';

const ApiUtils = {
  getApiKey: () => Cookies.get('apiKey') ?? import.meta.env.VITE_API_KEY,
  getTenantId: () =>
    Cookies.get('tenantId') ?? import.meta.env.VITE_API_TENANT_ID,
};

export default ApiUtils;
