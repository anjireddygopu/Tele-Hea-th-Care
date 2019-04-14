/*Incomeform validations*/

$('#adddiv').ready(function(){
	  jQuery.validator.addMethod("noSpace", function(value, element) { 
	  	return value.indexOf(" ") < 0 && value != ""; 
		}, "No space please and don't leave it empty");
           
 $("#incomeform").validate({
    rules: {
    	incomeadd: {
       required: true,
   
       noSpace:false
     }
   },
   messages: {
	   incomeadd: {
       required: "Please provide a incomename"
  
     },
   },
     submitHandler: function() {
    	 IncomeAdd();
   },
   errorElement: "em",
   errorPlacement: function ( error, element ) {
	// Add the `help-block` class to the error element
	error.addClass( "help-block" );

	// Add `has-feedback` class to the parent div.form-group
	// in order to add icons to inputs
	element.parents( ".col-md-6" ).addClass( "has-feedback" );
	if ( element.prop( "type" ) === "checkbox" ) {
	error.insertAfter( element.parent( "div" ) );
	} else {
	error.insertAfter( element );
	}
	// Add the span element, if doesn't exists, and apply the icon classes to it.
	},
	highlight: function ( element, errorClass, validClass ) {
	$( element ).parents( ".col-md-8" ).addClass( "has-error" ).removeClass( "has-success" );
	//$( element ).parents( ".col-md-5" ).addClass( "has-error" ).removeClass( "has-success" );
	//$( element ).parents( ".col-md-2" ).addClass( "has-error" ).removeClass( "has-success" );
	},
	unhighlight: function ( element, errorClass, validClass ) {
	$( element ).parents( ".col-md-8" ).removeClass( "has-error" );
	//$( element ).parents( ".col-md-5" ).removeClass( "has-error" );
	//$( element ).parents( ".col-md-2" ).removeClass( "has-error" );
	},
 });
 });

$("#editdiv").ready(function(){
 	  jQuery.validator.addMethod("Space", function(value, element) { 
 	  	return value.indexOf(" ") < 0 && value != ""; 
 		}, "No space please and don't leave it empty");
 $("#edit").validate({
   rules: {
    incomename: {
      required: true,
      Space:false
    }
  },
  messages: {
          incomename: {
      required: "Please provide a incomename"

    },
  },
    submitHandler: function() {
    	IncomeUpdate();
  },
  errorElement: "em",
  errorPlacement: function ( error, element ) {
 	// Add the `help-block` class to the error element
 	error.addClass( "help-block" );
 	// Add `has-feedback` class to the parent div.form-group
 	// in order to add icons to inputs
 	element.parents( ".col-md-8" ).addClass( "has-feedback" );
 	if ( element.prop( "type" ) === "checkbox" ) {
 	error.insertAfter( element.parent( "div" ) );
 	} else {
 	error.insertAfter( element );
 	}
 	// Add the span element, if doesn't exists, and apply the icon classes to it.
 	},
 	highlight: function ( element, errorClass, validClass ) {
 	$( element ).parents( ".col-md-8" ).addClass( "has-error" ).removeClass( "has-success" );
 	//$( element ).parents( ".col-md-5" ).addClass( "has-error" ).removeClass( "has-success" );
 	//$( element ).parents( ".col-md-2" ).addClass( "has-error" ).removeClass( "has-success" );
 	},
 	unhighlight: function ( element, errorClass, validClass ) {
 	$( element ).parents( ".col-md-8" ).removeClass( "has-error" );
 	//$( element ).parents( ".col-md-5" ).removeClass( "has-error" );
 	//$( element ).parents( ".col-md-2" ).removeClass( "has-error" );
 	},
 });
 });

/*DietForm Validations*/
$('#dietadddiv').ready(function(){
	  jQuery.validator.addMethod("noSpace", function(value, element) { 
	  return value.indexOf(" ") < 0 && value != ""; 
	}, "No space please and don't leave it empty");


	  $("#dietform").validate({
		    rules: {
		    	dietname: {
		       required: true,
		      
		       noSpace:false
		   
		     }
		   },
		   messages: {
			   dietname: {
		       required: "Please provide a dietname"
		     },
		   },
		     submitHandler: function() {
		                  DietAdd();
		   },
		   errorElement: "em",
		   errorPlacement: function ( error, element ) {
			// Add the `help-block` class to the error element
			error.addClass( "help-block" );
			// Add `has-feedback` class to the parent div.form-group
			// in order to add icons to inputs
			element.parents( ".col-md-6" ).addClass( "has-feedback" );
			if ( element.prop( "type" ) === "checkbox" ) {
			error.insertAfter( element.parent( "div" ) );
			} else {
			error.insertAfter( element );
			}
			// Add the span element, if doesn't exists, and apply the icon classes to it.
			},
			highlight: function ( element, errorClass, validClass ) {
			$( element ).parents( ".col-md-8" ).addClass( "has-error" ).removeClass( "has-success" );
			//$( element ).parents( ".col-md-5" ).addClass( "has-error" ).removeClass( "has-success" );
			//$( element ).parents( ".col-md-2" ).addClass( "has-error" ).removeClass( "has-success" );
			},
			unhighlight: function ( element, errorClass, validClass ) {
			$( element ).parents( ".col-md-8" ).removeClass( "has-error" );
			//$( element ).parents( ".col-md-5" ).removeClass( "has-error" );
			//$( element ).parents( ".col-md-2" ).removeClass( "has-error" );
			},
		 });
		        });
$('#dieteditdiv').ready(function(){
	  jQuery.validator.addMethod("noSpace", function(value, element) { 
	  return value.indexOf(" ") < 0 && value != ""; 
	}, "No space please and don't leave it empty");
	  
	 

	  $("#dietedit").validate({
		    rules: {
		    	dieteditname: {
		       required: true,
		     
		       noSpace:false
		   
		     }
		   },
		   messages: {
			   dieteditname: {
		       required: "Please provide a dietname"
		     },
		   },
		     submitHandler: function() {
		    	 DietUpdate();
		   },
		   errorElement: "em",
		   errorPlacement: function ( error, element ) {
			// Add the `help-block` class to the error element
			error.addClass( "help-block" );
			// Add `has-feedback` class to the parent div.form-group
			// in order to add icons to inputs
			element.parents( ".col-md-6" ).addClass( "has-feedback" );
			if ( element.prop( "type" ) === "checkbox" ) {
			error.insertAfter( element.parent( "div" ) );
			} else {
			error.insertAfter( element );
			}
			// Add the span element, if doesn't exists, and apply the icon classes to it.
			},
			highlight: function ( element, errorClass, validClass ) {
			$( element ).parents( ".col-md-8" ).addClass( "has-error" ).removeClass( "has-success" );
			//$( element ).parents( ".col-md-5" ).addClass( "has-error" ).removeClass( "has-success" );
			//$( element ).parents( ".col-md-2" ).addClass( "has-error" ).removeClass( "has-success" );
			},
			unhighlight: function ( element, errorClass, validClass ) {
			$( element ).parents( ".col-md-6" ).removeClass( "has-error" );
			//$( element ).parents( ".col-md-5" ).removeClass( "has-error" );
			//$( element ).parents( ".col-md-2" ).removeClass( "has-error" );
			},
		 });
		        });
