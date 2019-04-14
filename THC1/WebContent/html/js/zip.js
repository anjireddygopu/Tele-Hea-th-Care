var token= sessionStorage.getItem("token");
var ipadd=sessionStorage.getItem("ip-add");
$('#save').click(function(){
	swal({  
		title:"",   
	   text: "Your Record Added Successfully !",   
	   timer: 2000,   
	   showConfirmButton: false 
   });
});
$('#update').click(function(){
	swal({  
		title:"",   
	   text: "Your Record Updated Successfully !",   
	   timer: 2000,   
	   showConfirmButton: false 
   });
});
$(function(){
sessionStorage.setItem("id",null);
$.ajax({
         type:"GET",
         headers: {'x-access-token':token},
         url:"https://"+ipadd+":3000/api/v1/countries",
         data:""})
       .done(function(json) 
         	{ 
        	 	var results=JSON.parse(json);
        	 		$.each(results, function(index, item)
        	 				{
        	 				$("#countries").append("<option value="+item.country_id+">" + item.country_name + "</option>");
        	 				$("#countries1").append("<option value="+item.country_id+">" + item.country_name + "</option>");
        	 				}); 
         	})
         .fail(function(jqXHR,exception) 
         	{ 
        	 error(jqXHR,exception);
         	})
  		
});

$(function(){
sessionStorage.setItem("id",null)
$.ajax({
	      type:"GET",
	      headers: {'x-access-token':token},
	      url:"https://"+ipadd+":3000/api/v1/States",
	      data:""})
	    .done(function(json) 
	         	{ 
	        	  var results=JSON.parse(json);
	     	        	 		$.each(results, function(index, item)
	        	 				{
	        	 				$("#states1").append("<option value="+item.state_id+">" + item.state_name + "</option>");
	        	 				}); 
	         	})
	        .fail(function(jqXHR,exception) 
         	{ 
        	 error(jqXHR,exception);
         	})
	  
});
$(function(){
sessionStorage.setItem("id",null)
$.ajax({
	    type:"GET",
	    headers: {'x-access-token':token},
	    url:"https://"+ipadd+":3000/api/v1/Towns",
	    data:""})
	    .done(function(json) 
	         	{ 
	        	 	var results=JSON.parse(json);
	        	 	
	        	 		$.each(results, function(index, item)
	        	 				{
	        	 				$("#towns1").append("<option value="+item.town_id+">" + item.town_name + "</option>");
	        	 				}); 
	         	})
	         	.fail(function(jqXHR,exception) 
	                 	{ 
	                	 error(jqXHR,exception);
	                 	})
	        });
$(function(){
	 sessionStorage.setItem("id",null)
	  $.ajax({
	         type:"GET",
	         headers: {'x-access-token':token},
	         url:"https://"+ipadd+":3000/api/v1/Districts",
	         data:""})
	         .done(function(json) 
	         	{ 
	        	 	var results=JSON.parse(json);
	        	 		$.each(results, function(index, item)
	        	 				{
	        	 				$("#districts1").append("<option value="+item.district_id+">" + item.district_name + "</option>");
	        	 				}); 
	         	})
	         .fail(function(jqXHR,exception) 
         	{ 
        	 error(jqXHR,exception);
         	})
	});
$(function(){
sessionStorage.setItem("id",null)
$('#countries').on("change", function (){ 
var country_id = $('#countries').val();
	  $.ajax({
		  	type:"GET",
		  	headers: {'x-access-token':token},
		  	url:"https://"+ipadd+":3000/api/v1/States/States/"+country_id,
		  	data:""})
		  	.done(function(json) 
		  		{ 
		  			var result=JSON.parse(json);
		  			$("#states").empty();
		  			$("#states").append("<option value=>--State-Name--</option>");
		  				$.each(result, function(index, item)
		  						{
		  							$("#states").append("<option value="+item.state_id+">"+item.state_name+ "</option>");
		  						}); 
		  		})
		   .fail(function(jqXHR,exception) 
         	{ 
        	 error(jqXHR,exception);
         	})
	  	 
									});
});
$(function(){
sessionStorage.setItem("id",null)
$('#countries1').on("change", function (){ 
var country_id = $('#countries1').val();
$.ajax({
	     type:"GET",
	     headers: {'x-access-token':token},
	     url:"https://"+ipadd+":3000/api/v1/States/States/"+country_id,
	     data:""})
	     .done(function(json) 
	     { 
	    	 var result=JSON.parse(json);
	    	 $("#states1").empty();
	    	 $("#states1").append("<option value=>--States-Name--</option>");
	    	 $.each(result, function(index, item)
	    			 {
	    	$("#states1").append("<option value="+item.state_id+">"+item.state_name+ "</option>");
	    			 }); 
	     })
	    .fail(function(jqXHR,exception) 
         	{ 
        	 error(jqXHR,exception);
         	})
	  
						});
});
$(function(){
	sessionStorage.setItem("id",null)
	$('#states').on("change", function (){ 
	  var state_id = $('#states').val();
	  $.ajax({
	     type:"GET",
	     headers: {'x-access-token':token},
	     url:"https://"+ipadd+":3000/api/v1/Districts/Districts/Districts/"+state_id,
	     data:""})
	     .done(function(json) 
	     { 
	      var result=JSON.parse(json);
	      $("#districts").empty();
	      $("#districts").append("<option value=>--Ditrict-Name--</option>");
	      $.each(result, function(index, item)
	     {
	     $("#districts").append("<option value="+item.district_id+">"+item.district_name+ "</option>");
	     }); 
	     })
	     .fail(function(jqXHR,exception) 
         	{ 
        	 error(jqXHR,exception);
         	})
	});
	});
$(function(){
sessionStorage.setItem("id",null)
$('#districts').on("change", function (){ 
var district_id = $('#districts').val();
$.ajax({
	     type:"GET",
	     headers: {'x-access-token':token},
	     url:"https://"+ipadd+":3000/api/v1/Towns/Towns/"+district_id,
	     data:""})
	     .done(function(json) 
	     { 
	      var result=JSON.parse(json);
	      $("#towns").empty();
	      $("#towns").append("<option value=>--Town-Name--</option>");
	      $.each(result, function(index, item)
	     {
	     $("#towns").append("<option value="+item.town_id+">"+item.town_name+ "</option>");
	     }); 
	     })
	     .fail(function(jqXHR,exception) 
         	{ 
        	 error(jqXHR,exception);
         	})
	});
	});
$(function(){
sessionStorage.setItem("id",null)
$('#districts1').on("change", function (){ 
var district_id = $('#districts1').val();
$.ajax({
	     type:"GET",
	     headers: {'x-access-token':token},
	     url:"https://"+ipadd+":3000/api/v1/Towns/Towns/"+district_id,
	     data:""})
	     .done(function(json) 
	     { 
	    	 var result=JSON.parse(json);
	    	 $("#towns1").empty();
	    	 $("#towns1").append("<option value=>--Town-Name--</option>");
	    	 $.each(result, function(index, item)
	    		{
	    		 $("#towns1").append("<option value="+item.town_id+">"+item.town_name+ "</option>");
	     		}); 
	     })
	     .fail(function(jqXHR,exception) 
         	{ 
        	 error(jqXHR,exception);
         	})
				});
});
$(function(){
	sessionStorage.setItem("id",null)
	$('#states1').on("change", function (){ 
	  var state_id = $('#states1').val();
	  var jqXHR=$.ajax({
	     type:"GET",
	     headers: {'x-access-token':token},
	     url:"https://"+ipadd+":3000/api/v1/Districts/Districts/Districts/"+state_id,
	     data:""})
	     .done(function(json) 
	     { 
	      var result=JSON.parse(json);
	      $("#districts1").empty();
	      $("#tdistricts1").append("<option value=>--District-Name--</option>");
	      $.each(result, function(index, item)
	     {
	     $("#districts1").append("<option value="+item.district_id+">"+item.district_name+ "</option>");
	     }).fail(function(jqXHR,exception){
	    		 error(jqXHR,exception);
	     })
	  });
	});
	});

function error(jqXHR,exception) {
    var msg = '';
    if (jqXHR.status === 0) {
        msg = 'Not connect.\n Verify Network.';
    } else if (jqXHR.status === 404) {
        msg = 'Requested page not found. [404]';
    } else if (jqXHR.status === 500) {
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
var oTable;
$(document).ready(function() {
	ShowDistricts();
});


	
function ShowDistricts() {
	var headers = {'x-access-token':token};
	   var jqXHR = $.ajax({"type": "GET",
	        	"url": "https://"+ipadd+":3000/api/v1/Zips",
	        	"data": "",
	        	"dataSrc": "",
	        	"headers": headers,
	        	"dataType": 'json'})
	    .done(function (response) {
	    	oTable = $('#example23').DataTable({
				"language": {
						"zeroRecords": "No Records Found"
							},
							"dom": '<"toolbar">frtip',
							data: response,
							"columns": [
	
								{ "data": "zip_code_id" },
								{ "data": "zip_code"},
								{ "data": "town_name"},
								{
									"data": "active",
									render: function (data, type, row) {
										if (data == true) {
											return "<input type='checkbox' id='" + row.zip_code_id + "_active' checked='checked'/>";
										} else {
											return "<input type='checkbox' id='" + row.zip_code_id + "_active'/>";
												}
																		}
									},
				{
    	   "data": "Id",
    	   render: function (data, type, row) {

    	       return "<button id='" + row.zip_code_id + "'_edit' onclick='edit(this.id)'><i class='fa fa-pencil-square-o btn-primary btn-sm' data-toggle='tooltip' title='Edit'></i></button>";

    	   }
    	}    
 ]
});	            
	    })
	    .fail(function(jqXHR,exception){
	    	error(jqXHR,exception);
	    })
	    
	}
	
function save(){
	var zip_code=$("#zips").val();
	var town_id=$("#towns").val();
	var state_id=$("#states").val();
	var country_id=$("#countries").val();
	var district_id=$("#districts").val();
	var active=$("#checkbox-15").is(":checked")?1:0;
	var dNow = new Date();
	var localdate=dNow.getDate()+""
	+(dNow.getMonth()+1)+""
	+dNow.getFullYear()+""
	+dNow.getHours();
	var postData=JSON.stringify({"zip_code":zip_code,"town_id":town_id,"country_id":country_id,"state_id":state_id,"district_id":district_id,"created_by":"anji","created_on":localdate,"active":active});
	var jqxhr=$.ajax({
	url:"https://"+ipadd+":3000/api/v1/Zips",
	type:"POST",
	data: postData , 
	  contentType: "application/json" ,
	    dataType: "text" ,
	    headers: {'x-access-token':token},
	    processdata: true }).done(function(data) 
	{  
	    	document.getElementById("addform").reset();
	    	reload_table();
	    	display();

	}).fail(function (jqXHR, exception) {
		error(jqXHR,exception);
	})


}
function edit(id){
	$("#add1").hide();
sessionStorage.setItem("id",id);
var id=sessionStorage.getItem("id");
	$(function(){ 
		if(!(id==null)){
			var jqxhr=$.ajax({
			         type:"GET",
			         headers: {'x-access-token':token},
			         url:"https://"+ipadd+":3000/api/v1/Zips/"+id,
			         data:"",}).done(function(json){
			         var data=JSON.parse(json);
			           $.each(data,function(key,obj){
			            		$("#countries1" ).find( 'option[value="' + obj.country_id + '"]' ).prop( "selected", true );
			            		$("#states1" ).find( 'option[value="' + obj.state_id + '"]' ).prop( "selected", true );
			            		$("#districts1" ).find( 'option[value="' + obj.district_id + '"]' ).prop( "selected", true );
			            		$("#towns1" ).find( 'option[value="' + obj.town_id + '"]' ).prop( "selected", true );
			            		$("#zips1").val(obj.zip_code)
			            		var c=(obj.active);
			            		if(c==1)
			            		{
			            			$('input[name="check1"]')[0].checked=true;
			            		}else{
			            			$('input[name="check1"]')[0].checked=false;	
			            		}			           
			            							});
			            	$("#list").hide();
			            	$("#edit").show();
			            	$("#add").hide();
			         	
			 }).fail(function (jqXHR, exception) {
				 error(jqXHR,exception);
			    })

		}
	})
}
function update(){
	var id=sessionStorage.getItem("id");
	var zip_code=$("#zips1").val();
	var town_id=$("#towns1").val();
	var district_id=$("#districts1").val();
	var state_id=$("#states1").val();
	var country_id=$("#countries1").val()
	var active=$("#checkbox-16").is(":checked")?1:0;
	var dNow = new Date();
	var localdate=dNow.getDate()+""
	+(dNow.getMonth()+1)+""
	+dNow.getFullYear()+""
	+dNow.getHours();
	var user="siva"
	var postData=JSON.stringify({"zip_code_id":id,"zip_code":zip_code,"town_id":town_id,"district_id":district_id, "country_id":country_id,"state_id":state_id,"updated_by":user,"updated_on":localdate,"active":active })
	     $.ajax({
	    	 	url:"https://"+ipadd+":3000/api/v1/Zips/",
	    	 	type:"PUT",
	    	 	data: postData ,
	    	 	contentType: "application/json" ,
	    	 	dataType: "text" ,
	    	 	headers: {'x-access-token':token},
	    	 	processdata: true })

	    	.done(function(data, textStatus, jqXHR) 
	    	 		{  
	    				reload_table();
	    				display();
	    	 		})
.fail(function(jqXHR,exception) 
         	{ 
        	 error(jqXHR,exception);
         	})
}
function cancel(){
	$("#add1").show();
	$('#list').show();
	$('#edit').hide();
	$('#add').hide();	
}
function reload_table(){
	$('#example23').dataTable().fnClearTable();
	$('#example23').dataTable().fnDestroy();
	ShowDistricts()
}
function display(){
	$('#list').show();
	$('#edit').hide();
	$('#add').hide();
	$("#add1").show();
} 

