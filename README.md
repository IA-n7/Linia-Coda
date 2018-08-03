# Linia-Coda

## Description
Linia Coda is a queuing application for businesses who desire to streamline the queuing process of their service, effectively reducing the need for bigger room capacity, as well as improving customer morale by allowing them to be notified before their appointment.

This application is separated in two distinct components: the user side, and the business side.

The user will be able to create an account, browse through the registered services, select the particular service they require, and join the queue from home. They will then be notified when their turn is coming up via text messages.

The businesses will be able to register with the service, opening their clients to use their new and improved queuing system, as well as see analytics on the queue throughout the day. They will also be able to manage the queue directly from the app.

## Get started
#### Available on linia-coda.firebaseapp.com

To install the application locally, clone the repository and run 
```
npm install
```
You will then have to setup your own Firebase project by following the instructions on https://console.firebase.google.com/.
Create a Firebase.js file in your src/config folder and setup the database of your choosing by using a .env file. Once the setup is completed, run
```
npm start
```
And voilà! Happy queuing!
