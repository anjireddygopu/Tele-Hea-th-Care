var tokenKey = sessionStorage.getItem("token");
var token = sessionStorage.getItem(tokenKey);
var headers = {
	'x-access-token' : tokenKey
};
var ipadd=sessionStorage.getItem("ip-add");
$(document).ready(function() {
	$("#add").hide();
	$("#edit").hide();
	var oTable;
	if (token) {
	}
	ShowCountries();
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
function ShowCountries() {
	$
			.ajax({
				"type" : "GET",
				"url" : "https://"+ipadd+":3000/api/v1/specialities",
				"data" : "",
				"dataSrc" : "",
				"headers" : headers,
				dataType : 'json',
			})
			.done(
					function(data) {
						oTable = $('#specialization')
								.DataTable(
										{

											"language" : {
												"zeroRecords" : "No Records Found"
											},
											"dom" : '<"toolbar">frtip',
											data : data,
											"columns" : [

													{
														"data" : "specialization_id"
													},
													{
														"data" : "specialization_name"
													},
													{
														"data" : "active",
														render : function(data,
																type, row) {
															if (data == true) {
																return "<input type='checkbox' id='"
																		+ row.specialization_id
																		+ "_active' checked='checked'/>"
															} else {
																return "<input type='checkbox' id='"
																		+ row.specialization_id
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
																	+ row.specialization_id
																	+ "'_edit' onclick='Edit(this.id)'><i class='fa fa-pencil-square-o btn-primary btn-sm' title='Edit' data-toggle='tooltip'></i></button>"
														}
													}

											]
										});
					})

			.fail(function(jqXHR, exception) {
				msg(jqXHR, exception);
			});

};

function addb() {
	$("#list").hide();
	$("#edit").hide();
	$("#add").show();
	$("#addbtn").hide();
}

function cancel() {
	$("#addbtn").show();
	$("#list").show();
	$("#edit").hide();
	$("#add").hide();
}
$("#add").ready(
		function() {

			jQuery.validator.addMethod("noSpace", function(value, element) {
				return value.indexOf(" ") < 0 && value != "";
			}, "No space please and don't leave it empty");

			
			$("#addform")
					.validate(
							{

								rules : {
									name : {
										required : true,
										noSpace : false
									
									}
								},

								messages : {
									name : {
										required : "Please Enter Name",
									},
								},
								submitHandler : function() {
									myfunction();
								},
								errorElement : "em",
								errorPlacement : function(error, element) {
									error.addClass("help-block");
									element.parents(".col-md-6").addClass(
											"has-feedback");

									if (element.prop("type") === "checkbox") {
										error
												.insertAfter(element
														.parent("div"));
									} else {
										error.insertAfter(element);
									}
								},

								highlight : function(element, errorClass,
										validClass) {
									$(element).parents(".col-md-6").addClass(
											"has-error").removeClass(
											"has-success");
								},
								unhighlight : function(element, errorClass,
										validClass) {
									$(element).parents(".col-md-6")
											.removeClass("has-error");
								},
							});

		});

$("#edit").ready(
		function() {

			jQuery.validator.addMethod("noSpace", function(value, element) {
				return value.indexOf(" ") < 0 && value != "";
			}, "No space please and don't leave it empty");

			

			$("#editform")
					.validate(
							{

								rules : {
									name2 : {
										required : true,
										noSpace : false
							

									}
								},

								messages : {
									name2 : {
										required : "Please Enter Name",
									},
								},
								submitHandler : function() {
									update();
								},
								errorElement : "em",
								errorPlacement : function(error, element) {

									error.addClass("help-block");
									element.parents(".col-md-6").addClass(
											"has-feedback");
									if (element.prop("type") === "checkbox") {
										error
												.insertAfter(element
														.parent("div"));
									} else {
										error.insertAfter(element);
									}
								},
								highlight : function(element, errorClass,
										validClass) {
									$(element).parents(".col-md-6").addClass(
											"has-error").removeClass(
											"has-success");
								},
								unhighlight : function(element, errorClass,
										validClass) {
									$(element).parents(".col-md-6")
											.removeClass("has-error");
								},
							});
		});
function myfunction() {
	var name = $("#name").val();
	var created = "arvind@myapp.com"
	var ch = $("#checkbox-15").is(":checked") ? 1 : 0;
	var postData = JSON.stringify({
		"specialities_name" : name,
		"created_by" : created,
		"active" : ch
	})
	$.ajax({
		url : "https://"+ipadd+":3000/api/v1/specialities/",
		type : "POST",
		data : postData,
		contentType : "application/json",
		dataType : "text",
		"headers" : headers,
		processdata : true,
	}).done(function(response) {
		display();
		table();
		document.getElementById("addform").reset();
	}).fail(function(jqXHR, exception) {
		msg(jqXHR, exception);

	});
}

function Edit(id) {
	$("#addbtn").hide();
	$("#list").hide();
	$("#edit").show();
	$("#add").hide();
	sessionStorage.setItem("id", id);
	var id = id;
	$(function() {
		if (!(id == null)) {
			$
					.ajax(
							{
								type : "GET",
								"headers" : headers,
								url : "https://"+ipadd+":3000/api/v1/specialities/"
										+ id,
								data : "",
							})
					.done(
							function(response) {
								var data = JSON.parse(response);
								$
										.each(
												data,
												function(key, obj) {
													document
															.getElementById("name2").value = obj.specialization_name;
													var ac = obj.active;
													if (ac == 1) {
														$("#checkbox-16")
																.prop(
																		'checked',
																		true);
													} else {
														$("#checkbox-16").prop(
																'checked',
																false);
													}
												});
							})

					.fail(function(jqXHR, exception) {
						msg(jqXHR, exception);
					});
		}
	});
}

function update() {
	var id = sessionStorage.getItem("id");
	var specialization_name = $("#name2").val();
	var updated = "aravind"
	var ch = $("#checkbox-16").is(":checked") ? 1 : 0;
	var postData = JSON.stringify({
		"specialization_id" : id,
		"specialization_name" : specialization_name,
		"active" : ch,
		"updated_by" : updated
	})
	$.ajax({
		url : "https://"+ipadd+":3000/api/v1/specialities/update",
		type : "PUT",
		data : postData,
		contentType : "application/json",
		dataType : "text",
		"headers" : headers,
		processdata : true,
	}).done(function(response) {
		display();
		table();
	}).fail(function(jqXHR, exception) {
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
function table() {
	$("#specialization").dataTable().fnClearTable();
	$("#specialization").dataTable().fnDestroy();
	ShowCountries();
}
function display() {
	$("#list").show();
	$("#edit").hide();
	$("#add").hide();
	$("#addbtn").show();
}
