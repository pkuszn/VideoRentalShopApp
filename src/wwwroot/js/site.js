import { fetchVideos, fetchVideoRentals } from './fetch.js'
import { createTableVideos, objectProperties, clearContent, createTableVideoRentals } from './utils.js'

var container = document.getElementById('table-wrapper');
var getVideosButton = document.getElementById('get-videos-button');
var getRentalVideos = document.getElementById('get-list-of-all-video-rentals-button');

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

getVideosButton.addEventListener('click', (e) => {
    e.preventDefault();
    clearContent(container);
    getVideos();
});

getRentalVideos.addEventListener('click', (e) => {
    e.preventDefault();
    clearContent(container);
    getVideoRentals();              
});