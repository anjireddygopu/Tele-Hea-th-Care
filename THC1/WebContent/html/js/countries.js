var oTable;
var token = sessionStorage.getItem("token"); 
var headers={'x-access-token':token};
$(document).ready(function() {
	ShowCountries();
});
// $('#save').click(function(){
// 	swal("Here's a message!");
// });
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
var ipadd=sessionStorage.getItem("ip-add");
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
		
	function ShowCountries() {
			var jqxhr = $.ajax({
	        "type": "GET",
	        "url": "https://"+ipadd+":3000/api/v1/countries",
	        "data": "",
	        "dataSrc": "",
	        "headers": headers,
	        dataType: 'json'})
	        .done( function (data) {
	            oTable =$('#example23').DataTable({
	                "language": {
	                    "zeroRecords": "No Records Found"
	                },
	                "dom": '<"toolbar">frtip',
	                data: data,
	                "columns": [
					
		            { "data": "country_id" },
		            { "data": "country_name" },
		            {
		                "data": "active",
		                render: function (data, type, row) {
		                    if (data == true) {
		                        return "<input type='checkbox' class='checkbox-primary' id='" + row.country_id + "_active' checked='checked'/>";
		                    } else {
		                        return "<input type='checkbox' class='checkbox-primary' id='" + row.country_id + "_active'/>";
		                    }
		                									}
		            },
		            {
		            	   "data": "Id",
		            	   render: function (data, type, row) {

		            	       return "<button id='" + row.country_id + "'_edit' onclick='edit(this.id)'><i class='fa fa-pencil-square-o btn-primary btn-sm' title='Edit' data-toggle='tooltip'></i></button>";

		            	   									}
		            	}		          
		         ]
	            });    
	        }).fail( function (jqXHR, exception) {
	        	error(jqXHR,exception);	      	
	    })
	}
	

function save(){
		var country_name=$("#countries").val()
		var active=$("#checkbox-15").is(":checked")?1:0;
		var dNow = new Date();
		var localdate=dNow.getDate()+""
		+(dNow.getMonth()+1)+""
		+dNow.getFullYear()+""
		+dNow.getHours();
		var postData=JSON.stringify({ "country_name":country_name,"created_by":"anji","created_on":localdate,"active":active})
		$.ajax({
		url:"https://"+ipadd+":3000/api/v1/countries",
		type:"POST",
		data: postData ,
		contentType: "application/json" ,
		dataType: "text" ,
		headers: headers,
	    processdata: true })

		.done(function(data, textStatus, jqXHR) 
		{  
			document.getElementById("addform").reset();
			reload_table();
			display();
			
			
		})
		.fail(function(jqXHR, textStatus, errorThrown) 
		{
			error(jqXHR,exception);
		})	
}
function edit(id){
	$("#addbtn").hide();
	sessionStorage.setItem("id",id);
	var token=sessionStorage.getItem("token");
	var id=sessionStorage.getItem("id");
	$(function(){ 
		if(!(id==null)){
			 $.ajax({
			          type:"GET",
			          headers: headers,
			          url:"https://"+ipadd+":3000/api/v1/countries/"+id,
			          data:""})
			          .done(function(json){
			        	  var data=JSON.parse(json);
			            $.each(data,function(key,obj){
			            	$( "#countries_edit" ).val(obj.country_name);
			            	var c=(obj.active);
			            	if(c==1)
			            		{
			            		$('input[name="check"]')[0].checked=true;
			            		}else{
			            		$('input[name="check"]')[0].checked=false;	
			            		}           
			            });
			            $("#list").hide();
		            	$("#edit").show();
		            	$("#add").hide();
			          })
			          .fail(function(jqXHR,exception){
			        	  error(jqXHR,exception);
			        	  
			          })
		}
	});
}
function update(){
	 var token=sessionStorage.getItem("token");
	 var id=sessionStorage.getItem("id");
	 var country_name=$("#countries_edit").val();
	var active=$("#checkbox-16").is(":checked")?1:0;
	var dNow = new Date();
	var localdate=dNow.getDate()+""
	+(dNow.getMonth()+1)+""
	+dNow.getFullYear()+""
	+dNow.getHours();
	var user="siva";
	var postData=JSON.stringify({ "country_id":id,"country_name":country_name,"updated_by":user,"updated_on":localdate,"active":active });
	$.ajax({
	    url:"https://"+ipadd+":3000/api/v1/countries/",
	    type:"PUT",
	    data: postData ,
	    contentType: "application/json" ,	
	    dataType: "text" ,
	    headers: headers,
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
	$("#list").show();
	$("#add").hide();
	$("#edit").hide();
	$("#addbtn").show();
}
function reload_table(){
	$('#example23').dataTable().fnClearTable();
	$('#example23').dataTable().fnDestroy();
	ShowCountries();
}
function display(){
	$("#addbtn").show();
	$('#list').show();
	$('#edit').hide();
	$('#add').hide();
} 

