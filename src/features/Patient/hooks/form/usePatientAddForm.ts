// import dayjs from 'dayjs';
// import { isEmpty } from 'lodash-es';
import { useState } from 'react';

import { useCreatePatientMutation } from '@/services/Patient/PatientService';
// import type { CreatePatientRequest } from '@/services/Patient/PatientTypes';

//* Hook -----------------------------------------------------------------------
const usePatientAddForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  // const [createPatientBundle] = useCreatePatientMutation();
  const [createPatientResource] = useCreatePatientMutation();

  //* Handle Submit ------------------------------------------------------------
  const handleSubmit = async (values: any) => {
    setIsLoading(true);

    // Trigger mutation
    const { data, error } = await createPatientResource({
      ...values,
      active: !values?.isInactive,
    });

    setIsLoading(false);

    if (error) {
      return Promise.reject(error);
    }

    return data!.id;
  };

  //* Return -------------------------------------------------------------------
  return {
    handleSubmit,
    isLoading,
  };
};

//* Export ---------------------------------------------------------------------
export default usePatientAddForm;
