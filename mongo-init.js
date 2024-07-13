db = db.getSiblingDB('VideoRentalStoreDb');

db.createCollection('user');
db.createCollection('video');
db.createCollection('rental');

db.user.insertMany([
  {
    "FirstName": "Marek",
    "LastName": "Nowak",
    "Address": "Warszawa",
    "Contact": 854123555,
    "UserName": "maro123",
    "Email": "maro123@gmail.com",
    "Password": "maro123",
    "RegistrationDate": new Date()
  },
  {
    "FirstName": "Andrzej",
    "LastName": "Mostowiak",
    "Address": "Grabina",
    "Contact": 991221235,
    "UserName": "andrzej83",
    "Email": "andrzej@gmail.com",
    "Password": "andrzej123",
    "RegistrationDate": new Date()
  },
  {
    "FirstName": "Maria",
    "LastName": "Konopnicka",
    "Address": "Dziergowice",
    "Contact": 772334229,
    "UserName": "mariaXX",
    "Email": "mariaX@gmail.com",
    "Password": "xx123",
    "RegistrationDate": new Date()
  },
  {
    "FirstName": "Patryk",
    "LastName": "Kuszneruk",
    "Address": "Szymocice",
    "Contact": 772334229,
    "UserName": "Patryk",
    "Email": "patryk98@gmail.com",
    "Password": "patryk98",
    "RegistrationDate": new Date()
  },
  {
    "UserName": "Admin",
    "Email": "admin@gmail.com",
    "Password": "root",
    "RegistrationDate": new Date()
  }
]);

db.rental.insertMany([
  {
    "UserId": ObjectId("63792f9994874ec764fedfd9"), // This should be a valid ObjectId of a user in your database
    "FirstName": "Maria",
    "LastName": "Konopnicka",
    "Videos": [
      {
        "Title": "Na zachodzie bez zmian",
        "StartRentalDate": new Date(),
        "EndRentalDate": new Date(),
        "RealEndOfRentalDate": null
      }
    ]
  }
]);

db.video.insertMany([
  {
    "Title": "Na zachodzie bez zmian",
    "Genre": "War",
    "Director": "Edward Berger",
    "Runtime": 147,
    "Score": 7.4,
    "Description": "Przerażające przeżycia młodego niemieckiego zołnierza na froncie zachodnim podczas I wojny światowej.",
    "Actors": [
      "Felix Kammerer",
      "Daniel Brahl",
      "Albrecht Schuch"
    ],
    "IsAvailable": true,
    "CreatedDate": new Date()
  },
  {
    "Title": "Osobliwość",
    "Genre": "Thriller",
    "Director": "Sebastian Lelio",
    "Runtime": 109,
    "Score": 6.3,
    "Description": "Rok 1862. Dręczona przeszłością pielęgniarka wyjeżdża z Anglii do odległej irlandzkiej wioski, aby zbadać sprawę pewnej dziewczynki i jej rzekomo cudownego postu.",
    "Actors": [
      "Florence Pugh",
      "Tom Burke",
      "Kla Lord Cassidy"
    ],
    "IsAvailable": true,
    "CreatedDate": new Date()
  },
  {
    "Title": "Dobry opiekun",
    "Genre": "Drama",
    "Director": "Tobias Lindholm",
    "Runtime": 121,
    "Score": 6.4,
    "Description": "Pielęgniarka podejrzewa, że za serią tajemniczych zgonów pacjentów stoi jej kolega po fachu, i naraża własne życie, aby odkryć prawdę.",
    "Actors": [
      "Jessica Chastain",
      "Eddie Redmayne",
      "Nnamdi Asomugha"
    ],
    "IsAvailable": true,
    "CreatedDate": new Date()
  },
  {
    "Title": "Skazani na Shawshank",
    "Genre": "Drama",
    "Director": "Frank Darabont",
    "Runtime": 142,
    "Score": 9.3,
    "Description": "Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.",
    "Actors": [
      "Tim Robbins",
      "Morgan Freeman",
      "Bob Gunton"
    ],
    "IsAvailable": true,
    "CreatedDate": new Date()
  },
  {
    "Title": "Godfather",
    "Genre": "Crime",
    "Director": "Francis Ford Coppola",
    "Runtime": 175,
    "Score": 9.2,
    "Description": "The aging patriarch of an organized crime dynasty in postwar New York City transfers control of his clandestine empire to his reluctant youngest son.",
    "Actors": [
      "Marlon Brando",
      "Al Pacino",
      "James Caan"
    ],
    "IsAvailable": true,
    "CreatedDate": new Date()
  },
  {
    "Title": "Pulp Fiction",
    "Genre": "Crime",
    "Director": "Quentin Tarantino",
    "Runtime": 154,
    "Score": 8.9,
    "Description": "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    "Actors": [
      "John Travolta",
      "Uma Thurman",
      "Samuel L. Jackson"
    ],
    "IsAvailable": true,
    "CreatedDate": new Date()
  },
  {
    "Title": "Forrest Gump",
    "Genre": "Drama",
    "Director": "Eric Roth",
    "Runtime": 142,
    "Score": 8.8,
    "Description": "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man with an IQ of 75, whose only desire is to be reunited with his childhood sweetheart.",
    "Actors": [
      "Tom Hanks",
      "Robin Wright",
      "Gary Sinise"
    ],
    "IsAvailable": true,
    "CreatedDate": new Date()
  },
  {
    "Title": "Inception",
    "Genre": "Action",
    "Director": "Christopher Nolan",
    "Runtime": 148,
    "Score": 8.8,
    "Description": "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O., but his tragic past may doom the project and his team to disaster.",
    "Actors": [
      "Leonardo DiCaprio",
      "Joseph Gordon-Levitt",
      "Elliot Page"
    ],
    "IsAvailable": true,
    "CreatedDate": new Date()
  },
  {
    "Title": "Star Wars",
    "Genre": "Fantasy",
    "Director": "George Lucas",
    "Runtime": 121,
    "Score": 8.6,
    "Description": "Luke Skywalker joins forces with a Jedi Knight, a cocky pilot, a Wookiee and two droids to save the galaxy from the Empire's world-destroying battle station, while also attempting to rescue Princess Leia from the mysterious Darth Vader.",
    "Actors": [
      "Mark Hamill",
      "Harrison Ford",
      "Carrie Fisher"
    ],
    "IsAvailable": true,
    "CreatedDate": new Date()
  },
  {
    "Title": "Saving Private Ryan",
    "Genre": "War",
    "Director": "Steven Spielberg",
    "Runtime": 139,
    "Score": 8.6,
    "Description": "Following the Normandy Landings, a group of U.S. soldiers go behind enemy lines to retrieve a paratrooper whose brothers have been killed in action.",
    "Actors": [
      "Tom Hanks",
      "Matt Damon",
      "Tom Sizemore"
    ],
    "IsAvailable": true,
    "CreatedDate": new Date()
  }
]);

print("Database initialization script executed successfully.");