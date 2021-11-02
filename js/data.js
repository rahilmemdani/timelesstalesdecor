
const aboutCBSELink="https://www.cbse.gov.in/cbsenew/pedagogy.html";
const officialCBSELink="http://cbseaff.nic.in/cbse_aff/schdir_Report/userview.aspx";
const aboutICSELink="https://www.youtube.com/watch?v=4KEnXvl7kgs&feature=emb_logo";
const officialICSELink="https://www.cisce.org/Locate.aspx";
const aboutIBLink="https://www.youtube.com/watch?v=9LuuJa3t-m8";
const officialIBLink="https://www.ibo.org/programmes/find-an-ib-school/";
const aboutIGCSELink="https://www.cambridgeinternational.org/why-choose-us/parents-and-students/";
const officialIGCSELink="https://www.cambridgeinternational.org/why-choose-us/find-a-cambridge-school/";
const officialAKESILink="https://agakhanschools.org/India";
const GET_CITY_LIST_URL="https://akeb-api.herokuapp.com/api/schools/cities";
const GET_SCHOOLS_URL="https://akeb-api.herokuapp.com/api/schools";

const pageSize=10;
var page=0;
var totalRecords;
var totalNoOfPages;
var schoolData;
var isSearchByPincode=false;
$(window).load(function () {
  $.ajax({
    type: "GET",
    url: GET_CITY_LIST_URL,
    dataType: "json",
    contentType: "application/json; charset=utf-8",
    headers: {
      "Authorization": "Bearer 5mdq74lzuk1w8xsobjvg",
    },
    success: function (result) {
        $('#ddlCity').empty();
        $('#ddlCity').append("<option value='NA' disabled selected>Select city</option>");
        $.each(result.data, function (key, value) {
            $('#ddlCity').append($("<option></option>").val(value).html(value));
        });
        $('#imgLoading').hide();
    }
});


$('#btnSearch').click(
  function() {

    var pincode = document.getElementById("txtPincode").value;

    if(pincode == ""){
      isSearchByPincode = false;
    }
    else if(pincode != "" && pincode.length == 6){
      isSearchByPincode = true;
    }
    else{
      alert("Please enter valid pincode");
      return;
    }

    var city= $("#ddlCity").val();
    $('button').removeClass('active');
    $('#btnALL').addClass('active');  
    page=0;
    callApiAndPopulateBoardDetails(city,"ALL");
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
      callApiAndPopulateBoardDetails(city,board);
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
      callApiAndPopulateBoardDetails(city,board);
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
      callApiAndPopulateBoardDetails(city,board);
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
      callApiAndPopulateBoardDetails(city,board);
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
      callApiAndPopulateBoardDetails(city,board);
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
      callApiAndPopulateBoardDetails(city,"");
  }
);


$('#btnPrev').click(
  function() {
    var city=$('#ddlCity').val();
    var board = $('#lblBoard').html();
    page--;
    displayCurrentPageData();
    enableDisablePagination();
  }
);

$('#btnNext').click(
  function() {
    var city=$('#ddlCity').val();
    var board = $('#lblBoard').html();
    
    page++;
    displayCurrentPageData();
    enableDisablePagination();
  }
);

function displayCurrentPageData(){
  
  var currentPageData = schoolData.slice((page*3),((page+1)*3));

  var table_body = '';
  var number_of_rows = currentPageData.length;

  for(var i=0;i<number_of_rows;i++){
      
    table_body+='<tr>';
    table_body +='<td width="35%">';
    table_body +='<b>'+currentPageData[i].name+'</b>';
    table_body +='</td>';
    
    table_body +='<td width="10%">';
    table_body +='<b>'+currentPageData[i].curriculum+'</b>';
    table_body +='</td>';

    $('#thDistance').hide();

    if(isSearchByPincode){
    $('#thDistance').show();  
    var distance = (currentPageData[i].distance/1000);
    if(distance>100) distance = "More than 100";

    distance+=" KM";

    table_body +='<td width="10%">';
    table_body +='<b>'+distance+'</b>';
    table_body +='</td>';
    }
    
    table_body +='<td width="20%">';
    table_body +='<span>'+(currentPageData[i].noOfStudents==null?'-':currentPageData[i].noOfStudents)+'</span>';
    table_body +='</td>';
    
    table_body +='<td width="15%">';
    var mapURL="https://maps.google.com?q="+(currentPageData[i].latitude+","+currentPageData[i].longitude);
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
}

function enableDisablePagination(){
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
}


function callApiAndPopulateBoardDetails(city,board)
      {
        $('#tBody').empty();
        $('#lblBoard').text(board);
        page = 0;

        var pincode = document.getElementById("txtPincode").value;

        if(board == "ALL")board="";
        $('#imgLoading').show();
        
        var url =  GET_SCHOOLS_URL+"?city="+city+"&curriculum="+board+"&page=0&size=100";

        if(isSearchByPincode){
          url+="&pincode="+pincode;
        }

        
        $.ajax({
          type: "GET",
          url: url,
          dataType: "json",
          contentType: "application/json; charset=utf-8",
          headers: {
            "Authorization": "Bearer 5mdq74lzuk1w8xsobjvg",
          },
          success: function (result) {

            if(result.errorMessage != null){
              alert(result.errorMessage+"- List of Schools from Selected City will be displayed.");
              document.getElementById("txtPincode").value="";
              isSearchByPincode=false;
            }

            totalRecords = result.totalElements;
            
            totalNoOfPages = Math.floor((totalRecords/pageSize));

            if(totalRecords%pageSize > 0){
              totalNoOfPages++;
            }

            schoolData = result.data;
            displayCurrentPageData();
            enableDisablePagination();
            
             $('#imgLoading').hide();
          }
      });
      
      }

    $(".loader").fadeOut("slow");
});

