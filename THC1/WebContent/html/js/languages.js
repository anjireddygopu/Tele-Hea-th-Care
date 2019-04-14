var tokenKey = sessionStorage.getItem("token");
var headers = {
	'x-access-token' : tokenKey
};
var oTable;
$(document).ready(function() {
	ShowCountries();
});
$('#savebtn').click(function(){
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
var ipadd=sessionStorage.getItem("ip-add");
	
function ShowCountries() {
	$.ajax({
	"type" : "GET",
	"url" : "https://"+ipadd+":3000/api/v1/languages",
	"data" : "",
	"dataSrc" : "",
	"headers" : headers,
	"dataType" : 'json'})
	
	.done(function (data) {
		oTable = $('#example23').DataTable({
			"zeroRecords" : "No Records Found",
			"dom" : '<"toolbar">frtip',
			data : data,
			"columns" : [
			{"data" : "language_id"},
			{"data" : "language_name"},
			{"data" : "active",
			render : function(data,type,row) {
			if (data == true) {
				return "<input type='checkbox' id='"+ row.language_id+ "_active' checked='checked'/>";
			} else {
				return "<input type='checkbox' id='"+ row.language_id+ "_active'/>";}}},
			{"data" : "Id",
			render : function(data,type,row) {
				return "<button id='"+ row.language_id+ "'_edit' onclick='edit(this.id)'><i class='fa fa-pencil-square-o btn-primary btn-sm' title='Edit' data-toggle='tooltip'></i></button>";}}]
			});
			})
			
		.fail(function (jqXHR, exception) {
			errormeassage(jqXHR, exception);
		})
}
			

function edit(id) {
	$("#addbtn").hide();
	sessionStorage.setItem("id", id);
	var id = sessionStorage.getItem("id");
	if (!(id == null)) {
		$.ajax({
			type : "GET",
			headers : headers,
			url : "https://"+ipadd+":3000/api/v1/languages/" + id,
			data : ""})
		.done(function(json) {
				var data = JSON.parse(json);
				$.each(data, function(key, obj) {
					$("#lang").val(obj.language_name);
					$("#testt").val(obj.action);
					var ac = obj.active;
					if (ac == 1) {
						$("#testt").prop('checked', true);
					} else {
						$("#testt").prop('checked', false);
					}
				});
			})
		.fail(function (jqXHR, exception) {
			errormeassage(jqXHR, exception);
			       		})
	}
	$('#listdiv').hide();
	$('#adddiv').hide();
	$('#editdiv').show();
}

function update() {
	var id =sessionStorage.getItem("id");
	var datee = new Date();
	var date = (datee.getFullYear() + '/' + (datee.getMonth() + 1) + '/'
			+ datee.getDate() + ' T:' + datee.getHours() + ':'
			+ datee.getMinutes() + ':' + datee.getSeconds());
	var languagename = $("#lang").val();
	var check = $('#testt').is(':checked') ? 1 : 0;
	var postData = JSON.stringify({
		"language_id" : id,
		"language_name" : languagename,
		"updated_on" : date,
		"active" : check
	});
	$.ajax({
		url : "https://"+ipadd+":3000/api/v1/languages/" + id,
		type : "PUT",
		data : postData,
		contentType : "application/json",
		dataType : "text",
		headers : headers,
		processdata : true})
	.done(function(data, textStatus, jqXHR) {
			reload_table();
			$("#addbtn").show();
			$("#listdiv").show();
			$("#editdiv").hide();
			$("#adddiv").hide();
			//location.assign("languagesmaster.html");
		})	
	.fail(function (jqXHR, exception) {
		errormeassage(jqXHR, exception);
			       		})
}	

	function cancell() {
		$("#addbtn").show();
	$("#listdiv").show();
	$("#editdiv").hide();
	$("#adddiv").hide();
	}

	function log() {
	if ($validator.valid()) {
		var lname = $('#langname').val();
		var check = $('#test').is(':checked') ? 1 : 0;
		var created_by = "user";
		var updated_by = "user";
		var datee = new Date();
		var date = (datee.getFullYear() + '/' + (datee.getMonth() + 1) + '/'
				+ datee.getDate() + ' T:' + datee.getHours() + ':'
				+ datee.getMinutes() + ':' + datee.getSeconds());
		$(function() {
			var postData = JSON.stringify({
				"language_name" : lname,
				"created_by" : created_by,
				"created_on" : date,
				"updated_by" : updated_by,
				"updated_on" : date,
				"active" : check
			});
			$.ajax({
				type : "post",
				headers : headers,
				url : "https://"+ipadd+":3000/api/v1/languages/",
				dataType : "json",
				data : postData,
				contentType : "application/json"})
			.done(function(json) {
				reload_table();
				document.getElementById('addform').reset();
					$("#listdiv").show();
					$("#editdiv").hide();
					$("#adddiv").hide();
					$("#addbtn").show();
					//location.assign("languagesmaster.html");
				})
				.fail(function (jqXHR, exception) {
					errormeassage(jqXHR, exception);
			       	})	
		});
	}
	}
	function errormeassage(jqXHR, exception) {
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
	
	function reload_table(){
		$('#example23').dataTable().fnClearTable();
		$('#example23').dataTable().fnDestroy();
		ShowCountries();
	}