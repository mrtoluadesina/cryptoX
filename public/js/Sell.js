var exchange_currency = -1;
var value = 0;
var userId = localStorage.userId;
localStorage.selectedCurrency = $('#currency-type').val();
var apiCon;

$('#currBought').text(localStorage.currencyClicked);
$.ajax({
    method: 'GET',
    url: `${baseUrl}userWallets?userId=${userId}`,
    data: {get_param: 'value'}
}).done((data) => {
    $.each(data, (index, el) => {
        $('#currency-type option[value="' + el.walletCurrency + '"]').prop('disabled', false);
        
    });
    
    $('#currency-type').change(function(){
    var selected = $('#currency-type').val();
    localStorage.selectedCurrency = selected;
    
    if(selected === "Bitcoin"){
        $('#exchange').prop('disabled', false);
        $('#Bitcoin').show();
        $('#Naira').hide();
        $('#Ethereum').hide();
        $('#Ripple').hide();
        $('#Bitcoin-Cash').hide();
        $('#Stellar-Lumens').hide();
        if(localStorage.currencyClicked === "Bitcoin"){apiCon =  "BTCUSDT";}
        else if(localStorage.currencyClicked === "Ethereum"){apiCon =  "LTCBTC";}
        else if(localStorage.currencyClicked === "Ripple"){apiCon =  "BNBBTC";}
        else if(localStorage.currencyClicked === "Bitcoin-Cash"){apiCon =  "NEOBTC";}
        else if(localStorage.currencyClicked === "Stellar-Lumens"){apiCon =  "SNTETH";}
        
        exchange_currency = 0; 
    }else if(selected === "Naira"){
        $('#exchange').prop('disabled', false);
        $('#Naira').show();
        $('#Bitcoin').hide();
        $('#Ethereum').hide();
        $('#Ripple').hide();
        $('#Bitcoin-Cash').hide();
        $('#Stellar-Lumens').hide();
        if(localStorage.currencyClicked === "Bitcoin"){apiCon =  "BTCUSDT";}
        else if(localStorage.currencyClicked === "Ethereum"){apiCon =  "LTCBTC";}
        else if(localStorage.currencyClicked === "Ripple"){apiCon =  "BNBBTC";}
        else if(localStorage.currencyClicked === "Bitcoin-Cash"){apiCon =  "NEOBTC";}
        else if(localStorage.currencyClicked === "Stellar-Lumens"){apiCon =  "SNTETH";}
        
        exchange_currency = 1; 
    }else if(selected === "Ethereum"){
        $('#exchange').prop('disabled', false);
        $('#Naira').hide();
        $('#Bitcoin').hide();
        $('#Ethereum').show();
        $('#Ripple').hide();
        $('#Bitcoin-Cash').hide();
        $('#Stellar-Lumens').hide();
        if(localStorage.currencyClicked === "Bitcoin"){apiCon =  "BCHABCPAX";}
        else if(localStorage.currencyClicked === "Ethereum"){apiCon =  "LTCBTC";}
        else if(localStorage.currencyClicked === "Ripple"){apiCon =  "BNBBTC";}
        else if(localStorage.currencyClicked === "Bitcoin-Cash"){apiCon =  "NEOBTC";}
        else if(localStorage.currencyClicked === "Stellar-Lumens"){apiCon =  "SNTETH";}
        exchange_currency = 2; 
    }else if(selected === "Ripple"){
        $('#exchange').prop('disabled', false);
        $('#Naira').hide();
        $('#Bitcoin').hide();
        $('#Ethereum').hide();
        $('#Ripple').show();
        $('#Bitcoin-Cash').hide();
        $('#Stellar-Lumens').hide();
        if(localStorage.currencyClicked === "Bitcoin"){apiCon =  "BCHABCPAX";}
        else if(localStorage.currencyClicked === "Ethereum"){apiCon =  "LTCBTC";}
        else if(localStorage.currencyClicked === "Ripple"){apiCon =  "BNBBTC";}
        else if(localStorage.currencyClicked === "Bitcoin-Cash"){apiCon =  "NEOBTC";}
        else if(localStorage.currencyClicked === "Stellar-Lumens"){apiCon =  "SNTETH";}
        exchange_currency = 3; 
    }else if(selected === "Bitcoin-Cash"){
        $('#exchange').prop('disabled', false);
        $('#Naira').hide();
        $('#Bitcoin').hide();
        $('#Ethereum').hide();
        $('#Ripple').hide();
        $('#Bitcoin-Cash').show();
        $('#Stellar-Lumens').hide();
        if(localStorage.currencyClicked === "Bitcoin"){apiCon =  "BCHABCPAX";}
        else if(localStorage.currencyClicked === "Ethereum"){apiCon =  "LTCBTC";}
        else if(localStorage.currencyClicked === "Ripple"){apiCon =  "BNBBTC";}
        else if(localStorage.currencyClicked === "Bitcoin-Cash"){apiCon =  "NEOBTC";}
        else if(localStorage.currencyClicked === "Stellar-Lumens"){apiCon =  "SNTETH";} 
        exchange_currency = 4; 
    }else if(selected === "Stellar-Lumens"){
        $('#exchange').prop('disabled', false);
        $('#Naira').hide();
        $('#Bitcoin').hide();
        $('#Ethereum').hide();
        $('#Ripple').hide();
        $('#Bitcoin-Cash').hide();
        $('#Stellar-Lumens').show();
        if(localStorage.currencyClicked === "Bitcoin"){apiCon =  "BCHABCPAX";}
        else if(localStorage.currencyClicked === "Ethereum"){apiCon =  "LTCBTC";}
        else if(localStorage.currencyClicked === "Ripple"){apiCon =  "BNBBTC";}
        else if(localStorage.currencyClicked === "Bitcoin-Cash"){apiCon =  "NEOBTC";}
        else if(localStorage.currencyClicked === "Stellar-Lumens"){apiCon =  "SNTETH";}
        exchange_currency = 5; 
    }else{
        $('#exchange').prop('disabled', true);
        $('#Naira').hide();
        $('#Ethereum').hide();
        $('#Ripple').hide();
        $('#Bitcoin-Cash').hide();
        $('#Stellar-Lumens').hide();
        
        withdraw_currency = 0;
    }
    $.ajax({
        type: 'GET',
        headers: {
            apiKey: 'vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A',
            secretKey: 'NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j'
        },
        url: 'https://cors-anywhere.herokuapp.com/https://api.binance.com/api/v1/ticker/price',
        data: { symbol: apiCon }
    }).done(function (data){
        var dprice = Number(data.price);
        var dcurrency = localStorage.selectedCurrency;
        if(selected = "Naira"){
            dprice *= 365;
        }
        dprice = dprice.toFixed(2);
        dprice = dprice.toLocaleString();
        var click = localStorage.currencyClicked;
        $('#dprice').text(`1 ${click} : ${dprice} ${dcurrency}`);
    })
});
    $('#currency-type option[value="' + localStorage.currencyClicked + '"]').prop('disabled', true);
})



$('#Naira-amount').change(() => {
    
    var nai = $('#currency-type').val();
    var selector = `#${nai}-amount` + "";
    var selector1 = `#${nai}-equivalent` + "";

    transactSell(selector,selector1);
    
})
$('#Ethereum-amount').change(() => {
    
    var nai = $('#currency-type').val();
    var selector = `#${nai}-amount` + "";
    var selector1 = `#${nai}-equivalent` + "";

    transactSell(selector,selector1);

})
$('#Ripple-amount').change(() => {
    
    var nai = $('#currency-type').val();
    var selector = `#${nai}-amount` + "";
    var selector1 = `#${nai}-equivalent` + "";

    transactSell(selector,selector1);

})
$('#Bitcoin-Cash-amount').change(() => {
   
    var nai = $('#currency-type').val();
    var selector = `#${nai}-amount` + "";
    var selector1 = `#${nai}-equivalent` + "";

    transactSell(selector,selector1);

})
$('#Stellar-Lumens-amount').change(() => {
    
    var nai = $('#currency-type').val();
    var selector = `#${nai}-amount` + "";
    var selector1 = `#${nai}-equivalent` + "";

    transactSell(selector,selector1);

})


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

function transactSell(selector,selector1){
    var val =  $(selector).val();
    var selected = localStorage.currencyClicked;
    $('#loader').show();
    $.ajax({
        method: 'GET',
        url: `${baseUrl}userWallets?userId=${userId}&walletCurrency=${selected}`,
        data: { get_param: 'value'}
    }).done(data => {
        
        if (val <= Number(data[0].balance)) {
            localStorage.currentBalance = data[0].balance;
            localStorage.walletCurrency = data[0].walletCurrency;
            localStorage.walletId = data[0].id;
            $.ajax({
                type: 'GET',
                headers: {
                    apiKey: 'vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A',
                    secretKey: 'NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j'
                },
                url: 'https://cors-anywhere.herokuapp.com/https://api.binance.com/api/v1/ticker/price',
                data: { symbol: apiCon }
            }).done(function (data){
                var val1 = val*365;
                value = parseFloat(val1*(Number(data.price)));
                localStorage.currencyBot = value;
                $(selector1).text(value);
                $('#loader').hide();
                $('#exchange').click((e) =>{
                    e.preventDefault();
                    var curr = localStorage.selectedCurrency;
                    var x = Number(localStorage.currentBalance) - Number(val);
                    var walletId = localStorage.walletId;
                    if(localStorage.walletCurrency === selected){
                        $.ajax({
                            method: "PUT",
                            url: `${baseUrl}userWallets/${walletId}`,
                            data: {
                            "userId": `${userId}`,
                            "walletCurrency": `${localStorage.walletCurrency}`,
                            "balance": `${x}`,
                            "symbol": `${localStorage.currencyClickedSymbol}`
                            }
                        }).done(() => {
                            $.ajax({
                                method: 'GET',
                                url: `${baseUrl}userWallets?userId=${userId}&walletCurrency=${curr}`,
                                data: { get_param: 'value' }
                            }).done(data => {
                                // var newVal = parseFloat(Number(localStorage.currencyClickedBalance) + Number(localStorage.currencyBot));
                                var newVal = parseFloat(Number(data[0].balance) + Number(localStorage.currencyBot)).toFixed(2);
                                var currId = data[0].id;
                                localStorage.symbol = data[0].symbol;
                                $.ajax({
                                    method: 'PUT',
                                    url: `${baseUrl}userWallets/${currId}`,
                                    data: {
                                        "userId": `${userId}`,
                                        "walletCurrency": `${localStorage.selectedCurrency}`,
                                        "balance": `${newVal}`,
                                        "symbol": `${localStorage.symbol}`
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
                                          "userWalletId": localStorage.id,
                                          "transactionType": "Sell",
                                          "amount": `${val}`,
                                          "status": "success",
                                          "transactionId": `${trxref}`,
                                          "reference": `${ref}`,
                                          "timestamp": `${localStorage.timestamp}`,
                                          "currencyWallet": `${localStorage.currencyClicked}`
                                        }
                                      }).done(() => {
                                          swal({
                                              text: "Sale Successful",
                                              icon: "success"
                                          }).then(() => {
                                            location.href = "./wallets.html";
                                          })
                                      }).fail(() => {
                                        swal({
                                          text: 'Failed to add to transaction.',
                                          icon: 'danger'
                                        })
                                      });
                                })
                            })
                        })
                    }
                })
            }).fail(() => {
                swal({
                  text: 'Network Error! Please try again later!',
                  icon: 'danger'
                });
            });
        } else {
          swal({
            text: 'Your money no reach',
            icon: "warning"
          }).then(()=> {
            location.reload(true);
          });
        }
    })
}
