import type { TableProps } from 'antd';
import { generatePath } from 'react-router-dom';

import { EducationLabels as Labels } from '../constants';
import { ViewManageButton } from '@/common/components';
import { DateUtils } from '@/common/utils';
import { RouteMap } from '@/configs';
import type { Education } from '@/services/Education/EducationTypes';

const { EducationPaths } = RouteMap;

//* Hook -----------------------------------------------------------------------
const useEducationTable = () => {
  //* Table Columns ------------------------------------------------------------
  // Note: FHIR Engine does not support multi-sort.
  // We can enable multi-sort when using FHIR server that supports it.

  /*
  We have to disable sorting for identifier and contact number due to FHIR Nexus sorting bug.
  FHIR Nexus Bug: https://dev.azure.com/IHIS-HIP/SEED%20InnerSource/_workitems/edit/237870

  TODO: Enable it back when FHIR Nexus bug is fixed.
  */

  const columns: TableProps<Education>['columns'] = [
    {
      title: Labels.subject,
      dataIndex: 'subject',
      sorter: true,
    },
    {
      title: Labels.institute,
      dataIndex: 'institute',
      sorter: true,
    },
    {
      title: Labels.study,
      dataIndex: 'study',
      sorter: true,
    },
    {
      title: Labels.graduateDate,
      dataIndex: 'graduateDate',
      render: (text) => DateUtils.formatDate(text),
      sorter: true,
    },
    {
      title: 'Actions',
      key: '_actions',
      fixed: 'right',
      width: 100,
      render: (_text, record) => {
        const href = generatePath(EducationPaths.EducationView, {
          id: record.id,
        });
        return <ViewManageButton href={href} />;
      },
    },
  ];

  //* Return -------------------------------------------------------------------
  return {
    columns,
  };
};

//* Export ---------------------------------------------------------------------
export default useEducationTable;
