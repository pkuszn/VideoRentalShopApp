import { api } from './constants.js'

async function fetchVideos() {
    return await fetch(api.getVideos, {
        method: 'GET',
        dataType: 'JSON',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((result => { return result.json(); }))
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => console.error('Unable to get videos', error));
}

async function fetchVideoRentals(){
    return await fetch(api.getVideoRentals, {
        method: 'GET',
        dataType: 'JSON',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    })
        .then((result => { return result.json(); }))
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => console.error('Unable to get video rentals', error));
}

export {
    fetchVideos,
    fetchVideoRentals
}