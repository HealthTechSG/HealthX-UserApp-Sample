import { Card, Divider } from 'antd';
import React from 'react';

import { BasePage } from '@/common/components';
import { PROJECT_WIKI_URL } from '@/common/constants';

//* FC -------------------------------------------------------------------------
const HomePage: React.FC = () => (
  <BasePage>
    <Card title="Home Page">
      <div className="[&>p]:mb-2">
        <h3>This is a sample of home page.</h3>
        <p>Here are some placeholder paragraphs of texts.</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <Divider />
        <h3>This project comes with a sample CRUD of Patient records.</h3>
        <p>
          Click on the &quot;Patients&quot; menu to view the list of patients.
        </p>
        <Divider />
        <h3>Custom Resources</h3>
        <p>
          Click on the &quot;Education&quot; menu to try the CRUD of the
          &quot;Education&quot; custom resource.
          <br />
          This custom resource is generated from the{' '}
          <b>FHIR Nexus API Template</b>.
        </p>
        <p>
          Click on the &quot;Custom Inventory&quot; menu to try the CRUD of
          &quot;Custom Inventory&quot; custom resource. <br />
          This custom resource is included in the <b>FHIR Nexus (Demo)</b>{' '}
          project.
        </p>
        <Divider />
        <h3>
          Check out the{' '}
          <a href={PROJECT_WIKI_URL} rel="noreferrer" target="_blank">
            FHIR React App Template Project Wiki
          </a>{' '}
          for more guides and documentations.
        </h3>
      </div>
    </Card>
  </BasePage>
);

//* Export ---------------------------------------------------------------------
export default HomePage;
