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
// if(withdraw_currency === 1){

// }
        $.ajax({
        method: "GET",
        url: `http://localhost:3000/userWallets?userId=${userId}&walletCurrency=Naira`,
        data: { get_param: 'value'}
    }).done(data => {    
        balance = parseFloat(data[0].balance);
        console.log(balance);
        var amt = $('#naira-amount').val();
        localStorage.amount = amt;
        localStorage.timestamp = (new Date).toLocaleString();
        if(balance >= amt){
            balance-=amt;
            console.log(balance);

            $.each(data, (index, el) => {
                if(el.walletCurrency === 'Naira') {
                  $.ajax({
                    method: "PUT",
                    url: `http://localhost:3000/userWallets/${userId}`,
                    data: {
                      "userId": `${userId}`,
                      "walletCurrency": `${el.walletCurrency}`,
                      "balance": `${balance}`,
                      "symbol": `${el.symbol}`
                    }
                  }).done(() => {
                    console.log('done!')

                    var trxref = "T";
                    //Generate Transaction ID
                    for(var i=1;i<=15+(Math.trunc( Math.random()));i++){
                        trxref += Math.trunc(10 * (Math.random()));
                    }
                    console.log(trxref);
                    
                    var ref = "";
                    //Generate Reference #
                    for(var i=1;i<=9;i++){
                        ref += Math.trunc(10 * (Math.random()));
                    }
                    console.log(ref);


                    $.ajax({
                        method: "POST",
                        url: "http://localhost:3000/transactions",
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
            alert('You do not have sufficient funds for withdrawal')
        }
        console.log(data);
        console.log(balance);
           
    /*  if (data.length === 0) {
        // $('#wallet').append(`<button id="addWallet"> + Add Wallet</button>`);
        } else {
        $.each(data, (index, el) => {
            $('#wallet').append(`
            <div class="card">
                <div class="card-top">
                <span class="walletName">${el.walletCurrency} Wallet</span>
                <img class="walletLogo" src="./img/${el.symbol}.png" alt="naira">
                </div>
                <div class="card-content">
                <p>Balance: ${el.symbol} ${el.balance}</p>
                </div>
                <div class="card-bottom">
                <a class="${el.walletCurrency}-${el.walletCurrency === 'Naira' ? 'Withdraw' : 'Buy' }" href="${el.walletCurrency}-${el.walletCurrency === 'Naira' ? 'Withdraw' : 'Buy' }.html">${el.walletCurrency === 'Naira' ? 'Withdraw' : 'Buy' }</a>
                <a class="${el.walletCurrency}-${el.walletCurrency === 'Naira' ? 'Deposit' : 'Sell' }" href="${el.walletCurrency}-${el.walletCurrency === 'Naira' ? 'Deposit' : 'Sell' }.html">${el.walletCurrency === 'Naira' ? 'Deposit' : 'Sell' }</a>
                </div>
            </div>
            `);
            $('#selectCurrency option[value="' + el.walletCurrency + '"]').attr('disabled', 'disabled')
        });
        } */
    });
});

