$(document).ready(function () {
   $("#nameheader").load("../html/header_withoutsearch.html");
   $("#footer").load("../html/footer.html");
   $.ajax({
       type: 'GET',
       url: '/api/tournaments',
       datatype: 'json',
       success: function (result) {
            loadTournaments(result);
        },
        error: function(xhr, status, err) {
        console.error(status, err.toString());
      }
    });

   $("#filters").hide();
     function loadTournaments(data) {
       var tournDetails = document.getElementById('tournament-details');
       tournDetails.innerHTML = "";
       
       for(var j = 0 ; j < data.length ; j++){
        var oneDay = 24*60*60*1000; // hours*minutes*seconds*milliseconds
        var firstDate = new Date(data[j].closedate);
        var secondDate = new Date();
        var Days = Math.round((firstDate.getTime() - secondDate.getTime())/(oneDay));
        var Str = `<div class=\"valign col l3 center\">
                        <h5>`+Days+`</h5>
                        <h6>Days to go</h6>
                    </div>`;
        if(Days<0){
          Days = "Registration Closed";
          var Str = `<div class=\"valign col l3 center\">
                        <h5>`+Days+`</h5>
                    </div>`;
          $('#togo').hide();
        }
       tournDetails.innerHTML += "<a href=\"TournamentsDetails.html?tourn="+data[j]._id+"\"><div class=\"row grey lighten-4 card-panel\"><div class=\"valign col l2\"><img src=\"../"+data[j].banner+"\" alt=\"Tournament Image\" class=\"responsive-img\"></div><div class=\"valign col l7\"><h6>Tournament: "+ data[j].name+"</h6><h6>Location: "+ data[j].location+"</h6><h6>Type: "+ data[j].type+"<h6></div> "+Str+"</div></a>";
        //     players.innerHTML += "<div class=\"col s4\"><div class=\"card\"><div class=\"card-image\"><img src=\"/images/Messi.jpg\"><span class=\"card-title\">" +data[j].name+"</span></div><div class=\"card-content\"><p>"+data[j].age+"</p></div><div class=\"card-action\"><a class=\"modal-trigger\" href=\"#modal1\">Know More</a></div></div><div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4>Sahil Jain</h4><p>Sahil jain is a football player at DA-IICT.</p></div></div></div>";
    }
   }
 });


