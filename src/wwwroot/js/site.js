import { fetchVideos, fetchVideoRentals, fetchListOfAllRentals } from './fetch.js'
import { createTableVideos, objectProperties, clearContent, createTableVideoRentals, createTableGetListOfAllRentals, createNewUserInputForm } from './utils.js'

var container = document.getElementById('table-wrapper');
var getVideosButton = document.getElementById('get-videos-button');
var getListOfAllRentalsButton = document.getElementById('get-list-of-all-video-rentals-button');
var getVideoRentalsButton = document.getElementById('get-list-of-rentals');
var welcomeHeader = document.getElementById('welcome');
var addNewUserButton = document.getElementById('add-new-user-button');
var addNewVideoButton = document.getElementById('add-new-video-button');


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

const addNewUser = async(firstName, lastName, address, contact) => {
    try{
        //TODO: Insert new user
    }
    catch(ex){
        console.error(ex);
    }
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

});

document.addEventListener('click', addNewUserListener);
document.addEventListener('click', resetNewUserListener);

async function addNewUserListener(event){
    var element = event.target;
    if(element.id == 'add-new-user-button-in-container'){
        let firstName = document.getElementById('first-name');
        let lastName = document.getElementById('last-name');
        let address = document.getElementById('address');
        let contact = document.getElementById('contact');
        if(firstName.value == "" && lastName.value == "" && address.value == "" && contact.value == "")
        {
            alert("FirstName, LastName, Contact, Address are required!");
            return;
        }
        await addNewUser(firstName.value, lastName.value, address.value, contact.value);
        top.location.href = "/index.html";//redirection
    }
};

function resetNewUserListener(event){
    var element = event.target;
    if(element.id == 'reset-new-user-button-in-container'){
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