const imageContainer = document.querySelector(".image-container");
const imageCard = document.querySelector(".image-card");
const commentsUl = imageCard.querySelector(".comments");
const likesSection = imageCard.querySelector(".likes-section");
const commentForm = imageCard.querySelector(".comment-form");
const likeButton = document.querySelector(".like-button");
const likes = imageCard.querySelector(".likes");
//functions
getImage();
listenToFormSubmit();
listenForLikeClick();

//listeners
function listenForLikeClick() {
  likesSection.addEventListener("click", handleLikeButtonClick);
}

function handleLikeButtonClick(event) {
  if (event.target.tagName === "BUTTON") {
    patchLikes(event);
  }

  function patchLikes(event) {
    const imageId = event.target.id;
    const totalLikes = event.target.parentElement.children[0].innerText;
    const totalLikesNumber = parseInt(`${totalLikes}`);
    const newLikes = totalLikesNumber + 1;
    const updatedLikes = { likes: newLikes };

    fetchPatchLikes(imageId, updatedLikes);
    // debugger;
    likes.innerText = `${newLikes} Likes`;
  }
}

function fetchPatchLikes(imageId, updatedLikes) {
  const options = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedLikes),
  };

  fetch(`http://localhost:3000/images/${imageId}`, options);
}

function listenToFormSubmit() {
  imageCard.addEventListener("submit", handleFormSubmit);
}

function handleFormSubmit(e) {
  e.preventDefault();
  comment = e.target.comment.value;
  commentsUl.innerHTML += `<li> ${comment}</li>`;
  commentForm.reset();
}
//fetch

function getImage() {
  fetch("http://localhost:3000/images/1")
    .then((response) => response.json())
    .then((image) => renderImageContent(image));
}
function renderImageContent(image) {
  // debugger
  likeButton.id = image.id;
  const h2 = imageCard.querySelector("h2");
  const img = imageCard.querySelector("img");

  h2.innerText = image.title;
  //need to use img.src for image url
  img.src = image.image;
  likes.innerText = `${image.likes} likes`;

  comments = image.comments;

  commentsUl.innerText = "";

  comments.forEach((comment) => appendComments(comment));
}

function appendComments(comment) {
  // debugger;
  commentsUl.innerHTML += `<li id= ${comment.id}>${comment.content}</li>`;
}
// need title, likes, and comments
//need to delete comments

//extras

//add comments to backend
// fetch comments/ with image id
// add comment id

//
