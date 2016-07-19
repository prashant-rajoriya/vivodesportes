$(document).ready(function () {
     var input3 = document.getElementById('input1');
     input3.value="";
     var input4 = document.getElementById('input2');
     input4.value="";

    $('#update').on('click',function(){
        var $input1 = CKEDITOR.instances['input1'].getData();
        var $input2 = $('#input2').val();
        console.log($input1);
        console.log($input2);

        $.ajax({
            type: 'POST',
            url: '/career/update',
            dataType: "json",
            data:{
                career_text:$input1,
                src:$input2
            },

            success: function (response) {
                console.log(response);

            },
            error: function(xhr, status, err) {
                console.error(status, err.toString());
            }
        });
    });

    $.ajax({
        type: 'GET',
        url: '/career',
        dataType: "json",
        success: function (response) {
            loadSection2(response);
        },
        error: function () {
            console.error(status, err.toString());
        }
    });

    function loadSection2(data) {
        input3.value = data.career_text;
        input4.value = data.src;
    }

});
