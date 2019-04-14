var dosagetable;
var tokenKey = sessionStorage.getItem("token");
var token = sessionStorage.getItem(tokenKey);
var headers = {
	'x-access-token' : tokenKey
};
var ipadd=sessionStorage.getItem("ip-add");
function error(jqXHR, exception){
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
function DosageMaster() {

	const jqxhr= $.ajax({
				"type" : "GET",
				"url" : "https://"+ipadd+":3000/api/v1/dosage",
				"data" : "",
				"dataSrc" : "",
				"headers" : headers,
				dataType : 'json'})

				
               .done(function (data) {
					dosagetable = $('#datatable')
							.DataTable(
									{
										"language" : {
											"zeroRecords" : "No Records Found"
										},
										"dom" : '<"toolbar">frtip',
										data : data,
										"columns" : [

												{
													"data" : "dosage_id"
												},
												{
													"data" : "dosage_description"
												},
												{
													"data" : "active",
													render : function(data,
															type, row) {
														if (data == true) {
															return "<input type='checkbox' id='"
																	+ row.dosage_id
																	+ "_active' checked='checked'/>"
														} else {
															return "<input type='checkbox' id='"
																	+ row.dosage_id
																	+ "_active'/>"
														}
														;
													}
												},

												{
													"data" : "dosage_id",
													render : function(data,
															type, row) {

														return "<button id='"
																+ row.dosage_id
																+ "'_edit' onclick='Edit(this.id)'><i class='fa fa-pencil-square-o btn-primary btn-sm' title='Edit' data-toggle='tooltip'></i></button>"
													}
												} ]

									});

			})
	
	
			.fail(function (jqXHR, exception) {
           error(jqXHR, exception);
     	})
 
     	}



DosageMaster();

function post() {
	var uname = $("#dosagename").val();
	var status = $("#check1").is(':checked') ? 1 : 0;
	var postData = JSON.stringify({
		"dosage_description" : uname,
		"active" : status
	})
	const jqxhr= $.ajax({
		url : "https://"+ipadd+":3000/api/v1/dosage",
		type : "POST",
		data : postData, // Data sent to server
		contentType : "application/json", // content type sent to server
		dataType : "text",
		"headers" : headers,
		processdata : true,})
		 .done(function (data) {
			 reload_table();
			 display();
		})
		

		 		.fail(function (jqXHR, exception) {
           error(jqXHR, exception);
     	})
		       
		     	}
		
		

function Edit(id) {
	$("#add").hide();
	sessionStorage.setItem("id", id)
	var id = sessionStorage.getItem("id");
	if (!(id == null)) {
		const jqxhr= $.ajax({
					type : "GET",
					"headers" : headers,
					url : "https://"+ipadd+":3000/api/v1/dosage/" + id,
					data : "",})
					.done(function (json) {
						var data = JSON.parse(json);
						$
								.each(
										data,
										function(key, obj) {
											document
													.getElementById("dosagenameedit").value = obj.dosage_description;
											var ac = obj.active;
											if (ac == 1) {
												$("#check2").prop('checked',
														true);
											} else {
												$("#check2").prop('checked',
														false);
											}
										});
				})

		 		 .fail(function (jqXHR, exception) {
                   error(jqXHR, exception);
     	             })
		      
		     	  }
	$('#list').hide();
	$('#register').hide();
	$('#edit').show();
}

function update() {
	var id = sessionStorage.getItem("id");
	var uom_name = $("#dosagenameedit").val();
	var status = $("#check2").is(':checked') ? 1 : 0;
	var postData = JSON.stringify({
		"dosage_description" : uom_name,
		"active" : status,
		"dosage_id" : id
	})
	const jqxhr= $.ajax({
		type : "PUT",
		url : "https://"+ipadd+":3000/api/v1/dosage/update",

		data : postData, // Data sent to server
		contentType : "application/json",
		"headers" : headers,
		processdata : true,
		})
		 .done(function (data) {
			 reload_table();
			 display();	
	})
	 		.fail(function (jqXHR, exception) {
           error(jqXHR, exception);
     	})
	        
	     	}

$(document)
		.ready(
				function() {

					$("#list").show();
					$("#register").hide();
					$("#edit").hide();
					//

					jQuery.validator.addMethod("noSpace", function(value,
							element) {
						return value.indexOf(" ") < 0 && value != "";
					}, "No space please and don't leave it empty");

			

					$("#dosageform").validate({
										rules : {
											dosagename : {
												required : true,
												noSpace : false
									
											}
										},

										messages : {
											dosagename : {
												required : "Please provide a Dosage Description",
												
												noSpace : "Space is not Allowed"
											
											},

										},
										submitHandler : function(submit) {
											post();
										},
										errorElement : "em",
										errorPlacement : function(error,
												element) {
											error.addClass("help-block");
											element.parents(".col-md-6")
													.addClass("has-feedback");

											if (element.prop("type") === "checkbox") {
												error.insertAfter(element
														.parent("div"));
											} else {
												error.insertAfter(element);
											}
										},

										highlight : function(element,
												errorClass, validClass) {
											$(element).parents(".col-md-6")
													.addClass("has-error")
													.removeClass("has-success");
										},
										unhighlight : function(element,
												errorClass, validClass) {
											$(element).parents(".col-md-6")
													.removeClass("has-error");
										},
									});
					
					$("#editform").validate({
								rules : {
									dosagename1 : {
										required : true,
										noSpace : false
										
									}
								},

								messages : {
									dosagename1 : {
										required : "Please provide a Dosage Description",
										
										noSpace : "Space is not Allowed",
										
									},

								},
								submitHandler : function(submit) {
									update();
								},
								errorElement : "em",
								errorPlacement : function(error,
										element) {
									error.addClass("help-block");
									element.parents(".col-md-6")
											.addClass("has-feedback");

									if (element.prop("type") === "checkbox") {
										error.insertAfter(element
												.parent("div"));
									} else {
										error.insertAfter(element);
									}
								},

								highlight : function(element,
										errorClass, validClass) {
									$(element).parents(".col-md-6")
											.addClass("has-error")
											.removeClass("has-success");
								},
								unhighlight : function(element,
										errorClass, validClass) {
									$(element).parents(".col-md-6")
											.removeClass("has-error");
								},
							});

});

//
function add() {
	$("#list").hide();
	$("#edit").hide();
	$("#register").show();
	$("#add").hide();
}

//  
function cancel() {
	$("#add").show();
	$("#list").show();
	$("#edit").hide();
	$("#register").hide();
}
//
function reload_table(){
	$('#datatable').dataTable().fnClearTable();
	$('#datatable').dataTable().fnDestroy();
	DosageMaster()
}
function display(){
	$('#list').show();
	$('#register').hide();
	$('#edit').hide();
	$('#add').show();
}

