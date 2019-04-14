var tblSearchTest;
var tblTestSelection;
var token = sessionStorage.getItem("token");
var ipadd=sessionStorage.getItem("ip-add");
var headers = {
 'x-access-token': token
};
$(document).ready(function() {
	
	 ShowTestSelection();
});
function ShowTestSelection() {
	var mrno=sessionStorage.getItem("mrno");
	var eid=sessionStorage.getItem("eid");
	var vid=sessionStorage.getItem("vid");
	var notes="";
				 $.ajax({
				  "type": "GET",
				  "url": "https://"+ipadd+":3000/api/v1/labtest/"+mrno+"/"+eid+"/"+vid,
				  "data": "",
				  "dataSrc": "",
				  "headers": headers,
				  dataType: 'json',
				 })
				  .done(function (data) {
					  
				   tblTestSelection = $('#test_selection')
				    .DataTable({
				     "paging": false,
				     "searching": false,
				     "bInfo": false,
				     "scrollY": "160px",
				     "scrollcollapse": true,
				     "language": {
				      "zeroRecords": "No Records Found"
				     },
				     "dom": '<"toolbar">frtip',
				     data: data,
				     "columns": [
						 {"data": "test_id"}, 
						 {"data": "test_name"}
						]
					});
					$("#text").val(notes);
				  })
				  .fail(function (jqXHR, exception) {
			         error(jqXHR, exception)
						   		})//fail end
						   		
	};
	
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

