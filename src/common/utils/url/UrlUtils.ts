import ApiUtils from '../api/apiUtils';

const UrlUtils = {
  getBaseUrl: () =>
    `${import.meta.env.VITE_BASE_URL}/${import.meta.env.VITE_APP_ID}`,
  getApiUrl: () =>
    `${import.meta.env.VITE_API_BASE_URL}/${ApiUtils.getTenantId()}`,

  /**
   * When using React-Router to generatePath, it will not include the BASE_URL.
   * So when using React-Router to navigate, all works fine.
   *
   * This function will prepend the BASE_URL to the path, so that the link can be used
   * for the href attribute in any anchor tag.
   *
   * Can also be used for static assets when needed.
   */
  generateFullPath: (path: string) => {
    const baseUrl = UrlUtils.getBaseUrl();

    const trimmedBase = baseUrl?.endsWith('/') ? baseUrl.slice(0, -1) : baseUrl;
    const trimmedPath = path.startsWith('/') ? path.slice(1) : path;
    return `${trimmedBase}/${trimmedPath}`;
  },
};

export default UrlUtils;
