$(document).ready(function () {
  // $("#nameheader").load("../html/header_withoutsearch.html");
  $('#footer').load("/html/footer.html");

  console.log("Inside index.js");

  // $('.dropdown-button').dropdown({
  //   inDuration: 300,
  //   outDuration: 225,
  //   constrain_width: false, // Does not change width of dropdown to that of the activator
  //   hover: false, // Activate on hover
  //   gutter: 0, // Spacing from edge
  //   belowOrigin: true, // Displays dropdown below the button
  //   alignment: 'left' // Displays dropdown with edge aligned to the left of button
  // });


    $('.dropdown-button').on('click',function(){
      $('.dropdown-content').toggle();

         $(this).addClass('active');
         $(".dropdown-content").css("opacity", "1");

         $('.dropdown-content').addClass('active');
  $('.dropdown-content').fadeOut(80000);
    $('.dropdown-content').removeClass('active');
    });

  //
  //



  // $('.button-collapse').sideNav();
  // $('.slider').slider({full_width: true});
  // var matchNews = [
  //     { "Team1": "Man utd", "goal1": "6", "Team2": "Man City", "goal2": "0"},
  //     { "Team1": "PSG", "goal1": "2", "Team2": "Man City", "goal2": "2"}
  // ];

  //  loadMatches(matchNews);
  //   console.log("Video Section data is "+ matchNews);

  //  function loadMatches(data) {

  //    console.log("Load Video sections");
  //    var videoSections = document.getElementById('matchDetails');
  //    videoSections.innerHTML = "";

  //    for(var i = 0; i < data.length ; i++)
  //       videoSections.innerHTML += "<div class=\"card-panel grey lighten-3\" style=\"font-size:1.5vw;\"><div class=\"row\" style=\"padding:0px;\"><div class=\"valign col l5 m5 s5\" style=\"padding:0px;\"><h6>"+data[i].Team1+"</h6></div><div class=\"valign col l1 m1 s1\" style=\"padding:0px;\"><h6>"+data[i].goal1+"</h6></div><div class=\"valign col l1 m1 s1\" style=\"padding:0px;\"><h6>"+data[i].goal2+"</h6></div><div class=\"valign col l5 m5 s5\" style=\"padding:0px;\"><h6>"+data[i].Team2+"</h6></div><br></div></div>";
  //  }

  //  var TournamentNews = [
  //     { "Team1": "Man utd", "vs": "vs", "Team2": "Man City", "league": "Barclays"},
  //     { "Team1": "Chelsea", "vs": "vs", "Team2": "PSG", "league": "Barclays"},
  //     { "Team1": "Man utd", "vs": "vs", "Team2": "Man City", "league": "Barclays"},
  //     { "Team1": "Chelsea", "vs": "vs", "Team2": "PSG", "league": "Barclays"}
  // ];

  //  loadTournaments(TournamentNews);
  //   console.log("Video Section data is "+ TournamentNews);

  //  function loadTournaments(data) {

  //    console.log("Load Video sections");
  //    var videoSections = document.getElementById('tournamentDetails');
  //    videoSections.innerHTML = "";

  //    for(var j = 0; j < data.length ; j++)
  //       videoSections.innerHTML += "<div class=\"card-panel grey lighten-3\" style=\"font-size:1.5vw;\">"+data[j].league+"<div class=\"row\" style=\"padding:0px;\"><div class=\"valign col l5 m5 s5\" style=\"padding:0px;\"><h6>"+data[j].Team1+"</h6></div><div class=\"valign col l2 m2 s2\" style=\"padding:0px;\"><h6>"+data[j].vs+"</h6></div><div class=\"valign col l5 m5 s5\" style=\"padding:0px;\"><h6>"+data[j].Team2+"</h6></div><br></div></div>";
  //  }


   $.ajax({
        type:'GET',
        url: '/blog/home',
        dataType: 'json',
        cache: false,
        success: function(data) {
            console.log(data);
            loadblog(data);
        },
        error: function(xhr, status, err) {
            console.error(status, err.toString());
        }
    });

    var blog = document.getElementById('blogArea');
   blog.innerHTML = "";

   function loadblog(data) {
       for(var i = 0 ; i < data.length; i++){



             var postBlog = "<div class=\"col-md-4\">"+
               "<article class=\"type-post post wow animated fadeInUp\" data-wow-delay=\".55s\">"+
                "<div class=\"post-thumbnail\">"+
                   "<img src='/image/uploads/blogs/"+data[i].mainimage+"' style=\"height:150px\">"+
                 "</div>"+
                 "<div class=\"post-content\" style=\"height:150px;overflow:hidden; text-align:justify;\">"+
                   "<h4 class=\"entry-title\"><a href='/blog/show/"+data[i]._id+"'>"+data[i].title+"</a></h4>"+
                   "<p class=\"entry-content\">"+data[i].body+"</p>"+
                 "</div>"+
               "</article>"+
             "</div>";
             blog.innerHTML += postBlog;

       }
   }
});
