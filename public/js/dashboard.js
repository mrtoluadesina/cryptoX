$('#logout').click((e) => {
  localStorage.clear();
  window.location.replace("./login.html");
});
$(document).ready(() => {
  var userId = localStorage.userId;
  $.ajax({
    method: "GET",
    url: `http://localhost:3000/users?id=${userId}`,
    data: { get_param: 'value'}
  }).done(data => {
    $('#user-info').text(`Welcome ${data[0].firstname}`);
  })
})
