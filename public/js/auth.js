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
      method: "GET",
      url: `http://localhost:3000/users?username=${username}`,
      data: {get_param: 'value'}
    }).done(data => {
      console.log(data);
      if (data.length !== 0 ) {
        swal({
          title: "User already exists on Decachain",
          text: "Want to login?",
          icon: "warning",
          buttons: true,
          dangerMode: true,
        }).then((willLogin) => {
          if (willLogin) {
            location.href = './login.html'
          }
        })
      } else {
        $.ajax({
          method: "POST",
          url: "http://localhost:3000/users",
          data: {
            "email": `${email}`,
            "phonenumber": `${phonenumber}`,
            "username": `${username}`,
            "password": `${password}`,
            "status": 1
          }
        }).done(() => {
          swal({
            text: "Successfully created your account",
            icon: "success",
            button: "Now Login"
          }).then(() => {
            window.location.href = "./login.html";
          });
        }).fail(() => {
          console.log('Network error - it is not our fault!!!')
        })
      }
    }).fail(() => {
      
    })
  }
})
// $('form#register').submit(e => {
//   e.preventDefault();
//   var email = $('#email').val(),
//       phonenumber = $('#phonenumber').val(),
//       username = $('#username').val(),
//       password = $('#password').val();
//   if( email && phonenumber && username && password ) {
//     $.ajax({
//       method: "POST",
//       url: "http://localhost:3000/users",
//       data: {
//         "email": `${email}`,
//         "phonenumber": `${phonenumber}`,
//         "username": `${username}`,
//         "password": `${password}`,
//         "status": 1
//       }
//     }).done(() => {
//       swal({
//         text: "Successfully created your account",
//         icon: "success",
//         button: "Now Login"
//       }).then(() => {
//         window.location.href = "./login.html";
//       });
//     }).fail(() => {
//       console.log('Network error - it is not our fault!!!')
//     })
//   }
// })
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
      if (data.length === 0) {
        swal({
          text: "User doesn't exist",
          icon: "warning"
        })
      } else if ( data[0].status == 1 && username === data[0].username && password === data[0].password) {
        localStorage.userId = data[0].id;
        localStorage.pageTo !== undefined ? window.location.replace(localStorage.pageTo) : window.location.replace("./dashboard.html");
      } else {
        swal(`user doesn't exist`)
      }
    }).fail(() => {
      alert('bad request - 700')
    })
  } else {
    swal('Nothing here!!!');
  }
});