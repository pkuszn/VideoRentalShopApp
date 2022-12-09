import { api } from './constants.js'

async function createNewUser(user) {
    return await fetch(api.insertUser, {
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
        .catch(error => console.error('Unable to insert videos', error));
}

async function createNewVideo(video) {
    return await fetch(api.insertVideo, {
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
            score: video.score,
            description: video.description,
            actors: video.actors,
            createdDate: video.createdDate,
            isAvailable: video.isAvailable
        })
    })
        .catch(error => console.error('Unable to insert videos', error));
}

export {
    createNewUser, 
    createNewVideo
}