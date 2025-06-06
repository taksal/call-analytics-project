import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);


function CallTrendGraph({ data }) {
  const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

  const labels = sortedData.map(item => new Date(item.date).toLocaleDateString());
  const counts = sortedData.map(item => item.count);

  const chartData = {
    labels,
    datasets: [
      {
        label: 'Calls Over Time',
        data: counts,
        borderColor: '#007bff', // Blue color
        backgroundColor: 'rgba(0, 123, 255, 0.2)',
        fill: true,
        tension: 0.3, // Smooth the line
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
        text: 'Call Trend Over Time',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Date',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Number of Calls',
        },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="chart-container trend-graph">
      <Line data={chartData} options={options} />
    </div>
  );
}

export default CallTrendGraph;