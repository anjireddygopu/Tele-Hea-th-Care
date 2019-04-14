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
var token = sessionStorage.getItem("token");
var oTable;
sessionStorage.setItem("mrno",1001);
sessionStorage.setItem("episode",201);
sessionStorage.setItem("visit_id",1);

		var headers = {'x-access-token':token};
		if (token) {
					}
		$(document).ready(function(){
			ShowCountries();
		});

		function ShowCountries() {
			var mrno=sessionStorage.getItem("mrno");
			var episode=sessionStorage.getItem("episode");
			var visit_id=sessionStorage.getItem("visit_id");
			    $.ajax({
			        "type": "GET",
			        "url":"http://127.0.0.1:3000/api/v1/patient_immunization_txn_dtls1/"+mrno+"/"+episode+"/"+visit_id,
			        "data": "",
			        "dataSrc": "",
			        "headers": headers,
			        dataType: 'json'}).
			        done(function (data) {
			        	p_txn_id=data.patient_immunization_txn.pa_i_t_id;
			        	p_txn_notes=data.patient_immunization_txn.notes;
			        	data1=data.patient_immunization_txn_dtls;
			        	id=data.patient_immunization_txn_dtls.id;
			        	sessionStorage.setItem("pa_i_t_id",p_txn_id);
			        	sessionStorage.setItem("notes",p_txn_notes);
			        	
			            oTable = $('#example23').DataTable({
			            	
								"paging" : false,
								"searching" : false,
								"bInfo" : false,
						
			                "language": {
			                    "zeroRecords": "No Records Found"
			                },
			                "dom": '<"toolbar">frtip',
			                data: data1,
			                "columns": [
							
				            { "data": "id" },
				            { "data": "immunization_date" },
				            { "data": "dose_amount" },
				            { "data": "dose_unit" }
				         ]
			            });    
			        }).fail(function (jqXHR, exception) {
			      		error(jqXHR, exception);
			      	});
			};