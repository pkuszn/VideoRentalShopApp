﻿export const api = {
    getVideos: 'VideoRentalShop/GetVideos',
    getUsers: 'VideoRentalShop/GetUsers',
    getVideoRentals: 'VideoRentalShop/GetVideoRentals',
    getVideo: 'VideoRentalShop/GetVideo/',
    getUser: 'VideoRentalShop/GetUser',
    getVideoRental: 'VideoRentalShop/GetVideoRental',
    getListOfRents: 'VideoRentalShop/GetListOfRents',
    returnRentedVideoByNames: 'VideoRentalShop/ReturnRentedVideoByNames',
    returnRentedVideoById: 'VideoRentalShop/ReturnRentedVideoById',
    getAvailableVideos: 'VideoRentalShop/GetAvailableVideos',
    getAvailableVideosShort: 'VideoRentalShop/GetAvailableVideoShort',
    rentFilmByNames: 'VideoRentalShop/RentFilmByNames',
    rentFilmById: 'VideoRentalShop/RentFilmById',
    insertUser: 'VideoRentalShop/InsertUser',
    insertVideo: 'VideoRentalShop/InsertVideo',
    insertVideoRental: 'VideoRentalShop/InsertVideoRental',
    updateUser: 'VideoRentalShop/UpdateUser/',
    updateVideo: 'VideoRentalShop/UpdateVideo/',
    updateVideoRental: 'VideoRentalShop/UpdateVideoRental/',
    deleteUser: 'VideoRentalShop/DeleteUser/',
    deleteVideo: 'VideoRentalShop/DeleteVideo/',
    deleteVideoRental: 'VideoRentalShop/DeleteVideoRental/',
    getLoginUsers: 'VideoRentalShop/GetLoginUsers',
    getMyVideos: 'VideoRentalShop/GetMyVideos/',
    getUsersWhoHaveRentedVideos: 'VideoRentalShop/GetUsersWhoHaveRentedVideos/'
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

export const context = {
    getListOfAllRentals: "getListOfAllRentals",
    getVideos: "getVideos",
    getVideoRentals: "getVideoRentals",
    getUsers: "getUsers",
    rentVideoByUser: "rentVideoByUser"
}

export const genres = {
    comedy: "Comedy",
    sciFi: "Science-Fiction",
    horror: "Horror",
    romance: "Romance",
    action: "Action",
    thriller: "Thriller",
    drama: "Drama",
    mystery: "Mystery",
    crime: "Crime",
    animation: "Animation",
    adventure: "Adventure",
    fantasy: "Fantasy",
    comedyRomance: "Comedy Romance",
    actionComedy: "Action Comedy",
    superHero: "Super Hero",
    documentary: "Documentary",
    war: "War",
    musical: "Musical",
    history: "History",
    biography: "Biography"
}

export const propertyNameUser = {
    id: 'id',
    firstName: "first-name",
    lastName: "last-name",
    address: "address",
    contact: "contact",
    registrationDate: "registration-date"
}