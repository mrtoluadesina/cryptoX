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
    $('#firstname').val(`${data[0].firstname === undefined ? '' : data[0].firstname}`);
    $('#lastname').val(`${data[0].lastname === undefined ? '' : data[0].lastname}`);
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
        }).done(() => {
          swal({
            text: "Profile Updated Successfully",
            icon: "success",
          });
          swal({
            text: "Profile Updated Successfully",
            icon: "success",
          }).then(() => {
            window.location.href = "./dashboard.html";
          });
        }).fail(() => {
          console.log('Network error - it is your fault!!!');
        })
      }
    });
    $('#delete').click(e => {
      e.preventDefault();
      swal({
        title: "Are you sure?",
        text: "Once deleted, you will not be able to recover your account!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          $.ajax({
            method: "PUT",
            url: `http://localhost:3000/users/${userId}`,
            data: {
              "firstname": `${data[0].firstname}`,
              "lastname": `${data[0].lastname}`,
              "email": `${data[0].email}`,
              "status": Number(0),
              "phonenumber": `${data[0].phonenumber}`
            }
          }).done(() => {
            swal("Poof! Your Account has been deleted!", {
              icon: "success",
            }).then(() => {
              localStorage.clear();
              window.location.replace("./index.html");
            });
          })
        } else {
          swal("Your account is safe!").then(() => {
            window.location.href = "./dashboard.html";
          });
        }
      });
      // $.ajax({
      //   method: "PUT",
      //   url: `http://localhost:3000/users/${userId}`,
      //   data: {
      //     "firstname": `${data[0].firstname}`,
      //     "lastname": `${data[0].lastname}`,
      //     "username": `${data[0].username}`,
      //     "email": `${data[0].email}`,
      //     "status": Number(0),
      //     "phonenumber": `${data[0].phonenumber}`
      //   }
      // }).done(() => {
      //   swal({
      //     title: "Are you sure?",
      //     text: "Once deleted, you will not be able to recover your account!",
      //     icon: "warning",
      //     buttons: true,
      //     dangerMode: true,
      //   }).then((willDelete) => {
      //     if (willDelete) {
      //       swal("Poof! Your Account has been deleted!", {
      //         icon: "success",
      //       }).then(() => {
      //         localStorage.clear();
      //         window.location.replace("./index.html");
      //       });
      //     } else {
      //       swal("Your account is safe!").then(() => {
      //         window.location.href = "./dashboard.html";
      //       });
      //     }
      //   });
      // })
    })
  });
});