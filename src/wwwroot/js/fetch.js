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

async function fetchListOfAllRentals(){
    return await fetch(api.getListOfRents, {
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
        .catch(error => console.error('Unable to get list of all rents', error));
}

export {
    fetchVideos,
    fetchVideoRentals,
    fetchListOfAllRentals 
}