//Add div validation
	$('#adddiv').ready(function() {
		jQuery.validator.addMethod("noSpace", function(value, element) { 
		return value.indexOf(" ") < 0 && value != ""; 
		}, "No space please and don't leave it empty");
    		 	
		
   	
    	$validator=  $("#addform").validate({	   	  
    	rules: {
    		 	nationname: {
    		 	  			required:true,
    		 	  			noSpace:false
    		 	  			}	
    						},
    			messages:   
    			{
    			nationname:{ 
    						required:"Please enter Language Name",
    						/*noSpace:"Space is not allowed"*/
    						}
    						},
    			submitHandler: function () {
    				    	log();
    				    	},
    						errorElement: "em",
    						errorPlacement: function ( error, element ) {
    						// Add the `help-block` class to the error element
    						error.addClass( "help-block" );
    						if ( element.prop( "type" ) === "checkbox" ) {
    							error.insertAfter( element.parent( "label" ) );
    							} else {
    							error.insertAfter( element );
    							}
    						},
    						highlight: function ( element, errorClass, validClass ) {
    						$( element ).parents( ".col-md-6" ).addClass( "has-error" ).removeClass( "has-success" );
    						},
    						unhighlight: function (element, errorClass, validClass) {
    						$( element ).parents( ".col-md-6" ).addClass( "has-success" ).removeClass( "has-error" );
    						}
    		 		    
    		 		  		});
    		 				});
    		 	/*End of validations for Add Div*/

//Validation for Edit div
	
	$('#editdiv').ready(function() { 
    	jQuery.validator.addMethod("noSpace", function(value, element) { 
    	return value.indexOf(" ") < 0 && value != ""; 
    	}, "No space please and don't leave it empty");
    	

    	
    	$validator=  $("#editform").validate({  
    	  	rules: {
    	  		nation: {
    	  			required:true,
    	  			noSpace:false
    	  				}
					},
				messages: {
				nation:{ 
					required:"Please enter Language Name",
				/*	noSpace:"Space is not allowed"*/
					}
					},
				submitHandler: function () {
					update();
		    		},
		    	errorElement: "em",
				errorPlacement: function ( error, element ) {
				// Add the `help-block` class to the error element
					error.addClass( "help-block" );
					if ( element.prop( "type" ) === "checkbox" ) {
						error.insertAfter( element.parent( "label" ) );
					} else {
						error.insertAfter( element );
					}
					},
				highlight: function ( element, errorClass, validClass ) {
					$( element ).parents( ".col-md-6" ).addClass( "has-error" ).removeClass( "has-success" );
					},
				unhighlight: function (element, errorClass, validClass) {
					$( element ).parents( ".col-md-6" ).addClass( "has-success" ).removeClass( "has-error" );
					} 
    		  		});
	 				});