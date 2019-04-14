var occupationtable;
var token = sessionStorage.getItem("token");
var headers = {'x-access-token':token};
var token=sessionStorage.getItem('token');
var ipadd=sessionStorage.getItem("ip-add");
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
function ShowOccupation() {
	    $.ajax({
	        "type": "GET",
	        "url": "https://"+ipadd+":3000/api/v1/occupation",
	        "data": "",
	        "dataSrc": "",
	        "headers": headers,
	        dataType: 'json'
	    })//ajax end
	    .done(function (data) {
	    	$('#occupation_list').DataTable().clear();
        	$('#occupation_list').DataTable().destroy();
	        $('#occupation_list').DataTable({
	    		   "bSort": false,
	               "language": {
	                   "zeroRecords": "No Records Found"
	               },
	               "dom": '<"toolbar">frtip',
	               data: data,
	               "columns": [
	               { "data": "occupation_id" },
	               { "data": "occupation_name" },
	               {
	               "data": "active",
	                 render: function (data, type, row) {
	                   if (data == true) {
	                       return "<input type='checkbox' id='" + row.occupation_id + "_active' checked='checked'/>"
	                   } else {
	                       return "<input type='checkbox' id='" + row.occupation_id + "_active'/>"
	                   };
	                 }
	               },
	              {
	           	   "data": "id",
	           	     render: function (data, type, row) {
	           	      return "<button id='" + row.occupation_id + "'_edit' onclick='Edit(this.id)'><i class='fa fa-pencil-square-o btn-primary btn-sm' title='Edit' data-toggle='tooltip'></i></button>"
	           	     }
	              }
	            ]
	         });
	      })//done end
	    .fail(function(jqXHR, exception) {
    	   failure(jqXHR, exception)
    	})//fail end 
};

function post(){
      var name=$("#occupationname").val();
      var created="raju"	
      var check = 0;
      if($('#checkbox').is(":checked"))
	  check =1;
      var postData=JSON.stringify({ "occupation_name":name,"created_by":created,"active":check })
      $.ajax({
	       url:"https://"+ipadd+":3000/api/v1/occupation",
	       type:"POST",
	       data: postData , //Data sent to server
           contentType: "application/json" ,	// content type sent to server
           dataType: "text" ,
           "headers": headers,//Expected data format from server
           processdata: true 
      })//ajax end
      .done(function (data) {
    	  reload_table();
    	  display();
	   })//done end
	   .fail(function(jqXHR, exception) {
    	   failure(jqXHR, exception)
    	})//fail end 
}

function Edit(id){
	$("#add").hide();
	sessionStorage.setItem("occupation_id",id);
	  var occupation_id=sessionStorage.getItem("occupation_id");
	  if(!(occupation_id==null)){
	     $.ajax({
		      type:"GET",
		      headers: headers,
		      url:"https://"+ipadd+":3000/api/v1/occupation/"+occupation_id,
		      data:""
	     })
	     .done(function (json) {  
		      var data=JSON.parse(json);
		      $.each(data,function(key,val){
		 	     $("#editname").val(val.occupation_name)
		 	     var c=val.active;
		    	     if(c==1){
		    	        $("#checkbox1").prop('checked', true);
		    	     }else{
		    	        $("#checkbox1").prop('checked', false);  
		    	     } 
		 	     $("#edit").show();
		 	     $("#register").hide();
		 	     $("#list").hide();	    
		 	  });
		 })
		 .fail(function(jqXHR, exception) {
  	     failure(jqXHR, exception)
  	 })//fail end 
   }
}



var date = new Date();

var hour = date.getHours();
hour = (hour < 10 ? "0" : "") + hour;

var min  = date.getMinutes();
min = (min < 10 ? "0" : "") + min;

var sec  = date.getSeconds();
sec = (sec < 10 ? "0" : "") + sec;

var year = date.getFullYear();

var month = date.getMonth() + 1;
month = (month < 10 ? "0" : "") + month;

var day  = date.getDate();
day = (day < 10 ? "0" : "") + day;
var updatedon=( year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec);

function update(){
		 var occupation_id=sessionStorage.getItem("occupation_id");
	     var occupation_name=$("#editname").val();
		 var check = 0;
	     if($('#checkbox1').is(":checked"))
		 check =1;
		 var postData=JSON.stringify({ "occupation_id":occupation_id,"occupation_name":occupation_name,"updated_on":updatedon,"active":check })
		 $.ajax({
		     url:"https://"+ipadd+":3000/api/v1/occupation",
		     type:"PUT",
		     data: postData , //Data sent to server
		     contentType: "application/json" ,	// content type sent to server
		     dataType: "text" ,
		     "headers": headers,//Expected data format from server
		     processdata: true 
		 })//ajax end
	     .done(function (data) { 
	    	 reload_table();
	    	 display();
	     })
	   .fail(function(jqXHR, exception) {
    	   failure(jqXHR, exception)
    	})//fail end
}

/*form validations..*/
$(document).ready(function(){
	occupationtable=$('#occupation_list').DataTable();
	ShowOccupation();
	
	$("#register").hide();
	$("#edit").hide();
	
	
	jQuery.validator.addMethod("noSpace", function(value, element) { 
		 return value.indexOf(" ") < 0 && value != ""; 
		}, "No space please don't leave it empty");
		
		
$("#registration").validate({ 
	  rules: {
	    occupationname: {
	        required: true,
	        noSpace:false
	    }
	  },
	  messages: {
		 occupationname: {
	        required: "Please provide Occupationname"
	      
	     },
	  },
	  submitHandler: function() {
		  post();
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
	  },
	  highlight: function ( element, errorClass, validClass ) {
	  $( element ).parents( ".col-md-6" ).addClass( "has-error" ).removeClass( "has-success" );
	  },
	  unhighlight: function ( element, errorClass, validClass ) {
	  $( element ).parents( ".col-md-6" ).removeClass( "has-error" );
	  },	  	  
   });
	 
 $("#editform").validate({ 
		  rules: {
		    editname: {
		        required: true,
		        noSpace:false
		    }
		  },
		  messages: {
			 editname: {
		        required: "Please provide Occupationname"
		     },
		  },
		  submitHandler: function() {
			    update();
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
		  },
		  highlight: function ( element, errorClass, validClass ) {
		  $( element ).parents( ".col-md-6" ).addClass( "has-error" ).removeClass( "has-success" );
		  },
		  unhighlight: function ( element, errorClass, validClass ) {
		  $( element ).parents( ".col-md-6" ).removeClass( "has-error" );
		  },	  	  
	   });
	 
 });   
/*form validations closed..*/

function cancel(){
	$("#add").show();
	$("#edit").hide();
     $("#register").hide();
     $("#list").show();	
}

function add() {
	  $("#register" ).show();
	  $( "#list" ).hide();
	  $("#edit").hide();
	  $("#add").hide();
	}

function failure(jqXHR, exception) {
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
	$('#occupation_list').dataTable().fnClearTable();
	$('#occupation_list').dataTable().fnDestroy();
	ShowOccupation();
}
function display(){
	$('#list').show();
	$('#edit').hide();
	$('#register').hide();
	$('#add').show();
}