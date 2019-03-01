$(document).ready(() => {
  var userId = localStorage.userId;
  $.ajax({
    method: "GET",
    url: `http://localhost:3000/users?id=${userId}`,
    data: { get_param: 'value'}
  }).done(data => {
    $('#user-profile').text(`${data[0].username}'s profile`);
    $('#username').val(`${data[0].username}`);
    $('#email').val(`${data[0].email}`);
    $('#firstname').val(`${data[0].firstname}`);
    $('#lastname').val(`${data[0].lastname}`);
    $('#phonenumber').val(`${data[0].phonenumber}`);
    $('#country').val(`${data[0].country === undefined ? '' : data[0].country}`);
    $('form#profile').submit(e => {
      e.preventDefault();
      var firstname = $('#firstname').val(),
          lastname = $('#lastname').val(),
          phonenumber = $('#phonenumber').val(),
          country = $('#country').val();
      if( phonenumber ) {
        $.ajax({
          method: "PUT",
          url: `http://localhost:3000/users/${userId}`,
          data: {
            "firstname": `${firstname}`,
            "lastname": `${lastname}`,
            "username": `${data[0].username}`,
            "email": `${data[0].email}`,
            "status": `${data[0].status}`,
            "password": `${data[0].password}`,
            "phonenumber": `${phonenumber}`,
            "country": `${country}`
          }
        }).done(res => {
          $('#notification').text(`Profile Updated`);
          window.location.replace("file:///Users/user/Documents/bootcamp/mock-project/profile.html");
        }).fail(() => {
          console.log('Network error - it is your fault!!!');
        })
      }
    });
    $('#delete').click(e => {
      e.preventDefault();
      $.ajax({
        method: "PUT",
        url: `http://localhost:3000/users/${userId}`,
        data: {
          "firstname": `${data[0].firstname}`,
          "lastname": `${data[0].lastname}`,
          "username": `${data[0].username}`,
          "email": `${data[0].email}`,
          "status": parseInt(0),
          "phonenumber": `${data[0].phonenumber}`
        }
      }).done(() => {
        localStorage.clear();
        window.location.replace("./index.html");
      })
    })
  });
});