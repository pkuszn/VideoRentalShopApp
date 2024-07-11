export const api = {
    getVideos: 'VideoRentalStore/GetVideos',
    getUsers: 'VideoRentalStore/GetUsers',
    getVideoRentals: 'VideoRentalStore/GetVideoRentals',
    getVideo: 'VideoRentalStore/GetVideo/',
    getUser: 'VideoRentalStore/GetUser',
    getVideoRental: 'VideoRentalStore/GetVideoRental',
    getListOfRents: 'VideoRentalStore/GetListOfRents',
    returnRentedVideoByNames: 'VideoRentalStore/ReturnRentedVideoByNames',
    returnRentedVideoById: 'VideoRentalStore/ReturnRentedVideoById',
    getAvailableVideos: 'VideoRentalStore/GetAvailableVideos',
    getAvailableVideosShort: 'VideoRentalStore/GetAvailableVideoShort',
    rentFilmByNames: 'VideoRentalStore/RentFilmByNames',
    rentFilmById: 'VideoRentalStore/RentFilmById',
    insertUser: 'VideoRentalStore/InsertUser',
    insertVideo: 'VideoRentalStore/InsertVideo',
    insertVideoRental: 'VideoRentalStore/InsertVideoRental',
    updateUser: 'VideoRentalStore/UpdateUser/',
    updateVideo: 'VideoRentalStore/UpdateVideo/',
    updateVideoRental: 'VideoRentalStore/UpdateVideoRental/',
    deleteUser: 'VideoRentalStore/DeleteUser/',
    deleteVideo: 'VideoRentalStore/DeleteVideo/',
    deleteVideoRental: 'VideoRentalStore/DeleteVideoRental/',
    getLoginUsers: 'VideoRentalStore/GetLoginUsers',
    getMyVideos: 'VideoRentalStore/GetMyVideos/',
    getUsersWhoHaveRentedVideos: 'VideoRentalStore/GetUsersWhoHaveRentedVideos/',
    searchVideo: "VideoRentalStore/SearchVideo/",
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