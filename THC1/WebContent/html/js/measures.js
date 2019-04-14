var unitofmeasure;
var tokenKey = sessionStorage.getItem("token");
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
function ShowUom() {
              $.ajax({
				"type" : "GET",
				"url" : "https://"+ipadd+":3000/api/v1/units",
				"data" : "",
				"dataSrc" : "",
				"headers" : headers,
				"dataType" : 'json'
				})
               .done(function (data) {
					unitofmeasure = $('#unitofmeasuretable')
							.DataTable(
									{
										"language" : {
											"zeroRecords" : "No Records Found"
										},
										"dom" : '<"toolbar">frtip',
										data : data,
										"columns" : [

												{
													"data" : "uom_id"
												},
												{
													"data" : "uom_name"
												},
												{
													"data" : "uom_description"
												},
												{
													"data" : "active",
													render : function(data,
															type, row) {
														if (data == true) {
															return "<input type='checkbox' id='"
																	+ row.uom_id
																	+ "_active' checked='checked'/>"
														} else {
															return "<input type='checkbox' id='"
																	+ row.uom_id
																	+ "_active'/>"
														}
														;
													}
												},

												{
													"data" : "uom_id",
													render : function(data,
															type, row) {

														return "<button id='"
																+ row.uom_id
																+ "'_edit' onclick='Edit(this.id)'><i class='fa fa-pencil-square-o btn-primary btn-sm' title='Edit' data-toggle='tooltip'></i></button>"
													}
												} ]

									})

				})
				
				.fail(function (jqXHR, exception) {
           error(jqXHR, exception);
     	})
			
			     	}


function post() {
	var uname = $("#uomname").val();
	var unamedes = $("#uomdesc").val();
	var status = $("#check1").is(':checked') ? 1 : 0;
	var postData = JSON.stringify({
		"uom_name" : uname,
		"uom_description" : unamedes,
		"active" : status
	});
	const jqxhr= $.ajax({
		url : "https://"+ipadd+":3000/api/v1/units",
		type : "POST",
		data : postData, // Data sent to server
		contentType : "application/json", // content type sent to server
		dataType : "text",
		"headers" : headers,
		processdata : true })
        .done(function (data) {
        	document.getElementById('unitofmeasureform').reset();
        	reload_table();
        	display();
	})


	       .fail(function (jqXHR, exception) {
             error(jqXHR, exception);
         	})
	     	}
	


function Edit(id) {
	sessionStorage.setItem("id", id)
	var id = sessionStorage.getItem("id");
	if (!(id == null)) {
		const jqxhr= $.ajax({
					type : "GET",
					"headers" : headers,
					url : "https://"+ipadd+":3000/api/v1/units/" + id,
					data : ""})
					.done(function (json) {
						var data = JSON.parse(json);
						$
								.each(
										data,
										function(key, obj) {
											document.getElementById("uomnameedit").value = obj.uom_name;
											document.getElementById("uomdescedit").value = obj.uom_description;
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
	$('#add').hide();

}


function update() {
	var id = sessionStorage.getItem("id");

	var uom_name = $("#uomnameedit").val();
	var uom_descript = $("#uomdescedit").val();
	var status = $("#check2").is(':checked') ? 1 : 0;
	var postData = JSON.stringify({
		"uom_name" : uom_name,
		"uom_description": uom_descript,
		"active" : status,
		"uom_id" : id
	})
	const jqxhr= $.ajax({
		type : "PUT",
		url : "https://"+ipadd+":3000/api/v1/units/update",

		data : postData, // Data sent to server
		contentType : "application/json",
		"headers" : headers,
		processdata : true,
		})
	.done(function (data) {
		document.getElementById('editform').reset();
		reload_table();
		display();
		})
	
		.fail(function (jqXHR, exception) {
           error(jqXHR, exception);
     	})
		     	}
		
$(document).ready(function() {
	                ShowUom();
	
					$("#list").show();
					$("#register").hide();
					$("#edit").hide();
					//

					jQuery.validator.addMethod("noSpace", function(value,element) 
					{
						return value.indexOf(" ") < 0 && value != "";
					}, "No space please and don't leave it empty");       
			       

					$("#unitofmeasureform").validate({
										rules : {
											uomname : {
												required : true,
											},
					                         uomdesc : {
						                             required : true,
					                                   }
					
										},

										messages : {
											uomname : {
												required : "Please provide a UOM Name",
											},
											uomdesc : {
												required : "Please provide a UOm Description",
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
									});//add form validations
			
				    $("#editform").validate({
		        	     rules: {
		        	    	 uomname1: {
		        	        required: true,
		        	      },
		        	 	 uomdesc1: {
			        	        required: true,
			        	      }
		        	    },

		        	    messages: {
		        	    	uomname1: {
		        	        required: "Please provide a UomName",
		        	      },
		        	      uomdesc1: {
			        	        required: "Please provide a Unit Description",
			        	      },
		        	      
		        	    },
		        	      submitHandler: function() {
		        	                   update();
		        	    },
		        	    errorElement: "em",
		        	    errorPlacement: function ( error, element ) {
		        	 	
		        	 	error.addClass( "help-block" );

		        	 	element.parents( ".col-md-6" ).addClass( "has-feedback" );

		        	 	if ( element.prop( "type" ) === "checkbox" ) {
		        	 	error.insertAfter( element.parent( "div" ) );
		        	 	} else {
		        	 	error.insertAfter( element );
		        	 	}

		        	 	

		        	 	},

		        	 	highlight: function ( element, errorClass, validClass ) {
		        	 	$( element ).parents( ".col-md-6" ).addClass( "has-error" ).removeClass( "has-success" );
		        	 	
		        	 	},
		        	 	unhighlight: function ( element, errorClass, validClass ) {
		        	 	$( element ).parents( ".col-md-6" ).removeClass( "has-error" );
		        	 	
		        	 	},
		        	           });//edit orm validations

					
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
	$("#list").show();
	$("#edit").hide();
	$("#register").hide();
	$("#add").show();
}
//	
function reload_table(){
	$('#unitofmeasuretable').dataTable().fnClearTable();
	$('#unitofmeasuretable').dataTable().fnDestroy();
	ShowUom();
}
function display(){
	$('#list').show();
	$('#edit').hide();
	$('#register').hide();
	$('#add').show();
}

	
		