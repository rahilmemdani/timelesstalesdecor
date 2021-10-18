$(window).load(function () {
  $.ajax({
    type: "GET",
    url: "https://akeb-api.herokuapp.com/api/schools/cities",
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    success: function (result) {
        $('#ddlCity').empty();
        $('#ddlCity').append("<option value='NA' disabled selected>Select city</option>");
        $.each(result.data, function (key, value) {
            $('#ddlCity').append($("<option></option>").val(value).html(value));
        });
    }
});

$('#ddlCity').change(
  function() {
      var city= this.value;
      $('button').removeClass('active');
      $('#btnCBSE').addClass('active');  
      callApiAndPopulateBoardDetails(city,"CBSE");
  }
);

$('#btnCBSE').click(
  function() {
    $('button').removeClass('active');
    $(this).addClass('active');
      var city=$('#ddlCity').val();
      var board = $(this).text();
      callApiAndPopulateBoardDetails(city,board);
  }
);


$('#btnICSE').click(
  function() {
    $('button').removeClass('active');
    $(this).addClass('active');
      var city=$('#ddlCity').val();
      var board = $(this).text();
      callApiAndPopulateBoardDetails(city,board);
  }
);


$('#btnIB').click(
  function() {
    $('button').removeClass('active');
    $(this).addClass('active');
      var city=$('#ddlCity').val();
      var board = $(this).text();
      callApiAndPopulateBoardDetails(city,board);
  }
);


$('#btnIGCSE').click(
  function() {
    $('button').removeClass('active');
    $(this).addClass('active');
      var city=$('#ddlCity').val();
      var board = $(this).text();
      callApiAndPopulateBoardDetails(city,board);
  }
);


$('#btnAKESI').click(
  function() {
    $('button').removeClass('active');
    $(this).addClass('active');
      var city=$('#ddlCity').val();
      var board = $(this).text();
      callApiAndPopulateBoardDetails(city,board);
  }
);


$('#btnALL').click(
  function() {
    $('button').removeClass('active');
    $(this).addClass('active');
      var city=$('#ddlCity').val();
      var board = $(this).text();
      callApiAndPopulateBoardDetails(city,board);
  }
);


function callApiAndPopulateBoardDetails(city,board)
      {
        $('#tBody').empty();
        $('#lblBoard').text(board);
        $('#imgLoading').show();
        $.ajax({
          type: "GET",
          url: "https://akeb-api.herokuapp.com/api/schools?city="+city+"&curriculum="+board,
          dataType: "json",
          contentType: "application/json; charset=utf-8",
          success: function (result) {
            var number_of_rows = result.data.length;
            var number_of_cols = 4;
            var table_body = '<table border="1">';
            for(var i=0;i<number_of_rows;i++){
    
              table_body+='<tr>';
              table_body +='<td width="55%">';
              table_body +='<b>'+result.data[i].name+'</b>';
              table_body +='</td>';
              
              table_body +='<td width="20%">';
              //alert(result.data[i].noOfStudents);
              table_body +='<span>'+(result.data[i].noOfStudents==null?'0':result.data[i].noOfStudents)+'</span>';
              table_body +='</td>';
              
            
              table_body +='<td width="12%">';
              table_body +='<a href="https://maps.google.com?q=19.1472339,72.8345429"+result.data[i].latitude+","+result.data[i].longitude><img src="images/map-icon.png" /><span>Map</span></a>';
              table_body +='</td>';
              
              table_body +='<td width="13%">';
              table_body +='<a href=""><img src="images/website-icon.svg" /><span>Website</span></a>'
              table_body +='</td>';
    
              table_body+='</tr>';
            }
              table_body+='</table>';
             $('#tBody').html(table_body);
             $('#imgLoading').hide();
          }
      });
      
      }

  $(".loader").fadeOut("slow");
});

