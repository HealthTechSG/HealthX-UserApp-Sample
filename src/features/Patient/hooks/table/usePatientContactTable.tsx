import type { TableProps } from 'antd';
import { get } from 'lodash-es';

import { TableSortUtils } from '@/common/utils';
import { PatientNextOfKinLabels } from '@/features/Patient/constants';
import type { Patient } from '@/services/Patient/PatientTypes';

const { StringCompare } = TableSortUtils;

const { fields: FieldLabels, options } = PatientNextOfKinLabels;
const { relationship: RelationshipOptionLabels } = options;

//* Hook -----------------------------------------------------------------------
const usePatientContactTable = () => {
  //* Table Columns --------------------------------------------------------------
  const columns: TableProps<Patient['contactList'][0]>['columns'] = [
    {
      title: FieldLabels.name,
      dataIndex: 'name',
      sorter: { multiple: 1, compare: StringCompare('name') },
    },
    {
      title: FieldLabels.relationship,
      dataIndex: 'relationship',
      sorter: {
        multiple: 2,
        compare: StringCompare('relationship'),
      },
      render: (text) => get(RelationshipOptionLabels, text, text),
    },
    {
      title: FieldLabels.contactNumber,
      dataIndex: 'contactNumber',
      sorter: {
        multiple: 3,
        compare: StringCompare('contactNumber'),
      },
    },
  ];

  //* Return -------------------------------------------------------------------
  return {
    columns,
  };
};

//* Export ---------------------------------------------------------------------
export default usePatientContactTable;
