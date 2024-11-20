import { Flex } from 'antd';
import React, { useState } from 'react';

import PatientTableFilterFormModal from './PatientTableFilterFormModal';
import { FilterButton, TableSearchForm } from '@/common/components';

//* Props ----------------------------------------------------------------------
interface PatientTableSearchFormProps {
  onSearch?: (searchValue: string) => void;
  onFilter?: (filterValues: Record<string, string>) => void;
}

//* FC -------------------------------------------------------------------------
const PatientTableSearchForm: React.FC<PatientTableSearchFormProps> = ({
  onFilter = () => {},
  onSearch = () => {},
}) => {
  const [filterFormOpen, setFilterFormOpen] = useState<boolean>(false);
  const [filterValues, setFilterValues] = useState<Record<string, string>>();

  //* Handlers -----------------------------------------------------------------
  const onFilterModalSubmitted = (values: Record<string, string>) => {
    setFilterValues(values);
    setFilterFormOpen(false);
    onFilter(values);
  };

  //* JSX ----------------------------------------------------------------------
  return (
    <Flex gap="small">
      <TableSearchForm
        onSearch={onSearch}
        placeholder="Search by MRN, Name, or Contact Number"
      />
      <>
        <FilterButton onClick={() => setFilterFormOpen(true)}>
          Advanced Search
        </FilterButton>
        <PatientTableFilterFormModal
          filterValues={filterValues || {}}
          onCancel={() => setFilterFormOpen(false)}
          onSubmit={onFilterModalSubmitted}
          open={filterFormOpen}
        />
      </>
    </Flex>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientTableSearchForm;
