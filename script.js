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
