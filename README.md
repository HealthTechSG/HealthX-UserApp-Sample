# AWS-HXIS User Apps Platform Sample Vite React App

## About

This sample Vite React app serves as a reference for developers working with the AWS-HXIS User Apps Platform. It provides a structured setup to get started with the platform and connects seamlessly with FHIRNexus APIs for both development and production environments.

### Tech Stack Overview

This sample project utilizes the following technologies:

- **[Vite](https://vitejs.dev/)**: A fast build tool and development server for modern web projects.
- **[React](https://reactjs.org/)**: A JavaScript library for building user interfaces.
- **[TypeScript](https://www.typescriptlang.org/)**: A strongly typed programming language that builds on JavaScript.
- **[Tailwind CSS](https://tailwindcss.com/)**: A utility-first CSS framework for rapid UI development.
- **[AWS Amplify (Auth)](https://docs.amplify.aws/lib/auth/getting-started/q/platform/js/)**: Used for authentication.
- **[FHIRClient](https://github.com/smart-on-fhir/client-js)**: A library for interacting with FHIR APIs.
- **[Zod](https://github.com/colinhacks/zod)**: A TypeScript-first schema declaration and validation library.
- **[Ant Design](https://ant.design/)**: A design system for enterprise-level products.
- **[RTK Query](https://redux-toolkit.js.org/rtk-query/overview)**: A data-fetching and caching library for Redux.

These technologies provide a robust and scalable foundation for developing provider-facing applications on the AWS-HXIS User Apps Platform.

### Who should use this?

If your project meets the following criteria, this template is for you:

- Provider-facing app
- FHIR-API backend (FHIRNexus)
- Deployment planned on the AWS-HXIS User Apps Platform

---

## CodeSandbox Demo

To quickly try out the sample app, use the following CodeSandbox link:

[![Edit on CodeSandbox](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/p/github/HealthTechSG/HealthX-UserApp-Sample)

> **Note** - Login to CodeSandbox and make a copy of the .env.developement.sample (Prepopulated with test variables) file and rename it to .env.development.local to run the app in CodeSandbox.

---

## Table of Contents

1. [Getting Started](#1-getting-started)
2. [Project Setup](#2-project-setup)
3. [Environment Configuration](#3-environment-configuration)
4. [TypeScript Environment Validation](#4-typescript-environment-validation)
5. [Authentication](#5-authentication)
6. [Development](#6-development)
7. [Production](#7-production)
8. [Deployment](#8-deployment)
9. [Additional Notes](#9-additional-notes)
10. [License](#10-license)

---

## 1. Getting Started

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v18 or later)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the Repository**

```bash
git clone https://github.com/HealthTechSG/HealthX-UserApp-Sample
cd HealthX-UserApp-Sample
```

2. **Install Dependencies**

Navigate into the project directory and install dependencies:

```bash
npm install
```

---

## 2. Project Setup

This project relies on environment variables for connecting with different endpoints and resources. Configuration files are found within the `env` folder, provided as samples to help you set up local and production environments.

### Folder Structure

The `env` folder includes:

- `.env.production.sample`: Sample environment file for production builds
- `.env.development.sample`: Sample environment file for local development

Copy these files and rename them to `.env.production` and `.env.development` as needed. You can also include `.local` at the end of filenames (e.g., `.env.production.local`, `.env.development.local`) to ensure they are not tracked by version control.

---

## 3. Environment Configuration

Edit the environment variables as follows:

### Local Development (`.env.development`)

```plaintext
# file: env/.env.development.sample

VITE_APP_TITLE='User App (Development)'            # To be replaced with your app title
VITE_BASE_URL="/apps"                              # To be replace with your app base URL, can be any string in development mode
VITE_APP_ID='BFC6D607-FC54-4503-9C83-47B745A7AE97' # To be replaced with your app ID, can be any string in development mode
VITE_API_BASE_URL='https://api.healthx.sg/fhir/r5' # To be replaced with your FHIR server base URL, different versions are supported (e.g. r4b, r5, hsar, ccdp)

# ==============================================================================
# Required for local development to access FHIRNexus APIs
# ==============================================================================
VITE_API_TENANT_ID='d9b51b421b064255b690ba8a4c2c6e42'   # To be replaced with your tenant ID
VITE_API_KEY='NflbXplaii5DZGDAuuczL1ZwE1H6kFuYahRFHMQ5' # To be replaced with your API key
```

**Note**: `VITE_API_TENANT_ID` and `VITE_API_KEY` are essential for local development because localhost cannot access cookies set for the `.healthx.sg` domain. In production mode, after deployment, the app can access cookies post-authentication, allowing it to function without these variables explicitly set.

### Production Build (`.env.production`)

```plaintext
# file: env/.env.production.sample

VITE_APP_TITLE='User App'                          # To be replaced with your app title
VITE_BASE_URL="/apps"                              # To be replace with your app base URL, can only be "/apps" to deploy on User Apps platform
VITE_APP_ID='BFC6D607-FC54-4503-9C83-47B745A7AE97' # To be replaced with your app ID
VITE_API_BASE_URL='https://api.healthx.sg/fhir/r5' # To be replaced with your FHIR server base URL, different versions are supported (e.g. r4b, r5, hsar, ccdp)
```

Ensure you replace placeholder values with your actual app ID, tenant ID, and API key.

---

## 4. TypeScript Environment Validation

The `<root>/src/env.config.ts` file is used to validate and type-check environment variables, ensuring correct configuration for the app. This setup uses `@julr/vite-plugin-validate-env` with `zod` schemas for type safety and validation.

Example of adding a new environment variable:

```typescript
// file: src/env.config.ts

export default defineEnvConfig({
  validator: 'zod',
  schema: {
    ...requiredSchema,
    VITE_NEW_VARIABLE: z.string().min(1), // Replace 'VITE_NEW_VARIABLE' with your variable
  },
});
```

Refer to the [`zod` documentation](https://github.com/colinhacks/zod) for more complex validation schemas.

---

## 5. Authentication

The User Apps Platform uses AWS Cognito for authentication, integrated into this app via Amplify. During local development, authentication can encounter limitations due to restricted access to cookies set on the `.healthx.sg` domain when accessed from `localhost`. This limitation arises because the platform uses a hosted login flow that relies on cookies set on the `.healthx.sg` domain, which is crucial for the Amplify authentication flow in the app.

This project leverages the following AWS Amplify packages for authentication:

- **[`@aws-amplify/ui-react`](https://www.npmjs.com/package/@aws-amplify/ui-react)**: Provides React components and hooks for AWS Amplify authentication.
- **[`aws-amplify`](https://www.npmjs.com/package/aws-amplify)**: The core Amplify library, offering a full suite of tools for authentication, API interactions, and more.

### Using the `useAuthenticator` Hook

The `useAuthenticator` hook from `@aws-amplify/ui-react` simplifies managing authentication state within the React app. This hook provides the current authentication state and user details, making it easy to incorporate authentication-based features.

Here’s an example:

```typescript
import { useAuthenticator } from '@aws-amplify/ui-react';

function App() {
  const { authState, user, signOut } = useAuthenticator((context) => [context.authState, context.user]);

  return (
    <div>
      {authState === 'authenticated' ? (
        <div>
          <h1>Welcome, {user.username}</h1>
          <button onClick={signOut}>Sign Out</button>
        </div>
      ) : (
        <h1>Please sign in</h1>
      )}
    </div>
  );
}

export default App;
```

### Development Workaround

Local development on `localhost` may prevent access to cookies set on the `.healthx.sg` domain, potentially disrupting the Amplify authentication flow. Here are some options to address this:

1. **Create a Local Domain Alias**: Configure a local alias, like `local.healthx.sg`, that points to `localhost`. This allows cookie access from `.healthx.sg` and enables the full authentication flow during development. Setting up this alias is optional and depends on your local setup.

2. **Use a Development Bypass**: As an alternative, you can bypass authentication checks during development. Vite’s `import.meta.env.DEV` flag allows you to conditionally skip certain authentication processes when developing locally, letting you test app features without full authentication.

Example:

```typescript
if (import.meta.env.DEV) {
  // Skip certain auth checks for development purposes
}
```

#### Full Example with Authentication Bypass

```typescript
import React from 'react';
import { useAuthenticator } from '@aws-amplify/ui-react';

function Home({ user }: { user: string }) {
  return (
    <div>
      <h1>Welcome, {user}</h1>
    </div>
  );
}

function App() {
  const { authState, user, signOut } = useAuthenticator((context) => [context.authState, context.user]);

  // In development, bypass authentication for easier testing
  if (import.meta.env.DEV) {
    return <Home user="Unauthenticated" />;
  }

  // Normal authentication flow for production
  if (authState === 'unauthenticated') {
    return <h1>Please sign in</h1>;
  }

  return <Home user={user.username} />;
}

export default App;
```

This setup enables you to develop and test app features locally without requiring full authentication, while ensuring that the standard authentication process remains intact for production.

---

## 6. Development

### Running the Development Server

To start the development server:

```bash
npm run dev
```

This will launch the app in development mode with hot reloading.

---

## 7. Production

### Building for Production

To build the application for production:

```bash
npm run build
```

This will generate an optimized bundle for production.

### Preview the Production Build

```bash
npm run preview
```

---

## 8. Deployment

To deploy to the User Apps Platform:

1. **Build the Application for Production**

```bash
npm run build
```

2. **Prepare for Upload**

Zip the contents of the `dist` folder:

```bash
zip -r dist.zip dist
```

3. **Upload to the User Apps Platform**

Log in to the [User Apps Platform](https://developer.healthx.sg/userapps) and upload the `dist.zip` file.

---

## 9. Additional Notes

- This sample app accesses FHIRNexus APIs. Ensure environment variables are correctly set.
- For any issues or contributions, please open an issue or pull request.

---

## 10. License

This project is licensed under [Your License].
