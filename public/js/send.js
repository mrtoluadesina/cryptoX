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
    url: `${baseUrl}userWallets?userId=${userId}`,
    data: {get_param: 'value'}
  }).done(data => {
    $.each(data, (index, el) => {
        $('#currencyType option[value="' + el.walletCurrency + '"]').prop('disabled', false);
        localStorage[el.walletCurrency] = el.balance;
        localStorage[el.walletCurrency + '-walletId'] = el.id;
        localStorage[el.walletCurrency + '-symbol'] = el.symbol;
    });
    $('form#sendCrypto').submit(e => {
      e.preventDefault();
      var currencyType = $('#currencyType').val();
      var accountNumber = $('#accountNo').val();
      var amountToSend = $('#amountToSend').val();
      if (currencyType && accountNumber && amountToSend && $.isNumeric(accountNumber) && $.isNumeric(amountToSend)) {
        $.ajax({
          method: 'GET',
          url: `${baseUrl}users?accountNumber=${accountNumber}`,
          data: {get_param: 'value'}
        }).done(data => {
          if (localStorage[currencyType] > amountToSend ) {
            localStorage.receiverId = data[0].id;
            localStorage.receiverEmail = data[0].email;
            $.ajax({
              method: "GET",
              url: `${baseUrl}userWallets?userId=${localStorage.receiverId}&&walletCurrency=${currencyType}`,
              data: { get_param: 'value' }
            }).done(data => {
              localStorage.receiverWallet = data[0].id;
              localStorage.receiverBalance = data[0].balance;
              swal({
                title: "Confirm Amount to send",
                text: `You are about to send ${localStorage[currencyType + '-symbol']} ${amountToSend}`,
                icon: "warning",
                buttons: [true, "Send"]
              }).then( willSend => {
                if (willSend) {
                  localStorage[currencyType] = Number(localStorage[currencyType]) - Number(amountToSend);
                  $.ajax({
                    method: 'PUT',
                    url: `${baseUrl}userWallets/${localStorage[currencyType + '-walletId']}`,
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
                      url: `${baseUrl}transactions`,
                      data: {
                        "userId": `${userId}`,
                        "userWalletId": localStorage[currencyType + '-walletId'],
                        "transactionType": `Sent ${localStorage[currencyType + '-symbol']}`,
                        "amount": `${amountToSend}`,
                        "status": "success",
                        "transactionId": `${trxref}`,
                        "reference": `${ref}`,
                        "timestamp": `${localStorage.timestamp}`,
                        "currencyWallet": `${currencyType}`
                    }
                    }).done(() => {
                      $.ajax({
                        method: 'GET',
                        url: `${baseUrl}users?id=${userId}`,
                        data: {get_param : 'value'}
                      }).done(data => {
                        Email.send({
                          Host : "smtp.gmail.com",
                          Username : "DecaChain",
                          Password : "Ai.,!54&dope",
                          To : data[0].email,
                          From : "decachain@gmail.com",
                          Subject : 'You have sent ' + currencyType,
                          Body : `You just sent ${localStorage[currencyType + '-symbol']} ${amountToSend} to ${accountNumber}`
                        }).then(
                      
                        );
                      }); 
                    });
                    localStorage.receiverBalance = Number(localStorage.receiverBalance) + Number(amountToSend);
                    $.ajax({
                      method: 'PUT',
                      url: `${baseUrl}userWallets/${localStorage.receiverWallet}`,
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
                        url: `${baseUrl}transactions`,
                        data: {
                          "userId": `${localStorage.receiverId}`,
                          "userWalletId": localStorage.receiverWallet,
                          "transactionType": `Received ${localStorage[currencyType + '-symbol']}`,
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
                            Subject : 'You have been credited ' + currencyType,
                            Body : `Somebody just credited you with ${localStorage[currencyType + '-symbol']} ${amountToSend}`
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
          } else {
            swal({
              text: 'Insufficient Funds',
              icon: 'warning',
              button: 'Add Funds'
            }).then(() => {
              localStorage.currencyClicked = currencyType;
              localStorage.currencyClickedBalance = localStorage[currencyType];
              localStorage.currencyClickedSymbol = localStorage[currencyType + '-symbol'];
              localStorage.pageBackTo = './send.html'
              location.href = './buy.html'
            })
          }
          })
    } else {
      swal({
        text: 'You need to complete all fields appropriately',
        icon: 'warning'
      })
    }
  });
  }).fail(() => {

  })
// });