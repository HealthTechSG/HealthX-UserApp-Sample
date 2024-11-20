import { Flex } from 'antd';
import React from 'react';

import { BaseTable } from '@/common/components';
import { useTablePagination, useTableSorting } from '@/common/hooks';
import { useEducationTable } from '@/features/Education/hooks';
import { useGetEducationListQuery } from '@/services/Education/EducationService';

//* FC -------------------------------------------------------------------------
const EducationTable: React.FC = () => {
  //* Table Params -------------------------------------------------------------
  // TODO: Refactor and move most of the logic into the custom hooks.
  const { columns } = useEducationTable();

  //* Table States -------------------------------------------------------------
  /*
  const [searchValue, setSearchValue] = useState<string>();
  const [filterValues, setFilterValues] = useState<Record<string, string>>({
    active: 'true',
  }); */

  const { page, pageSize, setPagination } = useTablePagination();
  const { setTableSorting, sortDirections, sortFields } = useTableSorting();

  //* Query --------------------------------------------------------------------
  const { data, isError, isFetching } = useGetEducationListQuery({
    page,
    pageSize,
    sortFields,
    sortDirections,
    // search: searchValue,
    // ...filterValues,
  });

  //* JSX ----------------------------------------------------------------------
  return (
    <Flex gap="middle" vertical>
      {/*
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
*/}

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
export default EducationTable;
