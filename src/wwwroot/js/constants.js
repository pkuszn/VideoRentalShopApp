﻿export const api = {
    getVideos: 'VideoRentalShop/GetVideos',
    getUsers: 'VideoRentalShop/GetUsers',
    getVideoRentals: 'VideoRentalShop/GetVideoRentals',
    getVideo: 'VideoRentalShop/GetVideo/',
    getUser: 'VideoRentalShop/GetUser',
    getVideoRental: 'VideoRentalShop/GetVideoRental',
    getListOfRents: 'VideoRentalShop/GetListOfRents',
    returnRentedVideo: 'VideoRentalShop/ReturnRentedVideo',
    getAvailableVideos: 'VideoRentalShop/GetAvailableVideos',
    getAvaialbleVideosShort: 'VideoRentalShop/GetAvaialbleVideosShort',
    rentFilm: 'VideoRentalShop/RentFilm',
    insertUser: 'VideoRentalShop/InsertUser',
    insertVideo: 'VideoRentalShop/InsertVideo',
    insertVideoRental: 'VideoRentalShop/InsertVideoRental',
    updateUser: 'VideoRentalShop/UpdateUser/',
    updateVideo: 'VideoRentalShop/UpdateVideo/',
    updateVideoRental: 'VideoRentalShop/UpdateVideoRental/',
    deleteUser: 'VideoRentalShop/DeleteUser/',
    deleteVideo: 'VideoRentalShop/DeleteVideo/',
    deleteVideoRental: 'VideoRentalShop/DeleteVideoRental/'
}

export const propertyNameVideoRentalList = {
    id: 'id',
    firstName: 'firstName',
    lastName: 'lastName',
    address: 'address',
    contact: 'contact',
    registrationDate: 'registrationDate',
    title: 'title',
    startRentalDate: 'startRentalDate',
    endRentalDate: 'endRentalDate',
    realEndOfRentalDate: "realEndOfRentalDate"
}

export const propertyNameVideo = {
    id: 'id',
    title: 'title',
    genre: 'genre',
    director: 'director',
    runtime: 'runtime',
    score: 'score',
    description: 'description',
    actors: 'actors',
    createdDate: 'createdDate',
    isAvailable: 'isAvailable'
}

export const propertyNameVideoRental = {
    id: 'id',
    userId: 'userId',
    firstName: 'firstName',
    lastName: 'lastName',
    videos: 'videos'
}