export const videoEndpoints = {
    getVideos: 'Video/GetVideos',
    getVideo: 'Video/GetVideo/',
    getAvailableVideos: 'Video/GetAvailableVideos',
    getAvailableVideosShort: 'Video/GetAvailableVideoShort',
    insertVideo: 'Video/InsertVideo',
    updateVideo: 'Video/UpdateVideo/',
    deleteVideo: 'Video/DeleteVideo/',
    searchVideo: "Video/SearchVideo/",
    getMyVideos: 'Video/GetMyVideos/',
}

export const userEndpoints = {
    getUsers: 'User/GetUsers',
    getUser: 'User/GetUser',
    insertUser: 'User/InsertUser',
    updateUser: 'User/UpdateUser/',
    deleteUser: 'User/DeleteUser/',
    getUsersWhoHaveRentedVideos: 'User/GetUsersWhoHaveRentedVideos/',
    getLoginUsers: 'User/GetLoginUsers',
}

export const rentalEndpoints = {
    getVideoRentals: 'Rental/GetVideoRentals',
    getVideoRental: 'Rental/GetVideoRental',
    getListOfRents: 'Rental/GetListOfRents',
    returnRentedVideoByNames: 'Rental/ReturnRentedVideoByNames',
    returnRentedVideoById: 'Rental/ReturnRentedVideoById',
    rentFilmByNames: 'Rental/RentFilmByNames',
    rentFilmById: 'Rental/RentFilmById',
    insertVideoRental: 'Rental/InsertVideoRental',
    updateVideoRental: 'Rental/UpdateVideoRental/',
    deleteVideoRental: 'Rental/DeleteVideoRental/',
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