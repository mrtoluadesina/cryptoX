$('#logout').click((e) => {
  localStorage.clear();
  window.location.replace("./login.html");
});
$(document).ready(() => {
  var userId = localStorage.userId;
  $.ajax({
    method: "GET",
    url: `${baseUrl}users?id=${userId}`,
    data: { get_param: 'value'}
  }).done(data => {
    data[0].firstname === undefined ? $('#user-info').text(`Welcome ${data[0].username}`) : $('#user-info').text(`Welcome ${data[0].firstname}`);
  });
  $.ajax({
    method: "GET",
    url: `${baseUrl}users?id=${userId}`,
    data: { get_param: 'value' }
  }).done(data => {
    $('#walletAddy').text(`Key: ${data[0].accountNumber}`)
    $('#accountKey').text(`Key: ${data[0].accountNumber}`)
  });
  $.ajax({
    method: "GET",
    url: `${baseUrl}userWallets?userId=${userId}`,
    data: { get_param: 'value'}
  }).done(data => {
    $('#walletNo').text(`${data.length}`)
  })
  $.ajax({
    method: "GET",
    url: `${baseUrl}transactions?userId=${userId}`,
    data: { get_param: 'value'}
  }).done(data => {
    $('#transNo').text(`${data.length}`)
  })
})
$(document).ready(function(e){
  $.ajax({
    type: 'GET',
    headers: {
        apiKey: 'vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A',
        secretKey: 'NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j'
    },
    url: 'https://cors-anywhere.herokuapp.com/https://api.binance.com/api/v1/ticker/price',
    data: { symbol: 'BTCUSDT' }
  }).done(function (data){
    var bitPrice = Number(data.price).toFixed(2);
    var btcngn = Number(bitPrice * 365).toFixed(2);
      $('#btcNgn').text(`BTC/NGN ${btcngn}`);
  });
});
// Mobile Navigation
if ($('#sidebar').length) {
  var $mobile_nav = $('#sidebar').clone().prop({
    id: 'mobile-nav'
  });
  $mobile_nav.find('> ul').attr({
    'class': '',
    'id': ''
  });
  $('body').append($mobile_nav);
  $('body').prepend('<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>');
  $('body').append('<div id="mobile-body-overly"></div>');

  $(document).on('click', '#mobile-nav-toggle', function(e) {
    $('body').toggleClass('mobile-nav-active');
    $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
    $('#mobile-body-overly').toggle();
  });

  $(document).click(function(e) {
    var container = $("#mobile-nav, #mobile-nav-toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
        $('#mobile-body-overly').fadeOut();
      }
    }
  });
} else if ($("#mobile-nav, #mobile-nav-toggle").length) {
  $("#mobile-nav, #mobile-nav-toggle").hide();
}

// var idleTime = 0;
// $(document).ready(function () {
//     //Increment the idle time counter every minute.
//     var idleInterval = setInterval(timerIncrement, 60000); // 1 minute

//     //Zero the idle timer on mouse movement.
//     $(this).mousemove(function (e) {
//         idleTime = 0;
//     });
//     $(this).keypress(function (e) {
//         idleTime = 0;
//     });
// });

// function timerIncrement() {
//     idleTime = idleTime + 1;
//     if (idleTime > 2) { // 20 minutes
//         // window.location.reload();
//         swal({
//           text : 'you are logged out',
//           icon: 'warning'
//         });
//     }
// }