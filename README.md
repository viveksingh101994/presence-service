# Presence-service

#### Overview

It is a service which will detect the signedIn active users which are on the dashboard and will be seen to everyone.

#### Technology Description

The project is based on Frontend and Backend in which the following technologies are used for the development.

- Frontend : React, Redux, Pubnub
- Backend: Node in Typescript, MongoDB, Firebase Storage

#### Pre-requisite for project

- Create a Database in MongoDb and set the following keys
  - MONGODB_CONNECTION_STRING
  - DB_NAME
- Create a fireBase storage account and set the following keys
  - FIREBASE_PRIVATE_KEY
  - FIREBASE_CLIENT_EMAIL
  - PROJECT_ID
  - STORAGE_BUCKET
- Set cors settings
  - CORS_ORIGIN=http://localhost:3000

#### Commands to run

- For Backend

  - Run `npm run build`
  - Run `npm start`

- For Frontend
  - Run `cd client`
  - Set SERVER_URL=http://localhost:5000
  - Run `npm start`
