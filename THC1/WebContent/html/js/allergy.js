
var tokenKey = sessionStorage.getItem("token");
headers= {'x-access-token':tokenKey,'Content-Type':'application/json','x-key':'haritha'};
var oTable;
$(document).ready(function() {
	var token = sessionStorage.getItem(tokenKey);
	showAllergies();
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
function showAllergies() {
	$.ajax({
		"type" : "GET",
		"url" : "https://"+ipadd+":3000/api/v1/allergies",
		"data" : "",
		"dataSrc" : "",
		"headers" : headers,
		dataType : 'json'	})
		.done(function (data) {
			oTable = $('#allergymaster')
			.DataTable(
					{
						"language" : {
							"zeroRecords" : "No Records Found"
						},
						"dom" : '<"toolbar">frtip',
						data : data,
						"columns" : [

							{
								"data" : "allergy_id"
							},
							{
								"data" : "allergy_name"
							},
							{
								"data" : "active",
								render : function(
										data,
										type,
										row) {
									if (data == true) {
										return "<input type='checkbox' id='"
										+ row.allergy_id
										+ "_active' checked='checked'/>"
									} else {
										return "<input type='checkbox' id='"
										+ row.allergy_id
										+ "_active'/>"
									}
									;
								}
							},
							{
								"data" : "allergy_id",
								sortable : false,
								render : function(
										data,
										type,
										row) {

									return "<button id='"
									+ row.allergy_id
									+ "_edit' onclick='Edit("
									+ row.allergy_id
									+ ")'><i class='fa fa-pencil-square-o btn-primary btn-sm' title='Edit' data-toggle='tooltip'></i></button>"
								}
							}

							]
					});
		})
		.fail(function (jqXHR, exception) {					
			error(jqXHR, exception);						
		});//error end
};

function Edit(id) {
	sessionStorage.setItem("id", id);
	var id = sessionStorage.getItem("id");
	$("#addbtn").hide();
	
	$(function() {
		if (!(id == null)) {
			$.ajax({
				type : "GET",
				headers :headers,
				url : "https://"+ipadd+":3000/api/v1/allergies/" + id,
				data : ""
			})
			.done(function (data) {
				var data = JSON.parse(data);
				$.each(data, function(key, obj) {
					$("#edit_allergy_name").val(obj.allergy_name);
					var ac = obj.active;
					if (ac == 1) {
						$("#active").prop('checked', true);
					} else {
						$("#active").prop('checked', false);
					}
					$("#listdiv").hide();
					$("#editdiv").show();

				});
			})
			.fail(function (jqXHR, exception) {
				error(jqXHR, exception);
			});//error end
		}
	});
}

function update() {
	var id = sessionStorage.getItem("id");
	var name = $("#edit_allergy_name").val();
	var ch = $("#active").is(':checked') ? 1 : 0;
	var updated = "haritha"
		var postData = JSON.stringify({
			"allergy_id" : id,
			"allergy_name" : name,
			"updated_by" : updated,
			"active" : ch
		})
		$.ajax({
			url : "https://"+ipadd+":3000/api/v1/allergies/update",
			type : "PUT",
			data : postData,
			contentType : "application/json",
			dataType : "text",
			headers : headers,
			processdata : true})
			.done(function (data) {
				display();
				reload_table();
			})
			.fail(function (jqXHR, exception) {
				error(jqXHR, exception);
			});//error end
}

function myfunction() {
	var name = $("#allergy_name").val();
	var ch = $('#test').is(':checked') ? 1 : 0;
	var created = "haritha"
		var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	month = (month < 10 ? "0" : "") + month;
	var day = date.getDate();
	day = (day < 10 ? "0" : "") + day;
	var cid = (day + "" + month + "" + year);
	var postData = JSON.stringify({
		"allergy_name" : name,
		"created_by" : created,
		"active" : ch,
		"created_on" : cid
	})
	$.ajax({
		url : "https://"+ipadd+":3000/api/v1/allergies/",
		type : "POST",
		data : postData,
		contentType : "application/json",
		dataType : "text",
		headers : headers,
	})
	.done(function (data) {
		document.getElementById("commentForm").reset();
		display();
		reload_table();
	})
	.fail(function (jqXHR, exception) {
		error(jqXHR, exception);
	});
}
function reload_table(){
	$('#allergymaster').dataTable().fnClearTable();
	$('#allergymaster').dataTable().fnDestroy();
	showAllergies();
}
function display(){
	$('#listdiv').show();
	$('#editdiv').hide();
	$('#adddiv').hide();
	$('#addbtn').show();
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
