var tblDrug;
var ipadd=sessionStorage.getItem("ip-add");
var token=sessionStorage.getItem("token");
var headers = {
	'x-access-token' : token
};
$(document).ready(function(){
	ShowDrugChild();
})
function ShowDrugChild() {
	
	var mrno=sessionStorage.getItem("mrno");
	var eid=sessionStorage.getItem("eid");
	var vid=sessionStorage.getItem("vid");
	
	const jqxhr= $.ajax({
       "type": "GET",
       "url": "https://"+ipadd+":3000/api/v1/drugtxn/"+mrno+"/"+eid+"/"+vid,
       "data": "",
       "dataSrc": "",
       "headers": headers,
       "dataType": 'json'})
       .done(function (data) {
	
    	  tblDrugSelection = $('#drug_list').DataTable({
    		  searching: false,
  			paging: false,
  			bSort:false,
               "language": {
                   "zeroRecords": "No Records Found"
               },
               "dom": '<"toolbar">frtip',
               data: data,
               "columns": [
               { "data": "drug_id" },
               { "data": "drug_name" } 
            ]
		});
		$("#text").val(data[0].additional_notes);
    })
    
    .fail(function (jqXHR, exception) {
    	var msg = '';
    	if (jqXHR.status === 0) {
    	msg = 'Not connected.\n Verify Your Network.';
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
    	})
}



