import { Flex } from 'antd';
import { get } from 'lodash-es';
import React, { useState } from 'react';

import PatientTableSearchForm from './PatientTableSearchForm';
import { BaseTable, TableCurrentFilterTags } from '@/common/components';
import { useTablePagination, useTableSorting } from '@/common/hooks';
import { PatientLabels } from '@/features/Patient/constants';
import { usePatientTable } from '@/features/Patient/hooks';
import { useGetPatientListQuery } from '@/services/Patient/PatientService';

const { fields: FieldLabel, options: FieldOptions } = PatientLabels;

//* FC -------------------------------------------------------------------------
const PatientTable: React.FC = () => {
  //* Table Params -------------------------------------------------------------
  // TODO: Refactor and move most of the logic into the custom hooks.
  const { columns } = usePatientTable();

  //* Table States -------------------------------------------------------------
  const [searchValue, setSearchValue] = useState<string>();
  const [filterValues, setFilterValues] = useState<Record<string, string>>({
    active: 'true',
  });

  const { page, pageSize, setPagination } = useTablePagination();
  const { setTableSorting, sortDirections, sortFields } = useTableSorting();

  //* Query --------------------------------------------------------------------
  const { data, isError, isFetching } = useGetPatientListQuery({
    page,
    pageSize,
    sortFields,
    sortDirections,
    search: searchValue,
    ...filterValues,
  });

  //* JSX ----------------------------------------------------------------------
  return (
    <Flex gap="middle" vertical>
      <PatientTableSearchForm
        onFilter={(values) => setFilterValues(values)}
        onSearch={(values) => setSearchValue(values)}
      />
      <TableCurrentFilterTags
        filters={{
          Search: searchValue,
          ...filterValues,
        }}
        renderLabel={(key) => get(FieldLabel, key, key)}
        renderValue={(key, value) => {
          const optionLabels = get(FieldOptions, key);
          return get(optionLabels, value, value);
        }}
      />
      <BaseTable
        columns={columns}
        dataSource={data?.entry}
        error={isError}
        loading={isFetching}
        onChange={(page, pageSize, sortFields, sortDirections) => {
          setPagination(page, pageSize);
          setTableSorting(sortFields, sortDirections);
        }}
        totalRowCount={data?.total}
      />
    </Flex>
  );
};

//* Export ---------------------------------------------------------------------
export default PatientTable;
