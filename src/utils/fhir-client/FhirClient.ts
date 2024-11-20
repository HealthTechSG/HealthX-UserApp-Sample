/**
 * A wrapper around the FHIR client to make it easier for use.
 * This util convert the request and response to make it compatible with the Smart on FHIR client.
 */
import type {
  SearchResourceProps,
  SearchResourceResult,
  GetResourceByIdProps,
} from './FhirClientTypes';
import { Bundle, Resource } from 'fhir/r5';
import FHIR from 'fhirclient';
import { isEmpty } from 'lodash-es';
import queryString from 'query-string';

import ApiUtils from '@/common/utils/api/apiUtils';

const API_KEY = ApiUtils.getApiKey();
const API_KEY_REQ_HEADER = { 'X-Api-Key': API_KEY };

//* Util -----------------------------------------------------------------------
const FhirClient = (serverUrl: string) => {
  const client = FHIR.client({ serverUrl });

  //* Resource Search ----------------------------------------------------------
  const searchResource = async <T = Resource>({
    filters = {},
    page,
    pageSize,
    resourceType,
    resultFields = [],
    sortFields = [],
  }: SearchResourceProps) => {
    const fetchProps = {
      url: `${resourceType}/_search`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        ...API_KEY_REQ_HEADER,
      },
      body: queryString.stringify({
        ...(pageSize && { _count: pageSize }),
        ...(page && pageSize && { _skip: page * pageSize }),
        ...filters,
        ...(!isEmpty(sortFields) && { _sort: sortFields.join(',') }),
        ...(!isEmpty(resultFields) && { _elements: resultFields.join(',') }),
        _total: 'accurate',
      }),
    };

    const fhirResponse = await client.request<Bundle<T>>(fetchProps);

    return {
      entry: fhirResponse.entry?.map((entry) => entry.resource) as T[],
      total: fhirResponse.total,
    } as SearchResourceResult<T>;
  };

  //* Get Resource by ID ----------------------------------------------------------------------
  const getResourceById = async <T = Resource>({
    resolveReferences,
    resourceId,
    resourceType,
  }: GetResourceByIdProps): Promise<T> => {
    const requestUrl = `${resourceType}/${resourceId}`;

    const fetchProps = {
      url: requestUrl,
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        ...API_KEY_REQ_HEADER,
      },
    };

    const response = await client.request(fetchProps, {
      resolveReferences: resolveReferences as string[],
    });

    return response;
  };

  //* Resource Create ----------------------------------------------------------
  const createResource = async <T = Resource>(
    resourceBody: Partial<T>,
  ): Promise<T> => {
    const reqOptions = { headers: { ...API_KEY_REQ_HEADER } };
    return client.create<T>(resourceBody, reqOptions);
  };

  //* Resource Update ----------------------------------------------------------
  const updateResource = async <T = Resource>(
    resourceBody: Partial<T>,
  ): Promise<T> => {
    const reqOptions = { headers: { ...API_KEY_REQ_HEADER } };
    return client.update<T>(resourceBody, reqOptions);
  };

  //* Resource Delete ----------------------------------------------------------
  const deleteResource = async (
    resourceType: string,
    resourceId: string,
  ): Promise<void> => {
    const requestUrl = `${resourceType}/${resourceId}`;
    const reqOptions = { headers: { ...API_KEY_REQ_HEADER } };
    return client.delete(requestUrl, reqOptions);
  };

  //* Transaction - Bundle -----------------------------------------------------
  const postBundleRequest = async (bundle: Bundle) => {
    const requestProps = {
      url: '', // Bundle batch or transaction is POST to baseUrl.
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        ...API_KEY_REQ_HEADER,
      },
      body: JSON.stringify(bundle),
    };

    return client.request(requestProps);
  };

  // Return --------------------------------------------------------------------
  return {
    searchResource,
    createResource,
    getResourceById,
    updateResource,
    deleteResource,
    postBundleRequest,
  };
};

//* Export ---------------------------------------------------------------------
export default FhirClient;
