var b = sessionStorage.getItem("token");
$('#submit').click(function(){
	swal({  
		title:"",   
	   text: "Your Record Added Successfully !",   
	   timer: 2000,   
	   showConfirmButton: false 
   });
});
$('#update').click(function(){
	swal({  
		title:"",   
	   text: "Your Record Updated Successfully !",   
	   timer: 2000,   
	   showConfirmButton: false 
   });
});
var headers = {
	'x-access-token' : b,
	'x-key' : 'arvind'
};
var ipadd=sessionStorage.getItem("ip-add");
function myfunc() {

	var date = new Date();
	var tname = $("#tname").val();
	var tgname = $("#tgname").val();
	var created = "arvind";
	var ch = $("#checkbox-15").is(':checked') ? 1 : 0;
	var postData = JSON.stringify({
		"test_name" : tname,
		"test_group_id" : tgname,
		"created_by" : created,
		"created_on" : date,
		"active" : ch
	});
	$.ajax({
		url : "https://"+ipadd+":3000/api/v1/test/",
		type : "POST",
		data : postData,
		contentType : "application/json",
		dataType : "text",
		headers : headers,
		processdata : true,
	}).done(function(response) {
		display();
		table();
		document.getElementById("addform").reset();
	}).fail(function(jqXHR, exception) {
		error(jqXHR, exception);
	});
}

$(function(){
	sessionStorage.setItem("id", null);
	var jqxhr = $.ajax({
		type : "GET",
		headers : headers,
		url : "https://"+ipadd+":3000/api/v1/dropdown",
		data : "",
		}).done(function (response) {
			var result = JSON.parse(response);
			$.each(result, function(index, item) {
				$("#tgname").append(
						"<option value=" +item.test_group_id+ ">" +item.test_group_name+ "</option>");
				$("#tegname").append(
						"<option value=" +item.test_group_id+ ">" +item.test_group_name+ "</option>");
			});
		})
		.fail(function (jqXHR, exception) {
			mes(jqXHR,exception);
		});
});

function Edit(id) {
	$("#addbtn").hide();
	sessionStorage.setItem("tid", id);
	$("#edit").show();
	$("#list").hide();
	$("#add").hide();
	$.ajax({

		type : "GET",
		url : "https://"+ipadd+":3000/api/v1/test/"+id,
		data : "",
		headers : headers,
	}).done(function(response) {
		var data = JSON.parse(response);
		$.each(data, function(key, val) {
			document.getElementById("tename").value = val.test_name;
			document.getElementById("tegname").value = val.test_group_id;
			var ac = val.active;
			if (ac == 1) {
				$("#checkbox-16").prop('checked', true);
			} else {
				$("#checkbox-16").prop('checked', false);
			}
		});
	}).fail(function(jqXHR, exception) {
		error(jqXHR, exception);
	
	});
	$("#testTable").DataTable();
}

function update() {
	var id = sessionStorage.getItem("tid");
	var tname = $("#tename").val();
	var tgname = $("#tegname").val();
	var updated = "arvind";
	var date = new Date();
	var ch = $("#checkbox-16").is(':checked') ? 1 : 0;
	var postData = JSON.stringify({
		"test_id" : id,
		"test_name" : tname,
		"test_group_id" : tgname,
		"updated_by" : updated,
		"updated_on" : date,
		"active" : ch
	});
	$.ajax({
		url : "https://"+ipadd+":3000/api/v1/test/" + id,
		type : "PUT",
		data : postData,
		contentType : "application/json",
		dataType : "text",
		headers : headers,
		processdata : true,
	}).done(function(response) {
		$("#addbtn").show();
		display();
		table();
	}).fail(function(jqXHR, exception) {
		error(jqXHR, exception);
	});

}
function error(jqXHR, exception){
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
}


function table(){
$('#testTable').dataTable().fnClearTable();
$('#testTable').dataTable().fnDestroy();
ShowTest();
}
function display(){
	$("#add").hide();
	$("#list").show();
	$("#edit").hide();
}



