$(document).ready(function () {
  $("#nameheader").load("../html/header_withoutsearch.html");
  $("#footer").load("../html/footer.html");

 });

 function skills(e){
     var id = $(e).data("id");
     id = id.toString();
     localStorage.setItem("videos",id);
    //  }
 }