// write your code here/
//global variables
const imageContainer = document.querySelector('.image-container')
const form = document.createElement('form')
const newUl = document.createElement('ul')
//add event listener to form 
form.addEventListener('submit', (e) => addComment(e))

const addComment= (e) => {
    e.preventDefault()
    let comment = e.target.comment.value
    let li = document.createElement('li')
    li.textContent = comment
    newUl.appendChild(li)
    form.reset()

}

//function calls
fetchGetImage();

//fetches
function fetchGetImage() {
    fetch('http://localhost:3000/images/1')
    .then(resp => resp.json())
    // .then(image => console.log(image))
    .then(image => appendImage(image))
    
}
//DOM MAnipulation
const appendImage = (image) => {
    //creatingimgCard
    
    const imgCard = document.createElement('div')
    imgCard.className = 'image-card'

    const h2 = document.createElement('h2')
    h2.className = 'title'
    h2.textContent = image.title
    

    const img = document.createElement('img')
    img.src = image.image
    img.className = 'image'

    const likes_section = document.createElement('div')
    likes_section.className = 'likes-section'
    
    const likes = document.createElement('span')
    likes.className = 'likes'
    likes.textContent = `${image.likes} likes`
    
    
    const like_btn = document.createElement('button')
    like_btn.className = 'like-button'
    like_btn.textContent = '♥'
    like_btn.id = image.id
     //add event listener to like button 
    like_btn.addEventListener('click', (e) => addLike(e))
    
    //comments
    newUl.className = 'comments'
        image.comments.forEach(comment => {
            let li = document.createElement('li')
            li.textContent = comment.content
            newUl.appendChild(li)
        })
        
 //appending
    imageContainer.appendChild(imgCard)
    imgCard.append(h2, img, likes_section)
    likes_section.appendChild(likes)
    likes_section.appendChild(like_btn)
    likes_section.after(newUl)
    newUl.after(form)
    
//input form 
    form.className = 'comment-form'
    form.innerHTML = 
    ` <input class="comment-input"
        type="text"
        name="comment"
        placeholder="Add a comment..."
        />
        <button class="comment-button" type="submit">Post</button>
    `
    
}

// like button handler
const addLike = (e) => {

    const newLikes = parseInt(e.target.parentElement.firstElementChild.textContent) + 1

    fetch('http://localhost:3000/images/1', {
        method: 'PATCH',
        headers : {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({likes: newLikes})
    })
    .then(resp => resp.json())
    .then(image => {
        let previousLikes = e.target.parentElement.firstElementChild
        previousLikes.textContent = `${image.likes} likes`
    })
}

