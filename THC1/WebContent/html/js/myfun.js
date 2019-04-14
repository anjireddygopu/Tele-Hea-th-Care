var b = sessionStorage.getItem("token");
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
var headers = {
	'x-access-token' : b,
	'Content-Type' : 'application/json',
	'x-key' : 'arvind@myapp.com'
};
var ipadd=sessionStorage.getItem("ip-add");
$(document).ready(
		function() {
			jQuery.validator.addMethod("noSpace", function(value, element) {
				return value.indexOf(" ") < 0 && value != "";
			}, "No space please and don't leave it empty");
			$("#form2")
					.validate(
							{

								rules : {
									tgname : {
										required : true,
										noSpace : false
									}

								},
								messages : {
									tgname : {
										required : "This field is required",
										/*noSpace : "Don't enter spaces"*/
									}
								},
								submitHandler : function() {
									myfunc();
								},
								errorElement : "em",
								errorPlacement : function(error, element) {
									// Add the `help-block` class to the error
									// element
									error.addClass("help-block");

									if (element.prop("type") === "checkbox") {
										error.insertAfter(element
												.parent("label"));
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
									$(element).parents(".col-md-6").addClass(
											"has-success").removeClass(
											"has-error");
								}

							});
			$("#form1")
					.validate(
							{

								rules : {
									tegname : {
										required : true,
										noSpace : false
									}

								},
								messages : {
									tegname : {
										required : "This field is required",
									/*	noSpace : "Don't enter spaces"*/
									},

								},
								submitHandler : function() {
									update();
								},
								errorElement : "em",
								errorPlacement : function(error, element) {
									// Add the `help-block` class to the error
									// element
									error.addClass("help-block");

									if (element.prop("type") === "checkbox") {
										error.insertAfter(element
												.parent("label"));
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
									$(element).parents(".col-md-6").addClass(
											"has-success").removeClass(
											"has-error");
								}

							});
		});
function myfunc() {
	var date = new Date();
	var tgname = $("#tgname").val();
	var created = "arvind"
	var ch = $("#checkbox-15").is(':checked') ? 1 : 0;
	var postData = JSON.stringify({
		"test_group_name" : tgname,
		"created_by" : created,
		"created_on" : date,
		"active" : ch
	})
	$.ajax({
		url : "https://"+ipadd+":3000/api/v1/test-group/",
		type : "POST",
		data : postData,
		contentType : "application/json",
		dataType : "text",
		headers : headers,
		processdata : true,
	}).done(function(response) {
		display();
		table();
	}).fail(function(jqXHR, exception) {
		
	});
}
function Edit(id) {
	$("#addbtn").hide();
	sessionStorage.setItem("tid", id);
	$("#edit").show();
	$("#list").hide();
	$("#add").hide();
	$.ajax({
		type : "GET",
		url : "https://"+ipadd+":3000/api/v1/test-group/" + id,
		data : "",
		headers : headers,
	}).done(function(json) {
		var data = JSON.parse(json);
		$.each(data, function(key, val) {
			document.getElementById("tegname").value = val.test_group_name;
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
}
function update() {
	var id = sessionStorage.getItem("tid");
	var tname = $("#tename").val();
	var tgname = $("#tegname").val();
	var updated = "arvind";
	var date = new Date();
	var ch = $("#checkbox-16").is(':checked') ? 1 : 0;
	var postData = JSON.stringify({
		"test_group_id" : id,
		"test_group_name" : tgname,
		"updated_by" : updated,
		"updated_on" : date,
		"active" : ch
	})
	$.ajax({
		url : "https://"+ipadd+":3000/api/v1/test-group/" + id,
		type : "PUT",
		data : postData,
		contentType : "application/json",
		dataType : "text",
		headers : headers,
		processdata : true,
	}).done(function(json) {
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
	$('#test-group').dataTable().fnClearTable();
	$('#test-group').dataTable().fnDestroy();
	ShowTestGroup();
	}
	function display(){
		$("#add").hide();
		$("#list").show();
		$("#edit").hide();
		$("#addbtn").show();
	}
