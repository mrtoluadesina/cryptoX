$('form#homeForm').submit(e => {
  e.preventDefault();
  var currency = $('#currency').val(),
    amount = $('#amount').val();
    localStorage.currencyToExchange = currency;
    localStorage.amountToExchange = amount;
    $.ajax({
      method: "GET",
      url: `${baseUrl}wallets?currency=${currency}`,
      data: {get_param: 'value'}
    }).done(()=> {
      localStorage.currencyToExchangeSymbol = data.symbol;
    })
  if (currency && amount) {
    localStorage.pageTo = './wallets.html';
    window.location.href = './exchange.html';
  }
});
$(document).ready(() => {
  $('#exchange').append(`${localStorage.currencyToExchange} X NGN ${localStorage.amountToExchange}`);
  $.ajax({
    type: 'GET',
    headers: {
        apiKey: 'vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A',
        secretKey: 'NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j'
    },
    url: 'https://cors-anywhere.herokuapp.com/https://api.binance.com/api/v1/ticker/price',
    data: { symbol: 'BTCUSDT' }
  }).done(data => {
    var amount = localStorage.amountToExchange
    var bitPrice = Number(amount / 365).toFixed(2);
    var btcngn = Number(bitPrice / data.price).toFixed(6);
    localStorage.currencyToPayFor = btcngn;
      $('#amountToAdd').text(`BTC/NGN ${btcngn}`);
  });
})
$('#xAddFunds').click(e => {
  e.preventDefault();
  var userId = localStorage.userId;
  if (localStorage.userId === userId) {
    window.location.href = './wallets.html';
  } else {
    localStorage.pageTo = './wallets.html';
    window.location.href = './login.html';
  }
})