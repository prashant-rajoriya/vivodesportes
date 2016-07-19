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
        
       tournDetails.innerHTML +=" <div class=\"row grey lighten-4 card-panel\"><div class=\"valign col l2\"><img width=\"640px\" height=\"360px\" src=\"../../"+data[j].banner+
       "\" alt=\"Tournament Image\" class=\"responsive-img\"></div><div class=\"valign col l7\"><h2>Tournament: "+
        data[j].name+"</h2><h4>Location: "+ data[j].location+"</h4>";
        //     players.innerHTML += "<div class=\"col s4\"><div class=\"card\"><div class=\"card-image\"><img src=\"/images/Messi.jpg\"><span class=\"card-title\">" +data[j].name+"</span></div><div class=\"card-content\"><p>"+data[j].age+"</p></div><div class=\"card-action\"><a class=\"modal-trigger\" href=\"#modal1\">Know More</a></div></div><div id=\"modal1\" class=\"modal\"><div class=\"modal-content\"><h4>Sahil Jain</h4><p>Sahil jain is a football player at DA-IICT.</p></div></div></div>";
   
        tournDetails.innerHTML += "<form action = '/api/admin/tourn_edit' class='tform' method = 'GET'><input type='hidden' value ="+data[j]._id+"  name = 'edit'><button class ='ui blue button' type= 'submit'>Edit</button></form>";
        tournDetails.innerHTML += "<form action = '/api/admin/delete' class='tform' method = 'POST'><input type='hidden' value ="+data[j]._id+"  name = 'delete'><button class = 'ui red button' type= 'submit'>Delete</button></form>";


    }
   }
 });