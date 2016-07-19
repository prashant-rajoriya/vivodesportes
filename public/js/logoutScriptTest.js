
  function logout(){

    console.log("Inside logout testing panel");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("username");

    document.getElementById('message').innerHTML = "You have successfully logged out!";
    $( "#message").slideDown( 500 );
    $( "#message").delay( 1000 ).slideUp(500);
    window.location.reload();
}
