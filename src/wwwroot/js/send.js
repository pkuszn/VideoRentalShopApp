import { userEndpoints, videoEndpoints, rentalEndpoints } from './constants.js'

async function createNewUser(user) {
    return await fetch(userEndpoints.insertUser, {
        method: 'POST',
        dataType: 'JSON',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            contact: user.contact,
            registrationDate: user.registrationDate
        })
    })
    .catch(error => console.error('Unable to insert user', error));
}

async function createNewVideo(video) {
    return await fetch(videoEndpoints.insertVideo, {
        method: 'POST',
        dataType: 'JSON',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: video.title,
            genre: video.genre,
            director: video.director,
            runtime: video.runtime,
            score: video.score,
            description: video.description,
            actors: video.actors,
            isAvailable: video.isAvailable
        })
    })
    .catch(error => console.error('Unable to insert video', error));
}

async function deleteVideo(id) {
    await fetch(videoEndpoints.deleteVideo + id, {
        method: 'DELETE',
        dataType: 'JSON',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).catch(error => console.error(`Unable to delete video with id ${id}`, error));
}

async function deleteUser(id) {
    await fetch(userEndpoints.deleteUser + id, {
        method: 'DELETE',
        dataType: 'JSON',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
    }).catch(error => console.error(`Unable to delete user with id ${id}`, error));
}

async function updateVideo(video){
    console.log(video);
    return await fetch(videoEndpoints.updateVideo + video.id, {
        method: 'PUT',
        dataType: 'JSON',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: video.title,
            genre: video.genre,
            director: video.director,
            runtime: video.runtime,
            score: video.score,
            description: video.description,
            actors: video.actors,
            createdDate: video.createdDate,
            isAvailable: video.isAvailable
        })
    }).catch(error => console.error(`Unable to update video with id ${video.id} `, error));
}

async function updateUser(user) {
    return await fetch(userEndpoints.updateUser + user.id, {
        method: 'PUT',
        dataType: 'JSON',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            firstName: user.firstName,
            lastName: user.lastName,
            address: user.address,
            contact: user.contact,
            registrationDate: user.registrationDate
        })
    })
    .catch(error => console.error(`Unable to update user with id ${user.id}`, error));
}

async function rentVideoById(rent){
    return await fetch(rentalEndpoints.rentFilmById, {
        method: 'POST',
        dataType: 'JSON',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: rent.userId,
            title: rent.title
        })
    })
    .catch(error => console.error(`Unable to rent video ${rent.title} to user with id ${rent.userId}`, error));
}

async function returnRentedVideoById(rent){
    return await fetch(rentalEndpoints.returnRentedVideoById, {
        method: 'PUT',
        dataType: 'JSON',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            userId: rent.userId,
            title: rent.title
        })
    })
    .catch(error => console.error(`Unable to rent video ${rent.title} to user with id ${rent.userId}`, error));
}

export {
    createNewUser, 
    createNewVideo,
    deleteVideo,
    deleteUser,
    updateVideo,
    updateUser,
    rentVideoById,
    returnRentedVideoById
}