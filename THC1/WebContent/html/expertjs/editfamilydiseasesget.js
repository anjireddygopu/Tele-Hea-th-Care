var tokenKey=sessionStorage.getItem("token");
var ipadd=sessionStorage.getItem("ip-add");
var headers = {
	'x-access-token' :tokenKey};
var oTable;
$(function showlist() {
	var mrno=sessionStorage.getItem("mrno");
$.ajax({
	"type" : "GET",
	"headers" : headers,
	"url" : "https://"+ipadd+":3000/api/v1/editfamilyhistory/"+mrno,
	"data" : "",
	"dataType" : 'json'
})
	.done(function(rdata) {
		var Data = JSON.stringify(rdata);
		var data = rdata.family_history_txn_dtls;
		var data1=rdata.family_history_txn.id;
		var data2=rdata.family_history_txn.additional_notes;
		$("#textareaa").val(data2);
		oTable = $('#example').DataTable({
			"paging" : false,
			"ordering" : false,
			"info" : false,
			"searching" : false,
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
				"data" : "disease_name" },
				{
				"data" : "mother",
				render : function(data,type, row) {
					if (data == true) {
						return "<input type='checkbox' id='"+ row.id+ "_active' checked='checked'/>"
						} else {
						return "<input type='checkbox' id='"+ row.id+ "_active'/>"
						};
						},   	 
},
{
				"data" : "father",
				render : function(data,	type, row) {
					if (data == true) {
					   return "<input type='checkbox' id='"+ row.id	+ "_active' checked='checked'/>"
					   } else {
					   return "<input type='checkbox' id='"+ row.id+ "_active'/>"
					   };
					   },   	 
},
{
				"data" : "brother",
				render : function(data,type, row) {
					if (data == true) {
						return "<input type='checkbox' id='"+ row.id+ "_active' checked='checked'/>"
						} else {
						return "<input type='checkbox' id='"+ row.id+ "_active'/>"
						};
						},   	 
},
{
				"data" : "sister",
				render : function(data,type, row) {
					if (data == true) {
						return "<input type='checkbox' id='"+ row.id+ "_active' checked='checked'/>"
						} else {
						return "<input type='checkbox' id='"+ row.id+ "_active'/>"
						};
						},   	 
},
{
				"data" : "paternal",
				render : function(data,type, row) {
					if (data == true) {
						return "<input type='checkbox' id='"+ row.id+ "_active' checked='checked'/>"
						} else {
						return "<input type='checkbox' id='"+ row.id+ "_active'/>"
						};
						},   	 
},
{
				"data" : "maternal",
				render : function(data,type, row) {
					if (data == true) {
						return "<input type='checkbox' id='"+ row.id+ "_active' checked='checked'/>"
						} else {
						return "<input type='checkbox' id='"+ row.id+ "_active'/>"
						};
						},
}					
						
						]
					});
				})
	.fail(function(jqXHR,exception) {
		errormeassage(jqXHR,exception);				
	})			
});

function errormeassage(jqXHR,exception) {
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