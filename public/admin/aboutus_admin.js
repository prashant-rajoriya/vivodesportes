$(document).ready(function () {

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
      $row.append('<div class="ui card"><div class="image"><img src="../image/employees/'+data[i].empPic+'.jpg"></div><div class="content"><div class="header">'+data[i].fullName+'<div class="description">'+data[i].designation+'</div><div class="extra content"><form action="/aboutUs/editEmp?id='+data[i]._id+'" method="POST"><input type="submit" class="ui black button" value="Edit"></form><form action="/aboutUs/removeEmp?id='+data[i]._id+'" method="POST"><input type="submit" class="ui red button" value="Remove"></form></div></div>');
    }
    console.log(data);
  }
});
