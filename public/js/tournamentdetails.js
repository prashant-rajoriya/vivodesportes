$(document).ready(function () {
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
};

var tournament = getUrlParameter('tourn');
console.log(tournament);
           $.ajax({
              type:'post',
              url: '/api/tournaments/id',
              data:{
                "id" : tournament
              },
              cache: false,
              success: function(data) {
                console.log(data);
                  loadSections(data);
                  loadSections1(data.rules);
                  loadSections2(data.feature);
                  loadButtons(data);
              },
              error: function(xhr, status, err) {
                console.error(err);
              }
            });

    $('.modal-trigger').leanModal({
        dismissible: true,
        opacity: 0.5,
        in_duration: 300,
        out_duration: 200,
        ready: function() {
            if($(".lean-overlay").length > 1) {
                $(".lean-overlay:not(:first)").each(function() {
                    $(this).remove();
                });
            }
        },
        complete: function() {
            $(".lean-overlay").each(function() {
                $(this).remove();
            });
        }
    });

     // var myData = [
     //     { "name": "Striker's paradise", "location": "Kahaani", "type": "4v4", "desc": "The Aeroflot Open Chess Festival, which is popular throughout the world, will be held in March 2016 for the 14th time. This major event is open to chess players of most varied qualification: from unrated to having a very high rating. As before, the festival is held â€œunder the wingsâ€ of our leading air company â€“â€œ Aeroflot â€“ Russian airlinesâ€. The festival will be held in the hotel â€œCosmosâ€, which is one of the largest in Moscow ( over 1700 rooms). The hotel is located in one of the most beautiful and environmentally pure Moscow districts within 20-minutes travelling from Red Square and only 200-m walking from the nearest subway station (VDNKh). This time the festival has the guaranteed prize fund amounting to EUR 140 000 (taking into account the prizes for the Blitz Tournament). ", "winner": "Yet to start"},
     //   ];

     //       loadSections(myData);
           // console.log("Video Section data is ");

            function loadSections(data) {
              var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
              var firstDate = new Date(data.closedate);
              var secondDate = new Date();
              var Days = Math.round((firstDate.getTime() - secondDate.getTime())/(oneDay));
              var Str = `<div class=\"valign col l3 center\">
                              <h5>`+Days+`</h5>
                              <h6>Days to go</h6>
                          </div>`;
              if(Days<0){
                Days = "Sorry too late...\n Wait for next Tournament";
                var Str = `<div class=\"valign col l3 center\">
                              <h5>`+Days+`</h5>
                          </div>`;
                $('#togo').hide();
              }

              console.log("Load Video sections");
              var videoSections = document.getElementById('tournament-describe');
              videoSections.innerHTML = "";


                 videoSections.innerHTML += "<div class=\"container\">\<div class=\"row\"><div class=\"col l6\"><img width=\"100%\" height=\"100%\" src=\"../"+data.banner+"\" class=\"resonsive-img\"></div><div class=\"col l6\"><div class=\"section\" align=\"left\"><h5>Tournament:  "+data.name+"</h5><h5>Location:  "+data.location+"</h5><h5>Type: "+data.type+"<h5></div></div></div><div class=\".conatiner\"><div class=\"col l10\"><ul><font size=\"6\"><li>Description:</li></font></ul><font size=\"4\"><p>"+data.description+"</p></font></div></div><div class=\"row\"><div class=\"col l13\"><font size=\"6\">Status:</font><div class=\"section\"><h6>"+Str+"</h6></div></div><div class=\"col l3\"></div></div></div>";

               }
     // var Rules = [
     //     { "rules": "Rule 1"},
     //     { "rules": "Rule 2"},
     //     { "rules": "Rule 3"},
     // ];

          //loadSections1(Rules);
           //console.log("Video Section data is "+ Rules);

            function loadSections1(data) {

              console.log("Load Video sections");
              var videoSections = document.getElementById('tournament-rules');
              videoSections.innerHTML = "";

              for(var j = 0; j < data.length ; j++)
                 videoSections.innerHTML += "<h6>&#8226&nbsp "+data[j]+"</h6>";
            }

            var moreRules = [
                 { "r": "Registration can be done only through Abhishek or Vivek"},
                 { "r": "There will be no discussion the price of the video recordings, which will be available of each match."},
                 { "r": "All photos will be shared on our Facebook web page,"},
                 { "r": "It will not be permitted to reschedule matches."},
                 { "r": "The results of a draw will be finalized through a penalty shootout consisting of 2 penalties followed by sudden death."},
                 { "r": "The referee's verdict will be final without question, and any disobedience shall result in yellow card or even a red depending on discretion of the referee."},
                 { "r": "On receiving a red card the player will not be allowed to play the next match."},
                { "r": "All outside will be throw-ins."},
                { "r": "Goal keepers aren't allowed to volley the ball, either the ball should be on the ground or thrown into play, Direct throw-ins into the goal shall result in a goal."},
                { "r": "All goals should result in a center start."},
                { "r": "If the ball should by chance leave the ground, the clock for the match will keep running."},
                { "r": "Depending upon the refereeâ€™s decision, intentionally kicking the ball out of the ground shall result in straight red card."},
                { "r": "On cancellation of registration, there shall be no refund amount."},
                { "r": "Payment for registration will be taken in cash only, and at the time of registration the player should produce an identity card."},
                { "r": "The match length will be 13 minutes a half with 30 seconds of added time, the referee shall announce when 30 second shall be remaining."},
                { "r": "Ten minutes prior to a match, the respective teams captain will be send a message to get ready."},
                { "r": "If the opponent team is kit up and ready and the time of the match the opponent will be given a grace period of 7 minutes beyond which the team shall forfeit on discretion of the other team captain,"},
                { "r": "The team should report an hour before their match timings, for the verification of his players."},
                { "r": "Corners shall be treated as throw ins from the corner,"},
                { "r": "Once the event has started the player squad cannot be changed, if any new player has to be added it must be ensured the player is not part of another team."},
                { "r": "In case of an injury we shall provide a medical kit and quick assistance by transport to the hospital of players choice. But under no circumstances Vivo DesportÃ©s shall be blamed for the injury. And we shall not be held accountable."},
                { "r": "The final whistle to end a half or the game shall not be dependent on the position of the ball."},
                { "r": "There will be food and water available on sale, at the tournament."},
                { "r": "The match schedule shall be mailed to the captain of the registered team at least 24 hours before the event, and the schedule cannot be debated over."},
                { "r": "A Medical kit will be present at the venue, but an ambulance will be called in case of a sever injury. "},
                { "r": "Vivo Desportes is in no way responsible for any physical injury caused during the course of the tournament."},
                { "r": "The minimum age of all players that are registering in a tournament of Vivo DesportÃ©s has to be ______."},
                { "r": "A more detailed and complete rule set will be posted on Facebook, which shall keep being updated from time to time. By signing this document the players acknowledge they agree to the rules on the Facebook page as well."},
                { "r": "If a player is registered to play in the tournament, he by default acknowledges that he will abide by all the rules and regulations."},
                { "r": "The rules and regulations can be changed as per decision of Vivo Desportes."},
                { "r": "A detailed set of rules will be present with Vivo Desportes and can be requested for."},
                { "r": "Our Facebook page - https://www.facebook.com/vivo.desportes"}
             ];

         LoadRules(moreRules);
  //         console.log("Video Section data is "+ moreRules);

            function LoadRules(data) {

              console.log("Load Video sections");
              var videoSections = document.getElementById('more_rules');
              videoSections.innerHTML = "";

              for(var k = 0; k < data.length ; k++)
                 videoSections.innerHTML += "<h6>&#8226&nbsp "+data[k].r+"</h6>";
            }

    // var Features = [
    //      { "feature": "Feature 1"},
    //      { "feature": "Feature 2"},
    //  ];

       //   LoadF(Features);
           //console.log("Video Section data is "+ Features);

            function loadSections2(data) {

              console.log("Load Video sections");
              var videoSections = document.getElementById('tournament-features');
              videoSections.innerHTML = "";

              for(var l =0; l < data.length ; l++)
                 videoSections.innerHTML += "<h6>&#8226&nbsp "+data[l]+"</h6>";
            }
            // $('.modal-trigger').leanModal();
            function loadButtons(data) {

            var fixtures = document.getElementById('Fixtures');
            fixtures.innerHTML = "<a class=\"btn waves-effect red\" href=\"../"+ data.fix+" \">Fixtures<i class=\"fa fa-cloud-download right\"></i></a>";
            }

$('#sendDetail').on('click',function(){

            var $first_name=$('#first_name');
            var $last_name=$('#last_name');
            var $phone_name=$('#phone_name');
             var $email=$('#email');


             var obj={
                  first_name:$first_name.val(),
                  last_name:$last_name.val(),
                  email:$email.val(),
                  phone_name:$phone_name.val()
             };

               console.log(obj);
             $.ajax({
               type:'POST',
               url:'/api/tournaments/details',
               data:obj,
              success:function(){
               console.log("success");
              }

             });

           });

 });
