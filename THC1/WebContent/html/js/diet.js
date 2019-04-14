var Table;
var tokenKey = sessionStorage.getItem("token");
var token = sessionStorage.getItem(tokenKey);
var headers = {
	'x-access-token' : tokenKey
};
var ipadd=sessionStorage.getItem("ip-add");
$(document).ready(function() {
	Table = $('#dietlist').DataTable();
	$('#dietadddiv').hide();
	$('#dieteditdiv').hide();
	$("#addbtn").click(function() {
		$('#dieteditdiv').hide();
		$('#listdiv').hide();
		$('#dietadddiv').show();
		$('#addbtn').hide();
	});
	DietList();
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

function DietList() {
	$
			.ajax({
				"type" : "GET",
				"url" : "https://"+ipadd+":3000/api/v1/diet",
				"data" : "",
				"dataSrc" : "",
				"headers" : headers,
				dataType : 'json',
			})
			.done(
					function(data) {
						$('#dietlist').DataTable().clear();
						$('#dietlist').DataTable().destroy();
						Table = $('#dietlist')
								.DataTable(
										{
											"" : {
												"zeroRecords" : "No Records Found"
											},
											"dom" : '<"toolbar">frtip',
											data : data,
											"columns" : [
													{
														"data" : "diet_id"
													},
													{
														"data" : "diet_name"
													},
													{
														"data" : "active",
														render : function(data,
																type, row) {
															if (data == true) {
																return "<input type='checkbox' id='"
																		+ row.diet_id
																		+ "_active' checked='checked'/>"
															} else {
																return "<input type='checkbox' id='"
																		+ row.diet_id
																		+ "_active'/>"
															}
															;
															$('#dataa').append(
																	tr);
														}
													},
													{
														"data" : "Id",
														render : function(data,
																type, row) {
															return "<button id='"
																	+ row.diet_id
																	+ "'_edit' onclick='DietEdit(this.id)'><i class='fa fa-pencil-square-o btn-primary btn-sm' title='Edit' data-toggle='tooltip'></i></button>"
														}
													} ]
										})
					}).fail(function(jqXHR, exception) {
				error(jqXHR, exception)
			})
}

function DietEdit(id) {
	$("#addbtn").hide();
	sessionStorage.setItem("id", id);
	var id = sessionStorage.getItem("id");
	$(function() {
		if (!(id == null)) {
			$.ajax({
				type : "GET",
				headers : headers,
				url : "https://"+ipadd+":3000/api/v1/diet/" + id,
				data : "",
			}).done(function(json) {
				var data = JSON.parse(json);
				$.each(data, function(key, obj) {
					$("#dieteditname").val(obj.diet_name);
					var ac = obj.active;
					if (ac == 1) {
						$("#checkbox-16").prop('checked', true);
					} else {
						$("#checkbox-16").prop('checked', false);
					}
					$("#listdiv").hide();
					$("#dieteditdiv").show();
				});
			}).fail(function(jqXHR, exception) {
				error(jqXHR, exception)
			})//fail end
		}
	});
}

function DietUpdate() {
	var id = sessionStorage.getItem("id");
	var diet_name = $("#dieteditname").val();
	var ch = $("#checkbox-16").is(':checked') ? 1 : 0;
	var update_by = "mahesh";
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	month = (month < 10 ? "0" : "") + month;
	var day = date.getDate();
	day = (day < 10 ? "0" : "") + day;
	var cid = (day + "/" + month + "/" + year);
	var postData = JSON.stringify({
		"diet_id" : id,
		"diet_name" : diet_name,
		"active" : ch,
		"updated_by" : update_by,
		"updated_on" : cid
	})
	$.ajax({
		url : "https://"+ipadd+":3000/api/v1/diet/update",
		type : "PUT",
		data : postData, //Data sent to server
		contentType : "application/json", // content type sent to server
		dataType : "text",
		headers : headers,
		processdata : true,
	}).done(function(data) {
		reload_table();
		display();
	}).fail(function(jqXHR, exception) {
		error(jqXHR, exception)
	})//fail end
}

function DietAdd() {
	var iname = $("#dietname").val();
	var ch = $('#test').is(':checked') ? 1 : 0;
	var created = "mahesh"
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	month = (month < 10 ? "0" : "") + month;
	var day = date.getDate();
	day = (day < 10 ? "0" : "") + day;
	var cid = (day + "/" + month + "/" + year);
	var postData = JSON.stringify({
		"diet_name" : iname,
		"created_by" : created,
		"active" : ch,
		"created_on" : cid
	})
	$.ajax({
		url : "https://"+ipadd+":3000/api/v1/diet/",
		type : "POST",
		data : postData, //Data sent to server
		contentType : "application/json", // content type sent to server
		dataType : "text",
		headers : headers,
		processdata : true,
	}).done(function(data) {
		reload_table();
		display();
	}).fail(function(jqXHR, exception) {
		error(jqXHR, exception)
	})//fail end
}

function cancel() {
	$('#dieteditdiv').hide();
	$('#listdiv').show();
	$('#dietadddiv').hide();
	$("#addbtn").show();
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
	$('#dietlist').dataTable().fnClearTable();
	$('#dietlist').dataTable().fnDestroy();
	DietList();
}
function display() {
	$('#listdiv').show();
	$('#dieteditdiv').hide();
	$('#dietadddiv').hide();
	$('#addbtn').show();
}
