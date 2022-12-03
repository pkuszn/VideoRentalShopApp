import { fetchVideos } from './fetch.js'

var getVideosButton = document.getElementById('get-videos-button');

const getVideos = () => {
    const response = fetchVideos();
    console.log(response);
}

getVideosButton.addEventListener('click', (e) => {
    e.preventDefault();
    getVideos();
});