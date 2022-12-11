import { fetchVideos, fetchVideoRentals, fetchListOfAllRentals, fetchLoginUsers, fetchUsers, fetchAvailableVideos, fetchMyVideos } from './fetch.js'
import { createNewUser, createNewVideo, deleteVideo, deleteUser } from './send.js'
import {
    createTableVideos, objectProperties, clearContent, createTableVideoRentals, createTableGetListOfAllRentals, createNewUserInputForm, createNewVideoInputForm, createTableUsers,
    createTableVideosForRent, createTableVideosWithoutActions, createDeleteVideosList, createDeleteUsersList
} from './utils.js'
import { UserDTO, VideoDTO, LoginUserDTO, VideoDTOId } from './dtos.js'

var container = document.getElementById('table-wrapper');
var getVideosButton = document.getElementById('get-videos-button');
var getListOfAllRentalsButton = document.getElementById('get-list-of-all-video-rentals-button');
var getVideoRentalsButton = document.getElementById('get-list-of-rentals');
var welcomeHeader = document.getElementById('welcome');
var addNewUserButton = document.getElementById('add-new-user-button');
var addNewVideoButton = document.getElementById('add-new-video-button');
var loginButton = document.getElementById('login-button');
var logoutButton = document.getElementById('logout-button');
var getUsersButton = document.getElementById('get-users-button');
var getAvailableVideosButton = document.getElementById('get-available-videos');
var getMyVideosButton = document.getElementById('get-videos-by-user');
var rentVideoByUserButton = document.getElementById('rent-video-by-user');
var removeVideoButton = document.getElementById('remove-video-button');
var removeUserButton = document.getElementById('remove-user-button');

const getVideos = async () => {
    const response = await fetchVideos();
    if (response == undefined) {
        alert("An unknown error has occured.")
        top.location.href = "/index.html";//redirection
    }
    const headers = objectProperties(Object.values(response)[0]);
    console.log(headers);
    container = createTableVideos(response, container, headers);
}

const getVideosRaw = async () => {
    const response = await fetchVideos();
    if (response == undefined) {
        alert("An unknown error has occured.")
        top.location.href = "/index.html";//redirection
    }
    container = createDeleteVideosList(response, container);
}

const getVideoRentals = async () => {
    const response = await fetchVideoRentals();
    if (response == undefined) {
        alert("An unknown error has occured.")
        top.location.href = "/index.html";//redirection
    }
    const headers = objectProperties(Object.values(response)[0]);
    console.log(headers);
    container = createTableVideoRentals(response, container, headers);
}

const getListOfAllRentals = async () => {
    const response = await fetchListOfAllRentals();
    if (response == undefined) {
        alert("An unknown error has occured.")
        top.location.href = "/index.html";//redirection
    }
    console.log(response);
    const headers = objectProperties(Object.values(response)[0]);
    console.log(headers);
    container = createTableGetListOfAllRentals(response, container, headers);
}

const getUsers = async () => {
    const response = await fetchUsers();
    if (response == undefined) {
        alert("An unknown error has occured.")
        top.location.href = "/index.html";//redirection
    }
    console.log(response);
    const headers = objectProperties(Object.values(response)[0]);
    console.log(headers);
    container = createTableUsers(response, container, headers);
}

const getUsersRaw = async () => {
    const response = await fetchUsers();
    if (response == undefined) {
        alert("An unknown error has occured.")
        top.location.href = "/index.html";//redirection
    }
    console.log(response);
    const headers = objectProperties(Object.values(response)[0]);
    console.log(headers);
    container = createDeleteUsersList(response, container, headers);
}

const getListOfLoginUsers = async () => {
    const response = await fetchLoginUsers();
    if (response == undefined) {
        alert("An unknown error has occured.")
        top.location.href = "/index.html";//redirection
    }
    console.log(response);
    return response;
}

const getAvailableVideos = async () => {
    const response = await fetchAvailableVideos();
    if (response == undefined) {
        alert("An unknown error has occured.")
        top.location.href = "/index.html";//redirection
    }
    console.log(response);
    const headers = objectProperties(Object.values(response)[0]);
    container = createTableVideosWithoutActions(response, container, headers);
}

const getMyVideos = async (id) => {
    const response = await fetchMyVideos(id);
    if (response == undefined) {
        alert("An unknown error has occured.");
        top.location.href = "/index.html";//redirectior
    }
    console.log(response);
    const headers = objectProperties(Object.values(response)[0]);
    container = createTableVideosWithoutActions(response, container, headers);
}

const getVideosForRent = async () => {
    const response = await fetchAvailableVideos();
    if (response == undefined) {
        alert("An unknown error has occured.")
        top.location.href = "/index.html";//redirection
    }
    console.log(response);
    const headers = objectProperties(Object.values(response)[0]);
    container = createTableVideosForRent(response, container, headers);
}

getVideosButton.addEventListener('click', (e) => {
    e.preventDefault();
    welcomeHeader.remove();
    clearContent(container);
    getVideos();
});

getVideoRentalsButton.addEventListener('click', (e) => {
    e.preventDefault();
    welcomeHeader.remove();
    clearContent(container);
    getVideoRentals();
});

getListOfAllRentalsButton.addEventListener('click', (e) => {
    e.preventDefault();
    welcomeHeader.remove();
    clearContent(container);
    getListOfAllRentals();
});

getUsersButton.addEventListener('click', (e) => {
    e.preventDefault();
    welcomeHeader.remove();
    clearContent(container);
    getUsers();
})

addNewUserButton.addEventListener('click', (e) => {
    e.preventDefault();
    welcomeHeader.remove();
    clearContent(container);
    container = createNewUserInputForm(container);
});

addNewVideoButton.addEventListener('click', (e) => {
    e.preventDefault();
    welcomeHeader.remove();
    clearContent(container);
    container = createNewVideoInputForm(container);
});

getAvailableVideosButton.addEventListener('click', (e) => {
    e.preventDefault();
    welcomeHeader.remove();
    clearContent(container);
    getAvailableVideos();
});

getMyVideosButton.addEventListener('click', (e) => {
    e.preventDefault();
    welcomeHeader.remove();
    clearContent(container);
    let id = window.sessionStorage.getItem("identifier");
    if (id == undefined) {
        alert("User id is not defiend.");
        return;
    }
    getMyVideos(id);
});

rentVideoByUserButton.addEventListener('click', (e) => {
    e.preventDefault();
    welcomeHeader.remove();
    clearContent(container);
    getVideosForRent();
});

removeVideoButton.addEventListener('click', (e) => {
    e.preventDefault();
    welcomeHeader.remove();
    clearContent(container);
    getVideosRaw();
});

removeUserButton.addEventListener('click', (e) => {
    e.preventDefault();
    welcomeHeader.remove();
    clearContent(container);
    getUsersRaw();
})

document.addEventListener('click', addNewUserListener);
document.addEventListener('click', resetNewUserListener);

document.addEventListener('click', addNewVideoListener);
document.addEventListener('click', resetNewVideoListener);

async function addNewVideoListener(event) {
    var element = event.target;
    if (element.id == 'add-new-video-button-in-container') {
        let datetime = new Date();
        datetime.toISOString();
        let selectedGenre = document.getElementById('genre').value;
        let actors = document.getElementById('actors').value;
        let arrayActors = actors.split(',');
        const videoDto = new VideoDTO(
            document.getElementById('title').value,
            selectedGenre,
            document.getElementById('director').value,
            document.getElementById('score').value,
            document.getElementById('description').value,
            arrayActors,
            datetime,
            true);

        console.log(videoDto);
        await createNewVideo(videoDto);
        top.location.href = "/index.html";
        //redirection
    }
}

function resetNewVideoListener(event) {
    var element = event.target;
    if (element.id == 'reset-new-video-button-in-container') {
        let title = document.getElementById('title');
        let director = document.getElementById('director');
        let score = document.getElementById('score');
        let description = document.getElementById('description');
        let actors = document.getElementById('actors');
        let genre = document.getElementById('genre');
        let runtime = document.getElementById('runtime');
        title.value = "";
        director.value = "";
        score.value = "";
        actors.value = "";
        description.value = "";
        genre.value = "";
        runtime.value = "";
    }
}

async function addNewUserListener(event) {
    var element = event.target;
    if (element.id == 'add-new-user-button-in-container') {
        var datetime = new Date();
        datetime.toISOString();
        const userDto = new UserDTO(
            document.getElementById('first-name').value,
            document.getElementById('last-name').value,
            document.getElementById('address').value,
            document.getElementById('contact').value,
            datetime);

        if (userDto == null || (userDto.firstName == "" && userDto.lastName == "" && userDto.address == "" && userDto.contact == "")) {
            alert("FirstName, LastName, Contact, Address are required!");
            return;
        }
        await createNewUser(userDto);
        top.location.href = "/index.html";//redirection
    }
};

function resetNewUserListener(event) {
    var element = event.target;
    if (element.id == 'reset-new-user-button-in-container') {
        let firstName = document.getElementById('first-name');
        let lastName = document.getElementById('last-name');
        let address = document.getElementById('address');
        let contact = document.getElementById('contact');
        firstName.value = "";
        lastName.value = "";
        address.value = "";
        contact.value = "";
    }
};

loginButton.addEventListener('click', async (e) => {
    e.preventDefault();
    await loginUser();
});

async function loginUser() {
    const login = document.getElementById('login');
    const password = document.getElementById('password');
    if (login.value == "" || password.value == "") {
        alert('Password or Login required!');
        login.value = "";
        password.value = "";
        return;
    }

    const loginUsers = await getListOfLoginUsers();
    let loggedUser = loginUsers.filter(obj => {
        return obj.user === login.value;
    });

    if (loggedUser?.length == 0) {
        alert(`User ${login.value} doesn't exists`);
        return;
    }

    if (loggedUser[0]?.password === password.value) {
        alert(`Logged in`);
        const loggedUserDTO = new LoginUserDTO(loggedUser[0]?.id, login.value, password.value);
        window.sessionStorage.setItem("identifier", loggedUserDTO.id);
        window.sessionStorage.setItem("user", loggedUserDTO.user);
        top.location.href = "/index.html";//redirection
    }
}

logoutButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.sessionStorage.clear();
    top.location.href = "/index.html";//redirection
});


document.addEventListener('click', deleteVideosListListener);

async function deleteVideosListListener(event) {
    var element = event.target;
    if (element.id == 'delete-videos-button-in-container') {
        let videoId = document.getElementById('videos').value;
        if(videoId == undefined){
            alert("Video is undefined!");
        }
        await deleteVideo(videoId);
        top.location.href = "/index.html";//redirection
    }
};

document.addEventListener('click', deleteUsersListListener);

async function deleteUsersListListener(event) {
    var element = event.target;
    if (element.id == 'delete-users-button-in-container') {
        let userId = document.getElementById('users').value;
        if(userId == undefined){
            alert("User is undefined!");
        }
        await deleteUser(userId);
        top.location.href = "/index.html";//redirection
    }
};

document.addEventListener('click', updateVideoListListener);

async function updateVideoListListener(event) {
    var element = event.target;
    if (element.id == 'update-video-button-in-container') {
        let selectedGenre = document.getElementById('genre').value;
        let actors = document.getElementById('actors').value;
        let arrayActors = actors.split(',');
        const videoDtoId = new VideoDTOId(
            document.getElementById('id').value,
            document.getElementById('title').value,
            selectedGenre,
            document.getElementById('director').value,
            document.getElementById('score').value,
            document.getElementById('description').value,
            arrayActors,
            datetime,
            true);
        top.location.href = "/index.html";//redirection
    }
};

