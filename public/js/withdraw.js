var withdraw_currency = 0;

$('#currency-type').change(function(){
    var selected = $('#currency-type').val();

    if(selected === "naira"){
        $('#withdraw').prop('disabled', false);
        $('#naira').show();
        $('#dollar').hide();
        
        withdraw_currency = 1;
        
    }
    else if(selected === "dollar"){
        $('#withdraw').prop('disabled', false);
        $('#dollar').show();
        $('#naira').hide();
        
        withdraw_currency = 2;
    }
    else{
        $('#withdraw').prop('disabled', true);
        $('#dollar').hide();
        $('#naira').hide();
        
        withdraw_currency = 0;
    }
});
var balance;
userId = localStorage.userId;

$('#newWithdraw').submit(function(e){
e.preventDefault();
        $.ajax({
        method: "GET",
        url: `${baseUrl}userWallets?userId=${userId}&walletCurrency=Naira`,
        data: { get_param: 'value'}
    }).done(data => {    
        balance = parseFloat(data[0].balance);
        var amt = $('#naira-amount').val();
        localStorage.amount = amt;
        localStorage.timestamp = (new Date).toLocaleString('en-GB');
        if(balance >= amt){
            balance-=amt;
            balance = balance.toFixed(2);

            $.each(data, (index, el) => {
                if(el.walletCurrency === 'Naira') {
                  $.ajax({
                    method: "PUT",
                    url: `${baseUrl}userWallets/${userId}`,
                    data: {
                      "userId": `${userId}`,
                      "walletCurrency": `${el.walletCurrency}`,
                      "balance": `${balance}`,
                      "symbol": `${el.symbol}`
                    }
                  }).done(() => {

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
                    $.ajax({
                        method: "POST",
                        url: `${baseUrl}transactions`,
                        data: {
                          "userId": `${userId}`,
                          "userWalletId": 1,
                          "transactionType": "Withdraw",
                          "amount": `${localStorage.amount}`,
                          "status": "success",
                          "transactionId": `${trxref}`,
                          "reference": `${ref}`,
                          "timestamp": `${localStorage.timestamp}`,
                          "currencyWallet": `${localStorage.currencyClicked}`
                        }
                      }).done(() => {
                        window.location.href("./wallets.html")
                      });

                      swal({
                        text: `You have successfully withdrawn ${amt}`,
                        icon: "success"
                      }).then(()=> {
                        window.location.href = "./wallets.html";
                      });
                  })
                }
              })

        }
        else{
            swal({
              text: 'You do not have sufficient funds for withdrawal',
              icon: 'warning'
            })
        }
    });
});

