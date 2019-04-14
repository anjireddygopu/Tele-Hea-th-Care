var oTable;
var tokenKey = sessionStorage.getItem("token");
var headers = {
	'x-access-token' : tokenKey
};
var ipadd=sessionStorage.getItem("ip-add");
$(document).ready(function() {
if (token) {
}
function Allergys() {
	var mro=sessionStorage.getItem("mrno");
	
	$.ajax({
				"type" : "GET",
				"url" : "https://"+ipadd+":3000/api/v1/allergystxn-txn/"+mro,
				"data" : "",
				"dataSrc" : "",
				"headers" : headers,
				dataType : 'json',
			})
			.done(
					function(rowdata) {
					var txndata=rowdata.allergys_txn;
					var data=rowdata.allergys_txn_dtls;
					  oTable = $('#allergys')
								.DataTable(
										{
											"paging" : false,
											"bInfo" : false,
											"ordering" : false,
											"searching":false,
											"language" : {
												"zeroRecords" : "No Records Found"
											},

											"dom" : '<"toolbar">frtip',

											data : data,
											"columns" : [

													{
														"data":"id"
													},
													{
														"data" : "allergy_name"
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
Allergys()
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
});








