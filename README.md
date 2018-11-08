# RPS App REST API

Node.js REST API for the RPS App Client.

## Description

Provides a REST API server for the RPS App Client. This is my project work for Web Development 1 2017 course. Made with Node.js, Express, Mongoose and Passport.

## Getting started

- clone the repo
- `npm install` to install dependencies
- provide environment variables in .env file in project root directory
- `npm start` to start a local server


## .env file content example
```
PORT=5000
DB_HOST=mongodb://localhost/
DB_NAME=RpsUsersdb
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
JWT_SECRET=secret_key_for_signing_token
JWT_ISSUER=token_issuer
JWT_EXPIRES_IN=1d
```
