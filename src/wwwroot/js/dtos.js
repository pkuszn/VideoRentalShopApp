export class VideoDTO{
    id;
    title;
    genre;
    director;
    score;
    description;
    actors;
    createdDate;
    isAvailable;
  
    constructor(id, title, genre, director, score, description, actors, createdDate, isAvailable) {
      this.id = id;
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
    id;
    firstName;
    lastName;
    address;
    contact;
    registrationDate

    constructor(id, firstName, lastName, address, contact, registrationDate){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.contact = contact;
        this.registrationDate = registrationDate;
    }
  }
