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
  $('#loader').show();
  var email = $('#email').val(),
      phonenumber = $('#phonenumber').val(),
      username = $('#username').val(),
      password = $('#password').val();
  if( email && phonenumber && username && password ) {
    const encrypted = CryptoJS.AES.encrypt(password, email);
    const encryptedPassword = encrypted.toString();
    $.ajax({
      method: "GET",
      url: `${baseUrl}users?username=${username}`,
      data: {get_param: 'value'}
    }).done(data => {
      var accountNumber = Math.floor(1000000000 + Math.random() * 9000000000);
      if (data.length !== 0 && data[0].phonenumber === phonenumber) {
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
          url: `${baseUrl}users`,
          data: {
            "email": `${email}`,
            "phonenumber": `${phonenumber}`,
            "username": `${username}`,
            "password": `${encryptedPassword}`,
            "status": 1,
            "accountNumber": `${accountNumber}`
          }
        }).done(data => {
          localStorage.userId = data.id;
          $.ajax({
            method: "POST",
            url: `${baseUrl}userWallets`,
            data: {
              "userId": localStorage.userId,
              "walletCurrency": "Naira",
              "balance": "0",
              "symbol": "NGN"
            }
          }).done(() => {
            Email.send({
              Host : "smtp.gmail.com",
              Username : "DecaChain",
              Password : "Ai.,!54&dope",
              To : `${email}`,
              From : "decachain@gmail.com",
              Subject : `Welcome to DecaChain, ${username}`,
              Body : `You are now on the simplest cryptocurrency exchange platform ever. <br> 
              You should update your profile first, <a href="https://decachain.herokuapp.com/settings.html" target="_blank">click here</a> to do so`
            }).then( () => {

            });
            swal({
              text: "Successfully created your account",
              icon: "success",
              button: "Login"
            }).then(() => {
              $('#loader').hide();
              localStorage.pageTo = './settings.html'
              window.location.href = "./login.html";
            }); 
          });
        }).fail(() => {
          swal({
            text: 'Network error - it is not our fault!!!',
            icon: 'danger'
          })
        })
      }
    }).fail(() => {
      
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
      url: `${baseUrl}users?username=${username}`,
      data: { get_param: 'value' }
    }).done(data => {
      const decrypted = CryptoJS.AES.decrypt(data[0].password, data[0].email);
      const decryptedPassword = decrypted.toString(CryptoJS.enc.Utf8);
      if (data.length === 0) {
        swal({
          text: "User doesn't exist",
          icon: "warning"
        })
      } else if ( data[0].status == 1 && username === data[0].username && password === decryptedPassword) {
        localStorage.userId = data[0].id;
        localStorage.pageTo !== undefined ? window.location.replace(localStorage.pageTo) : window.location.replace("./dashboard.html");
      } else {
        swal(`user doesn't exist`)
      }
    }).fail(() => {
      swal({
        text: 'System Failed',
        icon: 'danger'
      })
    })
  } else {
    swal('Nothing here!!!');
  }
});