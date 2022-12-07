import { propertyNameVideo, propertyNameVideoRental, propertyNameVideoRentalList, context} from './constants.js'

function createNewVideoInputForm(container){
    const div = document.createElement('div');
    const divAttr = document.createAttribute('id');
    divAttr.value = 'new-video-container';
    div.setAttributeNode(divAttr);
    //TODO: 4 inputy

    const header = document.createElement('h3');
    const headerAttr = document.createAttribute('id');
    headerAttr.value = 'header-new-video';
    header.setAttributeNode(headerAttr);
    header.textContent = 'Add new video';

    const titleInput = document.createElement('input');
    const titleInputAttr = document.createAttribute('id');
    titleInputAttr.value = 'title';
    titleInput.placeholder = "Title";
    titleInput.setAttributeNode(titleInputAttr);

    const genreLabel = document.createElement('label');
    genreLabel.htmlFor = ''

    const genreSelect = document.createElement('select');
    const genreSelectAttr = document.createAttribute('id');
    genreSelectAttr.value = 'genre';
    genreSelect.setAttributeNode(genreSelectAttr);




    const directorInput = document.createElement('input');
    const directorInputAttr = document.createAttribute('id');
    directorInputAttr.value = 'director';
    directorInput.placeholder = "Dirctor";
    directorInput.setAttributeNode(directorInputAttr);

    const contactInput = document.createElement('input');
    const contactInputAttr = document.createAttribute('id');
    contactInputAttr.value = 'contact';
    contactInput.placeholder = "Contact";
    contactInput.setAttributeNode(contactInputAttr);

    const addButton = document.createElement('button');
    const addButtonAttr = document.createAttribute('class');
    const addButtonAttrId = document.createAttribute('id');
    addButtonAttrId.value = 'add-new-video-button-in-container';
    addButton.setAttributeNode(addButtonAttrId);
    addButtonAttr.value = 'button-9';
    addButton.setAttributeNode(addButtonAttr);
    addButton.textContent = 'Add';

    const resetButton = document.createElement('button');
    const resetButtonAttr = document.createAttribute('class');
    const resetButtonAttrId = document.createAttribute('id');
    resetButtonAttrId.value = 'reset-new-video-button-in-container';
    resetButton.setAttributeNode(resetButtonAttrId);
    resetButtonAttr.value = 'button-9';
    resetButton.setAttributeNode(resetButtonAttr);
    resetButton.textContent = 'Reset';

    const divButtons = document.createElement('div');
    const divButtonAttr = document.createAttribute('id');
    divButtonAttr.value = 'buttons-new-video-container';
    divButtons.setAttributeNode(divButtonAttr);

    divButtons.appendChild(addButton);
    divButtons.appendChild(resetButton);

    div.append(header);
    div.appendChild(titleInput);
    div.appendChild(genreLabel);
    div.appendChild(directorInput);
    div.appendChild(contactInput);
    div.appendChild(divButtons);
    container.appendChild(div);
    return container;
}

function createNewUserInputForm(container){
    const div = document.createElement('div');
    const divAttr = document.createAttribute('id');
    divAttr.value = 'new-user-container';
    div.setAttributeNode(divAttr);
    //TODO: 4 inputy

    const header = document.createElement('h3');
    const headerAttr = document.createAttribute('id');
    headerAttr.value = 'header-new-user';
    header.setAttributeNode(headerAttr);
    header.textContent = 'Add new user';

    const firstNameInput = document.createElement('input');
    const firstNameInputAttr = document.createAttribute('id');
    firstNameInputAttr.value = 'first-name';
    firstNameInput.placeholder = "First name";
    firstNameInput.setAttributeNode(firstNameInputAttr);

    const lastNameInput = document.createElement('input');
    const lastNameInputAttr = document.createAttribute('id');
    lastNameInputAttr.value = 'last-name';
    lastNameInput.placeholder = "Last name";
    lastNameInput.setAttributeNode(lastNameInputAttr);

    const addressInput = document.createElement('input');
    const addressInputAttr = document.createAttribute('id');
    addressInputAttr.value = 'address';
    addressInput.placeholder = "Address";
    addressInput.setAttributeNode(addressInputAttr);

    const contactInput = document.createElement('input');
    const contactInputAttr = document.createAttribute('id');
    contactInputAttr.value = 'contact';
    contactInput.placeholder = "Contact";
    contactInput.setAttributeNode(contactInputAttr);

    const addButton = document.createElement('button');
    const addButtonAttr = document.createAttribute('class');
    const addButtonAttrId = document.createAttribute('id');
    addButtonAttrId.value = 'add-new-user-button-in-container';
    addButton.setAttributeNode(addButtonAttrId);
    addButtonAttr.value = 'button-9';
    addButton.setAttributeNode(addButtonAttr);
    addButton.textContent = 'Add';

    const resetButton = document.createElement('button');
    const resetButtonAttr = document.createAttribute('class');
    const resetButtonAttrId = document.createAttribute('id');
    resetButtonAttrId.value = 'reset-new-user-button-in-container';
    resetButton.setAttributeNode(resetButtonAttrId);
    resetButtonAttr.value = 'button-9';
    resetButton.setAttributeNode(resetButtonAttr);
    resetButton.textContent = 'Reset';

    const divButtons = document.createElement('div');
    const divButtonAttr = document.createAttribute('id');
    divButtonAttr.value = 'buttons-new-user-container';
    divButtons.setAttributeNode(divButtonAttr);

    divButtons.appendChild(addButton);
    divButtons.appendChild(resetButton);

    div.append(header);
    div.appendChild(firstNameInput);
    div.appendChild(lastNameInput);
    div.appendChild(addressInput);
    div.appendChild(contactInput);
    div.appendChild(divButtons);
    container.appendChild(div);
    return container;
}

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
        row.appendChild(createRow(videos[i].id, propertyNameVideo.id));
        row.appendChild(createRow(videos[i].title, propertyNameVideo.title));
        row.appendChild(createRow(videos[i].genre, propertyNameVideo.genre));
        row.appendChild(createRow(videos[i].director, propertyNameVideo.director));
        row.appendChild(createRow(videos[i].runtime, propertyNameVideo.runtime));
        row.appendChild(createRow(videos[i].score, propertyNameVideo.score));
        row.appendChild(createRow(videos[i].description, propertyNameVideo.description));
        row.appendChild(createRow(videos[i].actors, propertyNameVideo.actors));
        row.appendChild(createRow(videos[i].createdDate, propertyNameVideo.createdDate));
        row.appendChild(createRow(videos[i].isAvailable, propertyNameVideo.isAvailable));
        row.appendChild(actionRow(context.getVideos));
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
        var videos = videoRentals[i].videos.map(a => a.title);
        row.appendChild(createRow(videoRentals[i].id, propertyNameVideoRental.id));
        row.appendChild(createRow(videoRentals[i].userId, propertyNameVideoRental.userId));
        row.appendChild(createRow(videoRentals[i].firstName, propertyNameVideoRental.firstName));
        row.appendChild(createRow(videoRentals[i].lastName, propertyNameVideoRental.lastName));
        row.appendChild(createRow(videos, propertyNameVideoRental.videos));
        row.appendChild(actionRow(context.getVideoRentals));
        tableBody.appendChild(row);
    }
    table.appendChild(tableHead);
    table.appendChild(tableBody);
    container.appendChild(table);
    return container;
}


function createTableGetListOfAllRentals(allRents, container, headers) {
    if (allRents === null) {
        return;
    }
    console.log(allRents);
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
    for (let i = 0; i < allRents.length; i++) {
        const row = document.createElement('tr');
        row.appendChild(createRow(allRents[i].id, propertyNameVideoRentalList.id));
        row.appendChild(createRow(allRents[i].firstName, propertyNameVideoRentalList.firstName));
        row.appendChild(createRow(allRents[i].lastName, propertyNameVideoRentalList.lastName));
        row.appendChild(createRow(allRents[i].address, propertyNameVideoRentalList.address));
        row.appendChild(createRow(allRents[i].contact, propertyNameVideoRentalList.contact));
        row.appendChild(createRow(allRents[i].registrationDate, propertyNameVideoRentalList.registrationDate));
        row.appendChild(createRow(allRents[i].title, propertyNameVideoRentalList.title));
        row.appendChild(createRow(allRents[i].startRentalDate, propertyNameVideoRentalList.startRentalDate));
        row.appendChild(createRow(allRents[i].endRentalDate, propertyNameVideoRentalList.endRentalDate));
        row.appendChild(createRow(allRents[i].realEndOfRentalDate, propertyNameVideoRentalList.realEndOfRentalDate));
        row.appendChild(actionRow(context.getListOfAllRentals));
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

const createRow = function (element, prop) {
    const td = document.createElement('td');
    const tdAttr = document.createAttribute('class');
    const tdId = document.createAttribute('id');
    tdId.value = prop;
    td.setAttributeNode(tdId);
    tdAttr.value = 'cell';
    td.setAttributeNode(tdAttr);
    const tdText = document.createTextNode(element);
    td.appendChild(tdText);
    return td;
}

const actionRow = function (context) {
    const div = document.createElement('div');
    const divAttr = document.createAttribute('class');
    const divIdAttr = document.createAttribute('id');
    divIdAttr.value = context;
    divAttr.value = 'action-row';
    div.setAttributeNode(divIdAttr);
    div.setAttributeNode(divAttr);

    const buttonDelete = document.createElement('a');
    const buttonDeleteAttr = document.createAttribute('id');
    const buttonDeleteAttrClass = document.createAttribute('class');
    buttonDeleteAttrClass.value = 'button-row';
    buttonDelete.setAttributeNode(buttonDeleteAttrClass);
    buttonDeleteAttr.value = 'delete-row-button';
    buttonDelete.setAttributeNode(buttonDeleteAttr);
    buttonDelete.textContent = 'Delete';
    buttonDelete.classList.add('button-delete');

    const buttonUpdate = document.createElement('a');
    const buttonUpdateAttr = document.createAttribute("id");
    const buttonUpdateAttrClass = document.createAttribute('class');
    buttonUpdateAttrClass.value = 'button-row';
    buttonUpdate.setAttributeNode(buttonUpdateAttrClass);
    buttonUpdateAttr.value = 'update-row-button';
    buttonUpdate.setAttributeNode(buttonUpdateAttr);
    buttonUpdate.textContent = 'Update';
    buttonUpdate.classList.add('button-update');

    div.appendChild(buttonDelete);
    div.appendChild(buttonUpdate);
    return div;
}

const actionHeader = function (trHead) {
    const header = document.createElement('th');
    const headerAttr = document.createAttribute('class');
    headerAttr.value = 'headers';
    header.setAttributeNode(headerAttr);
    const headerText = document.createTextNode('action');
    header.appendChild(headerText);
    trHead.appendChild(header);
}

const clearContent = function (element) {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}

export {
    createTableVideos,
    objectProperties,
    clearContent,
    createTableVideoRentals,
    createTableGetListOfAllRentals,
    createNewUserInputForm
}