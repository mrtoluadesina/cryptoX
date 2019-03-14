$('#logout').click((e) => {
  localStorage.clear();
  window.location.replace("./login.html");
});
$(document).ready(() => {
  var userId = localStorage.userId;
  $.ajax({
    method: "GET",
    url: `http://localhost:3000/users?id=${userId}`,
    data: { get_param: 'value'}
  }).done(data => {
    data[0].firstname === undefined ? $('#user-info').text(`Welcome ${data[0].username}`) : $('#user-info').text(`Welcome ${data[0].firstname}`);
  });
  $.ajax({
    method: "GET",
    url: `http://localhost:3000/userWallets?userId=${userId}`,
    data: { get_param: 'value'}
  }).done(data => {
    $('#walletNo').text(`${data.length}`)
  })
  $.ajax({
    method: "GET",
    url: `http://localhost:3000/transactions?userId=${userId}`,
    data: { get_param: 'value'}
  }).done(data => {
    $('#transNo').text(`${data.length}`)
  })
})
$('#menuSlide').click(e => {
  e.preventDefault();
  
})
$(document).ready(function(e){
  console.log('data');
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