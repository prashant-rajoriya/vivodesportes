$(document).ready(function () {
  $("#nameheader").load("../html/header_withoutsearch.html");
  $("#footer").load("../html/footer.html");
  $('.parallax').parallax();
});

var $mission = $('#mission');
var $au = $('#au');
var $atd = $('#atd');
var $row = $('#innerRow1');

$.ajax({
  type: 'GET',
  url: '/aboutUs/show?id=1',
  success: function(mission) {
    console.log(mission);
    $mission.append('<p>'+mission.content+'</p>');
  }
});

$.ajax({
  type: 'GET',
  url: '/aboutUs/show?id=2',
  success: function(au) {
    console.log(au);
    $au.append('<p>'+au.content+'</p>');
  }
});

$.ajax({
  type: 'GET',
  url: '/aboutUs/show?id=3',
  success: function(atd) {
    console.log(atd);
    $atd.append('<p>'+atd.content+'</p>');
  }
});

$.ajax({
  type: 'GET',
  url: '/aboutUs/showEmp',
  success: function(data) {
    for(var i=0; i<data.length; i++) {
      $row.append('<div class="col l3"><div class="row"><div class="valign col l8 valign-wrapper"><img src="../image/employees/'+data[i].empPic+'.jpg'+'" alt="" class="circle responsive-img"></div></div><div class="row"><div class="valign col l8"><div><h5 style="margin-top:0" align = "center">'+data[i].fullName+'</h5><h6 class="light" align = "center">'+data[i].designation+'</form></div></div>');
    }
    console.log(data);
  }
});

// $.ajax({
//   type: 'GET',
//   url: '/aboutUs/'
// });


//
// $("#photo img").hover(function() {
//   $("#addbtn").fadeIn();
//   }, function() {
//     $("#addbtn").hide();
//   }
// );
//
// $("#addbtn").mouseover(function() {
//   $(this).show();
// });
//
// $('.modal-trigger').leanModal({
//   dismissible: true, // Modal can be dismissed by clicking outside of the modal
//   opacity: .2, // Opacity of modal background
//   in_duration: 300, // Transition in duration
//   out_duration: 200, // Transition out duration
// });
//
// $("#uploadImage").click(function() {
//   var ext = $('#img_upload').val().split('.').pop().toLowerCase();
//   if($.inArray(ext, ['png','jpg','jpeg']) == -1) {
//     alert('invalid extension!');
//   }
//   else{
//     $('#img_form').submit();
//   }
// });
//
// $('.modal-trigger').leanModal({
//     dismissible: true, // Modal can be dismissed by clicking outside of the modal
//     opacity: .2, // Opacity of modal background
//     in_duration: 300, // Transition in duration
//     out_duration: 200, // Transition out duration
// });
//
// function loadLeftPanel(source){
//   var panel = document.getElementById('left_panel');
//   panel.innerHTML = "";
//   panel.innerHTML += "<div class=\"row\"><div class=\"profile\"><div class=\"valign col l9 valign-wrapper\"><div class=\"hover11\" id=\"photo\"><div id=\"addbtn\"><a class='dropdown-button' href='#' data-activates='dropdown1'><i class=\"medium material-icons\">add_a_photo</i></a></div> <figure><img id=\"playerpic\" src=\""+source[0].image+"\" alt=\"\" class=\"circle responsive-img\"></figure><ul id='dropdown1' class='dropdown-content'><li><a class=\"modal-trigger waves-light\" href=\"#modal2\">View Photo</a></li><li><a class=\"modal-trigger waves-light\" href=\"#modal4\">Upload Photo</a></li><li><a href=\"#!\" id=\"remove_photo\">Remove Photo</a></li></ul></div><div id=\"modal2\" class=\"modal\"><div class=\"modal-content grey\"><center><img src=\""+source[0].image+"\" alt=\"\" class=\"responsive-img\"></center></div></div><div id=\"modal4\" class=\"modal\"><div class=\"modal-content\"><h5> Only upload photo in jpg or png format</h5><br><br><br><div class=\"row\"><div class=\"file-field input-field row\"><div class=\"btn\"><span>Image Upload</span><input type=\"file\"></div><div class=\"file-path-wrapper\"><input class=\"file-path validate\"  id=\"img_upload\" type=\"text\"></div></div><div class=\"modal-footer\"><a href=\"#!\" id=\"uploadImage\" class=\" modal-action modal-close waves-effect waves-green btn\">Upload</a></div></div></div></div></div></div></div><div class=\"row\"><div class=\"valign col l10\"><br><h3 align = \"center\">"+source[0].fname+" "+source[0].lname+"</h3><br><br><div class=\"row\" align=\"center\"><h5>Overall Rating</h5></div><div id=\"star_calculate\"></div><div class=\"row\" align=\"center\"><h5>("+source[0].overall_rating+"/100)</h5></div></div></div>";
// }
