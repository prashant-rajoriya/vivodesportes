$(document).ready(function() {
      console.log("Enter login authentication zone");

    //   $.ajax({
    //      type: 'GET',
    //      url: '/api/auth',
    //      datatype: 'json'
    //
    //      success: function (result) {
    //           checkLog(result);
    //       },
    //
    //   error: function(xhr, status, err) {
    //       console.error(status, err.toString());
    //   }
    // });
    //
    //
    //   console.log("Checking if logged in or not");
    //   function checkLog(result){
    //     if(result.status == "offline"){
    //       window.location.href = "../index.html";
    //     }
    //   }

    var getUrlParameter = function getUrlParameter(sParam) {
     var sPageURL = decodeURIComponent(window.location.search.substring(1)),
         sURLVariables = sPageURL.split('&'),
         sParameterName,
         i;

     for (i = 0; i < sURLVariables.length; i++) {
         sParameterName = sURLVariables[i].split('=');

         if (sParameterName[0] === sParam) {
             return sParameterName[1] === undefined ? true : sParameterName[1];
         }
     }
 };

      var id = getUrlParameter('id');
      $("#nameheader").load("../html/header_withoutsearch.html");
      $("#footer").load("../html/footer.html");

      document.getElementById('message').innerHTML = "";
      $('#message').hide();



      $('#reset').click(function(){

        var password = $('#password').val() || "error";
        var confirmPass = $('#confirm-password').val() || "error";

        if(password == "error"){
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
      //  checkLog(true);
        $.ajax({
           type: 'POST',
           url: '/api/login/reset',
           datatype: 'json',
           data:{
             "password": password,
             "confirm": confirmPass,
             "id": id
           },

           success: function (result) {
                checkLog(result);
            },

            error: function() {

            }
        });
      }

        function checkLog (data) {

            if(data.error){

                $('#confirm-password').val("");
                $('#password').val("");
                confirmPass = password = "error";
                console.log('Username/Password invalid');

              document.getElementById('message').innerHTML = data.error;
              $( "#message").slideDown( 500 );
              $( "#message").delay( 1000 ).slideUp(500);

            }

            else {
              document.getElementById('message').innerHTML = "Successfully Reset";
              $( "#message").slideDown( 500 );
              $( "#message").delay( 1000 ).slideUp(500);
              setTimeout(function(){
                window.location.replace('../index.html')
              }
              ,1000);

            }
        }

      })

});
