$(document).ready(function(){


         console.log("Inside skills.js -> Loading main and player videos");

        //  var videoName = localStorage.getItem("videos");
        //  alert(videoName);
        //
          if(localStorage.getItem("videos")){
            $("#nameheader").load("../html/header_withoutsearch.html");
            $("#footer").load("../html/footer.html");

              var videoName = localStorage.getItem("videos");
              //localStorage.removeItem("videos");

              $.ajax({
                type: 'GET',
                dataType: 'json',
                url:'/../videos.json',
                success: function(data) {
                    // data = JSON.parse(data);
                    console.log(data);
                    loadVideo(data[videoName]);

                },
                error: function(xhr, status, err) {
                    console.error(status, err.toString());
                  }

                });



                // var myData =[
                // { "name": "Elastico", "link": "https://www.youtube.com/embed/xKOFhEKMwVo?rel=0" , "image": "https://i.ytimg.com/vi_webp/wNEWJ04Ktp0/mqdefault.webp" },
                // { "name": "My House - Flo Rida", "link": "https://www.youtube.com/watch?v=uo35R9zQsAI?rel=0" , "image": "https://i.ytimg.com/vi/uo35R9zQsAI/hqdefault.jpg?custom=true&w=196&h=110&stc=true&jpg444=true&jpgq=90&sp=68&sigh=Ytj-v0jjsxan8RAuIKZNV6btD8M" },
                // { "name": "Sahil", "link": "https://www.youtube.com/watch?v=uo35R9zQsAI" , "image": "https://i.ytimg.com/vi_webp/wNEWJ04Ktp0/mqdefault.webp" },
                // { "name": "Elastico", "link": "https://www.youtube.com/embed/xKOFhEKMwVo" , "image": "https://i.ytimg.com/vi_webp/wNEWJ04Ktp0/mqdefault.webp" },
                //  { "name": "Elastico", "link": "https://www.youtube.com/embed/xKOFhEKMwVo" , "image": "https://i.ytimg.com/vi_webp/wNEWJ04Ktp0/mqdefault.webp" },
                //  { "name": "Elastico", "link": "https://www.youtube.com/embed/xKOFhEKMwVo" , "image": "https://i.ytimg.com/vi_webp/wNEWJ04Ktp0/mqdefault.webp" }
                // ];

                // loadMainVideo(myData);
                // console.log("Video data is "+ myData);

                function loadVideo(data) {
                  console.log("Load Video "+data[videoName]);
                  var mainVideo = document.getElementById('main-video');
                  mainVideo.innerHTML = "";
                  mainVideo.innerHTML += "<h3 class=\"center\">"+ data[0].name+"</h3><div class=\"container center\"><a href="+data[0].link+"  target=\"_blank\" > <img src = "+data[0].image+" width = \"500\" height = \"280\"></a> </div>";

                  var otherVideo = document.getElementById('other-videos');
                  otherVideo.innerHTML = "";
                  for(var j = 1; j < 6 ; j++){
                    otherVideo.innerHTML += "<li class=\"waves-effect\"><a href="+data[j].link+"  target=\"_blank\" > <img src = "+data[j].image+" width = \"200\" height = \"112\"></a> <h5> "+data[j].name +"</h5></li>";
                  }
              }
           }

           else{
             alert('Page not found');
             window.location.replace('../index.html');
           }




          // var otherVideos = [
          // { "name": "Elastico", "link": "https://www.youtube.com/embed/xKOFhEKMwVo" , "image": "link1" },
          // { "name": "Elastico", "link": "https://www.youtube.com/embed/xKOFhEKMwVo" , "image": "link1" }
          //   ];
          //   loadOtherVideos(otherVideos);
          //   console.log("Video data is "+ otherVideos);

          //   function loadOtherVideos(data) {
          //     console.log("Load other Video");
          //     var otherVideo = document.getElementById('other-videos');
          //     otherVideo.innerHTML = "";
          //     for(var j = 0; j < data.length ; j++){
          //       otherVideo.innerHTML += "<li class=\"waves-effect\"><a class=\"waves-effect waves-light modal-trigger\" href=\"\"> <img src = \"https://i.ytimg.com/vi_webp/wNEWJ04Ktp0/mqdefault.webp\" width = \"200\" height = \"112\"></a></li>";
          //     }
          //   }



});
