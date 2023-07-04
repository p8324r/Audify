# Audify

Even Semester Project for 2023 by Coding Club IITG.

## Description

The project's aim is to extract audio from video.\
This project uses React JS for the frontend and Express/Node JS for backend.\
The project implements Firebase Authentication service and Firebase Cloud Storage from Firebase.\
For the extraction of audio from video, Node libraries such as ffmpeg and fluent-ffmpeg is used.

## Firebase Services

In the frontend part (i.e in the top directory) `firebase` is required, whereas for backend (i.e in `NodeServer` directory) `firebase-admin` is required.\
These will be automatically installed by the `npm install` command.

You need a Google Account for the following.

### Firebase Authentication

#### For the client side 
Follow the steps given here: [Add Firebase to your JavaScript project](https://firebase.google.com/docs/web/setup) to create a project in firebase.

While registering, the configuration object will be provided, which should be put into the `src/firebase-config.js` file.

#### For the server side
Follow the steps given here: [Add Firebase-Admin SDK to your JavaScript project](https://firebase.google.com/docs/admin/setup#prerequisites) to create service account.\
During the setup process, A private key for the service account will be generated which has to be linked to the `NodeServer\firebase-config.js` file.\
The path to the file must be provided in the file.(Marked in the file).

### Firebase Storage

Follow the steps given here: [Get started with Cloud Storage on Web](https://firebase.google.com/docs/storage/web/start).\
For the backend, you may refer this : [Introduction to the Admin Cloud Storage API](https://firebase.google.com/docs/storage/admin/start)\
or simply add: `'storageBucket' : '<BUCKET_NAME>.appspot.com'`, same as the frontend.


## For the frontend

In the project directory, you can run:

### `npm install`

This will install all the required dependencies for the client side listed in package.json.\
After the above step, first complete the Firebase part.

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
After the above step, first complete the Firebase part.

### (OPTIONAL) `node server.js`
Starts the backend app at [http://localhost:5000](http://localhost:5000).\
Note that this will **NOT** refresh the server application if any live changes are made in the server.js file.

### (PREFERRED) `nodemon server.js`
Starts the backend app at [http://localhost:5000](http://localhost:5000).\
This will automatically refresh the server application if any live changes are made in the server.js file.

#### Note: On windows powershell, the command `Set-ExecutionPolicy Unrestricted -Scope Process` may be required for the `nodemon server.js` command.
#### You can see your current `ExecutionPolicy` by `get-ExecutionPolicy`.

### `Ctrl-C`
To terminate the process.
