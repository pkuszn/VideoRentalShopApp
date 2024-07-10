# VideoRentalStoreApp #

## 1 Requirements 

- net8.0 sdk,
- mongoDb,
- WSL/Linux,
- docker

## 2 Description

The main functionality focuses on renting films from online video rental store. App provides an API written in C# ASP.NET Core WebAPI. It is an SPA app that uses Javascript on the front side and MongoDb as a database

## Usage

To run the app follow below instructions:

Move to main directory and run .sh file to create both images and containers
```bash
bash run_docker.sh
```

Next, you should be able to access the webpage with below address:
```
https://localhost:6001
```

## 4 Features

- Add new video,
- Delete video(only if it is not rented),
- Edit video,
- Add new user,
- Delete user,
- Edit user,
- Show entire collection of movies,
- Show users,
- Rent movie(<b>The maximum amount of videos to rent is 3</b>),
- Return of rented video(<b>You must to return the movie within 2 days</b>),
- Print all rented movies from specific user,
- Print all available movies(<b>which were not rented</b>)
- Show all available movies without details,
- Print collection of all rentals(<b>with history of rentals</b>),
- Show card of rentals from specific user(<b>with history of rentals</b>),
- Admin account
  - unlimited access to all features
- User account
  - Limited access to:
    - Print all available movies,
    - Print collection of my rentals,
    - Rent movie
  
## 5 Libraries

This application constists of various external libraries such as:

- Backend
  - FluentAssertions
  - Microsoft.AspNetCore.Mvc.Testing
  - MongoDB.Driver
  - Swashbuckle.AspNetCore
- Frontend
  - JQuery
