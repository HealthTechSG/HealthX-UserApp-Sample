//* This file is used to define the environment variables that are required for the application to run.
//* You can customize the schema to fit your needs.

import { defineConfig as defineEnvConfig } from '@julr/vite-plugin-validate-env';
import { z } from 'zod';

// =============================================================================
// ! These are the required environment variables for the application to run.
// ! Only edit them if you know what you are doing.
// =============================================================================
const requiredSchema = {
  VITE_APP_TITLE: z.string().min(1),

  // VITE_BASE_URL is always "/apps" in production mode, to deploy on User Apps platform
  VITE_BASE_URL: z.preprocess((val) => {
    if (process.env.NODE_ENV === 'production') return '/apps';
    return val;
  }, z.string().min(1)),

  VITE_API_FHIR_BASE_URL: z.string().min(1),

  VITE_LOGIN_BASE_URL: z.preprocess((val) => {
    if (process.env.NODE_ENV === 'production') return val;
    return 'REDACTED';
  }, z.string().min(1)),

  VITE_API_BASE_URL: z.preprocess((val) => {
    if (process.env.NODE_ENV === 'production') return val;
    return 'REDACTED';
  }, z.string().min(1)),

  VITE_APP_ID: z.string().min(1),

  // VITE_API_KEY only required in development mode
  VITE_API_KEY: z.preprocess(
    (val) => {
      if (process.env.NODE_ENV === 'development') return val;
      return 'REDACTED';
    },
    z
      .string({
        message: 'Tenant ID is required in development mode',
      })
      .min(1),
  ),

  // VITE_API_TENANT_ID only required in development mode
  VITE_API_TENANT_ID: z.preprocess(
    (val) => {
      if (process.env.NODE_ENV === 'development') return val;
      return 'REDACTED';
    },
    z
      .string({
        message: 'Tenant ID is required in development mode',
      })
      .min(1),
  ),
};

// =============================================================================
// * Define the environment variables configuration below
// =============================================================================
export default defineEnvConfig({
  validator: 'zod',
  schema: {
    ...requiredSchema,
    // More environment variables... (add to your use case)
  },
});
