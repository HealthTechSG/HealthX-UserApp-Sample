import {
  PatientListPage,
  PatientAddPage,
  PatientEditPage,
  PatientDetailTabbedPage,
  PatientDetailBasePage,
  PatientAllergyAddPageContent,
  PatientImmunizationAddPageContent,
  PatientAllergyEditPageContent,
  PatientNextOfKinAddPageContent,
  PatientNextOfKinEditPageContent,
  PatientRemarksAddPageContent,
  PatientRemarksEditPageContent,
  PatientImmunizationEditPageContent,
} from '../components';
import ProtectedRoute from '@/common/components/ProtectedRoute';
import { BasePageRouteObject } from '@/common/types';
import { RouteMap } from '@/configs';

const { PatientPaths } = RouteMap;

//* The Const ------------------------------------------------------------------
const PatientRoutes: BasePageRouteObject[] = [
  {
    path: PatientPaths.PatientList,
    element: (
      <ProtectedRoute>
        <PatientListPage />
      </ProtectedRoute>
    ),
    handle: {
      pageTitle: 'Patient List',
      breadcrumbs: [{ title: 'Patient List' }],
    },
  },
  {
    path: PatientPaths.PatientCreate,
    element: <PatientAddPage />,
    handle: {
      pageTitle: 'Register New Patient',
      breadcrumbs: [
        { title: 'Patient List', path: PatientPaths.PatientList },
        { title: 'Register New Patient' },
      ],
    },
  },
  {
    path: PatientPaths.PatientEdit,
    element: <PatientEditPage />,
    handle: {
      pageTitle: 'Edit Patient Info',
      breadcrumbs: [
        { title: 'Patient List', path: PatientPaths.PatientList },
        {
          key: 'patientDetails',
          title: 'Patient Details',
          path: PatientPaths.PatientDetail,
        },
        { title: 'Edit Patient Info' },
      ],
    },
  },

  //* Patient Details ----------------------------------------------------------
  {
    path: PatientPaths.PatientDetail,
    element: <PatientDetailTabbedPage activeTab="profile" />,
    handle: {
      pageTitle: 'Patient Details',
      breadcrumbs: [
        { title: 'Patient List', path: PatientPaths.PatientList },
        { key: 'patientDetails', title: 'Patient Details' },
      ],
    },
  },

  // Patient Allergy
  {
    path: PatientPaths.PatientAllergyList,
    element: <PatientDetailTabbedPage activeTab="allergy" />,
    handle: {
      pageTitle: 'Patient Details',
      breadcrumbs: [
        { title: 'Patient List', path: PatientPaths.PatientList },
        { key: 'patientDetails', title: 'Patient Details' },
      ],
    },
  },
  {
    path: PatientPaths.PatientAllergyAdd,
    element: (
      <PatientDetailBasePage>
        <PatientAllergyAddPageContent />
      </PatientDetailBasePage>
    ),
    handle: {
      pageTitle: 'Add Patient Allergy',
      breadcrumbs: [
        { title: 'Patient List', path: PatientPaths.PatientList },
        {
          key: 'patientDetails',
          title: 'Patient Details',
          path: PatientPaths.PatientAllergyList,
        },
        { title: 'Add Patient Allergy' },
      ],
    },
  },
  {
    path: PatientPaths.PatientAllergyEdit,
    element: (
      <PatientDetailBasePage>
        <PatientAllergyEditPageContent />
      </PatientDetailBasePage>
    ),
    handle: {
      pageTitle: 'Edit Patient Allergy',
      breadcrumbs: [
        { title: 'Patient List', path: PatientPaths.PatientList },
        {
          key: 'patientDetails',
          title: 'Patient Details',
          path: PatientPaths.PatientAllergyList,
        },
        { title: 'Edit Patient Allergy' },
      ],
    },
  },

  // Patient Next of kin
  {
    path: PatientPaths.PatientNextOfKinList,
    element: <PatientDetailTabbedPage activeTab="nextOfKin" />,
    handle: {
      pageTitle: 'Patient Details',
      breadcrumbs: [
        { title: 'Patient List', path: PatientPaths.PatientList },
        { key: 'patientDetails', title: 'Patient Details' },
      ],
    },
  },
  {
    path: PatientPaths.PatientNextOfKinAdd,
    element: (
      <PatientDetailBasePage>
        <PatientNextOfKinAddPageContent />
      </PatientDetailBasePage>
    ),
    handle: {
      pageTitle: 'Add Patient Next-of-Kin',
      breadcrumbs: [
        { title: 'Patient List', path: PatientPaths.PatientAllergyList },
        {
          key: 'patientDetails',
          title: 'Patient Details',
          path: PatientPaths.PatientNextOfKinList,
        },
        { title: 'Add Patient Next-of-Kin' },
      ],
    },
  },
  {
    path: PatientPaths.PatientNextOfKinEdit,
    element: (
      <PatientDetailBasePage>
        <PatientNextOfKinEditPageContent />
      </PatientDetailBasePage>
    ),
    handle: {
      pageTitle: 'Edit Patient Next-of-Kin',
      breadcrumbs: [
        { title: 'Patient List', path: PatientPaths.PatientAllergyList },
        {
          key: 'patientDetails',
          title: 'Patient Details',
          path: PatientPaths.PatientNextOfKinList,
        },
        { title: 'Edit Patient Next-of-Kin' },
      ],
    },
  },

  // Patient Immunization
  {
    path: PatientPaths.PatientImmunizationList,
    element: <PatientDetailTabbedPage activeTab="immunization" />,
    handle: {
      pageTitle: 'Patient Details',
      breadcrumbs: [
        { title: 'Patient List', path: PatientPaths.PatientList },
        { key: 'patientDetails', title: 'Patient Details' },
      ],
    },
  },
  {
    path: PatientPaths.PatientImmunizationAdd,
    element: (
      <PatientDetailBasePage>
        <PatientImmunizationAddPageContent />
      </PatientDetailBasePage>
    ),
    handle: {
      pageTitle: 'Add Patient Immunization',
      breadcrumbs: [
        { title: 'Patient List', path: PatientPaths.PatientList },
        {
          key: 'patientDetails',
          title: 'Patient Details',
          path: PatientPaths.PatientImmunizationList,
        },
        { title: 'Add Patient Immunization' },
      ],
    },
  },
  {
    path: PatientPaths.PatientImmunizationEdit,
    element: (
      <PatientDetailBasePage>
        <PatientImmunizationEditPageContent />
      </PatientDetailBasePage>
    ),
    handle: {
      pageTitle: 'Edit Patient Immunization',
      breadcrumbs: [
        { title: 'Patient List', path: PatientPaths.PatientList },
        {
          key: 'patientDetails',
          title: 'Patient Details',
          path: PatientPaths.PatientImmunizationList,
        },
        { title: 'Edit Patient Immunization' },
      ],
    },
  },

  // Patient remarks
  {
    path: PatientPaths.PatientRemarksList,
    element: <PatientDetailTabbedPage activeTab="remarks" />,
    handle: {
      pageTitle: 'Patient Details',
      breadcrumbs: [
        { title: 'Patient List', path: PatientPaths.PatientList },
        { key: 'patientDetails', title: 'Patient Details' },
      ],
    },
  },
  {
    path: PatientPaths.PatientRemarksAdd,
    element: (
      <PatientDetailBasePage>
        <PatientRemarksAddPageContent />
      </PatientDetailBasePage>
    ),
    handle: {
      pageTitle: 'Add Patient Remarks',
      breadcrumbs: [
        { title: 'Patient List', path: PatientPaths.PatientList },
        {
          key: 'patientDetails',
          title: 'Patient Details',
          path: PatientPaths.PatientRemarksList,
        },
        { title: 'Add Patient Remarks' },
      ],
    },
  },
  {
    path: PatientPaths.PatientRemarksEdit,
    element: (
      <PatientDetailBasePage>
        <PatientRemarksEditPageContent />
      </PatientDetailBasePage>
    ),
    handle: {
      pageTitle: 'Edit Patient Remarks',
      breadcrumbs: [
        { title: 'Patient List', path: PatientPaths.PatientList },
        {
          key: 'patientDetails',
          title: 'Patient Details',
          path: PatientPaths.PatientRemarksList,
        },
        { title: 'Edit Patient Remarks' },
      ],
    },
  },
];

//* Export ---------------------------------------------------------------------
export default PatientRoutes;
