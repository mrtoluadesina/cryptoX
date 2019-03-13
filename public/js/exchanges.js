var exchange_currency = 0;
var value = 0;
var userId = localStorage.userId;
localStorage.selectedCurrency = $('#currency-type').val();
var apiCon;

$.ajax({
    method: 'GET',
    url: `http://localhost:3000/userWallets?userId=${userId}`,
    data: {get_param: 'value'}
}).done((data) => {
    $.each(data, (index, el) => {
        $('#currency-type option[value="' + el.walletCurrency + '"]').prop('disabled', false);
    });
    
    $('#currency-type').change(function(){
    var selected = $('#currency-type').val();
    localStorage.selectedCurrency = selected;
    
    if(selected === "Naira"){
        $('#exchange').prop('disabled', false);
        $('#Naira').show();
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
});
})

// function convert(excString,val){
//     $.ajax({
//         type: 'GET',
//         headers: {
//             apiKey: 'vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A',
//             secretKey: 'NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j'
//         },
//         url: 'https://cors-anywhere.herokuapp.com/https://api.binance.com/api/v1/ticker/price',
//         data: { symbol: excString }
//     }).done(function (data){
//         value = parseFloat(val/(Number(data.price)));
//         console.log(value)
//         localStorage.val = value;
//     }).fail(() => {
//         console.log('Failed...')
//     });  
// }
    

$('#Naira-amount').change(() => {
    var val =  $('#Naira-amount').val();
    var selected = localStorage.selectedCurrency;
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/userWallets?userId=${userId}&walletCurrency=${selected}`,
        data: { get_param: 'value'}
    }).done(data => {
        console.log(data);
        if (val <= Number(data[0].balance)) {
            localStorage.currentBalance = data[0].balance;
            localStorage.walletCurrency = data[0].walletCurrency;
            localStorage.symbol = data[0].symbol;
            $.ajax({
                type: 'GET',
                headers: {
                    apiKey: 'vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A',
                    secretKey: 'NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j'
                },
                url: 'https://cors-anywhere.herokuapp.com/https://api.binance.com/api/v1/ticker/price',
                data: { symbol: apiCon }
            }).done(function (data){
                var val1 = val/365;
                console.log(val1);
                console.log(data);
                console.log(Number(data.price));
                value = parseFloat(val1/(Number(data.price)));
                console.log(value);
                localStorage.currencyBot = value;
                $('#Naira-equivalent').text(value);

                $('#exchange').click((e) =>{
                    e.preventDefault();
                    var curr = localStorage.currencyClicked;
                    var x = Number(localStorage.currentBalance) - val;
                    if(localStorage.walletCurrency === selected){
                        $.ajax({
                            method: "PUT",
                            url: `http://localhost:3000/userWallets/${userId}`,
                            data: {
                            "userId": `${userId}`,
                            "walletCurrency": `${localStorage.walletCurrency}`,
                            "balance": `${x}`,
                            "symbol": `${localStorage.symbol}`
                            }
                        }).done(() => {
                            $.ajax({
                                method: 'GET',
                                url: `http://localhost:3000/userWallets?userId=${userId}&walletCurrency=${curr}`,
                                data: { get_param: 'value' }
                            }).done(data => {
                                var newVal = parseFloat(Number(localStorage.currencyClickedBalance) + Number(localStorage.currencyBot));
                                var currId = data[0].id;
                                $.ajax({
                                    method: 'PUT',
                                    url: `http://localhost:3000/userWallets/${currId}`,
                                    data: {
                                        "userId": `${userId}`,
                                        "walletCurrency": `${localStorage.currencyClicked}`,
                                        "balance": `${newVal}`,
                                        "symbol": `${localStorage.currencyClickedSymbol}`
                                    }
                                }).done(() => {
                                    window.location.href = './wallets.html';
                                })
                            })
                        })
                    }
                    // if(localStorage.currencyClicked === 'Bitcoin') {
                       
                    // }
                })
            }).fail(() => {
                console.log('Failed...')
            });
        } else {
            alert('Your money no reach')
        }
    })
    // var curr = localStorage.currencyClicked;
    // $.ajax({
    //     method: 'GET',
    //     url: `http://localhost:3000/userWallets?userId=${userId}&walletCurrency=${curr}`,
    //     data: { get_param: 'value' }
    // }).done(data => {
    //     console.log(data);
    //     $.ajax({
    //         method: 'PUT',
    //         url: `http://localhost:3000/userWallets/${userId}`,
    //         data: { 
    //             "userId": `${userId}`,
    //             "walletCurrency": `${localStorage.walletCurrency}`,
    //             "balance": `${parseFloat(Number(localStorage.currencyClickedBalance)).toFixed(2) + parseFloat(Number(localStorage.currencyBot)).toFixed(2)}`,
    //             "symbol": `${localStorage.currencyClickedSymbol}`
    //         }
    //     }).done((data) => {
    //         console.log('BTC pulled');
    //         // console.log(data);
    //         window.location.href = './wallets.html';
    //         // localStorage.currencyBot = data[0].balance + Number(localStorage.currencyBot);
    //     }).fail(() =>{
    //         alert('Failed...')
    //     })
    // })
})
$('#Ethereum-amount').change(() => {
    var val =  $('#Ethereum-amount').val();
    console.log(val);
    $('#Ethereum-equivalent').text(val);
})
$('#Ripple-amount').change(() => {
    var val =  $('#Ripple-amount').val();
    console.log(val);
    $('#Ripple-equivalent').text(val);
})
$('#Bitcoin-Cash-amount').change(() => {
   
    var val =  $('#Bitcoin-Cash-amount').val();
    var selected = localStorage.selectedCurrency;
    $.ajax({
        method: 'GET',
        url: `http://localhost:3000/userWallets?userId=${userId}&walletCurrency=${selected}`,
        data: { get_param: 'value'}
    }).done(data => {
        if (val <= Number(data[0].balance)) {
            localStorage.currentBalance = data[0].balance;
            localStorage.walletCurrency = data[0].walletCurrency;
            localStorage.symbol = data[0].symbol;
            $.ajax({
                type: 'GET',
                headers: {
                    apiKey: 'vmPUZE6mv9SD5VNHk4HlWFsOr6aKE2zvsw0MuIgwCIPy6utIco14y7Ju91duEh8A',
                    secretKey: 'NhqPtmdSJYdKjVHjA7PZj4Mge3R5YNiP1e3UZjInClVN65XAbvqqM6A7H5fATj0j'
                },
                url: 'https://cors-anywhere.herokuapp.com/https://api.binance.com/api/v1/ticker/price',
                data: { symbol: apiCon }
            }).done(function (data){
                var val1 = val/365;
                console.log(val1);
                console.log(data);
                console.log(Number(data.price));
                value = parseFloat(val1/(Number(data.price)));
                console.log(value);
                localStorage.currencyBot = value;
                $('#Bitcoin-Cash-equivalent').text(value);

                $('#exchange').click((e) =>{
                    e.preventDefault();
                    var curr = localStorage.currencyClicked;
                    var x = Number(localStorage.currentBalance) - val;
                    if(localStorage.walletCurrency === selected){
                        $.ajax({
                            method: "PUT",
                            url: `http://localhost:3000/userWallets/${userId}`,
                            data: {
                            "userId": `${userId}`,
                            "walletCurrency": `${localStorage.walletCurrency}`,
                            "balance": `${x}`,
                            "symbol": `${localStorage.symbol}`
                            }
                        }).done(() => {
                            $.ajax({
                            method: 'GET',
                            url: `http://localhost:3000/userWallets?userId=${userId}&walletCurrency=${curr}`,
                            data: { get_param: 'value' }
                        }).done(data => {
                            var newVal = parseFloat(Number(localStorage.currencyClickedBalance) + Number(localStorage.currencyBot));
                            var currId = data[0].id;
                            $.ajax({
                                method: 'PUT',
                                url: `http://localhost:3000/userWallets/${currId}`,
                                data: {
                                    "userId": `${userId}`,
                                    "walletCurrency": `${localStorage.currencyClicked}`,
                                    "balance": `${newVal}`,
                                    "symbol": `${localStorage.currencyClickedSymbol}`
                                }
                            }).done(() => {
                                window.location.href = './wallets.html';
                            })
                        })
                        })
                    }
                    // if(localStorage.currencyClicked === localStorage.currencyClicked) {
                        
                    // }
                })
            }).fail(() => {
                console.log('Failed...')
                alert('Network Error! Please try again later!')
            });
        } else {
            alert('Your money no reach')
        }
    })
})
$('#Stellar-Lumens-amount').change(() => {
    var val =  $('#Stellar-Lumens-amount').val();
    console.log(val);
    $('#Stellar-Lumens-equivalent').text(val);
})
// $('#exchange').click( e => {
//     e.preventDefault();
//     var selected = localStorage.selectedCurrency;
//     $.ajax({
//         method: "GET",
//         url: `http://localhost:3000/userWallets?userId=${userId}&walletCurrency=${selected}`,
//         data: { get_param: 'value'}
//     }).done(data => {
//         balance = parseFloat(data[0].balance);
//     })
// });