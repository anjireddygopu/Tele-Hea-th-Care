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

var token=sessionStorage.getItem("token");
var ipadd=sessionStorage.getItem("ip-add");
var oTable;
$(document).ready(function(){
		var headers = {'x-access-token':token};
		if (token) {
					}
		

		function ShowCountries() {
			var mrno=sessionStorage.getItem("mrno");
			    $.ajax({
			        "type": "GET",
			        "url":"https://"+ipadd+":3000/api/v1/patient_immunization_txn_dtls1/"+mrno,
			        "data": "",
			        "dataSrc": "",
			        "headers": headers,
			        dataType: 'json'}).
			        done(function (data) {
			        	rdata=data.patient_immunization_txn_dtls;
			        	tdata=data.patient_immunization_txn.notes;
			        	$("#notes").val(tdata);
			     oTable = $('#example23').DataTable({
			            	
								"paging" : false,
								"searching" : false,
								"bInfo" : false,
						
			                "language": {
			                    "zeroRecords": "No Records Found"
			                },
			                "dom": '<"toolbar">frtip',
			                data: rdata,
			                "columns": [
							
				            { "data": "id" },
				            { "data": "immunization_name" },
				            { "data": "dose_amount" },
				            { "data": "dose_unit" }
				         ]
			            });    
			        }).fail(function (jqXHR, exception) {
			      		error(jqXHR, exception);
			      	});
			};
			ShowCountries();
});