import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CompletedSessionsChart = ({ sessions }) => {
    const data = {
        labels: sessions.map(session => new Date(session.startTime).toLocaleDateString()),
        datasets: [
            {
                label: 'Completed Sessions',
                data: sessions.map((_, index) => index + 1),
                fill: false,
                backgroundColor: 'rgba(75,192,192,0.4)',
                borderColor: 'rgba(75,192,192,1)',
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Completed Sessions Over Time',
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default CompletedSessionsChart;