// write your code here
document.addEventListener("DOMContentLoaded", function () {
  fetchImages();
  fetchComments();
});
// FETCH
const fetchImages = () => {
  fetch("http://127.0.0.1:3001/images/1")
    .then((resp) => resp.json())
    .then((image) => showImage(image));
};

const fetchComments = () => {
  fetch("http://127.0.0.1:3001/comments")
    .then((resp) => resp.json())
    .then((comments) =>
      comments.forEach((e) => {
        showComments(e);
      })
    );
};

function showImage(image) {
  title = document.querySelector("h2");
  title.textContent = image.title;

  imageA = document.querySelector("div > img");
  imageA.src = image.image;

  likesB = document.querySelector("div > span");
  likesB.textContent = image.likes + " likes";

  likesButton = document.querySelector("button");
  likesButton.addEventListener("click", () => {
    likeImage(image);
  });
}

function showComments(comment) {
  commentsC = document.querySelector("ul");
  li = document.createElement("li");
  li.textContent = comment.content;
  commentsC.appendChild(li);
}

function addComment() {
  con = document.getElementById("id1").value;

  commentsC = document.querySelector("ul");
  li = document.createElement("li");
  li.textContent = con;
  commentsC.appendChild(li);

  // adding cooment to database is little buggy so i commented

  // fetch("http://127.0.0.1:3001/comments"),
  //   method: 'PATCH',
  //   headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
  //   body: JSON.stringify({ comments:  }),

  //   .then((res) => res.json())
  //   .then((data) => {});
}
