export const exportToCSV = (data, filename) => {
    const headers = ['Date', 'Task', 'Duration (min)', 'Completed'];
    const csvContent = [
        headers.join(','),
        ...data.map(item => [
            new Date(item.dateTime).toLocaleString(),
            item.task,
            Math.round(item.duration / 60),
            item.completed ? 'Yes' : 'No'
        ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`;
    link.click();
};