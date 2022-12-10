export class VideoDTO {
  title;
  genre;
  director;
  score;
  description;
  actors;
  createdDate;
  isAvailable;

  constructor(title, genre, director, score, description, actors, createdDate, isAvailable) {
    this.title = title;
    this.genre = genre;
    this.director = director;
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

export class LoginUserDTO {
  user;
  password;

  constructor(user, password){
    this.user = user;
    this.password = password;
  }
}