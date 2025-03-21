import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CompletedSessionsChart = ({ sessions, view }) => {
    // Group sessions based on the selected view
    const groupSessionsByView = (sessions, view) => {
        const grouped = {};
        sessions.forEach((session) => {
            const date = new Date(session.startTime);
            let key;
            if (view === 'daily') {
                key = date.toLocaleDateString(); // Group by day
            } else if (view === 'weekly') {
                const weekStart = new Date(date.setDate(date.getDate() - date.getDay())); // Start of the week
                key = weekStart.toLocaleDateString();
            } else if (view === 'monthly') {
                key = `${date.getMonth() + 1}/${date.getFullYear()}`; // Group by month
            }
            grouped[key] = (grouped[key] || 0) + 1;
        });
        return grouped;
    };

    const groupedSessions = groupSessionsByView(sessions, view);
    const labels = Object.keys(groupedSessions);
    const dataPoints = Object.values(groupedSessions);

    const data = {
        labels,
        datasets: [
            {
                label: `Sessions (${view})`,
                data: dataPoints,
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
                text: `Completed Sessions (${view})`,
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default CompletedSessionsChart;