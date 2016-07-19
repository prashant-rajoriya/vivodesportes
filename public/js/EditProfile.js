$('body').hide();
$.ajax({
     type: 'GET',
     url: '/api/auth',
     datatype: 'json',
     success: function (result) {
        if(result.status == "offline"){
         window.location.href = "../index.html";
      }
      else{
        $('body').show();
      }
    },
    error: function(xhr, status, err) {
      console.error(status, err.toString());
    }
 });

$(document).ready(function() {
    $("#nameheader").load("../html/header_withoutsearch.html");
    $("#footer").load("../html/footer.html");

     $.ajax({
        url: '/api/profile',
        dataType: 'json',
        cache: false,
        success: function(data) {
            console.log(data);
            loadData(data);
        },
        error: function(xhr, status, err) {
          console.error(status, err.toString());
        }
      });
    var basicInfoData = [
         { "fname": "Sahil", "lname": "Jain", "birthdate": "20-11-1995", "email_id": "sahiljain@gmail.com", "contact": "9958462356", "prefered_foot": "Right", "footballer": "Leo_Messi", "club": "FC_Barcelona","requestVerification":"true"}
     ];

    var myPlayer = [
        { "image": "../images/Messi.jpg", "fname": "Sahil", "lname":"Jain","overall_rating": "87" }
    ]

    function loadData(data) {
       var panel = document.getElementById('left_panel');
       panel.innerHTML = "";
       panel.innerHTML += "<div class=\"row\"><div class=\"profile\"><div class=\"valign col l9 valign-wrapper\"><div class=\"hover11\" id=\"photo\"><div id=\"addbtn\"><a class='dropdown-button' href='#' data-activates='dropdown1'><setInterval(cb, ms) class=\"medium material-icons\">add_a_photo</i></a></div> <figure><img id=\"playerpic\" src=\"/api/profile/pic?name="+data.username+"\" alt=\"\" class=\"circle responsive-img\"></figure><ul id='dropdown1' class='dropdown-content'><li><a class=\"modal-trigger waves-light\" href=\"#modal2\">View Photo</a></li><li><a class=\"modal-trigger waves-light\" href=\"#modal4\">Upload Photo</a></li><li><a href=\"/api/profile/picrm\" id=\"remove_photo\">Remove Photo</a></li></ul></div><div id=\"modal2\" class=\"modal\"><div class=\"modal-content grey\"><center><img src=\"/api/profile/pic?name="+data.username+"\" alt=\"\" class=\"responsive-img\"></center></div></div><div id=\"modal4\" class=\"modal\"><div class=\"modal-content\"><h5> Only upload photo in jpg or png format</h5><br><br><br><form id=\"img_form\" action=\"/api/profile/pic\" method=\"post\" enctype='multipart/form-data'><div class=\"row\"><div class=\"file-field input-field row\"><div class=\"btn\"><span>Image Upload</span><input name=\"image\" type=\"file\"></div><div class=\"file-path-wrapper\"><input class=\"file-path validate\"  id=\"img_upload\" type=\"text\"></div></div></form><div class=\"modal-footer\"><a href=\"#!\" id=\"uploadImage\" class=\" modal-action modal-close waves-effect waves-green btn\">Upload</a></div></div></div></div></div></div></div><div class=\"row\"><div class=\"valign col l10\"><br><h3 align = \"center\">"+data.f_name+" "+data.l_name+"</h3><br><br><div class=\"row\" align=\"center\"><h5>Overall Rating</h5></div><div align=\"center\" id=\"star_calculate\"></div><div class=\"row\" align=\"center\"><h5>("+data.rating+"/100)</h5></div></div></div>";
       var basic = document.getElementById('basicedit');
       basic.innerHTML = "";
       basic.innerHTML += "<div class=\"row\"><div class=\"input-field col s6\"><input value=" +data.f_name+ " id=\"first_name\" type=\"text\" class=\"validate\"><label class=\"active\" for=\"first_name\">First Name</label></div><div class=\"input-field col s6\"><input value=" +data.l_name+ " id=\"last_name\" type=\"text\" class=\"validate\"><label class=\"active\" for=\"last_name\">Last Name</label></div></div><div class=\"row\"><div class=\"input-field col s8\"><input value=" +data.email+ " id=\"email\" type=\"email\" class=\"validate\"><label class=\"active\" for=\"email\">Email</label></div></div><div class=\"row\"><br><div class=\"input-field col s6\"><input value=" +data.bdate+ " id=\"birth_date\" type=\"date\" class=\"datepicker\" class=\"validate\"><label class=\"active\"  for=\"birth_date\">Birthdate</label></div></div><br><div class=\"row\"><div class=\"input-field col s6\"><input value=" +data.contact+ " id=\"contact_no\" class=\"active\" type=\"text\" class=\"validate\" length=\"10\"><label class=\"active\"  for=\"contact_no\">Contact No.</label></div></div><div class=\"row\"><br><div class=\"input-field col s6\"><input value=\"" +data.fav_footballer+"\" id=\"favourite_footballer\" type=\"text\" class=\"validate\"><label class=\"active\"  for=\"favourite_footballer\">Favourite Footballer</label></div></div><br><div class=\"row\"><div class=\"input-field col s6\"><input value=\"" +data.fav_club+ "\" id=\"favourite_football_club\" type=\"text\" class=\"validate\"><label class=\"active\" for=\"favourite_football_club\">Favourite Football Club</label></div></div><br><div class=\"row\"><div class=\"input-field col s4\"><select id=\"prefered_foot\"><option value=\""+data.pre_foot+"\" disabled selected>"+data.pre_foot+"</option><option value=\"Right\">Right</option><option value=\"Left\">Left</option></select><label>Prefered Foot</label></div></div>";
       loadStarRating(data.rating);

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

        $('.modal-trigger').leanModal({
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            opacity: .2, // Opacity of modal background
            in_duration: 300, // Transition in duration
            out_duration: 200, // Transition out duration
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


    }


     $('.datepicker').Zebra_DatePicker({ format: 'd M Y'});
 $('.modal-trigger').leanModal({
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            opacity: .2, // Opacity of modal background
            in_duration: 300, // Transition in duration
            out_duration: 200, // Transition out duration
          });
        function loadLeftPanel(source){
          var panel = document.getElementById('left_panel');
          panel.innerHTML = "";
          //for(var j = 0; j < source.length ; j++){
               panel.innerHTML += "<div class=\"row\"><div class=\"profile\"><div class=\"valign col l9 valign-wrapper\"><div class=\"hover11\" id=\"photo\"><div id=\"addbtn\"><a class='dropdown-button' href='#' data-activates='dropdown1'><i class=\"medium material-icons\">add_a_photo</i></a></div> <figure><img id=\"playerpic\" src=\""+source[0].image+"\" alt=\"\" class=\"circle responsive-img\"></figure><ul id='dropdown1' class='dropdown-content'><li><a class=\"modal-trigger waves-light\" href=\"#modal2\">View Photo</a></li><li><a class=\"modal-trigger waves-light\" href=\"#modal4\">Upload Photo</a></li><li><a href=\"#!\" id=\"remove_photo\">Remove Photo</a></li></ul></div><div id=\"modal2\" class=\"modal\"><div class=\"modal-content grey\"><center><img src=\""+source[0].image+"\" alt=\"\" class=\"responsive-img\"></center></div></div><div id=\"modal4\" class=\"modal\"><div class=\"modal-content\"><h5> Only upload photo in jpg or png format</h5><br><br><br><div class=\"row\"><div class=\"file-field input-field row\"><div class=\"btn\"><span>Image Upload</span><input type=\"file\"></div><div class=\"file-path-wrapper\"><input class=\"file-path validate\"  id=\"img_upload\" type=\"text\"></div></div><div class=\"modal-footer\"><a href=\"#!\" id=\"uploadImage\" class=\" modal-action modal-close waves-effect waves-green btn\">Upload</a></div></div></div></div></div></div></div><div class=\"row\"><div class=\"valign col l10\"><br><h3 align = \"center\">"+source[0].fname+" "+source[0].lname+"</h3><br><br><div class=\"row\" align=\"center\"><h5>Overall Rating</h5></div><div id=\"star_calculate\"></div><div class=\"row\" align=\"center\"><h5>("+source[0].overall_rating+"/100)</h5></div></div></div>";
        // }
        }

    //loadStarRating(myPlayer);
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


        function loadBasicInfo(data){
         var basic = document.getElementById('basicedit');
         basic.innerHTML = "";
         for(var j = 0; j < data.length ; j++){
               basic.innerHTML += "<div class=\"row\"><div class=\"input-field col s6\"><input value=" +data[j].fname+ " id=\"first_name\" type=\"text\" class=\"validate\"><label class=\"active\" for=\"first_name\">First Name</label></div><div class=\"input-field col s6\"><input value=" +data[j].lname+ " id=\"last_name\" type=\"text\" class=\"validate\"><label class=\"active\" for=\"last_name\">Last Name</label></div></div><div class=\"row\"><div class=\"input-field col s8\"><input value=" +data[j].email_id+ " id=\"email\" type=\"email\" class=\"validate\"><label class=\"active\" for=\"email\">Email</label></div></div><div class=\"row\"><br><div class=\"input-field col s6\"><input value=" +data[j].birthdate+ " id=\"birth_date\" type=\"date\" class=\"datepicker\" class=\"validate\"><label class=\"active\"  for=\"birth_date\">Birthdate</label></div></div><br><div class=\"row\"><div class=\"input-field col s6\"><input value=" +data[j].contact+ " id=\"contact_no\" class=\"active\" type=\"text\" class=\"validate\" length=\"10\"><label class=\"active\"  for=\"contact_no\">Contact No.</label></div></div><div class=\"row\"><br><div class=\"input-field col s6\"><input value=" +data[j].footballer+" id=\"favourite_footballer\" type=\"text\" class=\"validate\"><label class=\"active\"  for=\"favourite_footballer\">Favourite Footballer</label></div></div><br><div class=\"row\"><div class=\"input-field col s6\"><input value=" +data[j].club+ " id=\"favourite_football_club\" type=\"text\" class=\"validate\"><label class=\"active\" for=\"favourite_football_club\">Favourite Football Club</label></div></div><br><div class=\"row\"><div class=\"input-field col s4\"><select id=\"prefered_foot\"><option value=\"\" disabled selected>"+data[j].prefered_foot+"</option><option value=\"1\">Right</option><option value=\"2\">Left</option></select><label>Prefered Foot</label></div></div>";
         }

     $('select').material_select();

     }




    $('.modal-trigger').leanModal({
      dismissible: true, // Modal can be dismissed by clicking outside of the modal
      opacity: .2, // Opacity of modal background
      in_duration: 300, // Transition in duration
      out_duration: 200, // Transition out duration
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






  $('#submit').click(function() {

        var fname = $('#first_name').val() || "error";
        var lname = $('#last_name').val() || "error";
        var email = $('#email').val() || "error";
        var b = $('#birth_date').val() || "error";
        var birthdate = new Date(b);
        var contact = $('#contact_no').val() || "error";
        var fav_footballer = $('#favourite_footballer').val() || "";
        var fav_club = $('#favourite_football_club').val() || "";
        var prefered_foot = $('#prefered_foot').val() || "error";
      if((email) != "error" && !(isNaN(contact) || contact.length!=10)){
        $.ajax({
           type: 'POST',
           url: '/api/profile',
           data:{
             "f_name": fname,
             "l_name": lname,
             "email": email,
             "bday": birthdate,
             "contact": contact,
             "fav_footballer": fav_footballer,
             "fav_club": fav_club,
             "pre_foot": prefered_foot
           },
           success: function (result) {
                console.log(result);
                if(result.error){
                    console.log("error :"+result.error);
                    Materialize.toast(result.error, 2000, 'rounded');
                }
                else{
                  console.log("msg :"+result.msg);
                  Materialize.toast(result.msg, 2000, 'rounded');
                }
            },

            error: function(err) {
                console.log("ajax err");
            }
        });
      }

       else if(isNaN(contact) || contact.length!=10){
        Materialize.toast('Enter valid 10 digit contact no.', 2000, 'rounded');
       }
      //   Materialize.toast('Enter valid username', 1000, 'rounded');
      // else if(password == "error")
      //     Materialize.toast('Enter valid password', 1000, 'rounded');

      //   function checkLog (data) {

      //       if(data.error){
      //           document.getElementById('username').style = userStyle;
      //           $('#username').val("");
      //           $('#password').val("");
      //           username = password = "error";

      //         console.log('Username/Password invalid');
      //         Materialize.toast('Username/Password invalid', 3000, 'rounded');
      //       }

      //       else {
      //         window.location.replace('/DisplayProfile.html');
      //       }
      //   }

  });

});
