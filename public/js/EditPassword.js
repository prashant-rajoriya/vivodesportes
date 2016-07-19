$(document).ready(function() {
  $("#nameheader").load("../html/header_withoutsearch.html");
  $("#footer").load("../html/footer.html");

   var myPlayer = [
       { "image": "../images/Messi.jpg", "fname": "Sahil", "lname":"Jain","overall_rating": "74" }
   ]
   $.ajax({
        url: '/api/profile',
        dataType: 'json',
        cache: false,
        success: function(data) {
            console.log(data);
              loadLeftPanel(data);
        },
        error: function(xhr, status, err) {
          console.error(status, err.toString());
        }
      });

    //loadLeftPanel(myPlayer);
       function loadLeftPanel(data){
         var panel = document.getElementById('left_panel');
         panel.innerHTML = "";
             panel.innerHTML += "<div class=\"row\"><div class=\"profile\"><div class=\"valign col l9 valign-wrapper\"><div class=\"hover11\" id=\"photo\"><div id=\"addbtn\"><a class='dropdown-button' href='#' data-activates='dropdown1'><i class=\"medium material-icons\">add_a_photo</i></a></div> <figure><img src=\"/api/profile/pic?name="+data.username+"\" alt=\"\" class=\"circle responsive-img\"></figure><ul id='dropdown1' class='dropdown-content'><li><a class=\"modal-trigger waves-light\" href=\"#modal2\">View Photo</a></li><li><a class=\"modal-trigger waves-light\" href=\"#modal4\">Upload Photo</a></li><li><a href=\"/api/profile/picrm\" id=\"remove_photo\">Remove Photo</a></li></ul></div><div id=\"modal2\" class=\"modal\"><div class=\"modal-content grey\"><center><img src=\"/api/profile/pic?name="+data.username+"\" alt=\"\" class=\"responsive-img\"></center></div></div><div id=\"modal4\" class=\"modal\"><div class=\"modal-content\"><h5> Only upload photo in jpg or png format</h5><br><br><br><div class=\"row\"><form id=\"img_form\" action=\"/api/profile/pic\" method=\"post\" enctype='multipart/form-data'> <div class=\"file-field input-field row\"><div class=\"btn\"><span>Image Upload</span><input name=\"image\" type=\"file\"></div><div class=\"file-path-wrapper\"><input class=\"file-path validate\"  id=\"img_upload\" type=\"text\"></form></div></div><div class=\"modal-footer\"><a href=\"#!\" id=\"uploadImage\" class=\" modal-action modal-close waves-effect waves-green btn\">Upload</a></div></div></div></div></div></div></div><div class=\"row\"><div class=\"valign col l10\"><br><h3 align = \"center\">"+data.f_name+" "+data.l_name+"</h3><br><br><div class=\"row\" align=\"center\"><h5>Overall Rating</h5></div><div align=\"center\" id=\"star_calculate\"></div><div class=\"row\" align=\"center\"><h5>("+data.rating+"/100)</h5></div></div></div>";
              
              if(data.requestVerify)
                  $("#apply_rating").hide();

              $('.dropdown-button').dropdown({
              inDuration: 300,
              outDuration: 225,
              constrain_width: false, // Does not change width of dropdown to that of the activator
              hover: false, // Activate on hover
              gutter: 0, // Spacing from edge
              belowOrigin: true, // Displays dropdown below the button
              alignment: 'left' // Displays dropdown with edge aligned to the left of button
              });


              $("#photo img").hover(function() {
              $("#addbtn").fadeIn();
              },function() {
               $("#addbtn").hide();
              });
              $("#addbtn").mouseover(function() {
              $(this).show();
              }); 


              $("#uploadImage").click(function() {
              var ext = $('#img_upload').val().split('.').pop().toLowerCase();
              if($.inArray(ext, ['png','jpg','jpeg']) == -1) {
               alert('invalid extension!');
              }
              else{
                $('#img_form').submit();
              }
              });
              $('.modal-trigger').leanModal({
                dismissible: true, // Modal can be dismissed by clicking outside of the modal
                opacity: .2, // Opacity of modal background
                in_duration: 300, // Transition in duration
                out_duration: 200, // Transition out duration
              });

  

    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15 // Creates a dropdown of 15 years to control year
    });

    

    $("#remove_photo").click(function() {

    });
    $("#apply_rating").click(function() {
        $.ajax({
           type: 'GET',
           url: '/api/profile/getrated',
           datatype: 'json',
           success: function (result) {
                if(result.error){
                  Materialize.toast(result.error, 2000, 'rounded');     
                }
                else
                  Materialize.toast(result.msg, 2000, 'rounded');
            },
            error: function(err) {
                console.log(err);
            }
        });
        $(this).hide();
    });

              loadStarRating(data.rating);
       }

   
       function loadStarRating(source){
         var star = document.getElementById('star_calculate');
         star.innerHTML = "";
         var rating=source/20;
         var fullstar=Math.floor(rating);
         var halfstar=rating-fullstar;
         var remaining_star=5;
         console.log(fullstar+" "+halfstar);

         for(fullstar; fullstar>0 ; fullstar--){
             star.innerHTML += "<span><i class=\"small material-icons\" id=\"star_gold\">star</i>";
             remaining_star--;
        }

        if(halfstar>=0.75)
        {
             star.innerHTML += "<span><i class=\"small material-icons\" id=\"star_gold\">star</i>";
             remaining_star--;
        }
        else if(halfstar>=0.25 && halfstar<0.75){
             star.innerHTML += "<span><i class=\"small material-icons\" id=\"star_gold\">star_half</i>";
             remaining_star--;
        }
        for(remaining_star;remaining_star>0;remaining_star--){
             star.innerHTML += "<span><i class=\"small material-icons\" id=\"star_gold\">star_border</i>";
        }
     }


    

   $('select').material_select();
  $('#change_pass').click(function() {
      console.log("Enter login authentication zone");

      var newpass = $('#password2').val() || "error";
      var oldpass = $('#password1').val() || "error";
      var confpass = $('#password3').val() || "error";


    if(oldpass == "error"){
      document.getElementById('message').innerHTML = "Enter old Password";
      $( "#message").slideDown( 500 );
      $( "#message").delay( 1000 ).slideUp(500);
    }

    else if(newpass == "error"){
      document.getElementById('message').innerHTML = "Enter new Password";
      $( "#message").slideDown( 500 );
      $( "#message").delay( 1000 ).slideUp(500);
    }
    else if(confpass == "error"){
      document.getElementById('message').innerHTML = "Enter confirm Password";
      $( "#message").slideDown( 500 );
      $( "#message").delay( 1000 ).slideUp(500);
    }

    else if( newpass != confpass){
      document.getElementById('message').innerHTML = "confirm password and new password are different";
      $( "#message").slideDown( 500 );
      $( "#message").delay( 1000 ).slideUp(500);
    }

    else{
      
      $.ajax({
         type: 'POST',
         url: '/api/profile/pass',
         data:{
           "password": oldpass,
           "newpass": newpass
         },
      
         success: function (result) {
                console.log(result);
                if(result.error){
                    console.log("error :"+result.error);
                }
                else{
                  console.log("msg :"+result.msg);
                }
          },
      
          error: function(err) {
                console.log("error ajax");
          }
      });
    }


      function checkLog (data) {

          if(data.error){
              document.getElementById('username').style = userStyle;
              $('#username').val("");
              $('#password').val("");
              username = password = "error";

            console.log('Username/Password invalid');
            Materialize.toast('Old Password invalid', 3000, 'rounded');
          }

          else {
            window.location.replace('../index.html?login=true');
          }
      }

  });
});
