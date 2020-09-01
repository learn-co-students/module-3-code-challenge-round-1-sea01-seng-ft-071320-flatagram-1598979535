initEventListeners();
fetchAndRenderSingleImageCard();

function fetchAndRenderSingleImageCard() {
  fetch("http://localhost:3000/images/1")
    .then((resp) => resp.json())
    .then(appendImageCardNode);
}

function appendImageCardNode(imageObj) {
  const imageContainer = document.getElementById("image-container");

  imageContainer.appendChild(renderImageCardNode(imageObj));
}

function renderImageCardNode(imageObj) {
  const imageCard = document.createElement("div");
  imageCard.classList.add("image-card");
  imageCard.id = imageObj.id;
  imageCard.innerHTML = `
    <h2 class="title">${imageObj.title}</h2>
    <img src="${imageObj.image}" class="image" />
    <div class="likes-section" data-likes="${imageObj.likes}">
      <span class="likes"
        data-image-id="${imageObj.id}">
          ${imageObj.likes} likes - click to remove
      </span>
      <button class="like-button" data-image-id="${imageObj.id}">♥</button>
    </div>
    <ul class="comments">
      <li>Click a comment to delete it!</li>
      ${renderCommentsHTML(imageObj.comments)}
    </ul>
    <form class="comment-form">
      <input
        class="comment-input"
        type="text"
        name="content"
        placeholder="Add a comment..."
      />
      <button class="comment-button" type="submit">Post</button>
    </form>
    `;

  return imageCard;
}

function renderCommentsHTML(comments) {
  let commentsHTML = "";

  for (const comment of comments) {
    commentsHTML += renderCommentHTML(comment);
  }

  return commentsHTML;
}

function renderCommentHTML(comment) {
  return `
  <li
    id="${comment.id}"
    class="comment"
    data-image-id="${comment.imageId}">
    ${comment.content}
  </li>`;
}

function renderCommentNode(comment) {
  const commentNode = document.createElement("li");
  commentNode.id = comment.id;
  commentNode.dataset.imageId = comment.imageId;
  commentNode.textContent = comment.content;

  return commentNode;
}

function initEventListeners() {
  document.addEventListener("mouseup", handleMouseUp);
  document.addEventListener("submit", handleSubmit);
}

function handleMouseUp(event) {
  if (event.target.matches(".like-button")) {
    const likesSection = event.target.parentElement;
    let likes = +likesSection.dataset.likes + 1;

    // likesSection.dataset.likes = likes.toString();

    // const likeNode = likesSection.getElementsByClassName("likes")[0];

    // likeNode.textContent = `${likes} likes`;

    updateLikes(likes, likesSection);
    patchImageLikes(event.target.dataset.imageId, likes);
  } else if (event.target.matches(".likes")) {
    const likesSection = event.target.parentElement;
    let likes = likesSection.dataset.likes;

    if (likes == 0) return;

    likes -= 1;

    // likesSection.dataset.likes = likes.toString();

    // const likeNode = likesSection.getElementsByClassName("likes")[0];

    // likeNode.textContent = `${likes} likes`;

    updateLikes(likes, likesSection);
    patchImageLikes(event.target.dataset.imageId, likes);
  } else if (event.target.matches(".comment")) {
    const commentId = event.target.id;

    event.target.parentNode.removeChild(event.target);

    deleteComment(commentId);
  }
}

function updateLikes(likes, likesSection) {
  likesSection.dataset.likes = likes.toString();

  const likeNode = likesSection.getElementsByClassName("likes")[0];

  likeNode.textContent = `${likes} likes`;
}

function handleSubmit(event) {
  if (event.target.matches(".comment-form")) {
    event.preventDefault();

    const imageElement = event.target.parentElement;
    const commentsElement = imageElement.getElementsByClassName("comments")[0];

    const comment = {
      imageId: +imageElement.id,
      content: event.target.content.value,
    };

    commentsElement.appendChild(renderCommentNode(comment));

    event.target.content.value = "";

    postComment(comment);
  }
}

function patchImageLikes(imageId, likes) {
  const configObj = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Accept: "appliction/json",
    },
    body: JSON.stringify({
      likes: likes,
    }),
  };

  fetch(`http://localhost:3000/images/${imageId}`, configObj)
    .then((resp) => resp.json())
    .catch(console.log);
}

function postComment(comment) {
  const configObj = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(comment),
  };

  fetch("http://localhost:3000/comments/", configObj)
    .then((resp) => resp.json())
    .catch(console.log);
}

function deleteComment(commentId) {
  fetch(`http://localhost:3000/comments/${commentId}`, { method: "DELETE" })
    .then((resp) => resp.json())
    .catch(console.log);
}

// Projecting - could set this up to fetch and render all the cards
// Would need to render the skeletons for all the cards, then fire an event on each card to render the comments
// function fetchAndRenderAllImageCards() {
//   fetch("http://localhost:3000/images")
//     .then((resp) => resp.json())
//     .then(appendAllImageCards);
// }

// function appendAllImageCards(images) {
//   for (const image of images) {
//     appendImageCardNode(image);
//   }
// }
