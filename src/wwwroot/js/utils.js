import { api } from './constants.js'
// id, title, genre, director, runtime, score, description, actors, createdDate, isAvailable
function createTableVideos(videos, container, headers) {
    if (videos === null) {
        return;
    }
    console.log(videos);
    const table = document.createElement('table');
    const tableAttr = document.createAttribute('class');
    tableAttr.value = 'fl-table';
    table.setAttributeNode(tableAttr);

    const tableHead = document.createElement('thead');
    const trHead = document.createElement('tr');
    for (let i = 0; i < headers.length; i++) {
        const header = document.createElement('th');
        const headerAttr = document.createAttribute('class');
        headerAttr.value = 'headers';
        header.setAttributeNode(headerAttr);
        const headerText = document.createTextNode(headers[i]);
        header.appendChild(headerText);
        trHead.appendChild(header);
    }
    actionHeader(trHead);
    tableHead.appendChild(trHead);

    const tableBody = document.createElement('tbody');
    for (let i = 0; i < videos.length; i++) {
        const row = document.createElement('tr');
        row.appendChild(createRow(videos[i].id));
        row.appendChild(createRow(videos[i].title));
        row.appendChild(createRow(videos[i].genre));
        row.appendChild(createRow(videos[i].director));
        row.appendChild(createRow(videos[i].runtime));
        row.appendChild(createRow(videos[i].score));
        row.appendChild(createRow(videos[i].description));
        row.appendChild(createRow(videos[i].actors));
        row.appendChild(createRow(videos[i].createdDate));
        row.appendChild(createRow(videos[i].isAvailable));
        row.appendChild(actionRow());
        tableBody.appendChild(row);
    }
    table.appendChild(tableHead);
    table.appendChild(tableBody);
    container.appendChild(table);
    return container;
}

//id, userId, firstName, lastnName, Videos
function createTableVideoRentals(videoRentals, container, headers) {
    if (videoRentals === null) {
        return;
    }
    console.log(videoRentals);
    const table = document.createElement('table');
    const tableAttr = document.createAttribute('class');
    tableAttr.value = 'fl-table';
    table.setAttributeNode(tableAttr);

    const tableHead = document.createElement('thead');
    const trHead = document.createElement('tr');
    for (let i = 0; i < headers.length; i++) {
        const header = document.createElement('th');
        const headerAttr = document.createAttribute('class');
        headerAttr.value = 'headers';
        header.setAttributeNode(headerAttr);
        const headerText = document.createTextNode(headers[i]);
        header.appendChild(headerText);
        trHead.appendChild(header);
    }
    actionHeader(trHead);
    tableHead.appendChild(trHead);

    const tableBody = document.createElement('tbody');
    for (let i = 0; i < videoRentals.length; i++) {
        const row = document.createElement('tr');
        row.appendChild(createRow(videoRentals[i].id));
        row.appendChild(createRow(videoRentals[i].userId));
        row.appendChild(createRow(videoRentals[i].firstName));
        row.appendChild(createRow(videoRentals[i].lastName));
        row.appendChild(createRow(videoRentals[i].videos));
        row.appendChild(actionRow());
        tableBody.appendChild(row);
    }
    table.appendChild(tableHead);
    table.appendChild(tableBody);
    container.appendChild(table);
    return container;
}

const objectProperties = function (obj) {
    let arr = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push(prop);
        }
    }
    return arr;
};

const createRow = function (element) {
    const td = document.createElement('td');
    const tdAttr = document.createAttribute('class');
    tdAttr.value = 'cell';
    td.setAttributeNode(tdAttr);
    const tdText = document.createTextNode(element);
    td.appendChild(tdText);
    return td;
}

const actionRow = function(){
    const div = document.createElement('div');
    const divAttr = document.createAttribute('class');
    divAttr.value = 'action-row';
    div.setAttributeNode(divAttr);

    const buttonDelete = document.createElement('a');
    const buttonDeleteAttr = document.createAttribute('id');
    const buttonDeleteAttrClass = document.createAttribute('class');
    buttonDeleteAttrClass.value = 'button-row';
    buttonDelete.setAttributeNode(buttonDeleteAttrClass);
    buttonDeleteAttr.value = 'delete-row-button';
    buttonDelete.setAttributeNode(buttonDeleteAttr);
    buttonDelete.textContent = 'Delete';

    const buttonUpdate = document.createElement('a');
    const buttonUpdateAttr = document.createAttribute("id");
    const buttonUpdateAttrClass = document.createAttribute('class');
    buttonUpdateAttrClass.value = 'button-row';
    buttonUpdate.setAttributeNode(buttonUpdateAttrClass);
    buttonUpdateAttr.value = 'update-row-button';
    buttonUpdate.setAttributeNode(buttonUpdateAttr);
    buttonUpdate.textContent = 'Update';

    div.appendChild(buttonDelete);
    div.appendChild(buttonUpdate);
    return div;
}


const actionHeader = function(trHead){
    const header = document.createElement('th');
    const headerAttr = document.createAttribute('class');
    headerAttr.value = 'headers';
    header.setAttributeNode(headerAttr);
    const headerText = document.createTextNode('action');
    header.appendChild(headerText);
    trHead.appendChild(header);
}

const clearContent = function(element){
    element.innerHTML = "";
}

export {
    createTableVideos,
    objectProperties,
    clearContent,
    createTableVideoRentals
}