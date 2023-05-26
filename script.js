$(document).ready(function () {
  $('#toggleSns').click(function () {
    $('ul', this.parentElement).toggleClass('hidden')
  })
})

$(document).ready(function () {
  loadContent('home')

  $('.nav-link').on('click', function (e) {
    e.preventDefault()
    const contentName = $(this).data('content')
    loadContent(contentName)
  })

  function loadContent(name) {
    $.ajax({
      url: `main.html`,
      type: 'GET',
      dataType: 'html',
      success: function (data) {
        const targetElement = $(`<div>${data}</div>`).find(`#${name}`)
        if (targetElement.length > 0) {
          $('#main-content').html(targetElement)
        } else {
          console.log('Error: target element not found.')
        }
      },
      error: function (err) {
        console.log('Error while loading content:', err)
      },
    })
  }
})

const submitButton = document.getElementById('submitButton')
const postTitle = document.getElementById('postTitle')
const postBody = document.getElementById('postBody')
const postsDiv = document.getElementById('posts')
const postViewer = document.getElementById('postViewer')
const viewTitle = document.getElementById('viewTitle')
const viewBody = document.getElementById('viewBody')

submitButton.addEventListener('click', function () {
  const title = postTitle.value
  const body = postBody.value

  if (!title || !body) {
    alert('제목과 내용을 모두 입력해주세요!')
    return
  }

  const newPostKey = firebase.database().ref().child('posts').push().key
  firebase
    .database()
    .ref('posts/' + newPostKey)
    .set({
      title: title,
      body: body,
    })

  postTitle.value = ''
  postBody.value = ''
})

function createPostElement(postId, post) {
  const postElement = document.createElement('div')
  postElement.onclick = function () {
    viewPost(postId)
  }

  const postTitle = document.createElement('h4')
  postTitle.textContent = post.title
  postElement.appendChild(postTitle)

  return postElement
}

function displayPosts(posts) {
  postsDiv.innerHTML = ''

  for (const postId in posts) {
    const postElement = createPostElement(postId, posts[postId])
    postsDiv.appendChild(postElement)
  }
}

function viewPost(postId) {
  const postRef = firebase.database().ref('posts/' + postId)
  postRef.on('value', function (snapshot) {
    postViewer.style.display = 'block'
    viewTitle.textContent = snapshot.val().title
    viewBody.textContent = snapshot.val().body
  })
}

firebase
  .database()
  .ref('posts/')
  .on('value', function (snapshot) {
    displayPosts(snapshot.val())
  })
