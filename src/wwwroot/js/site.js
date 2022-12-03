import { getVideos } from './VideoRentalShopAppUI/fetch.js'

var getVideosButton = document.getElementById('get-videos-button');

const fetchVideos = () => {
    const response = getVideos();
    console.log(response);
}


getVideosButton.addEventListener('click', (e) => {
    e.preventDefault();
    fetchVideos();
});