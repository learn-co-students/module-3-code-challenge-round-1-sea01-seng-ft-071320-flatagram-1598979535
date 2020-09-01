// write your code here

///////////////////
//function calls
likesListner() 
getImages()
getComments()  

///////////////////
//listening functions
function likesListner(){
  heartElement = document.getElementsByClassName('like-button')[0] //find the heart icon/button

  heartElement.addEventListener('click', handleLikes) //attach listen for click and callback function handleLikes
}

function newCommentListner(){
  commentForm = document.getElementById("form")
  commentForm.addEventListener('submit', renderNewComment)  // shortcuting process for time ;) 
}


///////////////////
//handling function
function handleComments(comments){
  comments.forEach(comment => {
    renderComments(comment) //send each comment  to get render
  })
} 


function handleImages(images){
  images.forEach(image => {
    renderCard(image)  //for each image/card in db display the images/card items. Comments displayed via another function
  }) 
}

function handleLikes(event){
  event.preventDefault 
  
  likesNumbersElement = event.target.previousElementSibling //get the likes element

  likesText = likesNumbersElement.innerText //get just the text e.g. "3 likes"
  newLikeNumber = parseInt(likesText) //get & make just an integer 


  if(event.target.matches("button.like-button"))
  {
    newLikeNumber += 1
    patchLikesNumber(newLikeNumber, event)
  }
  
  // code below for removing a like. needs listener and dislike button  
  // if(event.target.matches("button.dislike-button")
  // ){
  //   newLikeNumber = newLikeNumber - 1
  //   patchLikesNumber(newLikeNumber, event)
  // }



}


///////////////////
//fetch calls
function getComments(){
  //this gets _all_ images, event just one
fetch('http://localhost:3000/comments')
.then(response => response.json())
.then(comments => 
  handleComments(comments)
  );
} 

function getImages(){
//this gets _all_ images, event just one
fetch('http://localhost:3000/images')
  .then(response => response.json())
  .then(images => 
    handleImages(images)
    );


}

function patchLikesNumber(newLikeNumber, event){
  //options to update the json DB with likes
  options = {
    method: 'PATCH', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "likes": `${newLikeNumber}`
    })
  }

 
 fetch(`http://localhost:3000/images/${event.target.parentElement.parentElement.id}`, options)
 .then(resp => resp.json())
 .then(image => {
   console.log(image) //images data from DB
   renderLikesToDom(image, event)  //pesssmistic render
 } ) 
}






///////////////////
//DOM Manipulation functions
function renderNewComment(event){
  event.preventDefault
  // if(event.preventDefault.matches....)
  // code not complete. almost. ran out of time., 
}


function renderComments(comments){
console.log(comments)

  document.getElementsByClassName("comments")[0].innerHTML = `<li>${comments.content}<li>`

  //need to load all comments. picked wrong location for the loop
}


function renderCard(image){
  cardElement = document.getElementById(image.id) //locate the card in order to add the json to it

  cardElement.firstElementChild.innerText = image.title  //update tile 

  cardElement.getElementsByTagName("img")[0].src = image.image  //update image 

  cardElement.getElementsByClassName("likes")[0].innerText = `${image.likes} likes`  //update likes from db

  

}

function renderLikesToDom(image, event){
   
  likesNumbersElement = event.target.previousElementSibling //get the likes element

  likesNumbersElement.innerText = `${image.likes} likes` //update the DOM with number and text


}

