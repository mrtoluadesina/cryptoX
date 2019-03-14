var userId = localStorage.userId;
// localStorage.selectedCurrency = $('#currency-type').val();
var apiCon;


  $.ajax({
    method: 'GET',
    url: `http://localhost:3000/userWallets?userId=${userId}`,
    data: {get_param: 'value'}
  }).done(data => {
    $.each(data, (index, el) => {
        $('#currencyType option[value="' + el.walletCurrency + '"]').prop('disabled', false);
        localStorage[el.walletCurrency] = el.balance;
        localStorage[el.walletCurrency + '-walletId'] = el.id;
        localStorage[el.walletCurrency + '-symbol'] = el.symbol;
    });
    // if (currencyType.length === 1 && currencyType !== 'Choose') $('#sendCryptocurrency').prop('diasbaled', false);
    $('form#sendCrypto').submit(e => {
      e.preventDefault();
      var currencyType = $('#currencyType').val();
      var accountNumber = $('#accountNo').val();
      var amountToSend = $('#amountToSend').val();
      currencyType && accountNumber && amountToSend ? console.log("all filled") : console.log("all not filled")
      $.ajax({
        method: 'GET',
        url: `http://localhost:3000/users?accountNumber=${accountNumber}`,
        data: {get_param: 'value'}
      }).done(data => {
        localStorage.receiverId = data[0].id;
        $.ajax({
          method: "GET",
          url: `http://localhost:3000/userWallets?userId=${localStorage.receiverId}&&walletCurrency=${currencyType}`,
          data: { get_param: 'value' }
        }).done(data => {
          localStorage.receiverWallet = data[0].id;
          localStorage.receiverBalance = data[0].balance;
          swal({
            title: "Confirm Amount to send",
            text: `You are about to send ${amountToSend}`,
            icon: "warning",
            buttons: [true, "Send"]
          }).then( willSend => {
            if (willSend) {
              localStorage[currencyType] = Number(localStorage[currencyType]) - Number(amountToSend);
              $.ajax({
                method: 'PUT',
                url: `http://localhost:3000/userWallets/${localStorage[currencyType + '-walletId']}`,
                data: {
                  "userId": `${userId}`,
                  "walletCurrency": `${currencyType}`,
                  "balance": localStorage[currencyType],
                  "symbol": localStorage[currencyType + '-symbol'],
                }
              }).done(() => {
                localStorage.receiverBalance = Number(localStorage.receiverBalance) + Number(amountToSend);
                $.ajax({
                  method: 'PUT',
                  url: `http://localhost:3000/userWallets/${localStorage.receiverWallet}`,
                  data: {
                    "userId": `${localStorage.receiverId}`,
                    "walletCurrency": `${currencyType}`,
                    "balance": localStorage.receiverBalance,
                    "symbol": localStorage[currencyType + '-symbol'],
                  }
                }).done(() => {
                  swal({
                    text: `You have successfully sent ${localStorage[currencyType + '-symbol']} ${amountToSend}`,
                    icon: "success"
                  }).then(() => {
                    localStorage.clear();
                    localStorage.userId = userId;
                    location.href = './wallets.html';
                  })
                })
              })
            }
          }) 
        })
      }).fail(() => {

      })
    });
  }).fail(() => {

  })
// });