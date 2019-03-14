var res;

function payWithPaystack() {
    var amount = $('#naira-amount').val();
    if(amount <= 100){
        swal({
          text: 'Amount to deposit has to be more than #100',
          icon: 'warning'
        })
    }
    else{
        
        localStorage.amount = amount;
        if(amount)
        {
                var handler = PaystackPop.setup({ 
                key: 'pk_test_4b1faad645c80b36844217122770aedccd251522', //put your public key here
                email: 'decachain@gmail.com', //put your customer's email here
                amount: amount * 100, //amount the customer is supposed to pay
                metadata: {
                    custom_fields: [
                        {
                            display_name: "Mobile Number",
                            variable_name: "mobile_number",
                            value: "+2348121364262" //customer's mobile number
                        }
                    ]
                },
                callback: function (response) {
                    //after the transaction have been completed
                    //make post call  to the server with to verify payment 
                    //using transaction reference as post data
                    localStorage.res = JSON.stringify(response);
                    localStorage.transaction = 1;
                    localStorage.timestamp = (new Date).toLocaleString('en-GB');
                    window.location.href = './wallets.html'
                    
                },
                onClose: function () {
                    //when the user close the payment modal
                    swal({
                      text: 'Transaction cancelled',
                      icon: 'warning'
                    }).then(() => {
                      location.reload(true);
                    });
                }
            });
            handler.openIframe(); //open the paystack's payment modal
        }else
        {
            swal({
              text: 'You have not stated any amount',
              icon: 'warning'
            });
        }
    }
    
    
}
