$("#edit").ready(
		function() {
			jQuery.validator.addMethod("noSpace", function(value, element) {
				return value.indexOf(" ") < 0 && value != "";
			}, "No space please and don't leave it empty");


			$("#editform")
					.validate(
							{

								rules : {
									tename : {
										required : true,
										noSpace : false
									}

								},
								messages : {
									tename : {
										required : "This field is required",
										/*noSpace : "Don't enter spaces"*/
									}
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
									$(element).parents(".col-md-4").addClass(
											"has-error").removeClass(
											"has-success");
								},
								unhighlight : function(element, errorClass,
										validClass) {
									$(element).parents(".col-md-4").addClass(
											"has-success").removeClass(
											"has-error");
								}

							});
		});

$("#add").ready(
		function() {

			jQuery.validator.addMethod("noSpace", function(value, element) {
				return value.indexOf(" ") < 0 && value != "";
			}, "No space please and don't leave it empty");

			$("#addform")
					.validate(
							{

								rules : {
									tname : {
										required : true,
										noSpace : false
									}

								},
								messages : {
									tname : "This field is required",
									/*noSpace : "Don't enter spaces"*/
								},
								submitHandler : function() {
									myfunc();
								},
								errorElement : "em",
								errorPlacement : function(error, element) {
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
									$(element).parents(".col-md-4").addClass(
											"has-error").removeClass(
											"has-success");
								},
								unhighlight : function(element, errorClass,
										validClass) {
									$(element).parents(".col-md-4").addClass(
											"has-success").removeClass(
											"has-error");
								}

							});
		});