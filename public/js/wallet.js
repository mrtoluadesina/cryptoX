$(document).ready(() => {
  var userId = localStorage.userId;
  $.ajax({
    method: "GET",
    url: `${baseUrl}userWallets?userId=${userId}`,
    data: { get_param: 'value'}
  }).done(data => {
    if (data.length === 0) {
      // $('#wallet').append(`<button id="addWallet"> + Add Wallet</button>`);
    } else {
      $.each(data, (index, el) => {
        $('#wallet').append(`
          <div class="card">
            <div class="card-top">
              <span class="walletName">${el.walletCurrency} Wallet</span>
              <img class="walletLogo" src="./img/${el.symbol}.png" alt="${el.walletCurrency}">
            </div>
            <div class="card-content">
              <p>Balance: ${el.symbol} ${el.balance}</p>
            </div>
            <div class="card-bottom">
              <a id="${el.walletCurrency}" class="${el.walletCurrency}-${el.walletCurrency === 'Naira' ? 'Withdraw' : 'Buy' } ${el.walletCurrency}" href="${el.walletCurrency === 'Naira' ? 'Withdraw' : 'Buy' }.html">${el.walletCurrency === 'Naira' ? 'Withdraw' : 'Buy' }</a>
              <a id="${el.walletCurrency}" class="${el.walletCurrency}-${el.walletCurrency === 'Naira' ? 'Deposit' : 'Sell' } ${el.walletCurrency}" href="${el.walletCurrency === 'Naira' ? 'Deposit' : 'Sell' }.html">${el.walletCurrency === 'Naira' ? 'Deposit' : 'Sell' }</a>
            </div>
          </div>
        `);
        $('#selectCurrency option[value="' + el.walletCurrency + '"]').attr('disabled', 'disabled');
        $(`.${el.walletCurrency}`).click(() => {localStorage.currencyClicked = el.walletCurrency; localStorage.currencyClickedBalance = el.balance; localStorage.currencyClickedSymbol = el.symbol;});
      });
    }
  })
});
$('#addWallet').click(e => {
  $('#add-wallet').show();
});
$('#close').click(e => {
  e.preventDefault();
  $('#add-wallet').hide();
});
$('#newWallet').submit(e => {
  e.preventDefault();
  var currency = $('#selectCurrency').val(),
      userId = localStorage.userId;
  if (currency && currency !== 'Naira') {
    $.ajax({
      method: "GET",
      url: `${baseUrl}wallets?currency=${currency}`,
      data: { get_param: 'value' }
    }).done(data => {
      $.ajax({
        method: "POST",
        url: `${baseUrl}userWallets`,
        data: {
          "userId": `${userId}`,
          "walletCurrency": `${currency}`,
          "balance": parseInt(0),
          "symbol": `${data[0].symbol}`
        }
      }).done(() => {
        window.location.href = "./wallets.html";
      }).fail(() => {
        swal({
          text: 'Data no enter',
          icon: 'danger'
        });
      })
    }).fail(() => {
      swal({
        text: 'not gotten',
        icon: 'danger'
      });
    })
  }
})

function retrieve(){
  var obj = JSON.parse(localStorage.res);
  var amount = Number(localStorage.amount);
  var userId = localStorage.userId;
  var transaction = localStorage.transaction;
  var timestamp = localStorage.timestamp;

  if (transaction == 1) {
    $.ajax({
        method: "GET",
        url: `${baseUrl}userWallets?userId=${userId}`,
        data: {get_param: 'value'}
      }).done((data) => {
        $.each(data, (index, el) => {
          if(el.walletCurrency === 'Naira') {
            var walletId = el.id;
            amount += parseFloat(el.balance);
            // Update the Wallet
            $.ajax({
              method: "PUT",
              url: `${baseUrl}userWallets/${walletId}`,
              data: {
                "userId": `${userId}`,
                "walletCurrency": `${el.walletCurrency}`,
                "balance": `${amount}`,
                "symbol": `${el.symbol}`
              }
            }).done(() => {
              //Update the records
                $.ajax({
                method: "POST",
                url: `${baseUrl}transactions`,
                data: {
                  "userId": `${userId}`,
                  "userWalletId": 1,
                  "transactionType": "Deposit",
                  "amount": `${localStorage.amount}`,
                  "status": `${obj.status}`,
                  "transactionId": `${obj.trxref}`,
                  "reference": `${obj.trans}`,
                  "timestamp": `${timestamp}`
                }
              }).done(() => {
                window.location.href("./wallets.html")
              });
            })
          }
        })
        localStorage.transaction = 0;
    })
  }
}
retrieve();

