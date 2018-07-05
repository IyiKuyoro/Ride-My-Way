# Ride-My-Way  [![Build Status](https://travis-ci.org/IyiKuyoro/Ride-My-Way.svg?branch=Develop)](https://travis-ci.org/IyiKuyoro/Ride-My-Way) [![Coverage Status](https://coveralls.io/repos/github/IyiKuyoro/Ride-My-Way/badge.svg?branch=develop)](https://coveralls.io/github/IyiKuyoro/Ride-My-Way?branch=develop)
This is a simple web application that helps users find riders or drivers typically going in the same direction
Drivers can add ride offers, riders can view and request rides and drivers can accept or decline rider requests.

# Features
  * Sigin-Up
  * Sigin-In
  * View all avaliable rides
  * View a specific ride offer
  * Post a ride offer
  * Send a ride request
  * View ride requests
  * Accept or decline ride requests
  
 # Technologies used
 This application is written in JavaScript with node.js, integrating the following technologies and tools
  * Express - Used as the web framework for this application
  * Body-Parser - Used for parsing all data sent to the server
  * JWT - Used for authenticating and protecting some of the routes
  * Bcrypt - Used for hashing all passwords saved on the database
  * Babel - Used for transpiling all es6 code to es5
  * Mocha, chai and chai-http - Used as the primary test framework
  * Eslint (air-bnb) - The linting service used to code quality checks.
  * postgreSQL - The database engine used for this application
  
 # Current limitations
 This application is still very much a work in progress, and therefore has the following limitations
  * Users once signed up cannot delete their account
  * Users cannot edit their account
  * All posted ride offers cannot be deleted
  * All sent ride requests cannot be deleted
  
# Installation
  * In order to run this application you must have node.js already installed on your machine
  * Download or clone this application to your local machine
  * On your terminal, navigate to the project directory
  * Install all dependencies using `npm install`
  * Create a .env file in the root directory and add the following variables
    * `HEROKU_POSTGRESQL_WHITE_URL` this should be assign the connection string to the database you intend to use
    * `KEY` this can be set to any string. It represent the key that will be used by jwt
  * Set up three tables in your SQL database
    * Users - id (autogenerated int)
            - firstName (varchar)
            - lastName (varchar)
            - dob (date)
            - sex (varchar)
            - mobileNumber (int)
            - emailAddress (varchar)
            - password (varchar)
            - ridesTaken (int)
            - ridesOffered (int)
            - friends (int)
            - accountStatus (varchar)
            - friendsList (int[])
    * Rides - id (autogenerated int)
            - driverId (int)
            - origin (varchar)
            - destination (varchar)
            - time (time)
            - allowStops (int)
            - avaliableSpace (int)
            - description (varchar)
            - requests (int[])
    * Requests - id (autogenerated int)
               - rideId (int)
               - requesterId (int)
               - status (carchar)
               - requesterName (varchar)
               - mobileNumber (int)
               - driverId (int)
  * start the application using `npm run start`
# Acknowledgement
  * Andela
  * Bootcamp facilitators (Philip and Victoria)
  * Bootcamp Assistant Facilitators (Maranatha, Sasiliyu and others)
  * All fellow bootcampers
# Contributing
  * If you intend to contribute to the development of this project, I will be more than happy to welcome you on board
  * Just send fork the repo, or send me a mail if you want to be added as a contributor.
# Author
This project was done by myself Opeoluwa Anthony iyi-Kuyoro, with a lot of help from collegues.
# License & Copyright
MIT (c) Opeoluwa Iyi-Kuyoro
Licensed under the MIT License
