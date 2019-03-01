$('form#homeForm').submit(e => {
  e.preventDefault();
  var currency = $('#currency').val(),
    amount = $('#amount').val();
    localStorage.currencyToExchange = currency;
    localStorage.amountToExchange = amount;
  if (currency && amount) {
    window.location.href = './exchange.html';
  }
});
$(document).ready(() => {
  $('#exchange').append(`${localStorage.currencyToExchange} X NGN ${localStorage.amountToExchange}`);
})
$('#xAddFunds').click(e => {
  e.preventDefault();
  var userId = localStorage.userId;
  if (localStorage.userId !== userId) {
    window.location.href = './wallets.html';
    // localStorage.pageTo = './wallets.html';
    // window.location.href = './login.html';
  } else {
    localStorage.pageTo = './wallets.html';
    window.location.href = './login.html';
    // var userId = localStorage.userId
    // $.ajax({
    //   method: "GET",
    //   url: `http://localhost:3000/users/${userId}`,
    //   data: { get_param: 'value' }
    // }).done(data => {
    //   window.location.href = './wallets.html'
    // })
  }
})