var oTable;
var token=sessionStorage.getItem("token");
var ipadd=sessionStorage.getItem("ip-add");

var headers = {
	'x-access-token' : token
};
$(document).ready(function() {
	datatable();
});
function datatable() {
	 var mrno=sessionStorage.getItem("mrno");
	 var epno=sessionStorage.getItem("eid");
	 var vid=sessionStorage.getItem("vid");
	$.ajax({
				"type" : "GET",
				"url" : "https://"+ipadd+":3000/api/v1/edit-signs/"+mrno+"/"+epno+"/"+vid,
				"data" : "",
				"dataSrc" : "",
				"headers" : headers,
				dataType : 'json',
			})
			.done(
					
					function(rdata) {
					var txndata=rdata.sign_txn;
					var data=rdata.sign_txn_dtls;
					$("#notes").val(txndata.additional_notes);
					$("#notes").val(rdata.sign_txn.additional_notes);
					
						oTable = $('#signs')
								.DataTable(
										{
											"paging" : false,
											"bInfo" : false,
											"ordering" : false,
											"language" : {
												"zeroRecords" : "No Records Found"
											},

											"dom" : '<"toolbar">frtip',

											data : data,
											"columns" : [

													{
														"data" : "id"
													},
													{
														"data":"sign_id","data" : "sign_name"
													},
													{
														"data" : "description"
													},
													
													
											]
										});
					})
					.fail(function(jqXHR, exception) {
				msg(jqXHR, exception);
			});


}

function msg(jqXHR, exception) {
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
}
