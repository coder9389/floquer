// src/components/YearlyDetailsTable.js
import React from 'react';
import { Table } from 'antd';

const YearlyDetailsTable = ({ data, year }) => {
  const filteredData = data.filter(item => item.work_year === year);
  const jobTitleCounts = filteredData.reduce((acc, { job_title }) => {
    if (acc[job_title]) {
      acc[job_title] += 1;
    } else {
      acc[job_title] = 1;
    }
    return acc;
  }, {});

  const tableData = Object.keys(jobTitleCounts).map(job_title => ({
    job_title,
    count: jobTitleCounts[job_title],
  }));

  const columns = [
    {
      title: 'Job Title',
      dataIndex: 'job_title',
      key: 'job_title',
    },
    {
      title: 'Number of Jobs',
      dataIndex: 'count',
      key: 'count',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={tableData}
      rowKey="job_title"
    />
  );
};

export default YearlyDetailsTable;
