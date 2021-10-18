$(window).load(function () {
  $(".loader").fadeOut("slow");
});

$(function () {
  $("#header").load("./header.html");
  $("#footer").load("./footer.html");
});