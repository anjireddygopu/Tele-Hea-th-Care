var tokenKey = sessionStorage.getItem("token");
var ipadd=sessionStorage.getItem("ip-add");
$(document).ready(function(){
function AjaxCall(url, data, type) {  
    return $.ajax({  
        url:"https://"+ipadd+":3000/api/v1/"+url,  
        type: type ? type : 'GET',  
        data: data, 
        headers:{"x-access-token":tokenKey}, 
        contentType: 'application/json'  
    });  
}
AjaxCall("religion",null).done(function (json) {  
	var result=JSON.parse(json);
	   var options;
       options += '<option  id="" value="">Select</option>'; 
       $.each(result,function(i,f){ 
         $('#religion').html('');  
         options += '<option  id="' + f.religion_id  + '" value="' + f.religion_id+ '">' + f.religion_name + '</option>'; 
         $('#religion').append(options); 
          
         
       });
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
AjaxCall("religion",null).done(function (json) {  
	var result=JSON.parse(json);
	   var options;
       options += '<option  id="" value="">Select</option>'; 
       $.each(result,function(i,f){ 
         $('#religion1').html('');  
         options += '<option  id="' + f.religion_id  + '" value="' + f.religion_id+ '">' + f.religion_name + '</option>'; 
         $('#religion1').append(options); 
         
         
       });
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
AjaxCall("income",null).done(function (json) {  
	var result=JSON.parse(json);
	   var options;
       options += '<option  id="" value="">Select</option>'; 
       $.each(result,function(i,f){ 
         $('#igroup').html('');  
         options += '<option  id="' + f.income_group_id  + '" value="' + f.income_group_id+ '">' + f.income_group_name + '</option>'; 
         $('#igroup').append(options); 
          
         
       });
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
AjaxCall("income",null).done(function (json) {  
	var result=JSON.parse(json);
	   var options;
       options += '<option  id="" value="">Select</option>'; 
       $.each(result,function(i,f){ 
         $('#igroup1').html('');  
         options += '<option  id="' + f.income_group_id  + '" value="' + f.income_group_id+ '">' + f.income_group_name + '</option>'; 
         $('#igroup1').append(options); 
          
         
       });
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
AjaxCall("languages",null).done(function (json) {  
	var result=JSON.parse(json);
	   var options;
       options += '<option  id="" value="">Select</option>'; 
       $.each(result,function(i,f){ 
         $('#language').html('');  
         options += '<option  id="' + f.language_id  + '" value="' + f.language_id+ '">' + f.language_name + '</option>'; 
         $('#language').append(options); 
          
         
       });
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
AjaxCall("languages",null).done(function (json) {  
	var result=JSON.parse(json);
	  var options;
       options += '<option  id="" value="">Select</option>'; 
       $.each(result,function(i,f){ 
         $('#language1').html('');  
         options += '<option  id="' + f.language_id  + '" value="' + f.language_id+ '">' + f.language_name + '</option>'; 
         $('#language1').append(options); 
          
         
       });
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
AjaxCall("nationality",null).done(function (json) {  
	var result=JSON.parse(json);
	   var options;
       options += '<option  id="" value="">Select</option>'; 
       $.each(result,function(i,f){ 
         $('#nationality').html('');  
         options += '<option  id="' + f.nationality_id + '" value="' + f.nationality_id+ '">' + f.nationality_name + '</option>'; 
         $('#nationality').append(options); 
          
         
       });
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
AjaxCall("nationality",null).done(function (json) {  
	var result=JSON.parse(json);
	   var options;
       options += '<option  id="" value="">Select</option>'; 
       $.each(result,function(i,f){ 
         $('#nationality1').html('');  
         options += '<option  id="' + f.nationality_id + '" value="' + f.nationality_id+ '">' + f.nationality_name + '</option>'; 
         $('#nationality1').append(options); 
          
         
       });
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
AjaxCall("bloodgroups",null).done(function (json) {  
	var result=JSON.parse(json);
	   var options;
       options += '<option  id="" value="">Select</option>'; 
       $.each(result,function(i,f){ 
         $('#bgroup').html('');  
         options += '<option  id="' + f.bloodgroup_id + '" value="' + f.bloodgroup_id+ '">' + f.bloodgroup_name + '</option>'; 
         $('#bgroup').append(options); 
          
         
       });
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
AjaxCall("bloodgroups",null).done(function (json) {  
	var result=JSON.parse(json);
	   var options;
       options += '<option  id="" value="">Select</option>'; 
       $.each(result,function(i,f){ 
         $('#bgroup1').html('');  
         options += '<option  id="' + f.bloodgroup_id + '" value="' + f.bloodgroup_id+ '">' + f.bloodgroup_name + '</option>'; 
         $('#bgroup1').append(options); 
          
         
       });
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
AjaxCall("occupation",null).done(function (json) {  
	var result=JSON.parse(json);
	   var options;
       options += '<option  id="" value="">Select</option>'; 
       $.each(result,function(i,f){ 
         $('#occupation').html('');  
         options += '<option  id="' + f.occupation_id + '" value="' + f.occupation_id+ '">' + f.occupation_name + '</option>'; 
         $('#occupation').append(options); 
          
         
       });
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
AjaxCall("occupation",null).done(function (json) {  
	var result=JSON.parse(json);
	   var options;
       options += '<option  id="" value="">Select</option>'; 
       $.each(result,function(i,f){ 
         $('#occupation1').html('');  
         options += '<option  id="' + f.occupation_id + '" value="' + f.occupation_id+ '">' + f.occupation_name + '</option>'; 
         $('#occupation1').append(options); 
          
         
       });
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});


AjaxCall("salutation",null).done(function (json) {  
	var result=JSON.parse(json);
	   var options;
       options += '<option  id="" value="">Select</option>'; 
       $.each(result,function(i,f){ 
         $('#salu').html('');  
         options += '<option  id="' + f.salutation_id  + '" value="' + f.salutation_id + '">' + f.salutation_name + '</option>'; 
         $('#salu').append(options); 
          
         
       });
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});


AjaxCall("specialities",null).done(function (json) {  
	var result=JSON.parse(json);
	   var options;
       options += '<option  id="" value="">Select</option>'; 
       $.each(result,function(i,f){ 
         $('#special').html('');  
         options += '<option  id="' + f.specialization_id  + '" value="' + f.specialization_id + '">' + f.specialization_name + '</option>'; 
         $('#special').append(options); 
          
         
       });
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
AjaxCall("salutation",null).done(function (json) {  
	var result=JSON.parse(json);
	   var options;
       options += '<option  id="" value="">Select</option>'; 
       $.each(result,function(i,f){ 
         $('#salu1').html('');  
         options += '<option  id="' + f.salutation_id  + '" value="' + f.salutation_id + '">' + f.salutation_name + '</option>'; 
         $('#salu1').append(options); 
          
         
       });
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});


AjaxCall("specialities",null).done(function (json) {  
	var result=JSON.parse(json);
	   var options;
       options += '<option  id="" value="">Select</option>'; 
       $.each(result,function(i,f){ 
         $('#special1').html('');  
         options += '<option  id="' + f.specialization_id  + '" value="' + f.specialization_id + '">' + f.specialization_name + '</option>'; 
         $('#special1').append(options); 
          
         
       });
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
AjaxCall("countries",null).done(function (json) {  
	var result=JSON.parse(json);
	   var options;
       options += '<option  id="" value="">Select</option>'; 
       $.each(result,function(i,f){ 
        $('#country').html('');  
         options += '<option  id="' + f.country_id  + '" value="' + f.country_id + '">' + f.country_name + '</option>'; 
        $('#country').append(options); 
       
         
       });
	  
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
AjaxCall("countries",null).done(function (json) {  
	var result=JSON.parse(json);
	   var options;
       options += '<option  id="" value="">Select</option>'; 
       $.each(result,function(i,f){ 
         $('#country1').html('');  
         options += '<option  id="' + f.country_id  + '" value="' + f.country_id + '">' + f.country_name + '</option>'; 
         $('#country1').append(options); 
          
         
       });
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
AjaxCall("countries",null).done(function (json) {  
	var result=JSON.parse(json);
	   var options;
       options += '<option  id="" value="">Select</option>'; 
       $.each(result,function(i,f){ 
         $('#rcountry').html('');  
         options += '<option  id="' + f.country_id  + '" value="' + f.country_id + '">' + f.country_name + '</option>'; 
         $('#rcountry').append(options); 
          
         
       });
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
AjaxCall("countries",null).done(function (json) {  
	var result=JSON.parse(json);
	   var options;
       options += '<option  id="" value="">Select</option>'; 
       $.each(result,function(i,f){ 
         $('#rcountry1').html('');  
         options += '<option  id="' + f.country_id  + '" value="' + f.country_id + '">' + f.country_name + '</option>'; 
         $('#rcountry1').append(options); 
          
         
       });
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
AjaxCall("States",null).done(function (json) {  
	var result=JSON.parse(json);
	   var options;
       options += '<option  id="" value="">Select</option>'; 
       $.each(result,function(i,f){ 
         $('#state1').html('');  
         options += '<option  id="' + f.state_id  + '" value="' + f.state_id + '">' + f.state_name + '</option>'; 
         $('#state1').append(options);   
       });  
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
AjaxCall("States",null).done(function (json) {  
	var result=JSON.parse(json);
	   var options;
       options += '<option  id="" value="">Select</option>'; 
       $.each(result,function(i,f){ 
         $('#rstate1').html('');  
         options += '<option  id="' + f.state_id  + '" value="' + f.state_id + '">' + f.state_name + '</option>'; 
         $('#rstate1').append(options);      
       });
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
AjaxCall("Districts",null).done(function (json) {  
	var result=JSON.parse(json);
	   var options;
       options += '<option  id="" value="">Select</option>'; 
       $.each(result,function(i,f){ 
         $('#district1').html('');  
         options += '<option  id="' + f.district_id  + '" value="' + f.district_id + '">' + f.district_name + '</option>'; 
         $('#district1').append(options);
       });  
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
AjaxCall("Districts",null).done(function (json) {  
	var result=JSON.parse(json);
	   var options;
       options += '<option  id="" value="">Select</option>'; 
       $.each(result,function(i,f){ 
         $('#rdistrict1').html('');  
         options += '<option  id="' + f.district_id  + '" value="' + f.district_id + '">' + f.district_name + '</option>'; 
         $('#rdistrict1').append(options);  
       });  
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
AjaxCall("Towns",null).done(function (json) {  
	var result=JSON.parse(json);
	   var options;
       options += '<option  id="" value="">Select</option>'; 
       $.each(result,function(i,f){ 
         $('#city1').html('');  
         options += '<option  id="' + f.town_id  + '" value="' + f.town_id + '">' + f.town_name + '</option>'; 
         $('#city1').append(options); 
       });
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});

AjaxCall("Towns",null).done(function (json) {  
	var result=JSON.parse(json);
	   var options;
       options += '<option  id="" value="">Select</option>'; 
       $.each(result,function(i,f){ 
         $('#rcity1').html('');  
         options += '<option  id="' + f.town_id  + '" value="' + f.town_id + '">' + f.town_name + '</option>'; 
         $('#rcity1').append(options);   
       });
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
$('#country').on("change", function () {  
    var country = $('#country').val();
    AjaxCall("States/States/"+country,null).done(function (response) {  
      var result5=JSON.parse(response);
      var options;
      options += '<option id="" value="Select">Select</option>'; 
      $.each(result5,function(i,f){ 
        $('#state').html('');  
        options += '<option  id="' + f.state_id + '" value="' + f.state_id + '">' + f.state_name + '</option>'; 
        $('#state').append(options);
});
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
});
$('#country1').on("change", function () {  
    var country = $('#country1').val();
    AjaxCall("States/States/"+country,null).done(function (response) {  
      var result5=JSON.parse(response);
      var options;
      options += '<option id="" value="Select">Select</option>'; 
      $.each(result5,function(i,f){ 
        $('#state1').html('');  
        options += '<option  id="' + f.state_id + '" value="' + f.state_id + '">' + f.state_name + '</option>'; 
        $('#state1').append(options); 
});
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
});
$('#rcountry').on("change", function () {  
    var country = $('#rcountry').val();
    AjaxCall("States/States/"+country,null).done(function (response) {  
      var result5=JSON.parse(response);
      var options;
      options += '<option id="" value="Select">Select</option>'; 
      $.each(result5,function(i,f){ 
        $('#rstate').html('');  
        options += '<option  id="' + f.state_id + '" value="' + f.state_id + '">' + f.state_name + '</option>'; 
        $('#rstate').append(options);
});
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
});
$('#rcountry1').on("change", function () {  
    var country = $('#rcountry1').val();
    AjaxCall("States/States/"+country,null).done(function (response) {  
      var result5=JSON.parse(response);
      var options;
      options += '<option id="" value="Select">Select</option>'; 
      $.each(result5,function(i,f){ 
        $('#rstate1').html('');  
        options += '<option  id="' + f.state_id + '" value="' + f.state_id + '">' + f.state_name + '</option>'; 
        $('#rstate1').append(options);
});
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
});
$('#state').on("change", function () {  
    var state = $('#state').val();
    AjaxCall("Districts/Districts/Districts/"+state,null).done(function (response) {  
      var result5=JSON.parse(response);
      var options;
      options += '<option id="" value="Select">Select</option>'; 
      $.each(result5,function(i,f){ 
        $('#district').html('');  
        options += '<option  id="' + f.district_id + '" value="' + f.district_id + '">' + f.district_name + '</option>'; 
        $('#district').append(options);
});
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
});
$('#state1').on("change", function () {  
    var state = $('#state1').val();
    AjaxCall("Districts/Districts/Districts/"+state,null).done(function (response) {  
      var result5=JSON.parse(response);
      var options;
      options += '<option id="" value="Select">Select</option>'; 
      $.each(result5,function(i,f){ 
        $('#district1').html('');  
        options += '<option  id="' + f.district_id + '" value="' + f.district_id + '">' + f.district_name + '</option>'; 
        $('#district1').append(options);
});
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
});
$('#rstate').on("change", function () {  
    var state = $('#rstate').val();
    AjaxCall("Districts/Districts/Districts/"+state,null).done(function (response) {  
      var result5=JSON.parse(response);
      var options;
      options += '<option id="" value="Select">Select</option>'; 
      $.each(result5,function(i,f){ 
        $('#rdistrict').html('');  
        options += '<option  id="' + f.district_id + '" value="' + f.district_id + '">' + f.district_name + '</option>'; 
        $('#rdistrict').append(options);
});
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
});
$('#rstate1').on("change", function () {  
    var state = $('#rstate1').val();
    AjaxCall("Districts/Districts/Districts/"+state,null).done(function (response) {  
      var result5=JSON.parse(response);
      var options;
      options += '<option id="" value="Select">Select</option>'; 
      $.each(result5,function(i,f){ 
        $('#rdistrict1').html('');  
        options += '<option  id="' + f.district_id + '" value="' + f.district_id + '">' + f.district_name + '</option>'; 
        $('#rdistrict1').append(options);
});
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
});
$('#district').on("change", function () {  
    var district = $('#district').val();
    AjaxCall("Towns/Towns/"+district,null).done(function (response) {  
      var result5=JSON.parse(response);
      var options;
      options += '<option id="" value="Select">Select</option>'; 
      $.each(result5,function(i,f){ 
        $('#city').html('');  
        options += '<option  id="' + f.town_id + '" value="' + f.town_id + '">' + f.town_name + '</option>'; 
        $('#city').append(options);
});
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
});
$('#district1').on("change", function () {  
    var district = $('#district1').val();
    AjaxCall("Towns/Towns/"+district,null).done(function (response) {  
      var result5=JSON.parse(response);
      var options;
      options += '<option id="" value="Select">Select</option>'; 
      $.each(result5,function(i,f){ 
        $('#city1').html('');  
        options += '<option  id="' + f.town_id + '" value="' + f.town_id + '">' + f.town_name + '</option>'; 
        $('#city1').append(options);
});
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
});
$('#rdistrict').on("change", function () {  
    var district = $('#rdistrict').val();
    AjaxCall("Towns/Towns/"+district,null).done(function (response) {  
      var result5=JSON.parse(response);
      var options;
      options += '<option id="" value="Select">Select</option>'; 
      $.each(result5,function(i,f){ 
        $('#rcity').html('');  
        options += '<option  id="' + f.town_id + '" value="' + f.town_id + '">' + f.town_name + '</option>'; 
        $('#rcity').append(options);
});
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
});
$('#rdistrict1').on("change", function () {  
    var district = $('#rdistrict1').val();
    AjaxCall("Towns/Towns/"+district,null).done(function (response) {  
      var result5=JSON.parse(response);
      var options;
      options += '<option id="" value="Select">Select</option>'; 
      $.each(result5,function(i,f){ 
        $('#rcity1').html('');  
        options += '<option  id="' + f.town_id + '" value="' + f.town_id + '">' + f.town_name + '</option>'; 
        $('#rcity1').append(options);    
});
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
});
$("#city").on("change",function(){
	var city=$("#city").val();
	 AjaxCall("Zips/Zips/"+city,null).done(function (response) {  
	      var result5=JSON.parse(response);
	      $.each(result5,function(i,f){ 
	          $('#pcode').val(f.zip_code); 
	          //$('#pcode').val(f.zip_code); 
	      });
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
});

$("#city1").on("change",function(){
	var city=$("#city1").val();
	 AjaxCall("Zips/Zips/"+city,null).done(function (response) {  
	      var result5=JSON.parse(response);
	      $.each(result5,function(i,f){ 
	          $('#pcode1').val(f.zip_code); 
	          //$('#pcode').val(f.zip_code); 
	      });
	      
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
});
$("#rcity").on("change",function(){
	var city=$("#rcity").val();
	 AjaxCall("Zips/Zips/"+city,null).done(function (response) {  
	      var result5=JSON.parse(response);
	      $.each(result5,function(i,f){ 
	          $('#rpcode').val(f.zip_code); 
	          //$('#pcode').val(f.zip_code); 
	      });
	      
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
});
$("#rcity1").on("change",function(){
	var city=$("#rcity1").val();
	 AjaxCall("Zips/Zips/"+city,null).done(function (response) {  
	      var result5=JSON.parse(response);
	      $.each(result5,function(i,f){ 
	          $('#rpcode1').val(f.zip_code); 
	          //$('#pcode').val(f.zip_code); 
	      });
	      
}).fail(function (jqXHR, exception) {
	error(jqXHR, exception);
});
});
});
function error(jqXHR, exception) {
	var msg = '';
	if (jqXHR.status === 0) {
		msg = 'Not connect.\n Verify Network.';
	} else if (jqXHR.status == 404) {
		msg = 'Requested page not found. [404]';
	} else if (jqXHR.status == 500) {
		msg = 'Internal Server Error [500].';
	} else if (exception === 'parsererror') {
		msg = 'Requested JSON parse failed.';
	} else if (exception === 'timeout') {
		msg = 'Time out error.';
	} else if (exception === 'abort') {
		msg = 'Ajax request aborted.';
	} else {
		msg = 'Uncaught Error.\n' + jqXHR.responseText;
	}
	alert(msg);
}






