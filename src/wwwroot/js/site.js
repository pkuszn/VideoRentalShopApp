import { fetchVideos, fetchVideoRentals, fetchListOfAllRentals } from './fetch.js'
import { createNewUser, createNewVideo } from './send.js'
import { createTableVideos, objectProperties, clearContent, createTableVideoRentals, createTableGetListOfAllRentals, createNewUserInputForm, createNewVideoInputForm} from './utils.js'
import { UserDTO, VideoDTO } from './dtos.js'

var container = document.getElementById('table-wrapper');
var getVideosButton = document.getElementById('get-videos-button');
var getListOfAllRentalsButton = document.getElementById('get-list-of-all-video-rentals-button');
var getVideoRentalsButton = document.getElementById('get-list-of-rentals');
var welcomeHeader = document.getElementById('welcome');
var addNewUserButton = document.getElementById('add-new-user-button');
var addNewVideoButton = document.getElementById('add-new-video-button');
var loginButton = document.getElementById('login-button');

const getVideos = async () => {
    const response = await fetchVideos();
    const headers = objectProperties(Object.values(response)[0]);
    console.log(headers);
    container = createTableVideos(response, container, headers);
}

const getVideoRentals = async () => {
    const response = await fetchVideoRentals();
    const headers = objectProperties(Object.values(response)[0]);
    console.log(headers);
    container = createTableVideoRentals(response, container, headers);
}

const getListOfAllRentals = async () => {
    const response = await fetchListOfAllRentals();
    console.log(response);
    const headers = objectProperties(Object.values(response)[0]);
    console.log(headers);
    container = createTableGetListOfAllRentals(response, container, headers);
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

document.addEventListener('click', addNewUserListener);
document.addEventListener('click', resetNewUserListener);

document.addEventListener('click', addNewVideoListener);
document.addEventListener('click', resetNewVideoListener);

async function addNewVideoListener(event){
    var element = event.target;
    if(element.id == 'add-new-video-button-in-container'){
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


loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    const login = document.getElementById('login');
    const password = document.getElementById('password');
})