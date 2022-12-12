export class VideoDTO {
  title;
  genre;
  director;
  runtime
  score;
  description;
  actors;
  createdDate;
  isAvailable;

  constructor(title, genre, director, runtime, score, description, actors, createdDate, isAvailable) {
    this.title = title;
    this.genre = genre;
    this.director = director;
    this.runtime = runtime;
    this.score = score;
    this.description = description;
    this.actors = actors;
    this.createdDate = createdDate;
    this.isAvailable = isAvailable;
  }
}

export class VideoDTOId {
  id;
  title;
  genre;
  director;
  runtime;
  score;
  description;
  actors;
  createdDate;
  isAvailable;

  constructor(id, title, genre, director, runtime, score, description, actors, createdDate, isAvailable) {
    this.id = id;
    this.title = title;
    this.genre = genre;
    this.director = director;
    this.runtime = runtime;
    this.score = score;
    this.description = description;
    this.actors = actors;
    this.createdDate = createdDate;
    this.isAvailable = isAvailable;
  }
}

export class UserDTO {
  firstName;
  lastName
  address;
  contact;
  registrationDate

  constructor(firstName, lastName, address, contact, registrationDate) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.contact = contact;
    this.registrationDate = registrationDate;
  }
}

export class UserDTOId {
  id;
  firstName;
  lastName
  address;
  contact;
  registrationDate

  constructor(id, firstName, lastName, address, contact, registrationDate) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.contact = contact;
    this.registrationDate = registrationDate;
  }
}


export class LoginUserDTO {
  id;
  user;
  password;

  constructor(id, user, password){
    this.id = id;
    this.user = user;
    this.password = password;
  }
}

export class RentVideoByIdDTO {
  id;
  videoTitle;

  constructor(id, videoTitle){
    this.id = id,
    this.videoTitle = videoTitle
  }
}