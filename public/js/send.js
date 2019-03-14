var userId = localStorage.userId;
var apiCon;

function transactionDetails(){
  localStorage.timestamp = (new Date).toLocaleString('en-GB');
  var trxref = "T";
  //Generate Transaction ID
  for(var i=1;i<=15+(Math.trunc( Math.random()));i++){
      trxref += Math.trunc(10 * (Math.random()));
  }
  var ref = "";
  //Generate Reference #
  for(var i=1;i<=9;i++){
      ref += Math.trunc(10 * (Math.random()));
  }
  return {'trxref': trxref,
          'ref': ref};
}

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
        localStorage.receiverEmail = data[0].email;
        $.ajax({
          method: "GET",
          url: `http://localhost:3000/userWallets?userId=${localStorage.receiverId}&&walletCurrency=${currencyType}`,
          data: { get_param: 'value' }
        }).done(data => {
          localStorage.receiverWallet = data[0].id;
          localStorage.receiverBalance = data[0].balance;
          swal({
            title: "Confirm Amount to send",
            text: `You are about to send ${currencyType} ${amountToSend}`,
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
                var trans = transactionDetails();
                var trxref = trans.trxref;
                var ref = trans.ref;
                $.ajax({
                  method: "POST",
                  url: "http://localhost:3000/transactions",
                  data: {
                    "userId": `${userId}`,
                    "userWalletId": localStorage[currencyType + '-walletId'],
                    "transactionType": "Send",
                    "amount": `${amountToSend}`,
                    "status": "success",
                    "transactionId": `${trxref}`,
                    "reference": `${ref}`,
                    "timestamp": `${localStorage.timestamp}`,
                    "currencyWallet": `${currencyType}`
                }
                }).done(() => {
                    console.log('added to transactions Table - sent')
                });
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
                  var trans = transactionDetails();
                  var trxref = trans.trxref;
                  var ref = trans.ref;
                  $.ajax({
                    method: "POST",
                    url: "http://localhost:3000/transactions",
                    data: {
                      "userId": `${localStorage.receiverId}`,
                      "userWalletId": localStorage.receiverWallet,
                      "transactionType": "Received",
                      "amount": `${amountToSend}`,
                      "status": "success",
                      "transactionId": `${trxref}`,
                      "reference": `${ref}`,
                      "timestamp": `${localStorage.timestamp}`,
                      "currencyWallet": `${currencyType}`
                  }
                  }).done(() => {
                    Email.send({
                        Host : "smtp.gmail.com",
                        Username : "DecaChain",
                        Password : "Ai.,!54&dope",
                        To : localStorage.receiverEmail,
                        From : "decachain@gmail.com",
                        Subject : `You have been credited ${currencyType}`,
                        Body : `Somebody just credited you with ${amountToSend} ${currencyType}s`
                    }).then(
                      
                    );
                  });
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