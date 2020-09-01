# Flatagram

x Today you'll be building an app for viewing, liking, and commenting on a single picture. You will be using a local API and building out the frontend for our app, Flatagram.

## Demo

Use this gif as an example of how the app should work.
x 
![demo gif](assets/demo.gif)

## Setup

- x Fork and clone this repository
- x Run `json-server --watch db.json --routes routes.json` to get the backend started
- x Open the `index.html` file on your browser

## Endpoints

x Your base URL for your API will be: 
http://localhost:3000

x The endpoints you will need are:

- GET `/images/1`
- x PATCH `/images/1`
- POST `/comments`
- DELETE `/comments/:id`

## Core Deliverables

As a user, I can:

- 1) See the image received from the server, 
x including its title, 
x likes 
x comments   (mostly done)
when the page loads

- x 2) Click on the heart icon to increase image likes, and still see them when I reload the page

- 3) Add a comment (no persistance needed)


## Advanced Deliverables

As a user, I can:

- Downvote an image

- Still see the comments written after reloading the page
  > For this one, you want to make a POST request to the `/comments` endpoint.
  > Your comment object must have an `imageId` key with a value of `1` for it to work.

- Delete a comment
  > To persist this, you will have to make a DELETE request to the `/comments/:id` endpoint.

