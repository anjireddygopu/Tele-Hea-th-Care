var tokenKey = sessionStorage.getItem("token");
var headers = {
	'x-access-token' : tokenKey
}
var oTable;
$(document).ready(function() {
	ShowReligion();
});
$('#save').click(function(){
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
function ShowReligion() {
	$
			.ajax({
				"type" : "GET",
				"url" : "https://"+ipadd+":3000/api/v1/religion",
				"data" : "",
				"dataSrc" : "",
				"headers" : headers,
				dataType : 'json'
			})
			.done(
					function(data) {
						oTable = $('#Religion')
								.DataTable(
										{
											"language" : {
												"zeroRecords" : "No Records Found"
											},
											"dom" : '<"toolbar">frtip',
											"data" : data,
											"columns" : [
													{
														"data" : "religion_id"
													},
													{
														"data" : "religion_name"
													},
													{
														"data" : "active",
														render : function(data,
																type, row) {
															if (data == true) {
																return "<input type='checkbox' id='"
																		+ row.religion_id
																		+ "_active' checked='checked'/>"
															} else {
																return "<input type='checkbox' id='"
																		+ row.religion_id
																		+ "_active'/>"
															}
															;
														}
													},

													{
														"data" : "Id",
														render : function(data,
																type, row) {
															return "<button id='"
																	+ row.religion_id
																	+ "'_edit' onclick='edit(this.id)'><i class='fa fa-pencil-square-o btn-primary btn-sm' data-toggle='tooltip' title='Edit'></i></button>"
														}
													} ]
										});
					}).fail(function(jqXHR, exception) {
				error(jqXHR, exception);
			})
}

function save() {
	var religion_name = $("#religion1").val()
	var active = $("#checkbox-15").is(":checked") ? 1 : 0;
	var dNow = new Date();
	var localdate = dNow.getDate() + "" + (dNow.getMonth() + 1) + ""
			+ dNow.getFullYear() + "" + dNow.getHours();

	var postData = JSON.stringify({
		"religion_name" : religion_name,
		"created_by" : "pavan",
		"active" : active
	})

	$.ajax({
		url : "https://"+ipadd+":3000/api/v1/religion",
		type : "POST",
		data : postData, // Data sent to server
		contentType : "application/json", // content type sent to
		dataType : "text",
		"headers" : headers,// Expected data format from server
		processdata : true
	}).done(function(response) {
		reload_table()
		$("#list").show();
		$("#add").hide();
		$("#add1").show();
	}).fail(function(jqXHR, exception) {
		error(jqXHR, exception);
	})
}

function edit(id) {
	$("#add1").hide();
	sessionStorage.setItem("id", id);
	var id = sessionStorage.getItem("id");
	$(function() {
		if (!(id == null)) {

			$.ajax({
				type : "GET",
				"headers" : headers,
				url : "https://"+ipadd+":3000/api/v1/religion/" + id,
				data : ""
			}).done(
					function(json) {
						var data = JSON.parse(json);
						$.each(data, function(key, obj) {
							$("#religion2").val(obj.religion_name);
							var a = (obj.active);
							if (a == 1) {
								$('input[name="check"]')[1].checked = true;
							} else {
								$('input[name="check"]')[0].checked = false;
							}
						})
						$("#list").hide();
						$("#edit").show();
						$("#add").hide();
					})

		}
	});
}

function update() {
	var id = sessionStorage.getItem("id");
	var religion_name = $("#religion2").val()
	var active = $("#checkbox-16").is(":checked") ? 1 : 0;
	var dNow = new Date();
	var localdate = dNow.getDate() + "" + (dNow.getMonth() + 1) + ""
			+ dNow.getFullYear() + "" + dNow.getHours();
	var postData = JSON.stringify({
		"religion_name" : religion_name,
		"active" : active,
		"religion_id" : id
	});
	$.ajax({
		url : "https://"+ipadd+":3000/api/v1/religion/update",
		type : "PUT",
		data : postData,
		contentType : "application/json",
		dataType : "text",
		"headers" : headers,
		processdata : true
	}).done(function(response) {
		reload_table()
		$("#list").show();
		$("#edit").hide();
		$("#add1").show();
	}).fail(function(jqXHR, exception) {
		error(jqXHR, exception);

	})
}

function cancel() {
	$("#add1").show();
	$("#list").show();
	$("#edit").hide();
	$("#add").hide();

}

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
function reload_table() {
	$('#Religion').dataTable().fnClearTable();
	$('#Religion').dataTable().fnDestroy();
	ShowReligion();
}
