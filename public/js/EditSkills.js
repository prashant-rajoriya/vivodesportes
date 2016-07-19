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
            //console.log(data);
            loadData(data);
        },
        error: function(xhr, status, err) {
          console.error(status, err.toString());
        }
      });

    function loadData(data){
         var panel = document.getElementById('left_panel');
         panel.innerHTML = "";
             panel.innerHTML += "<div class=\"row\"><div class=\"profile\"><div class=\"valign col l9 valign-wrapper\"><div class=\"hover11\" id=\"photo\"><div id=\"addbtn\"><a class='dropdown-button' href='#' data-activates='dropdown1'><i class=\"medium material-icons\">add_a_photo</i></a></div> <figure><img id=\"asdf\" src=\"/api/profile/pic?name="+data.username+"\" alt=\"\" class=\"circle responsive-img\"></figure><ul id='dropdown1' class='dropdown-content'><li><a class=\"modal-trigger waves-light\" href=\"#modal2\">View Photo</a></li><li><a class=\"modal-trigger waves-light\" href=\"#modal4\">Upload Photo</a></li><li><a href=\"/api/profile/picrm\" id=\"remove_photo\">Remove Photo</a></li></ul></div><div id=\"modal2\" class=\"modal\"><div class=\"modal-content grey\"><center><img src=\"/api/profile/pic?name="+data.username+"\" alt=\"\" class=\"responsive-img\"></center></div></div><div id=\"modal4\" class=\"modal\"><div class=\"modal-content\"><h5> Only upload photo in jpg or png format</h5><br><br><br><div class=\"row\"><form id=\"img_form\" action=\"/api/profile/pic\" method=\"post\" enctype='multipart/form-data'> <div class=\"file-field input-field row\"><div class=\"btn\"><span>Image Upload</span><input name=\"image\" type=\"file\"></div><div class=\"file-path-wrapper\"><input class=\"file-path validate\"  id=\"img_upload\" type=\"text\"></form></div></div><div class=\"modal-footer\"><a href=\"#!\" id=\"uploadImage\" class=\" modal-action modal-close waves-effect waves-green btn\">Upload</a></div></div></div></div></div></div></div><div class=\"row\"><div class=\"valign col l10\"><br><h3 align = \"center\">"+data.f_name+" "+data.l_name+"</h3><br><br><div class=\"row\" align=\"center\"><h5>Overall Rating</h5></div><div align=\"center\" id=\"star_calculate\"></div><div class=\"row\" align=\"center\"><h5>("+data.rating+"/100)</h5></div></div></div>";

               $('.modal-trigger').leanModal({
                dismissible: true, // Modal can be dismissed by clicking outside of the modal
                opacity: .2, // Opacity of modal background
                in_duration: 300, // Transition in duration
                out_duration: 200, // Transition out duration
              });

             if(data.requestVerify)
          $("#apply_rating").hide();

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
                $('.dropdown-button').dropdown({
                    inDuration: 300,
                    outDuration: 225,
                    constrain_width: false, // Does not change width of dropdown to that of the activator
                    hover: false, // Activate on hover
                    gutter: 0, // Spacing from edge
                    belowOrigin: true, // Displays dropdown below the button
                    alignment: 'left' // Displays dropdown with edge aligned to the left of button
                });

                $('.modal-trigger').leanModal({
                    dismissible: true, // Modal can be dismissed by clicking outside of the modal
                    opacity: .2, // Opacity of modal background
                    in_duration: 300, // Transition in duration
                    out_duration: 200, // Transition out duration
                });

              loadStarRating(data.rating);
              loadskills(data.skills);
       }

     //loadStarRating(myPlayer);
        function loadStarRating(source){
          var star = document.getElementById('star_calculate');
          star.innerHTML = "";
          var rating=source/20;
          var fullstar=Math.floor(rating);
          var halfstar=rating-fullstar;
          var remaining_star=5;
          //console.log(fullstar+" "+halfstar);

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

        function loadskills(arr){
            var acce = document.getElementById('acceleration');
            var agi = document.getElementById('agility');
            var jum = document.getElementById('jumping');
            var spsp = document.getElementById('Sprint_speed');
            var stm = document.getElementById('stamina');
            var str = document.getElementById('strength');
            var gp = document.getElementById('grounded_pass');
            var gc = document.getElementById('grounded_cross');
            var cp = document.getElementById('chipped_pass');
            var at = document.getElementById('aerial_through');
            var lp = document.getElementById('Long_Passing');
            var cros = document.getElementById('Crossing');
            var drib = document.getElementById('Dribbling');
            var fs = document.getElementById('Finishing_shots');
            var fg = document.getElementById('Finishing_score');
            var sp = document.getElementById('Short_passing');
            var hot = document.getElementById('Header_ontarget');
            var hs = document.getElementById('Header_score');
            var pa = document.getElementById('Penalties_attempt');
            var ps = document.getElementById('Penalties_score');
            var spower = document.getElementById('Shot_power');
            var suctac = document.getElementById('success_tackle');
            var unstac = document.getElementById('unsuccess_tackle');
            var fouls = document.getElementById('fouls_commit');
    }

$('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: false, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left' // Displays dropdown with edge aligned to the left of button
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


    $('select').material_select();
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

    function postrating(rating) {
        console.log("fdrating");
        $.ajax({
        type: 'post',
        url: '/api/profile/rating',
        data:{
          'rating':rating
        },
        cache: false,
        success: function(data) {
            console.log(data);
        },
        error: function(xhr, status, err) {
          console.error(status, err.toString());
        }
      });
    }

    $('#data_submit').on('click',function() {

        console.log("post skill data");
        var Acceleration = $('#acceleration').val() || 0;
        var Agility = $('#agility').val() || 0;
        var Jumping = $('#jumping').val() || 0;
        var Sprintspeed = $('#Sprint_speed').val() || 0;
        var Stamina = $('#stamina').val() || 0;
        var Strength = $('#strength').val() || 0;
        var GroundedPass = $('#grounded_pass').val() || 0;
        var GroundedCross = $('#grounded_cross').val() || 0;
        var ChippedPass = $('#chipped_pass').val() || 0;
        var AerialThrough = $('#aerial_through').val() || 0;
        var LongPassing = $('#Long_Passing').val() || 0;
        var Crossing = $('#Crossing').val() || 0;
        var Dribbling = $('#Dribbling').val() || 0;
        var FinishingShots = $('#Finishing_shots').val() || 0;
        var FinishingGoals = $('#Finishing_score').val() || 0;
        var ShortPassing = $('#Short_passing').val() || 0;
        var HeaderOntarget = $('#Header_ontarget').val() || 0;
        var HeaderScore = $('#Header_score').val() || 0;
        var PenaltiesAttempt = $('#Penalties_attempt').val() || 0;
        var PenaltiesScore = $('#Penalties_score').val() || 0;
        var ShotPower = $('#Shot_power').val() || 0;
        var SuccessTackle = $('#success_tackle').val() || 0;
        var UnsuccessTackle = $('#unsuccess_tackle').val() || 0;
        var FoulsCommit = $('#fouls_commit').val() || 0;


      if(true){
        postrating();
        $.ajax({
           type: 'POST',
           url: '/api/profile/skills',
           data:{
             "acceleration": Acceleration,
             "agility": Agility,
             "jumping": Jumping,
             "sprintspeed": Sprintspeed,
             "stamina": Stamina,
             "strength": Strength,
             "grounded_pass": GroundedPass,
             "grounded_cross": GroundedCross,
             "chipped_pass": ChippedPass,
             "aerial_through": AerialThrough,
             "longpassing": LongPassing,
             "crossing": Crossing,
             "dribbling": Dribbling,
             "finishing_shots": FinishingShots,
             "Finishing_score": FinishingGoals,
             "short_passing": ShortPassing,
             "header_score": HeaderScore,
             "header_ontarget": HeaderOntarget,
             "penalties_score": PenaltiesScore,
             "penalties_attempt": PenaltiesAttempt,
             "shotpower": ShotPower,
             "success_tackle": SuccessTackle,
             "unsuccess_tackle": UnsuccessTackle,
             "fouls_commit": FoulsCommit
           },
           success: function (result) {
                if(result.error){
                    console.log("error :"+result.error);
                }
                else{
                  console.log("msg :"+result.msg);
                }
            },
            error: function() {
                console.log("error ajax");
            }
        });
      }
    });
});
