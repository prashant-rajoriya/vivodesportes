
// $('body').hide();

$(document).ready(function(){

  $("#nameheader").load("../html/header_withoutsearch.html");
  $("#footer").load("../html/footer.html");


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
   }

       var view = getUrlParameter('view');
       console.log("Loading player's info");
       $.ajax({
           url: '/api/profile/view?id='+view,
           dataType: 'json',
           success: function (data) {
               console.log(data);
               postProfile(data);
               postSkills(data);
               fbShare(view);
           },
           error: function (xhr, status, err) {
               console.error(status, err.toString());
           }
       });

       function fbShare(id) {
        var share1 = document.getElementById('fbshare1');
        var share2 = document.getElementById('fbshare2');
        share1.innerHTMl = '';
        share1.innerHTML += '<div class=\"fb-share-button\" data-href=\"http://localhost:3000/html/View_Profile.html?view='+id+'\" data-layout=\"button_count\" data-mobile-iframe=\"true\"><a class=\"fb-xfbml-parse-ignore\" target=\"_blank\" href=\"https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A3000%2Fhtml%2FView_Profile.html%3Fview%3D'+id+'&amp;src=sdkpreparse\">Share</a></div>';
  //       share2.innerHTML = '';
  //       share2.innserHTML += '<meta property=\"og:url\"           content=\"http://localhost:3000/html/View_Profile.html?view='+id+'\" />'+
  // '<meta property=\"og:type\"          content=\"website\" />'+
  // '<meta property=\"og:title\"         content=\"Vivo Desportes\" />'+
  // '<meta property=\"og:description\"   content=\"Share your skill details\" />'+
  // '<meta property=\"og:image\"         content=\"http://www.your-domain.com/path/image.jpg\" />';
       }


       function postSkills(data) {
           console.log(data);
           var basic = document.getElementById('skillinfo');
           skillinfo.innerHTML = "";


           skillinfo.innerHTML +=
               "<div class=\"container-skillbar\">" +
               "<div class=\"skillbar clearfix\" data-percent=\"" + data.skills.acc_rate + "%\">" +
               "<div class=\"skillbar-title\" style=\"background: #DD1E2F;\"><span>Acceleration</span></div>" +
               "<div class=\"skillbar-bar\" style=\"background: #DD1E2F;width:10%;\"></div>" +
               "<div class=\"skill-bar-percent\">" + data.skills.acc_rate + "%</div>" +
               "</div>" +
               "<div class=\"container-skillbar\">" +
               "<div class=\"skillbar clearfix\" data-percent=\"" + data.skills.penalty_rate + "%\">" +
               "<div class=\"skillbar-title\" style=\"background: #DD1E2F;\"><span>Penalties</span></div>" +
               "<div class=\"skillbar-bar\" style=\"background: #DD1E2F;width:10%;\"></div>" +
               "<div class=\"skill-bar-percent\">90%</div>" +
               "</div>" +
               "<div class=\"container-skillbar\">" +
               "<div class=\"skillbar clearfix\" data-percent=\"" + data.skills.shortpass_rate + "%\">" +
               "<div class=\"skillbar-title\" style=\"background: #DD1E2F;\"><span>ShortPass</span></div>" +
               "<div class=\"skillbar-bar\" style=\"background: #DD1E2F;width:10%;\"></div>" +
               "<div class=\"skill-bar-percent\">90%</div>" +
               "</div>" +
               "<div class=\"container-skillbar\">" +
               "<div class=\"skillbar clearfix\" data-percent=\"" + data.skills.shotpower_rate + "%\">" +
               "<div class=\"skillbar-title\" style=\"background: #DD1E2F;\"><span>ShotPower</span></div>" +
               "<div class=\"skillbar-bar\" style=\"background: #DD1E2F;width:10%;\"></div>" +
               "<div class=\"skill-bar-percent\">90%</div>" +
               "</div>" +
               "<div class=\"container-skillbar\">" +
               "<div class=\"skillbar clearfix\" data-percent=\"" + data.skills.sprint_rate + "%\">" +
               "<div class=\"skillbar-title\" style=\"background: #DD1E2F;\"><span>SprintSpeed</span></div>" +
               "<div class=\"skillbar-bar\" style=\"background: #DD1E2F;width:10%;\"></div>" +
               "<div class=\"skill-bar-percent\">90%</div>" +
               "</div>" +
               "<div class=\"container-skillbar\">" +
               "<div class=\"skillbar clearfix\" data-percent=\"" + data.skills.stamina_rate + "%\">" +
               "<div class=\"skillbar-title\" style=\"background: #DD1E2F;\"><span>Stamina</span></div>" +
               "<div class=\"skillbar-bar\" style=\"background: #DD1E2F;width:10%;\"></div>" +
               "<div class=\"skill-bar-percent\">90%</div>" +
               "</div>" +
               "<div class=\"container-skillbar\">" +
               "<div class=\"skillbar clearfix\" data-percent=\"" + data.skills.defend_rate + "%\">" +
               "<div class=\"skillbar-title\" style=\"background: #DD1E2F;\"><span>DefendingRate</span></div>" +
               "<div class=\"skillbar-bar\" style=\"background: #DD1E2F;width:10%;\"></div>" +
               "<div class=\"skill-bar-percent\">90%</div>" +
               "</div>" +
               "<div class=\"container-skillbar\">" +
               "<div class=\"skillbar clearfix\" data-percent=\"" + data.skills.Stren_rate + "%\">" +
               "<div class=\"skillbar-title\" style=\"background: #DD1E2F;\"><span>Strength</span></div>" +
               "<div class=\"skillbar-bar\" style=\"background: #DD1E2F;width:10%;\"></div>" +
               "<div class=\"skill-bar-percent\">90%</div>" +
               "</div>" +
               "<div class=\"container-skillbar\">" +
               "<div class=\"skillbar clearfix\" data-percent=\"" + data.skills.agi_rate + "%\">" +
               "<div class=\"skillbar-title\" style=\"background: #DD1E2F;\"><span>Agility</span></div>" +
               "<div class=\"skillbar-bar\" style=\"background: #DD1E2F;width:10%;\"></div>" +
               "<div class=\"skill-bar-percent\">90%</div>" +
               "</div>" +
               "<div class=\"container-skillbar\">" +
               "<div class=\"skillbar clearfix\" data-percent=\"" + data.skills.ballcont_rate + "%\">" +
               "<div class=\"skillbar-title\" style=\"background: #DD1E2F;\"><span>BallControl</span></div>" +
               "<div class=\"skillbar-bar\" style=\"background: #DD1E2F;width:10%;\"></div>" +
               "<div class=\"skill-bar-percent\">90%</div>" +
               "</div>" +
               "<div class=\"container-skillbar\">" +
               "<div class=\"skillbar clearfix\" data-percent=\"" + data.skills.cross_rate + "%\">" +
               "<div class=\"skillbar-title\" style=\"background: #DD1E2F;\"><span>Crossing</span></div>" +
               "<div class=\"skillbar-bar\" style=\"background: #DD1E2F;width:10%;\"></div>" +
               "<div class=\"skill-bar-percent\">90%</div>" +
               "</div>" +
               "<div class=\"container-skillbar\">" +
               "<div class=\"skillbar clearfix\" data-percent=\"" + data.skills.drib_rate + "%\">" +
               "<div class=\"skillbar-title\" style=\"background: #DD1E2F;\"><span>Dribbling</span></div>" +
               "<div class=\"skillbar-bar\" style=\"background: #DD1E2F;width:10%;\"></div>" +
               "<div class=\"skill-bar-percent\">90%</div>" +
               "</div>" +
               "<div class=\"container-skillbar\">" +
               "<div class=\"skillbar clearfix\" data-percent=\"" + data.skills.finish_rate + "%\">" +
               "<div class=\"skillbar-title\" style=\"background: #DD1E2F;\"><span>Finishing</span></div>" +
               "<div class=\"skillbar-bar\" style=\"background: #DD1E2F;width:10%;\"></div>" +
               "<div class=\"skill-bar-percent\">90%</div>" +
               "</div>" +
               "<div class=\"container-skillbar\">" +
               "<div class=\"skillbar clearfix\" data-percent=\"" + data.skills.head_rate + "%\">" +
               "<div class=\"skillbar-title\" style=\"background: #DD1E2F;\"><span>HeadingAccuracy</span></div>" +
               "<div class=\"skillbar-bar\" style=\"background: #DD1E2F;width:10%;\"></div>" +
               "<div class=\"skill-bar-percent\">90%</div>" +
               "</div>" +
               "<div class=\"container-skillbar\">" +
               "<div class=\"skillbar clearfix\" data-percent=\"" + data.skills.jump_rate + "%\">" +
               "<div class=\"skillbar-title\" style=\"background: #DD1E2F;\"><span>Jumping</span></div>" +
               "<div class=\"skillbar-bar\" style=\"background: #DD1E2F;width:10%;\"></div>" +
               "<div class=\"skill-bar-percent\">90%</div>" +
               "</div>" +
               "<div class=\"container-skillbar\">" +
               "<div class=\"skillbar clearfix\" data-percent=\"" + data.skills.longpass_rate + "%\">" +
               "<div class=\"skillbar-title\" style=\"background: #DD1E2F;\"><span>LongPass</span></div>" +
               "<div class=\"skillbar-bar\" style=\"background: #DD1E2F;width:10%;\"></div>" +
               "<div class=\"skill-bar-percent\">90%</div>" +
               "</div>";

           $('.skillbar').each(function () {
               $(this).find('.skillbar-bar').animate({
                   width: $(this).attr('data-percent')
               }, 5000);
           });

       }


       function postProfile(data) {

           var basic = document.getElementById('basicinfo');
           basic.innerHTML = "";
           basic.innerHTML +=

               "<figure class=\"snip1344 hover\">" +
               "<img src=\"https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample7.jpg\"  class=\"background\"/>" +
               "<img src=\"https://s3-us-west-2.amazonaws.com/s.cdpn.io/331810/profile-sample7.jpg\"  class=\"profile\"/>" +
               "<figcaption  >" +
               "<h3> <span>" + data.username + "</span></h3>" +
               "<div>" +
               "<p>" + data.f_name + " " + data.l_name + "</span></p>" +
               "<p>" + data.bdate.substring(0, 10) + "</p >" +
               "<p>" + data.contact + "</p >" +
               "<p>" + data.pre_foot + "</p>" +
               "<p>" + data.fav_footballer + "</p>" +
               "<p>"+data.fav_club + "</p></div>" +
               "</figcaption>" +
               "</figure>";

           $(".hover").mouseleave(
               function () {
                   $(this).removeClass("hover");
               }
           );
       }


       //loadBasicInfo(basicInfoData);
       function loadBasicInfo(data) {
           var basic = document.getElementById('basicinfo');
           basic.innerHTML = "";
           for (var j = 0; j < data.length; j++) {
               basic.innerHTML += "<br><br>" +
                   "<div class=\"row\">" +
                   "<div class=\"valign col l9 valign-wrapper\">" +
                   "<img src=\"" + data[0].image + "\" alt=\"\" class=\"circle responsive-img\">" +
                   "</div></div>" +

                   "<div class=\"row\">" +
                   "<div class=\"valign col l10\"><br><h3 align = \"center\">" + data[j].player_name + "</h3></div></div>" +

                   "<div class=\"row\"><div class=\"valign col l10\"><br>" +
                   "<div class=\"row\" align=\"center\"><h4>Overall Rating</h4></div>" +
                   "<div id=\"star_calculate\"></div>" +
                   "<div class=\"row\" align=\"center\"><h5>(" + data[0].overall_rating + "/100)</h5></div></div></div> <br><br><br>" +

                   "<div class=\"valign col l9\" ><span class=\"info\">Age:&nbsp&nbsp" + data[j].age + "</span><br><br><span class=\"info\">Email:&nbsp&nbsp" + data[j].email_id + "</span><br><br><span class=\"info\">Conatact:&nbsp&nbsp" + data[j].contact + "</span><br><br><span class=\"info\">Prefered Foot:&nbsp&nbsp" + data[j].prefered_foot + "</span><br><br><span class=\"info\">Favourite Footballer:&nbsp&nbsp" + data[j].footballer + "</span><br><br><span class=\"info\">Favourite Football Club:&nbsp&nbsp" + data[j].club + "</span><br><br></div></div>";
           }
       }

   }
  
       );

var $fbshare = $('#fbshare');

// $.ajax({
//   type: 'GET',
//   url: '/api/player',
//   success: function(data) {
//     $fbshare.append('<div class="fb-share-button" data-href="http://localhost:3000/html/View_Profile.html?view=577bfcc4d8996f7c2906072f" data-layout="button_count" data-mobile-iframe="true"><a class="fb-xfbml-parse-ignore" target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=http%3A%2F%2Flocalhost%3A3000%2Fhtml%2FView_Profile.html%3Fview%3D577bfcc4d8996f7c2906072f&amp;src=sdkpreparse">Share</a></div>');
//   }
// });
