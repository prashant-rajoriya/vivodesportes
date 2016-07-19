 $(document).ready(function () {
  $('.dropdown-button').dropdown({
  inDuration: 300,
  outDuration: 225,
  constrain_width: false, // Does not change width of dropdown to that of the activator
  hover: false, // Activate on hover
  gutter: 0, // Spacing from edge
  belowOrigin: true, // Displays dropdown below the button
  alignment: 'left' // Displays dropdown with edge aligned to the left of button
});
$('.button-collapse').sideNav();
  $('.modal-trigger').leanModal();
  console.log("Inside index.js");
// $('.dropdown-button').on('click',function(){
//   $('.dropdown-content').toggle();
//
//      $(this).addClass('active');
//      $(".dropdown-content").css("opacity", "1");
//
//      $('.dropdown-content').addClass('active');
// $('.dropdown-content').fadeOut(8000);
// $('.dropdown-content').removeClass('active');
// });
//
//   $('.button-collapse').sideNav();
//   $('.modal-trigger').leanModal();
//   console.log("Inside header.js");



  // if(localStorage.getItem("register")){
  //   document.getElementById('register').innerHTML = "Registration successful. Please verify Email-ID to continue";
  //   $( "#toastArea").slideDown( 500 );
  //   $( "#toastArea").delay( 1000 ).slideUp(500);
  //   localStorage.removeItem("isVerified");
  // }



  /*
      THIS PART OF THE CODE IS WHERE THE SEARCH FUNCTIONALITY IS IMPLEMENTED!
  */


});
