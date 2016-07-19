$(document).ready(function(){
  $("#load-more").hide();
      console.log("Loading player profiles");
      $("#footer").load("../html/footer.html");

      var counter = 0;
      var click = document.getElementById('clickBox');
      click.innerHTML = "<i class=\"material-icons right\" style=\"color:black;\">search</i>";
      var players = document.getElementById('players');
      players.innerHTML = "";
      var searchResults = document.getElementById('search-results');
      searchResults.innerHTML = "";

      $('#search-results').hide();

      //
       $.ajax({
            url: '/api/player',
            dataType: 'json',
            cache: false,
            success: function(data) {
              console.log(data);
                loadPlayers(data);$('.modal-trigger').leanModal();
            },
            error: function(xhr, status, err) {
              console.error(status, err.toString());
            }
          });


     $('#load-more').click(function(){


               counter = counter + 1;

               console.log("Counter "+ counter);
               //loadPlayers(myData);
                $.ajax({
                   url: '/api/player?seek='+(counter*9),
                   dataType: 'json',
                   cache: false,
                   success: function(result) {
                       loadPlayers(result);$('.modal-trigger').leanModal();

                   },
                   error: function(xhr, status, err) {
                     console.error(status, err.toString());
                   }
                 });


        });



        function loadPlayers(data){


        console.log(data.length);
         for(var j = 0; j < data.length ; j++){
            var oneDay = 12*30*24*60*60*1000;
            var firstDate = new Date(data[j].bdate);
            var secondDate = new Date();
            var age = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
            console.log("age"+age+" "+firstDate);
            players.innerHTML +=

            "<div class=\"col s4\">"+
            "<div class=\"card\">"+
            "<div class=\"card-image\">"+
            "<div id=\"something"+data[j].username+"\">"+
            "<img class=\"responsive-img\" id=\"teststyle\" src=\"../images/tick.png\">"+
            "</div><img src=\"/api/profile/pic?name="+data[j].username+"\" id=\"player_pic\"class=\"responsive-img\">"+
            "<span class=\"card-title\">"+data[j].f_name+" "+data[j].l_name+"<div id=\"teststyle\"><i></i></div></span></div>"+

            "<div class=\"card-content\">"+
            "<div class=\"row\">"+
            "<div class=\"col\">Overall Rating:</div>"+
            "<div id=\"star_calculate_c1"+data[j].username+"\" class=\"col\"></div><p>("+data[j].rating+"/100)</p></div><p>Age:&nbsp&nbsp"+age+"</p><p>Prefered Foot:&nbsp&nbsp"+data[j].pre_foot+"</p></div>"+
            "<div class=\"card-action\">"+
            "<a target=\"_blank\" href=\"View_Profile.html?view="+data[j]._id+"\">Know More</a>"+
            "</div></div></div>";

            if(data[j].vverified){}
              else
                $('#something'+data[j].username).hide();
          }

          for(var i = 0; i < data.length ; i++){

          var star = document.getElementById('star_calculate_c1'+data[i].username);
          star.innerHTML = "";
          var rating= data[i].rating/20;
          var fullstar=Math.floor(rating);
          var halfstar=rating-fullstar;
          var remaining_star=5;
          console.log(fullstar+" "+halfstar);

          for(fullstar; fullstar>0 ; fullstar--){
              star.innerHTML += "<span><i class=\"tiny material-icons\" id=\"star_gold\">star</i>";
              remaining_star--;
         }

         if(halfstar>=0.75)
         {
              star.innerHTML += "<span><i class=\"tiny material-icons\" id=\"star_gold\">star</i>";
              remaining_star--;
         }
         else if(halfstar>=0.25 && halfstar<0.75){
              star.innerHTML += "<span><i class=\"tiny material-icons\" id=\"star_gold\">star_half</i>";
              remaining_star--;
         }
         for(remaining_star;remaining_star>0;remaining_star--){
              star.innerHTML += "<span><i class=\"tiny material-icons\" id=\"star_gold\">star_border</i>";
         }
      }


         for(var j = 0; j < data.length ; j++){

           var basic = document.getElementById('basicinfo'+(j +(counter*data.length)));
           var oneDay = 12*30*24*60*60*1000; // hours*minutes*seconds*milliseconds
            var firstDate = new Date(data[j].bdate);
            var secondDate = new Date();
            var age = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
            console.log("age"+age+" "+firstDate);
           basic.innerHTML = "";
           basic.innerHTML += "<br><img src=\"/api/profile/pic?name="+data[j].username+"\" class=\"circle responsive-img\"><br><br><div align=\"center\"><div id=\"star_calculate"+(j + counter*data.length)+"\"></div></div><hr><br><span class=\"info\">Age:&nbsp&nbsp" +age+ "</span><br><br><span class=\"info\">Email:&nbsp&nbsp" +data[j].email+ "</span><br><br><span class=\"info\">Contact:&nbsp&nbsp" +data[j].contact+ "</span><br><br><span class=\"info\">Prefered Foot:&nbsp&nbsp" +data[j].pre_foot+ "</span><br><br><span class=\"info\">Favourite Footballer:&nbsp&nbsp" +data[j].fav_footballer+ "</span><br><br><span class=\"info\">Favourite Football Club:&nbsp&nbsp" +data[j].fav_club+ "</span><br><br>";
       }




     for(var i = 0; i < data.length ; i++){

     var star = document.getElementById('star_calculate'+(i + counter*data.length));
     star.innerHTML = "";
     var rating= data[i].rating/20;
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




 for (var m = 0; m < data.length; m++) {
 loadskills(data[m],m,data.length,"normal");
 console.log(data[m]);
 };



}



      var searchFlag = 1;
    $('#searchText').keypress(function(e){
      if(e.keyCode==13)
      $('#clickBox').click();
    });
      $('#clickBox').click(function () {

              var searchValue = $('#searchText').val() || "error";
                if(searchFlag == 1 && searchValue!= "error"){
                  var value = $('#searchText').val();
                // alert("Value is"+ value);
                  $.ajax({
                      url: '/api/search?name='+ value,
                      dataType: 'json',
                      cache: false,
                      success: function(result) {
                        console.log("RESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS");

                        console.log(result);
                        loadResults(result);
                      },
                      error: function(xhr, status, err) {
                        console.error(status, err.toString());
                      }
                    });
                  $('#players').hide();
                  $('#load-more').hide();
                  $('#search-results').show();
                  players.innerHTML = "";
                  click.innerHTML = "<i class=\"material-icons right\" style=\"color:black;\">loop</i>";
                  $('#searchText').prop('disabled', true);
                  $('#searchText').val("");
                  searchFlag = 0;

                }
                else{
                    $.ajax({
                      url: '/api/player',
                      dataType: 'json',
                      cache: false,
                      success: function(data) {
                        console.log(data);
                        counter = 0;
                        loadPlayers(data);

                      },
                      error: function(xhr, status, err) {
                        console.error(status, err.toString());
                      }
                    });
                  $('#players').show();
                  $('#load-more').show();
                  $('#search-results').hide();
                  $('#searchText').prop('disabled', false);
                  searchResults.innerHTML = "";
                  click.innerHTML = "<i class=\"material-icons right\" style=\"color:black;\">search</i>";
                  searchValue = "error"
                  searchFlag = 1;
                  $('#searchText').val("");

                }

              });

              function loadResults(data) {

                    for(var j = 0; j < data.length ; j++){
                             var oneDay = 12*30*24*60*60*1000; // hours*minutes*seconds*milliseconds
                             var firstDate = new Date(data[j].bdate);
                             var secondDate = new Date();
                             var age = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));

                              searchResults.innerHTML += "<div class=\"col s4\"><div class=\"card\"><div class=\"card-image\"><img id=\"player_pic\" src=\"/api/profile/pic?name="+data[j].username+"\" class=\"responsive-img\"><span class=\"card-title\">"+data[j].f_name+" "+data[j].l_name+"<div id=\"teststyle\"><i></i></div></span></div><div class=\"card-content\"><div class=\"row\"><div class=\"col\">Overall Rating:</div><div id=\"star_calculate_search"+(j)+"\" class=\"col\"></div><p>("+data[j].rating+"/100)</p></div><p>Age:&nbsp&nbsp"+age+"</p><p>Prefered Foot:&nbsp&nbsp"+data[j].pre_foot+"</p></div><div class=\"card-action\"><a class=\"waves-effect waves-light btn-flat-small modal-trigger\" href=\"#modal0"+(j +(counter*data.length))+"\">Know More</a><div id=\"modal0"+(j +(counter*data.length))+"\" class=\"modal\"><div class=\"modal-content\"><div id=\"modal0"+(j +(counter*data.length))+"\"><h5 align = \"center\">" +data[j].f_name+ "</h5><hr><div class=\"col l6\"><div class=\"container\" id=\"basicinfo0"+(j)+"\"></div></div><div class=\"col l6\"><div class=\"conatiner\" id=\"skillinfosearch"+(j)+"\"></div></div></div></div></div></div>";

                     }

                     for(var i = 0; i < data.length ; i++){

                     var star = document.getElementById('star_calculate_search'+i);
                     star.innerHTML += "";
                     var rating= data[i].rating/20;
                     var fullstar=Math.floor(rating);
                     var halfstar=rating-fullstar;
                     var remaining_star=5;
                     console.log(fullstar+" "+halfstar);

                     for(fullstar; fullstar>0 ; fullstar--){
                         star.innerHTML = "<span><i class=\"tiny material-icons\" id=\"star_gold\">star</i>";
                         remaining_star--;
                    }

                    if(halfstar>=0.75)
                    {
                         star.innerHTML += "<span><i class=\"tiny material-icons\" id=\"star_gold\">star</i>";
                         remaining_star--;
                    }
                    else if(halfstar>=0.25 && halfstar<0.75){
                         star.innerHTML += "<span><i class=\"tiny material-icons\" id=\"star_gold\">star_half</i>";
                         remaining_star--;
                    }
                    for(remaining_star;remaining_star>0;remaining_star--){
                         star.innerHTML += "<span><i class=\"tiny material-icons\" id=\"star_gold\">star_border</i>";
                    }
                 }


                    for(var j = 0; j < data.length ; j++){

                      var oneDay = 12*30*24*60*60*1000; // hours*minutes*seconds*milliseconds
                       var firstDate = new Date(data[j].bdate);
                       var secondDate = new Date();
                     var age = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime())/(oneDay)));
                     console.log("age"+age+" "+firstDate);

                      var basic = document.getElementById('basicinfo0'+j);
                      basic.innerHTML = "";
                      basic.innerHTML = "<br><img src=\"/api/profile/pic?name="+data[j].username+"\" class=\"circle responsive-img\"><br><br><div align=\"center\"><div id=\"star_calculate_search_basic"+(j)+"\"></div></div><hr><br><span class=\"info\">Age:&nbsp&nbsp" +age+ "</span><br><br><span class=\"info\">Email:&nbsp&nbsp" +data[j].email+ "</span><br><br><span class=\"info\">Conatact:&nbsp&nbsp" +data[j].contact+ "</span><br><br><span class=\"info\">Prefered Foot:&nbsp&nbsp" +data[j].pre_foot+ "</span><br><br><span class=\"info\">Favourite Footballer:&nbsp&nbsp" +data[j].fav_footballer+ "</span><br><br><span class=\"info\">Favourite Football Club:&nbsp&nbsp" +data[j].fav_club+ "</span><br><br>";


                  }





                for(var i = 0; i < data.length ; i++){

                var star = document.getElementById('star_calculate_search_basic'+i);
                star.innerHTML = "";
                var rating= data[i].rating/20;
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


            for (var m = 0; m < data.length; m++) {
            loadskills(data[m],m,0,'search');
            }


           }



    });
