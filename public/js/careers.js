$(document).ready(function () {

  $("#nameheader").load("../html/header_withoutsearch.html");
  $("#footer").load("../html/footer.html");

    var careerstring = document.getElementById('careerstring');
    careerstring.innerHTML=" ";
    var frame1 = document.getElementById('video');
    frame1.innerHTML=" ";

  $.ajax({
    type: 'GET',
    url: '/career',
    dataType: "json",
    success: function (response) {
      console.log(response);
          loadSection(response);
    },
    error: function () {
      console.error(status, err.toString());
    }
    });

    function loadSection(data) {
      careerstring.innerHTML += " ";
        careerstring.innerHTML += data.career_text;
        frame1.innerHTML +="<iframe width=\"800\" height=\"450\" src=\""+data.src +"\" frameborder=\"0.5\" allowfullscreen></iframe>";
    }

});
