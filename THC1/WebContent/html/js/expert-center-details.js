var tokenKey = sessionStorage.getItem("token");
var ipadd=sessionStorage.getItem("ip-add");
$(document).ready(function(){
	$("#list").hide();
	$.ajax({  
        url:"https://"+ipadd+":3000/api/v1/doctor-details",  
        type: 'GET',  
        data:"", 
        headers:{"x-access-token":tokenKey}, 
        contentType: 'application/json'  
    }).done(function (json) {  
    	var result=JSON.parse(json);
 	   var options;
 	   	options += '<option  id="" value="">Select</option>'; 
        $.each(result,function(i,f){ 
          $('#doctorname').html('');  
          options += '<option  id="' + f.doctor_id  + '" value="' + f.doctor_id+ '">' + f.doctor_name + '</option>'; 
          $('#doctorname').append(options);    
        });
 }).fail(function (jqXHR, exception) {
 	error(jqXHR, exception);
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
function showList(){
	
	var id=$("#doctorname").val();
	 $.ajax({
	       "type": "GET",
	       "url": "https://"+ipadd+":3000/api/v1/cases-details/"+id,
	       "data": "",
	       "dataSrc": "",
	   	headers: {"x-access-token":tokenKey},
	       dataType: 'json'
	      })
	      .done( function (data) {
	           oTable = $('#example').DataTable({
	               "language": {
	                   "zeroRecords": "No Records Found"
	               },
	               "dom": '<"toolbar">frtip',
	               data: data,
	               "columns": [

	           { "data": "patient_id" },
	           { "data":"first_name",
	        	 "data":"last_name",
	        	 "data":null,
	        	   render:function(data,type,row){
	        		   return data.first_name+" "+data.last_name;
	        	   }
	           },
	           { "data": "query" },
	           { "data": "patient_id", sortable: false,
	    		    render: function (data, type, row) {
	    		        return "<input type='button' id='" + row.patient_id + "_edit' onclick='viewCases()' value='View'/>"

	    		    }
	    		}
	           
	        	    
	         ]
	           });
	           $("#add").hide();
	           $("#list").show();	
	           
	       })
	      .fail(function (jqXHR, exception) {
				error(jqXHR, exception);
			})
		  .always(function () {
				alert("complete");
			});
	  
	};	
function viewCases(){
	$("#list").hide();
	$("#add").hide();
	$("#Leftmenu").show();
	
}