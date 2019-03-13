$(document).ready(function(e){
  var userId = localStorage.userId;
  $.ajax({
      method: 'GET',
      url:  `http://localhost:3000/transactions?userId=${userId}`,
      data: {get_param: 'value'}
  }).done(data => {
      $.each(data, (index,el) => {
          console.log(el)
          $('#transactions').append(`
          <tr>
          <td><i class="fa fa-circle st-${el.status}"></i></td>
          <td>${el.transactionId}</td>
          <td>${el.reference}</td>
          <td>${el.transactionType}</td>
          <td>${el.amount}</td>
          <td>${el.timestamp}</td>
          </tr>`
        )
      })
  });
});