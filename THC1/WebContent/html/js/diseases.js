var oTable;
var tokenKey = sessionStorage.getItem("token");
var headers = {
	'x-access-token' : tokenKey
};
var ipadd=sessionStorage.getItem("ip-add");
$(document).ready(function() {
	ShowDiseases();
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
function ShowDiseases() {
	var jqXHR = $
			.ajax({
				"type" : "GET",
				"url" : "https://"+ipadd+":3000/api/v1/diseases",
				"data" : "",
				"dataSrc" : "",
				"headers" : headers,
				dataType : 'json'
			})
			.done(
					function(response) {
						oTable = $('#diseases')
								.DataTable(
										{
											"language" : {
												"zeroRecords" : "No Records Found"
											},
											"dom" : '<"toolbar">frtip',
											data : response,
											"columns" : [
													{
														"data" : "diseases_id"
													},
													{
														"data" : "diseases_name"
													},
													{
														"data" : "icd_code"
													},
													{
														"data" : "active",
														render : function(data,
																type, row) {
															if (data == true) {
																return "<input type='checkbox' id='"
																		+ row.diseases_id
																		+ "_active' checked='checked'/>"
															} else {
																return "<input type='checkbox' id='"
																		+ row.diseases_id
																		+ "_active'/>"
															}
															;
														}
													},
													{
														"data" : "diseases_id",
														render : function(data,
														type, row) {
															return "<button id='"
																	+ row.diseases_id
																	+ "'_edit' onclick='edit(this.id)'><i class='fa fa-pencil-square-o btn-primary btn-sm' title='Edit' data-toggle='tooltip'></i></button>"
														}
													} ]
										});
					}).fail(function(jqXHR, exception) {
				error(jqXHR, exception);
			})
};

function myfunction() {
	var a = $("#did").val();
	var d = $("#diseasename").val();
	var c = $("#icdcodee").val();
	var active = $("#checkbox-15").is(':checked') ? 1 : 0;
	var postData = JSON.stringify({
		"diseases_name" : d,
		"icd_code" : c,
		"active" : active
	})
	$.ajax({
		url : "https://"+ipadd+":3000/api/v1/diseases/",
		type : "POST",
		data : postData,
		contentType : "application/json",
		dataType : "text",
		"headers" : headers,
		processdata : true
	}).done(function(response) {
		document.getElementById("diseasesForm").reset();
		reload_table();
		display();
	}).fail(function(jqXHR, exception) {
		error(jqXHR, exception);
	})
}

function edit(id) {
	$("#add").hide();
	sessionStorage.setItem("id", id)
	var id = sessionStorage.getItem("id");
	
	if (!(id == null)) {
		$.ajax({
			type : "GET",
			"headers" : headers,
			url : "https://"+ipadd+":3000/api/v1/diseases/"+id,
			data : "",
		}).done(function(response) {
			var data = JSON.parse(response);
			$.each(data, function(key, obj) {
				$("#diseasename1").val(obj.diseases_name);
				$("#icdcodee1").val(obj.icd_code);
				var ac = obj.active;
				if (ac == 1) {
					$("#checkbox-16").prop('checked', true);
				} else {
					$("#checkbox-16").prop('checked', false);
				}
			});
			}).fail(function(jqXHR, exception) {
				error(jqXHR, exception);
			})
		
		$('#list').hide();
		$('#add-list').hide();
		$('#edit').show();
	}
}


function update(){
	var id = sessionStorage.getItem("id");
	var diseases_name = $("#diseasename1").val();
	var ic1 = $("#icdcodee1").val();
	var updated_by = "Pawan";
	var active = $("#checkbox-16").is(':checked') ? 1 : 0;
	var postData = JSON.stringify({
		"diseases_id" : id,
		"diseases_name" : diseases_name,
		"icd_code" : ic1,
		"updated_by" : updated_by,
		"active" : active
	});
	$.ajax({
		url :"https://"+ipadd+":3000/api/v1/diseases/"+id,
		type : "PUT",
		data : postData, 
		contentType : "application/json", 
		dataType : "text",
		"headers" : headers,
		processdata : true
	}).done(function(response) {
		document.getElementById("editForm").reset();
		reload_table();
		display();
	}).fail(function(jqXHR, exception) {
		error(jqXHR, exception);
	})

}

function cancel() {
	$('#list').show();
	$('#edit').hide();
	$('#add-list').hide();
	$("#add").show();
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

function reload_table(){
	$('#diseases').dataTable().fnClearTable();
	$('#diseases').dataTable().fnDestroy();
	ShowDiseases();
}
function display(){
	$("#add").show();
	$('#list').show();
	$('#edit').hide();
	$('#add-list').hide();
}


