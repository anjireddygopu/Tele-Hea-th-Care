var oTable;
var token=sessionStorage.getItem("token");
var ipadd=sessionStorage.getItem("ip-add");
const headers = {'x-access-token':token};
$(document).ready(function() {
	if (token) {
	} 
	ShowExam_dtls();
});
function ShowExam_dtls() {
	var mrno=sessionStorage.getItem("mrno");
	var eid=sessionStorage.getItem("eid");
	var vid=sessionStorage.getItem("vid");
	$.ajax({
		"type": "GET",
		"url": "https://"+ipadd+":3000/api/v1/edit/"+mrno+"/"+eid+"/"+vid,
		"data": "",
		"dataSrc": "",
		"headers": headers,
		dataType: 'json'})
		.done(function (rdata) {
			var data = rdata.physical_exam_txn_dtls;
			oTable = $('#edit').DataTable({
				"paging" : false,
				"searching" : false,
				"bInfo" : false,
				"language": {
					"zeroRecords": "No Records Found"
				},
				"dom": '<"toolbar">frtip',
				data: data,
				"columns": [

					{ "data": "exam_type" },
					{ "data": "exam_specific" },
					{ "data": "status" },
					{ "data": "description" },
					{ "data": "exam_progress" },
					{ "data": "exam_date" },
					]
			});
		})
		.fail(function (jqXHR, exception) {
			error(jqXHR, exception);
		})
};

function error(jqXHR, exception) {
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