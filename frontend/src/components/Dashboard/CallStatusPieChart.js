import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);


function CallStatusPieChart({ data }) {
  if (!data) return null;

  const chartData = {
    labels: ['Answered Calls', 'Failed Calls' ,'Transferd Calls'],
    datasets: [
      {
        data: [data.answered_calls, data.failed_calls, data.Transferd_Calls],
        backgroundColor: ['#4CAF50', '#F44336', 'F44356'], // Green for answered, Red for failed
        borderColor: ['#fff', '#fff'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Call Status Distribution',
      },
    },
  };

  return (
    <div className="chart-container pie-chart">
      <Pie data={chartData} options={options} />
    </div>
  );
}

export default CallStatusPieChart;