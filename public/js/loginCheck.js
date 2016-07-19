$(document).ready(function(){

    console.log("Inside LoginCheck.js");

    $.ajax({
       type: 'GET',
       url: '/api/auth',
       datatype: 'json',
       success: function (result) {
            checkLog(result);
        },
        error: function(xhr, status, err) {
        console.error(status, err.toString());
      }
    });
    function checkLog(result){

        if(result.status == "online"){
          $('#visitor').hide();
          $('#visitor1').hide();
          var display = document.getElementById('display-name');
        var display1 = document.getElementById('display-name1');
           display.innerHTML = result.name;
           $(".dropdown-button").dropdown();
           display1.innerHTML = result.name;
           console.log("fdfdf");
            }
         else {
           $('#user-check').hide();
           $('#user-check1').hide();
        }

    }
});
