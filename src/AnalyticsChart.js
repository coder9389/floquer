// src/components/AnalyticsChart.js
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AnalyticsChart = ({ data }) => {
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

  const chartData = aggregatedData.map(({ year, totalJobs, totalSalary }) => ({
    year,
    averageSalary: (totalSalary / totalJobs).toFixed(2),
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="averageSalary" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default AnalyticsChart;
