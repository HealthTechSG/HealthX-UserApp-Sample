/**
 * Map of FeatureName > RouteName > RoutePath
 */
const RouteMap = {
  RootPath: '/',

  //* Login --------------------------------------------------------------------
  AuthPaths: {
    Login: '/login/:appid',
  },

  //* Patient CRUD -------------------------------------------------------------
  PatientPaths: {
    PatientList: '/patient',
    PatientCreate: '/patient/new',
    PatientEdit: '/patient/edit/:id',

    //* Patient Detail Tabs
    PatientDetail: '/patient/detail/:id',

    // Patient Allergy
    PatientAllergyList: '/patient/detail/:id/allergy',
    PatientAllergyAdd: '/patient/detail/:id/allergy/new',
    PatientAllergyEdit: '/patient/detail/:id/allergy/edit/:referenceId',

    // Patient Next of kin
    PatientNextOfKinList: '/patient/detail/:id/next-of-kin',
    PatientNextOfKinAdd: '/patient/detail/:id/next-of-kin/new',
    PatientNextOfKinEdit: '/patient/detail/:id/next-of-kin/edit/:referenceId',

    // Patient Immunization
    PatientImmunizationList: '/patient/detail/:id/immunization',
    PatientImmunizationAdd: '/patient/detail/:id/immunization/new',
    PatientImmunizationEdit:
      '/patient/detail/:id/immunization/edit/:referenceId',

    // Patient Remarks
    PatientRemarksList: '/patient/detail/:id/remarks',
    PatientRemarksAdd: '/patient/detail/:id/remarks/new',
    PatientRemarksEdit: '/patient/detail/:id/remarks/edit/:referenceId',
  },

  //* Education CRUD -----------------------------------------------------------
  EducationPaths: {
    EducationList: '/education',
    EducationCreate: '/education/new',
    EducationView: '/education/view/:id',
    EducationEdit: '/education/edit/:id',
  },

  //* Custom Inventory CRUD ----------------------------------------------------
  CustomInventoryPaths: {
    CustomInventoryList: '/custom-inventory',
    CustomInventoryCreate: '/custom-inventory/new',
    CustomInventoryView: '/custom-inventory/view/:id',
    CustomInventoryEdit: '/custom-inventory/edit/:id',
  },

  //* --------------------------------------------------------------------------
};

export default RouteMap;
