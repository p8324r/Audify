# Audify

Even Semester Project for 2023 by Coding Club IITG.

## Description

The project's aim is to extract audio from video.\
This project uses React JS for the frontend and Express/Node JS for backend.\
The project implements Firebase Authentication service and Firebase Cloud Storage from Firebase.\
For the extraction of audio from video, Node libraries such as ffmpeg and fluent-ffmpeg is used.

## For the frontend

In the project directory, you can run:

### `npm install`

This will install all the required dependencies for the client side listed in package.json.

### `npm start` or `npm run`
Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `Ctrl-C`
To exit from/terminate the process.

## For the backend

First cd into the NodeServer directory

### `cd NodeServer`

### `npm install` 
This will install all the required dependencies for the server side listed in package.json in this directory.

### (OPTIONAL) `node server.js`
Starts the backend app at [http://localhost:5000](http://localhost:5000).\
Note that this will **NOT** refresh the server application if any live changes are made in the server.js file.

### (PREFERRED) `nodemon server.js`
Starts the backend app at [http://localhost:5000](http://localhost:5000).\
This will automatically refresh the server application if any live changes are made in the server.js file.

#### Note: On windows powershell, the command `Set-ExecutionPolicy Unrestricted -Scope Process` may be required for the `nodemon server.js` command.
#### you can see your current `ExecutionPolicy` by `get-ExecutionPolicy`

### `Ctrl-C`
To terminate the process.
