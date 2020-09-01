// // write your code here
const images_url = "http://localhost:3000/images/1";
const comments = document.querySelector(".comments");
// invoke function
createUnlikeButton();
getImage();
addComment();
updateLikes();

function createUnlikeButton() {
  const div = document.querySelector(".likes-section");
  const unlikeBtn = document.createElement("button");
  unlikeBtn.className = "unlike-button";
  unlikeBtn.textContent = "👎";
  div.append(unlikeBtn);
}

function getImage() {
  fetch(images_url)
    .then((resp) => resp.json())
    .then((image) => addImage(image));
}

function addImage(image) {
  const img = document.querySelector(".image");
  const title = document.querySelector(".title");
  const likes = document.querySelector(".likes");

  img.src = image.image;
  title.textContent = image.title;
  likes.textContent = `${image.likes} Likes`;
  comments.innerHTML += commentList(image.comments);
}

function commentList(comments) {
  const list = comments
    .map((comments) => `<li>${comments.content}</li>`)
    .join(" ");
  return list;
}

function updateLikes() {
  const LikesSection = document.querySelector(".likes-section");
  LikesSection.addEventListener("click", (event) => {
    if (event.target.className === "like-button") {
      const span = event.target.previousElementSibling;
      const likes = +span.textContent.split(" ")[0] + 1;
      fetchLikes(likes);
    } else if (event.target.className === "unlike-button") {
      const span = event.target.previousElementSibling.previousElementSibling;
      const likes = +span.textContent.split(" ")[0] - 1;
      fetchLikes(likes);
    }
  });
}

function addComment() {
  const form = document.querySelector(".comment-form");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const input = event.target.comment;
    const createComment = document.createElement("li");
    createComment.textContent = input.value;
    comments.appendChild(createComment);
    input.value = "";
  });
}

function fetchLikes(likes) {
  fetch(images_url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ likes: likes }),
  })
    .then((resp) => resp.json)
    .then((data) => console.log(data));

  updateLikesInTag(likes);
}

function updateLikesInTag(likes) {
  const likesText = document.querySelector(".likes");
  likesText.textContent = `${likes} Likes`;
}
