var token=sessionStorage.getItem("token");
var ipadd=sessionStorage.getItem("ip-add");
var id=sessionStorage.getItem("expertcenterid");
$(document).ready(function(){
	$("#list").hide();
	$.ajax({  
        url:"https://"+ipadd+":3000/api/v1/doctor-details/"+id,  
        type: 'GET',  
        data:"", 
        headers:{"x-access-token":token}, 
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
	if(id==""){
		alert("Please select Doctor Name");
	}else{
	 $.ajax({
	       "type": "GET",
	       "url": "https://"+ipadd+":3000/api/v1/cases-details/"+id,
	       "data": "",
	       "dataSrc": "",
	   	headers: {"x-access-token":token},
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

			   { "data": "case_id" },
			   { "data": "medical_record_no" },
			   { "data": "first_name","data":"last_name" ,
			"data":null,
			render: function (data, type, row) {
				return data.first_name+""+data.last_name;

			}
		},
			   { "data": "episode_id" },
			   { "data": "visit_id" },
	           { "data": "query" },
	           { "data": "case_id", sortable: false,
	    		    render: function (data, type, row) {
	    		        return "<button id='" + row.case_id + "_edit' onclick='viewCases("+row.case_id+")'><i class='fa fa-eye btn-primary btn-sm'></i></button>"

	    		    }
	    		}
	           
	        	    
	         ]
	           });
	           $("#add").hide();
	           $("#list").show();	
	           
	       })
	      .fail(function (jqXHR, exception) {
				error(jqXHR, exception);
			});
		}
		  
	  
	};	
function viewCases(id){
	sessionStorage.setItem("caseid",id);
	$("#list").hide();
	$("#add").hide();
	$("#side-menu").hide();
	$("#expertinfo").show();
	patientinfo();
};
function patientinfo(){
	var id=sessionStorage.getItem("caseid");
	$.ajax({
		 "type": "GET",
	       "url": "https://"+ipadd+":3000/api/v1/patient-case-details/"+id,
	       "data": "",
	       "dataSrc": "",
	     	headers: {"x-access-token":token},
	       dataType: 'json'
	      })
	      .done( function (data) {
	    	  sessionStorage.setItem("mrno",data[0].mrno);
	    	  sessionStorage.setItem("eid",data[0].episode_id);
	    	  sessionStorage.setItem("vid",data[0].visit_id);
	}).fail(function (jqXHR, exception) {
		error(jqXHR, exception);
	});
	
}
