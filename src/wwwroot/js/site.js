import {
    createNewUser,
    createNewVideo,
    deleteVideo,
    deleteUser,
    updateVideo,
    updateUser,
    rentVideoById,
    returnRentedVideoById
} from './send.js'

import {
    fetchVideos,
    fetchVideoRentals,
    fetchListOfAllRentals,
    fetchLoginUsers,
    fetchUsers,
    fetchAvailableVideos,
    fetchMyVideos,
    fetchUserWhoHaveRentedVideos,
    fetchVideosShort,
    searchVideoByTitle,
} from './fetch.js'

import {
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
    createRentFilmForUserList,
    createReturnRentedVideoList,
    createTableVideosShort,
    createSearchContainer,
    validateVideoForm,
    validateUserForm,
} from './utils.js'

import {
    UserDTO,
    VideoDTO,
    LoginUserDTO,
    VideoDTOId,
    UserDTOId,
    RentVideoByIdDTO
} from './dtos.js'

var container = document.getElementById('table-wrapper');
var getListOfAllRentalsButton = document.getElementById('get-list-of-all-video-rentals-button');
var getVideoRentalsButton = document.getElementById('get-list-of-rentals');
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
var rentVideoForUserButton = document.getElementById('rent-video-button');
var returnVideoFromRentalButton = document.getElementById('return-movie-from-rental');
var getVideosShortButton = document.getElementById('get-videos-short-button');
var getVideosButton = document.getElementById('get-videos-button');

const getVideosShort = async () => {
    const response = await fetchVideosShort();
    if (response == undefined) {
        alert("There are no videos available.")
        top.location.href = "/index.html";//redirection
    }
    const headers = objectProperties(Object.values(response)[0]);
    console.log(headers);
    container = createTableVideosShort(response, container, headers);
}

const getVideosRaw = async () => {
    const response = await fetchVideos();
    if (response == undefined || response.length == 0) {
        alert("Videos collection is empty or undefined.")
        top.location.href = "/index.html";//redirection
    }
    container = createDeleteVideosList(response, container);
}

const getVideoRentals = async () => {
    const response = await fetchVideoRentals();
    if (response == undefined || response.length == 0) {
        alert("The video rentals collection is empty or undefined.")
        top.location.href = "/index.html";//redirection
    }
    const headers = objectProperties(Object.values(response)[0]);
    console.log(headers);
    container = createTableVideoRentals(response, container, headers);
}

const getListOfAllRentals = async () => {
    const response = await fetchListOfAllRentals();
    if (response == undefined || response.length == 0) {
        alert("The video rentals collection is empty or undefined.")
        top.location.href = "/index.html";//redirection
    }
    console.log(response);
    const headers = objectProperties(Object.values(response)[0]);
    console.log(headers);
    container = createTableGetListOfAllRentals(response, container, headers);

}
const getUsers = async () => {
    const response = await fetchUsers();
    if (response == undefined || response.length == 0) {
        alert("The users collection is empty or undefined.")
        top.location.href = "/index.html";//redirection
    }
    console.log(response);
    const headers = objectProperties(Object.values(response)[0]);
    console.log(headers);
    container = createTableUsers(response, container, headers);
}

const getUsersRaw = async () => {
    const response = await fetchUsers();
    if (response == undefined || response.length == 0) {
        alert("The user collection is empty or undefined.")
        top.location.href = "/index.html";//redirection
    }
    console.log(response);
    const headers = objectProperties(Object.values(response)[0]);
    console.log(headers);
    container = createDeleteUsersList(response, container, headers);
}

const getListOfLoginUsers = async () => {
    const response = await fetchLoginUsers();
    if (response == undefined || response.length == 0) {
        alert("The list of login users is empty or undefined.")
        top.location.href = "/index.html";//redirection
    }
    console.log(response);
    return response;
}

const getAvailableVideos = async () => {
    const response = await fetchAvailableVideos();
    if (response == undefined || response.length == 0) {
        alert("The available video collection is empty or undefined.")
        top.location.href = "/index.html";//redirection
    }
    console.log(response);
    const headers = objectProperties(Object.values(response)[0]);
    container = createTableVideosWithoutActions(response, container, headers);
}

const getMyVideos = async (id) => {
    const response = await fetchMyVideos(id);
    if (response == undefined || response.length == 0) {
        alert("You don't own any videos or undefined content.");
        top.location.href = "/index.html";//redirectior
    }
    console.log(response);
    const headers = objectProperties(Object.values(response)[0]);
    container = createTableVideosWithoutActions(response, container, headers);
}

const getVideos = async () => {
    const response = await fetchVideos();
    if (response == undefined || response.length == 0) {
        alert("You don't own any videos or undefined content.");
        top.location.href = "/index.html";//redirectior
    }
    console.log(response);
    const headers = objectProperties(Object.values(response)[0]);
    container = createTableVideosWithoutActions(response, container, headers);
}

const getVideosForRent = async () => {
    const response = await fetchAvailableVideos();
    if (response == undefined || response.length == 0) {
        alert("The available video collection is empty or undefined.")
        top.location.href = "/index.html";//redirection
    }
    console.log(response);
    const headers = objectProperties(Object.values(response)[0]);
    container = createTableVideosForRent(response, container, headers);
}

const rentVideoForSpecificUser = async () => {
    const responseUser = await fetchUsers();
    const responseAvailableVideos = await fetchAvailableVideos();
    if (responseUser == undefined || responseAvailableVideos == undefined || responseUser.length == 0 || responseAvailableVideos.length == 0) {
        alert("Cannot rent video: the users or videos collection is empty or undefined.");
        top.location.href = "/index.html";//redirection
    }
    console.log(responseUser);
    console.log(responseAvailableVideos);
    container = createRentFilmForUserList(responseUser, responseAvailableVideos, container);
}

const returnRentedVideoOfSpecificClient = async () => {
    const responseUsers = await fetchUserWhoHaveRentedVideos();
    if (responseUsers == undefined) {
        alert("Users who have rented videos is null or empty.");
        top.location.href = "/index.html";//redirection
    }
    let firstUser = responseUsers[0];
    console.log(firstUser);
    const responseUserVideos = await fetchMyVideos(firstUser.id);
    if (responseUsers == undefined || firstUser == undefined || responseUserVideos == undefined) {
        alert("An uknown error has occured.");
        top.location.href = "/index.html";//redirection
    }
    console.log(responseUsers);
    console.log(firstUser);
    console.log(responseUserVideos);
    container = createReturnRentedVideoList(responseUsers, responseUserVideos, container);
}

const searchVideo = async (title) => {
    const response = await searchVideoByTitle(title);
    if (response.status === 404 || response == undefined || response == null || response.length == 0) {
        alert(title + " not found");
        top.location.href = "/index.html";//redirection
    }
    else if (response.status === 400) {
        alert('Bad request');
        top.location.href = "/index.html";//redirection
    }
    else if (response.status === 500) {
        alert("Internal error");
        top.location.href = "/index.html";//redirection
    }
    else {
        console.log(response);
        const headers = objectProperties(Object.values(response)[0]);
        container = createTableVideosWithoutActions(response, container, headers, createSearchContainer);
    }

}

container.addEventListener('click', searchVideoListener);
document.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') {
        e.preventDefault();
        searchVideoListener(e);
    }
});

async function searchVideoListener(e) {
    var element = e.target;
    if (element && (element.id === 'search-button' || e.key === 'Enter')) {
        e.preventDefault();
        const inputElement = document.getElementById("search-input");
        if (inputElement) {
            const input = inputElement.value.trim();
            if (input) {
                removeHeader();
                clearContent(container);
                searchVideo(input);
            } else {
                alert("Input empty. Try again!");
                top.location.href = "/index.html"; // Redirection
            }
        }
    }
}

getVideosShortButton.addEventListener('click', (e) => {
    e.preventDefault();
    removeHeader();
    clearContent(container);
    getVideosShort();
});

getVideoRentalsButton.addEventListener('click', (e) => {
    e.preventDefault();
    removeHeader();
    clearContent(container);
    getVideoRentals();
});

getListOfAllRentalsButton.addEventListener('click', (e) => {
    e.preventDefault();
    removeHeader();
    clearContent(container);
    getListOfAllRentals();
});

getUsersButton.addEventListener('click', (e) => {
    e.preventDefault();
    removeHeader();
    clearContent(container);
    getUsers();
});

addNewUserButton.addEventListener('click', (e) => {
    e.preventDefault();
    removeHeader();
    clearContent(container);
    container = createNewUserInputForm(container);
});

addNewVideoButton.addEventListener('click', (e) => {
    e.preventDefault();
    removeHeader();
    clearContent(container);
    container = createNewVideoInputForm(container);
});

getAvailableVideosButton.addEventListener('click', (e) => {
    e.preventDefault();
    removeHeader();
    clearContent(container);
    getAvailableVideos();
});

getMyVideosButton.addEventListener('click', (e) => {
    e.preventDefault();
    removeHeader();
    clearContent(container);
    let id = window.sessionStorage.getItem("identifier");
    if (id == undefined) {
        alert("User id is not defined.");
        return;
    }
    getMyVideos(id);
});

getVideosButton.addEventListener('click', (e) => {
    e.preventDefault();
    removeHeader();
    clearContent(container);
    getVideos();
})

rentVideoByUserButton.addEventListener('click', (e) => {
    e.preventDefault();
    removeHeader();
    clearContent(container);
    getVideosForRent();
});

removeVideoButton.addEventListener('click', (e) => {
    e.preventDefault();
    removeHeader();
    clearContent(container);
    getVideosRaw();
});

removeUserButton.addEventListener('click', (e) => {
    e.preventDefault();
    removeHeader();
    clearContent(container);
    getUsersRaw();
});

rentVideoForUserButton.addEventListener('click', (e) => {
    e.preventDefault();
    removeHeader();
    clearContent(container);
    rentVideoForSpecificUser();
});

returnVideoFromRentalButton.addEventListener('click', (e) => {
    e.preventDefault();
    removeHeader();
    clearContent(container);
    returnRentedVideoOfSpecificClient();
});

document.addEventListener('click', addNewUserListener);
document.addEventListener('click', resetNewUserListener);

document.addEventListener('click', addNewVideoListener);
document.addEventListener('click', resetNewVideoListener);

function removeHeader() {
    var welcomeHeader = document.getElementById('welcome');
    if (welcomeHeader !== null) {
        removeHeader();
    }
}

async function addNewVideoListener(event) {
    var element = event.target;
    if (element.id == 'add-new-video-button-in-container') {
        if (!validateVideoForm()) {
            return; 
        }

        let datetime = new Date();
        datetime.toISOString();
        let selectedGenre = document.getElementById('genre').value;
        let actors = document.getElementById('actors').value;
        let arrayActors = actors.split(',');

        const videoDto = new VideoDTO(
            document.getElementById('title').value,
            selectedGenre,
            document.getElementById('director').value,
            document.getElementById('runtime').value,
            document.getElementById('score').value,
            document.getElementById('description').value,
            arrayActors,
            datetime,
            true
        );

        console.log(videoDto);
        await createNewVideo(videoDto);
        top.location.href = "/index.html"; // Redirection
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
        if (!validateUserForm()) {
            return; 
        }

        var datetime = new Date();
        datetime.toISOString();

        const userDto = new UserDTO(
            document.getElementById('first-name').value,
            document.getElementById('last-name').value,
            document.getElementById('address').value,
            document.getElementById('contact').value,
            datetime
        );

        console.log(userDto);
        await createNewUser(userDto);
        top.location.href = "/index.html"; // Redirection
    }
}

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
        if (videoId == undefined) {
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
        if (userId == undefined) {
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
        if (!validateVideoForm()) {
            return;
        }

        let selectedGenre = document.getElementById('genre').value;
        let actors = document.getElementById('actors').value;
        let arrayActors = actors.split(',');
        let datetime = new Date();
        datetime.toISOString();

        const videoDtoId = new VideoDTOId(
            document.getElementById('id').value,
            document.getElementById('title').value,
            selectedGenre,
            document.getElementById('director').value,
            document.getElementById('score').value,
            document.getElementById('runtime').value,
            document.getElementById('description').value,
            arrayActors,
            true
        );

        console.log(videoDtoId);
        await updateVideo(videoDtoId);
        top.location.href = "/index.html"; // Redirection
    }
}

document.addEventListener('click', updateUserListListener);
async function updateUserListListener(event) {
    var element = event.target;
    if (element.id == 'update-user-button-in-container') {
        if (!validateUserForm()) {
            return; 
        }

        var datetime = new Date();
        datetime.toISOString();

        const user = new UserDTOId(
            document.getElementById('id').value,
            document.getElementById('first-name').value,
            document.getElementById('last-name').value,
            document.getElementById('address').value,
            document.getElementById('contact').value,
            datetime
        );

        console.log(user);
        await updateUser(user);
    }
}

document.addEventListener('click', rentVideoListener);
async function rentVideoListener(event) {
    var element = event.target;
    if (element.id == 'rent-video-users-button-in-container') {
        let userId = document.getElementById('users').value;
        let videoTitle = document.getElementById('videos');
        let videoTitleText = videoTitle.options[videoTitle.selectedIndex].text;
        const rentVideoDto = new RentVideoByIdDTO(userId, videoTitleText);
        await rentVideoById(rentVideoDto);
        top.location.href = "/index.html";//redirection
    }
}

document.addEventListener('change', changeUsersListener);
async function changeUsersListener(event) {
    var element = event.target;
    if (element.id == 'users-special') {
        let userId = document.getElementById('users-special').value;
        const userMovies = await fetchMyVideos(userId);
        const users = await fetchUserWhoHaveRentedVideos();
        clearContent(container);
        container = createReturnRentedVideoList(users, userMovies, container);
    }
}

document.addEventListener('click', returnVideoListener);
async function returnVideoListener(event) {
    var element = event.target;
    if (element.id == 'return-rented-video-user-button-in-container') {
        let userId = document.getElementById('users-special').value;
        let videoTitle = document.getElementById('videos-special');
        let videoTitleText = videoTitle.options[videoTitle.selectedIndex].text;
        const returnVideoDTO = new RentVideoByIdDTO(userId, videoTitleText);
        await returnRentedVideoById(returnVideoDTO);
        top.location.href = "/index.html";//redirection
    }
}
