$(document).ready(function(){



   // $('#facebookB').on('click',function(){
   //      $.ajax({
   //        type:'GET',
   //        url:'/api/login/facebook',
   //      });

   // });




    $("#nameheader").load("../html/header_withoutsearch.html");
    console.log("Inside login.js");
    $('#footer').load("../html/footer.html");

    document.getElementById('message').innerHTML = "";
    $('#message').hide();

  $('#submit').click(function() {
    console.log("Enter login authentication zone");

    var username = $('#username').val() || "error";
    var password = $('#password').val() || "error";

  if((username && password) != "error"){

    console.log("Username "+ username);
    console.log("password "+ password);
    //checkLog(true);

    $.ajax({
       type: 'POST',  
       url: '/api/login/login',
       data:{
         "username": username,
         "password": password
       },

       success: function (result) {
            //console.log(result);
            checkLog(result);
        },

    error: function(xhr, status, err) {
      console.log("inside login");
        console.error(status, err.toString());
     }
    });
  }
  else if(username == "error"){
    document.getElementById('message').innerHTML = "<h6 class= \"center red\">Enter Valid Username</h6>";
    $( "#message").slideDown( 500 );
    $( "#message").delay( 1000 ).slideUp(500);
  }
  else if(password == "error"){
    document.getElementById('message').innerHTML = "Enter valid password";
    $( "#message").slideDown( 500 );
    $( "#message").delay( 1000 ).slideUp(500);
  }

    function checkLog (data) {
        console.log(data);
        if(data.error){
            document.getElementById('message').innerHTML = data.error;
            $( "#message").slideDown( 500 );
            $( "#message").delay( 1000 ).slideUp(500);

            $('#username').val("");
            $('#password').val("");
            username = password = "error";
        }

        else {
          window.location.replace('../index.html');
        }

    }

  });

});
