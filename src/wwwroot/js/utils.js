import { propertyNameVideo, propertyNameVideoRental, propertyNameVideoRentalList, context, genres, propertyNameUser} from './constants.js'

function createNewVideoInputForm(container){
    const div = document.createElement('div');
    const divAttr = document.createAttribute('id');
    divAttr.value = 'new-video-container';
    div.setAttributeNode(divAttr);

    const header = document.createElement('h3');
    const headerAttr = document.createAttribute('id');
    headerAttr.value = 'header-new-video';header.setAttributeNode(headerAttr);
    header.textContent = 'Add new video';

    const titleInput = document.createElement('input');
    const titleInputAttr = document.createAttribute('id');
    titleInputAttr.value = 'title';
    titleInput.placeholder = "Title";
    titleInput.setAttributeNode(titleInputAttr);

    const genreLabel = document.createElement('label');
    genreLabel.htmlFor = 'genre'
    genreLabel.textContent = 'Select a genre: ';

    var genreSelect = document.createElement('select');
    const genreSelectAttr = document.createAttribute('id');
    genreSelectAttr.value = 'genre';
    genreSelect.setAttributeNode(genreSelectAttr);
    genreSelect = createOptions(genreSelect);
    
    const directorInput = document.createElement('input');
    const directorInputAttr = document.createAttribute('id');
    directorInputAttr.value = 'director';
    directorInput.placeholder = "Director";
    directorInput.setAttributeNode(directorInputAttr);

    const scoreInput = document.createElement('input');
    const scoreInputAttr = document.createAttribute('id');
    scoreInputAttr.value = 'score';
    scoreInput.placeholder = "Score";
    scoreInput.setAttributeNode(scoreInputAttr);

    const descriptionInput = document.createElement('input');
    const descriptionInputAttr = document.createAttribute('id');
    descriptionInputAttr.value = 'description';
    descriptionInput.placeholder = "Description";
    descriptionInput.setAttributeNode(descriptionInputAttr);

    const runtimeInput = document.createElement('input');
    const runtimeInputAttr = document.createAttribute('id');
    runtimeInputAttr.value = 'runtime';
    runtimeInput.placeholder = "Runtime";
    runtimeInput.setAttributeNode(runtimeInputAttr);

    const actorsInput = document.createElement('input');
    const actorsInputAttr = document.createAttribute('id');
    actorsInputAttr.value = 'actors';
    actorsInput.placeholder = "Actors";
    actorsInput.setAttributeNode(actorsInputAttr);

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
    div.appendChild(genreSelect);
    div.appendChild(directorInput);
    div.appendChild(runtimeInput);
    div.appendChild(scoreInput);
    div.appendChild(descriptionInput);
    div.appendChild(actorsInput);
    div.appendChild(divButtons);
    container.appendChild(div);
    return container;
}

function updateVideoInputForm(container, obj){
    console.log("obj")
    console.log(obj)
    const div = document.createElement('div');
    const divAttr = document.createAttribute('id');
    divAttr.value = 'update-video-container';
    div.setAttributeNode(divAttr);

    const header = document.createElement('h3');
    const headerAttr = document.createAttribute('id');
    headerAttr.value = 'header-new-video';header.setAttributeNode(headerAttr);
    header.textContent = `Update video with ${obj.id} id`;

    const idParagraph = document.createElement('p');
    const idParagraphAttr = document.createAttribute('id');
    idParagraphAttr.value = 'id';
    idParagraph.setAttributeNode(idParagraphAttr);
    idParagraph.value = obj.id;
    idParagraph.innerHTML = obj.id;

    const titleInput = document.createElement('input');
    const titleInputAttr = document.createAttribute('id');
    titleInputAttr.value = 'title';
    titleInput.placeholder = "Title";
    titleInput.setAttributeNode(titleInputAttr);
    titleInput.value = obj.title;

    const genreLabel = document.createElement('label');
    genreLabel.htmlFor = 'genre'
    genreLabel.textContent = 'Select a genre: ';

    var genreSelect = document.createElement('select');
    const genreSelectAttr = document.createAttribute('id');
    genreSelectAttr.value = 'genre';
    genreSelect.setAttributeNode(genreSelectAttr);
    genreSelect = createOptions(genreSelect);
    genreSelect.value = obj.genre;
    
    const directorInput = document.createElement('input');
    const directorInputAttr = document.createAttribute('id');
    directorInputAttr.value = 'director';
    directorInput.placeholder = "Director";
    directorInput.setAttributeNode(directorInputAttr);
    directorInput.value = obj.director;

    const runtimeInput = document.createElement('input');
    const runtimeInputAttr = document.createAttribute('id');
    runtimeInputAttr.value = 'runtime';
    runtimeInput.placeholder = "Runtime";
    runtimeInput.setAttributeNode(runtimeInputAttr);
    runtimeInput.value = obj.runtime;

    const scoreInput = document.createElement('input');
    const scoreInputAttr = document.createAttribute('id');
    scoreInputAttr.value = 'score';
    scoreInput.placeholder = "Score";
    scoreInput.setAttributeNode(scoreInputAttr);
    scoreInput.value = obj.score;

    const descriptionInput = document.createElement('input');
    const descriptionInputAttr = document.createAttribute('id');
    descriptionInputAttr.value = 'description';
    descriptionInput.placeholder = "Description";
    descriptionInput.setAttributeNode(descriptionInputAttr);
    descriptionInput.value = obj.description;

    const actorsInput = document.createElement('input');
    const actorsInputAttr = document.createAttribute('id');
    actorsInputAttr.value = 'actors';
    actorsInput.placeholder = "Actors";
    actorsInput.setAttributeNode(actorsInputAttr);
    actorsInput.value = obj.actors;

    const addButton = document.createElement('button');
    const addButtonAttr = document.createAttribute('class');
    const addButtonAttrId = document.createAttribute('id');
    addButtonAttrId.value = 'update-video-button-in-container';
    addButton.setAttributeNode(addButtonAttrId);
    addButtonAttr.value = 'button-9';
    addButton.setAttributeNode(addButtonAttr);
    addButton.textContent = 'Update';

    const resetButton = document.createElement('button');
    const resetButtonAttr = document.createAttribute('class');
    const resetButtonAttrId = document.createAttribute('id');
    resetButtonAttrId.value = 'reset-update-video-button-in-container';
    resetButton.setAttributeNode(resetButtonAttrId);
    resetButtonAttr.value = 'button-9';
    resetButton.setAttributeNode(resetButtonAttr);
    resetButton.textContent = 'Reset';

    const divButtons = document.createElement('div');
    const divButtonAttr = document.createAttribute('id');
    divButtonAttr.value = 'buttons-update-video-container';
    divButtons.setAttributeNode(divButtonAttr);

    divButtons.appendChild(addButton);
    divButtons.appendChild(resetButton);

    div.append(header);
    div.appendChild(idParagraph);
    div.appendChild(titleInput);
    div.appendChild(genreLabel);
    div.appendChild(genreSelect);
    div.appendChild(directorInput);
    div.appendChild(runtimeInput);
    div.appendChild(scoreInput);
    div.appendChild(descriptionInput);
    div.appendChild(actorsInput);
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

    const header = document.createElement('h3');const headerAttr = document.createAttribute('id');
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

function updateUserInputForm(container, obj){
    const div = document.createElement('div');
    const divAttr = document.createAttribute('id');
    divAttr.value = 'update-user-container';
    div.setAttributeNode(divAttr);
    //TODO: 4 inputy

    const header = document.createElement('h3');const headerAttr = document.createAttribute('id');
    headerAttr.value = 'header-update-user';
    header.setAttributeNode(headerAttr);
    header.textContent = `Update user with ${obj.id} id`;

    const idParagraph = document.createElement('p');
    const idParagraphAttr = document.createAttribute('id');
    idParagraphAttr.value = 'id';
    idParagraph.setAttributeNode(idParagraphAttr);
    idParagraph.value = obj.id;
    idParagraph.innerHTML = obj.id;

    const firstNameInput = document.createElement('input');
    const firstNameInputAttr = document.createAttribute('id');
    firstNameInputAttr.value = 'first-name';
    firstNameInput.placeholder = "First name";
    firstNameInput.setAttributeNode(firstNameInputAttr);
    firstNameInput.value = obj.firstName;

    const lastNameInput = document.createElement('input');
    const lastNameInputAttr = document.createAttribute('id');
    lastNameInputAttr.value = 'last-name';
    lastNameInput.placeholder = "Last name";
    lastNameInput.setAttributeNode(lastNameInputAttr);
    lastNameInput.value = obj.lastName;

    const addressInput = document.createElement('input');
    const addressInputAttr = document.createAttribute('id');
    addressInputAttr.value = 'address';
    addressInput.placeholder = "Address";
    addressInput.setAttributeNode(addressInputAttr);
    addressInput.value = obj.address;

    const contactInput = document.createElement('input');
    const contactInputAttr = document.createAttribute('id');
    contactInputAttr.value = 'contact';
    contactInput.placeholder = "Contact";
    contactInput.setAttributeNode(contactInputAttr);
    contactInput.value = obj.contact;

    const addButton = document.createElement('button');
    const addButtonAttr = document.createAttribute('class');
    const addButtonAttrId = document.createAttribute('id');
    addButtonAttrId.value = 'update-user-button-in-container';
    addButton.setAttributeNode(addButtonAttrId);
    addButtonAttr.value = 'button-9';
    addButton.setAttributeNode(addButtonAttr);
    addButton.textContent = 'Update';

    const resetButton = document.createElement('button');
    const resetButtonAttr = document.createAttribute('class');
    const resetButtonAttrId = document.createAttribute('id');
    resetButtonAttrId.value = 'reset-update-user-button-in-container';
    resetButton.setAttributeNode(resetButtonAttrId);
    resetButtonAttr.value = 'button-9';
    resetButton.setAttributeNode(resetButtonAttr);
    resetButton.textContent = 'Reset';

    const divButtons = document.createElement('div');
    const divButtonAttr = document.createAttribute('id');
    divButtonAttr.value = 'buttons-update-user-container';
    divButtons.setAttributeNode(divButtonAttr);

    divButtons.appendChild(addButton);
    divButtons.appendChild(resetButton);

    div.append(header);
    div.appendChild(idParagraph);
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

function createTableVideosShort(videos, container, headers) {
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
        row.appendChild(createRow(videos[i].isAvailable, propertyNameVideo.isAvailable  ));
        row.appendChild(actionRow(context.getVideos));
        tableBody.appendChild(row);
    }
    table.appendChild(tableHead);
    table.appendChild(tableBody);
    container.appendChild(table);
    return container;
}

function createTableVideosWithoutActions(videos, container, headers, createSearchBoxFunc = null) {
    if (videos === null) {
        return;
    }

    if (createSearchBoxFunc != null && typeof createSearchBoxFunc == 'function') {
        createSearchBoxFunc(container);
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
        tableBody.appendChild(row);
    }
    table.appendChild(tableHead);
    table.appendChild(tableBody);
    container.appendChild(table);
    return container;
}


function createTableVideosForRent(videos, container, headers) {
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
        row.appendChild(actionRowRent(context.rentVideoByUser));
        tableBody.appendChild(row);
    }
    table.appendChild(tableHead);
    table.appendChild(tableBody);
    container.appendChild(table);
    return container;
}

function createTableUsers(users, container, headers) {
    if (users === null) {
        return;
    }
    console.log(users);
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
    for (let i = 0; i < users.length; i++) {
        const row = document.createElement('tr');
        row.appendChild(createRow(users[i].id, propertyNameUser.id));
        row.appendChild(createRow(users[i].firstName, propertyNameUser.firstName));
        row.appendChild(createRow(users[i].lastName, propertyNameUser.lastName));
        row.appendChild(createRow(users[i].address, propertyNameUser.address));
        row.appendChild(createRow(users[i].contact, propertyNameUser.contact));
        row.appendChild(createRow(users[i].registrationDate, propertyNameUser.registrationDate));
        row.appendChild(actionRow(context.getUsers));
        tableBody.appendChild(row);
    }
    table.appendChild(tableHead);
    table.appendChild(tableBody);
    container.appendChild(table);
    return container;
}

//id, userId, firstName, lastnName, Videos
function createTableVideoRentals(videoRentals, container, headers) {
    if (videoRentals == null) {
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

const objectProperties = (obj) => {
    let arr = [];
    for (var prop in obj) {
        if (obj.hasOwnProperty(prop)) {
            arr.push(prop);
        }
    }
    return arr;
};

const createRow = (element, prop) => {
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


const actionRowRent = (context) => {
    const div = document.createElement('div');
    const divAttr = document.createAttribute('class');
    const divIdAttr = document.createAttribute('id');
    divIdAttr.value = context;
    divAttr.value = 'action-row';
    div.setAttributeNode(divIdAttr);
    div.setAttributeNode(divAttr);

    const buttonRent = document.createElement('a');
    const buttonRentAttr = document.createAttribute('id');
    const buttonDeleteAttrClass = document.createAttribute('class');
    buttonDeleteAttrClass.value = 'button-row';
    buttonRent.setAttributeNode(buttonDeleteAttrClass);
    buttonRentAttr.value = 'rent-row-button';
    buttonRent.setAttributeNode(buttonRentAttr);
    buttonRent.textContent = 'Rent';
    buttonRent.classList.add('button-rent');

    div.appendChild(buttonRent);
    return div;
}

const actionRow = (context) => {
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

const actionHeader = (trHead) => {
    const header = document.createElement('th');
    const headerAttr = document.createAttribute('class');
    headerAttr.value = 'headers';
    header.setAttributeNode(headerAttr);
    const headerText = document.createTextNode('action');
    header.appendChild(headerText);
    trHead.appendChild(header);
}

const clearContent = (element) => {
    while (element.firstChild) {
        element.removeChild(element.lastChild);
    }
}

const createOptions = (select) => {
    const sciFiOpt = document.createElement("option");
    sciFiOpt.value = genres.sciFi;
    sciFiOpt.innerHTML = genres.sciFi;

    const comedyOpt = document.createElement("option");
    comedyOpt.value = genres.comedy;
    comedyOpt.innerHTML = genres.comedy;

    const horrorOpt = document.createElement("option");
    horrorOpt.value = genres.horror;
    horrorOpt.innerHTML = genres.horror;

    const romanceOpt = document.createElement("option");
    romanceOpt.value = genres.romance;
    romanceOpt.innerHTML = genres.romance;

    const actionOpt = document.createElement("option");
    actionOpt.value = genres.action;
    actionOpt.innerHTML = genres.action;

    const thrillerOpt = document.createElement("option");
    thrillerOpt.value = genres.thriller;
    thrillerOpt.innerHTML = genres.thriller;

    const dramaOpt = document.createElement("option");
    dramaOpt.value = genres.drama;
    dramaOpt.innerHTML = genres.drama;

    const mysteryOpt = document.createElement("option");
    mysteryOpt.value = genres.mystery;
    mysteryOpt.innerHTML = genres.mystery;

    const crimeOpt = document.createElement("option");
    crimeOpt.value = genres.crime;
    crimeOpt.innerHTML = genres.crime;

    const animationOpt = document.createElement("option");
    animationOpt.value = genres.animation;
    animationOpt.innerHTML = genres.animation;

    const adventureOpt = document.createElement("option");
    adventureOpt.value = genres.adventure;
    adventureOpt.innerHTML = genres.adventure;

    const fantasyOpt = document.createElement("option");
    fantasyOpt.value = genres.fantasy;
    fantasyOpt.innerHTML = genres.fantasy;

    const comedyRomanceOpt = document.createElement("option");
    comedyRomanceOpt.value = genres.comedyRomance;
    comedyRomanceOpt.innerHTML = genres.comedyRomance;

    const actionComedyOpt = document.createElement("option");
    actionComedyOpt.value = genres.actionComedy;
    actionComedyOpt.innerHTML = genres.actionComedy;

    const superHeroOpt = document.createElement("option");
    superHeroOpt.value = genres.superHero;
    superHeroOpt.innerHTML = genres.superHero;

    const documentaryOpt = document.createElement("option");
    documentaryOpt.value = genres.documentary;
    documentaryOpt.innerHTML = genres.documentary;

    const warOpt = document.createElement("option");
    warOpt.value = genres.war;
    warOpt.innerHTML = genres.war;

    const musicalOpt = document.createElement("option");
    musicalOpt.value = genres.musical;
    musicalOpt.innerHTML = genres.musical;

    const historyOpt = document.createElement("option");
    historyOpt.value = genres.history;
    historyOpt.innerHTML = genres.history;

    const biographyOpt = document.createElement("option");
    biographyOpt.value = genres.biography;
    biographyOpt.innerHTML = genres.biography;

    select.appendChild(sciFiOpt);

    select.appendChild(comedyOpt);

    select.appendChild(horrorOpt);

    select.appendChild(romanceOpt);

    select.appendChild(actionOpt);

    select.appendChild(thrillerOpt);

    select.appendChild(dramaOpt);

    select.appendChild(mysteryOpt);

    select.appendChild(crimeOpt);

    select.appendChild(animationOpt);

    select.appendChild(adventureOpt);

    select.appendChild(fantasyOpt);

    select.appendChild(comedyRomanceOpt);

    select.appendChild(actionComedyOpt);

    select.appendChild(superHeroOpt);

    select.appendChild(documentaryOpt);

    select.appendChild(warOpt);

    select.appendChild(musicalOpt);

    select.appendChild(historyOpt);

    select.appendChild(biographyOpt);
    return select;
}


const createVideosOptions = (select, response) => {
    console.log(response);
    for (let i = 0; i < response.length; i++) {
        const Opt = document.createElement("option");
        Opt.value = response[i].id;
        Opt.innerHTML = response[i].title;
        select.appendChild(Opt);
    };
    return select;
}

const createUsersOptions = (select, response) => {
    console.log(response);
    for (let i = 0; i < response.length; i++) {
        const Opt = document.createElement("option");
        Opt.value = response[i].id;
        Opt.innerHTML = response[i].firstName + " " + response[i].lastName;
        select.appendChild(Opt);
    };
    return select;
}

const createSingleUserOptions = (select, response) => {
    console.log(response);
    const Opt = document.createElement("option");
    Opt.value = response.id;
    Opt.innerHTML = response.firstName + " " + response.lastName;
    select.appendChild(Opt);
    return select;
}

function createDeleteVideosList(response, container){
    const div = document.createElement('div');
    const divAttr = document.createAttribute('id');
    divAttr.value = 'delete-videos-container';
    div.setAttributeNode(divAttr);
    
    const header = document.createElement('h3');const headerAttr = document.createAttribute('id');
    headerAttr.value = 'delete-videos';
    header.setAttributeNode(headerAttr);
    header.textContent = 'Delete selected video';

    var videosSelect = document.createElement('select');
    const videosSelectAttr = document.createAttribute('id');
    videosSelectAttr.value = 'videos';
    videosSelect.setAttributeNode(videosSelectAttr);
    videosSelect = createVideosOptions(videosSelect, response);
    
    const deleteVideosButton = document.createElement('button');
    const deleteVideosButtonAttr = document.createAttribute('class');
    const deleteVideosButtonAttrId = document.createAttribute('id');
    deleteVideosButtonAttrId.value = 'delete-videos-button-in-container';
    deleteVideosButton.setAttributeNode(deleteVideosButtonAttrId);
    deleteVideosButtonAttr.value = 'button-9';
    deleteVideosButton.setAttributeNode(deleteVideosButtonAttr);
    deleteVideosButton.textContent = 'Delete';

    const divButtons = document.createElement('div');
    const divButtonAttr = document.createAttribute('id');
    divButtonAttr.value = 'buttons-delete-videos-container';
    divButtons.setAttributeNode(divButtonAttr);

    divButtons.appendChild(deleteVideosButton);

    div.append(header);
    div.appendChild(videosSelect);
    div.appendChild(divButtons);
    container.appendChild(div);
    return container;
}

function createDeleteUsersList(response, container){
    const div = document.createElement('div');
    const divAttr = document.createAttribute('id');
    divAttr.value = 'delete-users-container';
    div.setAttributeNode(divAttr);
    
    const header = document.createElement('h3');const headerAttr = document.createAttribute('id');
    headerAttr.value = 'delete-users';
    header.setAttributeNode(headerAttr);
    header.textContent = 'Delete selected user';

    var userSelect = document.createElement('select');
    const userSelectAttr = document.createAttribute('id');
    userSelectAttr.value = 'users';
    userSelect.setAttributeNode(userSelectAttr);
    userSelect = createUsersOptions(userSelect, response);
    
    const deleteVideosButton = document.createElement('button');
    const deleteVideosButtonAttr = document.createAttribute('class');
    const deleteVideosButtonAttrId = document.createAttribute('id');
    deleteVideosButtonAttrId.value = 'delete-users-button-in-container';
    deleteVideosButton.setAttributeNode(deleteVideosButtonAttrId);
    deleteVideosButtonAttr.value = 'button-9';
    deleteVideosButton.setAttributeNode(deleteVideosButtonAttr);
    deleteVideosButton.textContent = 'Delete';

    const divButtons = document.createElement('div');
    const divButtonAttr = document.createAttribute('id');
    divButtonAttr.value = 'buttons-delete-users-container';
    divButtons.setAttributeNode(divButtonAttr);

    divButtons.appendChild(deleteVideosButton);

    div.append(header);
    div.appendChild(userSelect);
    div.appendChild(divButtons);
    container.appendChild(div);
    return container;
}

function createRentFilmForUserList(responseUser, responseVideo, container){
    const userDiv = document.createElement('div');
    const userDivAttr = document.createAttribute('id');
    userDivAttr.value = 'rent-video-users-container';
    userDiv.setAttributeNode(userDivAttr);
    
    const userHeader = document.createElement('h3');const userHeaderAttr = document.createAttribute('id');
    userHeaderAttr.value = 'rent-video-users';
    userHeader.setAttributeNode(userHeaderAttr);
    userHeader.textContent = 'Rent movie for specific client';

    var userSelect = document.createElement('select');
    const userSelectAttr = document.createAttribute('id');
    userSelectAttr.value = 'users';
    userSelect.setAttributeNode(userSelectAttr);
    userSelect = createUsersOptions(userSelect, responseUser);
    
    const rentVideoButton = document.createElement('button');
    const rentVideoButtonAttr = document.createAttribute('class');
    const rentVideoButtonAttrId = document.createAttribute('id');
    rentVideoButtonAttrId.value = 'rent-video-users-button-in-container';
    rentVideoButton.setAttributeNode(rentVideoButtonAttrId);
    rentVideoButtonAttr.value = 'button-9';
    rentVideoButton.setAttributeNode(rentVideoButtonAttr);
    rentVideoButton.textContent = 'Rent';

    const divButtons = document.createElement('div');
    const divButtonAttr = document.createAttribute('id');
    divButtonAttr.value = 'rent-video-users-container';
    divButtons.setAttributeNode(divButtonAttr);

    var videosSelect = document.createElement('select');
    const videosSelectAttr = document.createAttribute('id');
    videosSelectAttr.value = 'videos';
    videosSelect.setAttributeNode(videosSelectAttr);
    videosSelect = createVideosOptions(videosSelect, responseVideo);
    
    divButtons.appendChild(rentVideoButton);

    userDiv.append(userHeader);
    userDiv.appendChild(userSelect);
    userDiv.appendChild(videosSelect);
    userDiv.appendChild(divButtons);
    
    container.appendChild(userDiv);
    return container;
}

function createReturnRentedVideoList(responseUser, responseVideo, container){
    const userDiv = document.createElement('div');
    const userDivAttr = document.createAttribute('id');
    userDivAttr.value = 'return-rented-video-user-container';
    userDiv.setAttributeNode(userDivAttr);
    
    const userHeader = document.createElement('h3');const userHeaderAttr = document.createAttribute('id');
    userHeaderAttr.value = 'return-rented-video-user';
    userHeader.setAttributeNode(userHeaderAttr);
    userHeader.textContent = 'Return rented video of specific client';

    var userSelect = document.createElement('select');
    const userSelectAttr = document.createAttribute('id');
    userSelectAttr.value = 'users-special';
    userSelect.setAttributeNode(userSelectAttr);
    userSelect = createUsersOptions(userSelect, responseUser);
    
    const rentVideoButton = document.createElement('button');
    const rentVideoButtonAttr = document.createAttribute('class');
    const rentVideoButtonAttrId = document.createAttribute('id');
    rentVideoButtonAttrId.value = 'return-rented-video-user-button-in-container';
    rentVideoButton.setAttributeNode(rentVideoButtonAttrId);
    rentVideoButtonAttr.value = 'button-9';
    rentVideoButton.setAttributeNode(rentVideoButtonAttr);
    rentVideoButton.textContent = 'Return';

    const divButtons = document.createElement('div');
    const divButtonAttr = document.createAttribute('id');
    divButtonAttr.value = 'return-rented-video-user-container';
    divButtons.setAttributeNode(divButtonAttr);

    var videosSelect = document.createElement('select');
    const videosSelectAttr = document.createAttribute('id');
    videosSelectAttr.value = 'videos-special';
    videosSelect.setAttributeNode(videosSelectAttr);
    videosSelect = createVideosOptions(videosSelect, responseVideo);
    
    divButtons.appendChild(rentVideoButton);

    userDiv.append(userHeader);
    userDiv.appendChild(userSelect);
    userDiv.appendChild(videosSelect);
    userDiv.appendChild(divButtons);
    
    container.appendChild(userDiv);
    return container;
}

function createSearchContainer(parentId) {
    const container = document.createElement('div');
    container.className = 'search-container';
    
    const input = document.createElement('input');
    input.type = 'text';
    input.id = 'search-input';
    input.className = 'search-input';
    input.placeholder = 'Search by title, genre, director...';
    
    const button = document.createElement('button');
    button.type = 'button';
    button.id = 'search-button';
    button.className = 'search-button';
    button.textContent = 'Search';
    
    container.appendChild(input);
    container.appendChild(button);
    
    const parent = document.getElementById(parentId.id);
    if (parent) {
        parent.appendChild(container);
    } else {
        console.error(`Parent element with id "${parentId}" not found.`);
    }
}

function validateVideoForm() {
    let title = document.getElementById('title').value;
    let genre = document.getElementById('genre').value;
    let director = document.getElementById('director').value;
    let score = document.getElementById('score').value;
    let runtime = document.getElementById('runtime').value;
    let description = document.getElementById('description').value;
    let actors = document.getElementById('actors').value;

    if (!title || !genre || !director || !score || !runtime || !description || !actors) {
        alert("All fields must be filled out.");
        return false;
    }

    if (isNaN(score) || score < 0 || score > 10) {
        alert("Score must be a number between 0 and 10.");
        return false;
    }

    if (isNaN(runtime) || runtime <= 0) {
        alert("Runtime must be a positive number.");
        return false;
    }

    return true;
}

function validateUserForm() {
    let firstName = document.getElementById('first-name').value;
    let lastName = document.getElementById('last-name').value;
    let address = document.getElementById('address').value;
    let contact = document.getElementById('contact').value;

    if (!firstName || !lastName || !address || !contact) {
        alert("First Name, Last Name, Address, and Contact are required!");
        return false;
    }

    return true;
}

export {
    createTableVideos,
    objectProperties,
    clearContent,
    createTableVideoRentals,
    createTableGetListOfAllRentals,
    createNewUserInputForm, 
    createNewVideoInputForm, 
    createTableUsers, 
    createTableVideosForRent,
    createTableVideosWithoutActions,
    createDeleteVideosList,
    createDeleteUsersList,
    updateVideoInputForm,
    updateUserInputForm,
    createRentFilmForUserList,
    createReturnRentedVideoList,
    createUsersOptions as createDeleteUsersOptions,
    createVideosOptions as createDeleteVideosOptions,
    createTableVideosShort,
    createSearchContainer,
    validateVideoForm,
    validateUserForm,
}