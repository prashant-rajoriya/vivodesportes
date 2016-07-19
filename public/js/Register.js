$(document).ready(function(){
  $('#nameheader').load("../html/header_withoutsearch.html");
  $('#footer').load("../html/footer.html");

  $('#register').click(function() {
    console.log("Enter register zone");

    document.getElementById('message').innerHTML = "";
    $('#message').hide();

    var password = $('#password').val() || "error";
    var email = $('#email').val() || "error";
    var username = $('#username').val() || "error";
    var confirmPass =  $('#confirm-password').val() || "error";
    var contact=$('#contact').val() ||"error";
    var f_name=$('#f_name').val() ||"error";
    var l_name=$('#l_name').val() ||"error";
    var bdate=$('#bdate').val() ||"error";

    console.log(email + "  " + username + "  "+password + "  "+ confirmPass);

 if(!validateEmail(email)){
   console.log(validateEmail(email));
    document.getElementById('message').innerHTML = "<h6 class= \"center red\">Enter Valid Email-ID</h6>";
    $( "#message").slideDown( 500 );
    $( "#message").delay( 1000 ).slideUp(500);
  }
  else if(username == "error"){
    document.getElementById('message').innerHTML = "<h6 class= \"center red\">Enter Valid Username</h6>";
    $( "#message").slideDown( 500 );
    $( "#message").delay( 1000 ).slideUp(500);
  }
  else if(password == "error"){
    document.getElementById('message').innerHTML = "<h6 class= \"center red\">Enter Valid Password</h6>";
    $( "#message").slideDown( 500 );
    $( "#message").delay( 1000 ).slideUp(500);
  }
  else if(confirmPass == "error"){
    document.getElementById('message').innerHTML = "<h6 class= \"center red\">Enter Confirm Password</h6>";
    $( "#message").slideDown( 500 );
    $( "#message").delay( 1000 ).slideUp(500);
  }
  else if( password != confirmPass){
    document.getElementById('message').innerHTML = "<h6 class= \"center red\">Password and confirm password don't match</h6>";
    $( "#message").slideDown( 500 );
    $( "#message").delay( 1000 ).slideUp(500);
  }
  else{
    // console.log("Everything works");
    // checkRegister()
    console.log("Enter post zone");
    $.ajax({
       type: 'POST',
       url: '/api/register',
       datatype: 'json',
       data:{
         "email": email,
         "password": password,
         "username": username,
         "f_name": f_name,
         "l_name": l_name,
         "contact":contact,
         "bdate": bdate,

       },

       success: function (result) {
          checkRegister(result);
           console.log("success");
       },
       error: function(xhr, status, err) {
          console.error(status, err.toString());
          console.log("Error");
        }
    });
  }

  function validateEmail($email) {
   var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
   return emailReg.test(email);
 }
 function checkRegister (data) {
     console.log(data);
       if(data.error){

         document.getElementById('message').innerHTML = data.error;
         $( "#message").slideDown( 500 );
         $( "#message").delay( 1000 ).slideUp(500);

         $('#email').val("");
         $('#password').val("");
         $('#username').val("");
         $('#confirm-password').val("");
         email = password = confirmPass = username = "error";
         }

         else {
           document.getElementById('message').innerHTML = "Successfully Registered, Please verify your email to login.";
           $( "#message").slideDown( 500 );
           $( "#message").delay( 1000 ).slideUp(500);
           setTimeout(function(){
            window.location.replace('/index.html')
           }
           ,2000);
         }
     }
});

});
