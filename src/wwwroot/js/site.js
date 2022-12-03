import { fetchVideos } from './fetch.js'
import { createTableVideos } from './utils.js'

var container = document.getElementById('table-wrapper');
var getVideosButton = document.getElementById('get-videos-button');


const getVideos = async () => {
    const response = await fetchVideos();
    container = createTableVideos(response, container);
}

getVideosButton.addEventListener('click', (e) => {
    e.preventDefault();
    getVideos();
});