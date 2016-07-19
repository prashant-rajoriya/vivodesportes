$(document).ready(function(){
  $('#footer').load("../html/footer.html");
  console.log('Entered forgot password zone');

  document.getElementById('message').innerHTML = "";
  $('#message').hide();

  $('#submit').click(function() {
    console.log("Enter login authentication zone");
    var email = $('#email').val() || "error";

    if(!validateEmail(email)) {

    $.ajax({
       type: 'POST',
       url: '/api/login/verifyforgot',
       data:{
         "email": email
       },
       success: function (result) {
          checkStatus(result);
       },

       error: function(xhr, status, err) {
           console.error(status, err.toString());
       }
    });
 }

 else{
   document.getElementById('message').innerHTML = "Enter valid Email-ID";
   $( "#message").slideDown( 500 );
   $( "#message").delay( 1000 ).slideUp(500);
 }

 function validateEmail($email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test(email);
}

    function checkStatus(result) {

      if(data.error){
        document.getElementById('message').innerHTML = "User does not exist!";
        $( "#message").slideDown( 500 );
        $( "#message").delay( 1000 ).slideUp(500);
      }
      else {
        localStorage.setItem("emailVerification","true");
        window.location.replace('../index.html');
      }

    }

  });
});
