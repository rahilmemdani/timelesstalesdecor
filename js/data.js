
const aboutCBSELink="https://www.cbse.gov.in/cbsenew/pedagogy.html";
const officialCBSELink="http://cbseaff.nic.in/cbse_aff/schdir_Report/userview.aspx";
const aboutICSELink="https://www.youtube.com/watch?v=4KEnXvl7kgs&feature=emb_logo";
const officialICSELink="https://www.cisce.org/Locate.aspx";
const aboutIBLink="https://www.youtube.com/watch?v=9LuuJa3t-m8";
const officialIBLink="https://www.ibo.org/programmes/find-an-ib-school/";
const aboutIGCSELink="https://www.cambridgeinternational.org/why-choose-us/parents-and-students/";
const officialIGCSELink="https://www.cambridgeinternational.org/why-choose-us/find-a-cambridge-school/";
const officialAKESILink="https://agakhanschools.org/India";
const pageSize=10;
var page=0;
var totalRecords;
var totalNoOfPages;
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
        $('#imgLoading').hide();
    }
});

$('#ddlCity').change(
  function() {
      var city= this.value;
      $('button').removeClass('active');
      $('#btnALL').addClass('active');  
      page=0;
      callApiAndPopulateBoardDetails(city,"ALL",page,pageSize);
  }
);

$('#btnCBSE').click(
  function() {
    $('button').removeClass('active');
    $('#boardInfo').show();
    $(this).addClass('active');
      var city=$('#ddlCity').val();
      var board = $(this).text();
      $('#selectedBoard').text(board);
      $("#aboutBoardLink").attr("href", aboutCBSELink);
      $("#OfficialLink").attr("href", officialCBSELink);
      page=0;
      callApiAndPopulateBoardDetails(city,board,page,pageSize);
  }
);


$('#btnICSE').click(
  function() {
    $('button').removeClass('active');
    $('#boardInfo').show();
    $(this).addClass('active');
      var city=$('#ddlCity').val();
      var board = $(this).text();
      $('#selectedBoard').text(board);
      $("#aboutBoardLink").attr("href", aboutICSELink);
      $("#OfficialLink").attr("href", officialICSELink);
      page=0;
      callApiAndPopulateBoardDetails(city,board,page,pageSize);
  }
);


$('#btnIB').click(
  function() {
    $('button').removeClass('active');
    $('#boardInfo').show();
    $(this).addClass('active');
      var city=$('#ddlCity').val();
      var board = $(this).text();
      $('#selectedBoard').text(board);
      $('#boardInfo').show();
      $("#aboutBoardLink").attr("href", aboutIBLink);
      $("#OfficialLink").attr("href", officialIBLink);
      page=0;
      callApiAndPopulateBoardDetails(city,board,page,pageSize);
  }
);


$('#btnIGCSE').click(
  function() {
    $('button').removeClass('active');
    $(this).addClass('active');
      var city=$('#ddlCity').val();
      var board = $(this).text();
      $('#selectedBoard').text(board);
      $('#boardInfo').show();
      $("#aboutBoardLink").attr("href",aboutIGCSELink);
      $("#OfficialLink").attr("href",officialIGCSELink);
      page=0;
      callApiAndPopulateBoardDetails(city,board,page,pageSize);
  }
);


$('#btnAKESI').click(
  function() {
    $('button').removeClass('active');
    $('#boardInfo').show();
    $(this).addClass('active');
      var city=$('#ddlCity').val();
      var board = $(this).text();
      $('#selectedBoard').text(board);
      $('#boardInfo').show();
      $("#OfficialLink").attr("href",officialAKESILink);
      page=0;
      callApiAndPopulateBoardDetails(city,board,page,pageSize);
  }
);


$('#btnALL').click(
  function() {
    $('button').removeClass('active');
    $('#boardInfo').hide();
    $(this).addClass('active');
      var city=$('#ddlCity').val();
      var board = $(this).text();
      page=0;
      callApiAndPopulateBoardDetails(city,"",page,pageSize);
  }
);


$('#btnPrev').click(
  function() {
    var city=$('#ddlCity').val();
    var board = $('#lblBoard').html();
    page--;
    callApiAndPopulateBoardDetails(city,board,page,pageSize);
  }
);

$('#btnNext').click(
  function() {
    var city=$('#ddlCity').val();
    var board = $('#lblBoard').html();
    
    page++;
    callApiAndPopulateBoardDetails(city,board,page,pageSize);
  }
);

//+"&page"+page+"&size="+size
function callApiAndPopulateBoardDetails(city,board)
      {
        $('#tBody').empty();
        $('#lblBoard').text(board);

        if(board == "ALL")board="";
        $('#imgLoading').show();
        var url =  "https://akeb-api.herokuapp.com/api/schools?city="+city+"&curriculum="+board+"&page="+page+"&size="+pageSize;
        $.ajax({
          type: "GET",
          url: url,
          dataType: "json",
          contentType: "application/json; charset=utf-8",
          success: function (result) {
            totalRecords = result.totalElements;
            
            totalNoOfPages = Math.floor((totalRecords/pageSize));

            if(totalRecords%pageSize > 0){
              totalNoOfPages++;
            }
            
            if(totalNoOfPages==1 || totalNoOfPages==0){
              $("#btnPrev").attr("disabled", true);
              $("#btnNext").attr("disabled", true);
            }else if(page == (totalNoOfPages-1)){
            $("#btnNext").attr("disabled", true);
            $("#btnPrev").attr("disabled", false);
            }else if(page == 0){
              $("#btnPrev").attr("disabled", true);
              $("#btnNext").attr("disabled", false);
            }else{
              $("#btnPrev").attr("disabled", false);
              $("#btnNext").attr("disabled", false);
            }

            var number_of_rows = result.data.length;
        
            var table_body = '';
            
            for(var i=0;i<number_of_rows;i++){
                
              table_body+='<tr>';
              table_body +='<td width="40%">';
              table_body +='<b>'+result.data[i].name+'</b>';
              table_body +='</td>';
              
              table_body +='<td width="10%">';
              table_body +='<b>'+result.data[i].curriculum+'</b>';
              table_body +='</td>';
              
              table_body +='<td width="20%">';
              table_body +='<span>'+(result.data[i].noOfStudents==null?'-':result.data[i].noOfStudents)+'</span>';
              table_body +='</td>';
              
              table_body +='<td width="15%">';
              var mapURL="https://maps.google.com?q="+(result.data[i].latitude+","+result.data[i].longitude);
              //              alert(mapURL);
              table_body +='<a href="' + mapURL + '" target="_blank"><img src="images/map-icon.png" /><span>Map</span></a>';          
              table_body +='</td>';
              
              table_body +='<td width="15%">';
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

