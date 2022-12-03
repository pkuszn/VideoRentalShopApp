import { api } from './constants.js'

function fetchVideos(){
    fetch(api.getVideos, {
        method: 'GET',
    })
        .then(data => data.json())
        .then(response => console.log(response))
        .catch(error => console.error('Unable to get videos', error));
}

export{
    fetchVideos
}