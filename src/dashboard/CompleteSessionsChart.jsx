import React from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { Button } from '@mui/material'; // Or your preferred UI library

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const CompletedSessionsChart = ({ sessions, view }) => {
    // Group sessions based on the selected view
    const groupSessionsByView = (sessions, view) => {
        const grouped = {};
        sessions.forEach((session) => {
            const date = new Date(session.startTime || session.dateTime); // Handle both properties
            let key;
            if (view === 'daily') {
                key = date.toLocaleDateString(); // Group by day
            } else if (view === 'weekly') {
                const weekStart = new Date(date.setDate(date.getDate() - date.getDay())); // Start of the week
                key = weekStart.toLocaleDateString();
            } else if (view === 'monthly') {
                key = `${date.getMonth() + 1}/${date.getFullYear()}`; // Group by month
            } else if (view === 'yearly') {
                key = date.getFullYear().toString(); // Group by year
            }
            grouped[key] = (grouped[key] || 0) + 1;
        });
        return grouped;
    };
    // Group sessions based on the selected view

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
// Set up chart options
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
// Handle CSV download
    const handleDownloadChartData = () => {
        // Prepare CSV content
        const csvContent = [
            ['Date', 'Sessions'],
            ...labels.map((label, index) => [label, dataPoints[index]])
        ].map(e => e.join(',')).join('\n');

        // Create download link
        const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `sessions_${view}_data.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <div>
            <Line data={data} options={options} />
            <Button 
                variant="contained" 
                onClick={handleDownloadChartData}
                style={{ marginTop: '20px' }}
            >
                Download {view} Data as CSV
            </Button>
        </div>
    );
};

export default CompletedSessionsChart;