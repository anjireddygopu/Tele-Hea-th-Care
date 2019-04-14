var token=sessionStorage.getItem("token");
var ipadd=sessionStorage.getItem("ip-add");
var headers = {
	'x-access-token' : token,
	'x-key' : 'arvind'
};
var oTable;

$(document).ready(function() {
	data();
}); 

   	function data() {
   		var mrno=sessionStorage.getItem("mrno");
   	   $.ajax({
   	       "type": "GET",
   	       "url": "https://"+ipadd+":3000/api/v1/habitstxn-txn/"+mrno,
   	       "data": "",
   	       "dataSrc": "",
   	       "headers": headers,
   	       dataType: 'json',
   	   }).done(function(rdata) {
   		var data = rdata.habits_txn_dtls;
   		$("#lTextarea2").val(rdata.habits_txn.additional_notes);
   	           oTable = $('#editTable').DataTable({
   	        	   "paging" : false,
   	        	   "bInfo" : false,
   	        	   "ordering" : false,
   	               "language": {
   	                   "zeroRecords": "No Records Found"
   	               },
   	               
   	               "dom": '<"toolbar">frtip',
   	               
   	               data: data,
   	               "columns": [

   	            	   { "data": "id" },
   	                   { "data": "habit_name" },
   	                   { "data": "description" }
   	         ]
   	           });
   	       })
   	       .fail(function(jqXHR, exception) {
   	    	var msg = '';
   	  		if (jqXHR.status === 0) {
   	  			msg = 'Server is not connect.\nVerify Network.';
   	  		} else if (jqXHR.status == 400) {
   	  			msg = 'Requested page not found. [400]';
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
   	   	});
   	  
   	};
   