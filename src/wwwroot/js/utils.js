function createTableVideos(videos, container) {
    if (videos === null) {
        return;
    }

    const table = document.createElement('table');
    const tableAttr = document.createAttribute('class');
    tableAttr.value = 'fl-table';
    table.setAttributeNode(tableAttr);
    const tableBody = document.createElement('tbody');


    for (let i = 0; i < 2; i++) {
        const row = document.createElement('tr');

        for (let j = 0; j < 2; j++) {
            const cell = document.createElement('td');
            const cellText = document.createTextNode(`cell in row${i}, column${j}`);
            cell.appendChild(cellText);
            row.appendChild(cell);
        }
        tableBody.appendChild(row);
    }
    table.appendChild(tableBody);
    container.appendChild(table);
    return container;
}

export {
    createTableVideos
}