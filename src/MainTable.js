// src/components/MainTable.js
import React, { useState } from 'react';
import { Table } from 'antd';

const MainTable = ({ data, onRowClick }) => {
  const [sortedInfo, setSortedInfo] = useState({});

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
  };

  const aggregatedData = data.reduce((acc, { work_year, salary_in_usd }) => {
    const existingYear = acc.find(item => item.year === work_year);
    if (existingYear) {
      existingYear.totalJobs += 1;
      existingYear.totalSalary += salary_in_usd;
    } else {
      acc.push({ year: work_year, totalJobs: 1, totalSalary: salary_in_usd });
    }
    return acc;
  }, []);

  const columns = [
    {
      title: 'Year',
      dataIndex: 'year',
      key: 'year',
      sorter: (a, b) => a.year - b.year,
      sortOrder: sortedInfo.columnKey === 'year' && sortedInfo.order,
    },
    {
      title: 'Total Jobs',
      dataIndex: 'totalJobs',
      key: 'totalJobs',
      sorter: (a, b) => a.totalJobs - b.totalJobs,
      sortOrder: sortedInfo.columnKey === 'totalJobs' && sortedInfo.order,
    },
    {
      title: 'Average Salary (USD)',
      dataIndex: 'averageSalary',
      key: 'averageSalary',
      render: (text, record) => (record.totalSalary / record.totalJobs).toFixed(2),
      sorter: (a, b) => (a.totalSalary / a.totalJobs) - (b.totalSalary / b.totalJobs),
      sortOrder: sortedInfo.columnKey === 'averageSalary' && sortedInfo.order,
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={aggregatedData}
      onChange={handleChange}
      rowKey="year"
      onRow={(record) => ({
        onClick: () => onRowClick(record.year),
      })}
    />
  );
};

export default MainTable;
