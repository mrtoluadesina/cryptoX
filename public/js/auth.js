$('#confirm_password').keyup(e => {
  var password = $('#password').val(),
      password2 = $('#confirm_password').val();
  if( password !== password2) {
    $('#error').text('Password do not match!');
  } else {
    $('#error').text('');
  }
})
$('form#register').submit(e => {
  e.preventDefault();
  var email = $('#email').val(),
      phonenumber = $('#phonenumber').val(),
      username = $('#username').val(),
      password = $('#password').val();
  if( email && phonenumber && username && password ) {
    $.ajax({
      method: "POST",
      url: "http://localhost:3000/users",
      data: {
        "email": `${email}`,
        "phonenumber": `${phonenumber}`,
        "username": `${username}`,
        "password": `${password}`
      }
    }).done(res => {
      window.location.href("./login.html");
    }).fail(() => {
      console.log('Network error - it is not our fault!!!')
    })
  }
})
$('form#login').submit(e => {
  e.preventDefault();
  var username = $('#username').val(),
      password = $('#password').val();
  if( username && password ) {
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/users?username=${username}`,
      data: { get_param: 'value' }
    }).done(data => {
      if ( data[0].status === 1 && username === data[0].username && password === data[0].password) {
        localStorage.userId = data[0].id;
        window.location.replace("./dashboard.html");
      } else {
        alert(`user doesn't exist`)
      }
    }).fail(() => {
      alert('bad request - 700')
    })
  } else {
    console.log('Nothing here!!!');
  }
});