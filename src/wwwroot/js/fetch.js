import { videoEndpoints, userEndpoints, rentalEndpoints } from './constants.js'

async function fetchVideos() {
    return await fetch(videoEndpoints.getVideos, {
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

async function fetchVideoRentals() {
    return await fetch(videoEndpoints.getVideoRentals, {
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

async function fetchListOfAllRentals() {
    return await fetch(rentalEndpoints.getListOfRents, {
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

async function fetchLoginUsers() {
    return await fetch(userEndpoints.getLoginUsers, {
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
        .catch(error => console.error('Unable to get logged user', error));
}

async function fetchUsers() {
    return await fetch(userEndpoints.getUsers, {
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
        .catch(error => console.error('Unable to get logged user', error));
}

async function fetchAvailableVideos() {
    return await fetch(videoEndpoints.getAvailableVideos, {
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
        .catch(error => console.error('Unable to get logged user', error));
}

async function fetchMyVideos(id) {
    return await fetch(videoEndpoints.getMyVideos + id, {
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
        .catch(error => console.error('Unable to get logged user', error));
}

async function fetchUserWhoHaveRentedVideos() {
    return await fetch(userEndpoints.getUsersWhoHaveRentedVideos, {
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
        .catch(error => console.error('Unable to get logged user', error));
}

async function fetchVideosShort(){
    return await fetch(videoEndpoints.getAvailableVideosShort, {
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
        .catch(error => console.error('Unable to get logged user', error));
}

async function searchVideoByTitle(title) {
    return await fetch(videoEndpoints.searchVideo + title, {
        method: "GET",
        dataType: "JSON",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    })
        .then((result => { return result.json(); }))
        .then(data => {
            console.log(data);
            return data;
        })
        .catch(error => console.error("Unable to find given videos", error))
}

export {
    fetchVideos,
    fetchVideoRentals,
    fetchListOfAllRentals,
    fetchLoginUsers,
    fetchUsers,
    fetchAvailableVideos,
    fetchMyVideos,
    fetchUserWhoHaveRentedVideos,
    fetchVideosShort,
    searchVideoByTitle
}