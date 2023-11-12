## About Pet Project
NestJS application for serving NextJS app and API with protected routes for adminpanel
- using nodemailer for sending notifications
- creating first admin accout through GET request
- uploading and serving static: img and etc.
- tRPC module included for front side 

### Stack
- nestjs, @/passport, @/swagger
- mongoose, mongodb
- node-mailer
- docker, github-actions

> Repository contains .env file, more in **.env.example**

### Commands
```bash
# Docker create image
$ docker build --no-cache -t gadget-shop .
# Run container withh app on port 4000
$ docker run -p 4000:4000 gadget-shop
```
```bash
# Installation of all packages
$ npm install
```
```bash
# Running the app in development mode
$ npm run start:dev
$ npm run d
```
```bash
# Run lint, test and etc
$ npm run lint
$ npm run test
```
```bash
# Run validation before merging
$ npm run validate
```
```bash
# Create build and run the app in production mode
$ npm run build
$ npm run start:prod
```