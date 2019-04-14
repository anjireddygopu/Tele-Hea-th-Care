var bloodtable;
var token = sessionStorage.getItem("token");
var headers = {
		'x-access-token' : token
	};
var a;
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
function ShowBloodgroup() {
	
     $.ajax({
         "type": "GET",
         "url": "https://"+ipadd+":3000/api/v1/bloodgroups",
         "data": "",
         "dataSrc": "",
         "headers": headers,
         dataType: 'json'
      })//ajax end
      .done(function (data) {
        	$('#bloodgroup_list').DataTable().clear();
        	$('#bloodgroup_list').DataTable().destroy();
            $('#bloodgroup_list').DataTable({
            	"bSort": false,
                "language": {
                   "zeroRecords": "No Records Found"
                },
                "dom": '<"toolbar">frtip',
                data: data,
                "columns": [
                { "data": "bloodgroup_id" },
                { "data": "bloodgroup_name" },
                { 
                  "data": "active",
                    render: function (data, type, row) {
                       if (data == true) {
                          return "<input type='checkbox' id='" + row.bloodgroup_id + "_active' checked='checked'/>"
                       } else {
                          return "<input type='checkbox' id='" + row.bloodgroup_id + "_active'/>"
                       };
                     }
                },
               {
           	     "data": "id",
           	      render: function (data, type, row) {
           	          return "<button id='" + row.bloodgroup_id + "'_edit' onclick='Edit(this.id)'><i class='fa fa-pencil-square-o btn-primary btn-sm' title='Edit' data-toggle='tooltip'></i></button>"
           	      }
               }
              ]
            })
       })//done end
       .fail(function(jqXHR, exception) {
    	   failure(jqXHR, exception)
    	})//fail end 
}

function post(){
	   var bname=$("#bloodname").val();
       var created="raju" 
       var check = 0;
       if($('#checkbox').is(":checked"))
       check =1;
       var postData=JSON.stringify({ "bloodgroup_name":bname,"created_by":created,"active":check })
       $.ajax({
	       url:"https://"+ipadd+":3000/api/v1/bloodgroup",
	       type:"POST",
	       data: postData , //Data sent to server
           contentType: "application/json" ,	// content type sent to server
           dataType: "text" ,
           "headers": headers,//Expected data format from server
           processdata: true 
       })//ajax end
       .done(function (data) {  
    	   reload_table()
	        display();
	    })//done end
       .fail(function(jqXHR, exception) {
    	   failure(jqXHR, exception)
    	})//fail end 
}
 
function Edit(id){
	$("#badd").hide();
	  sessionStorage.setItem("bloodgroup_id",id);
	  var bloodgroup_id=sessionStorage.getItem("bloodgroup_id");
	  if(!(bloodgroup_id==null)){
	     $.ajax({
		      type:"GET",
		      headers: headers,
		      url:"https://"+ipadd+":3000/api/v1/bloodgroup/"+bloodgroup_id,
		      data:""
	     })
	     .done(function (json) {  
		      var data=JSON.parse(json);
		      $.each(data,function(key,val){
			          $("#editname").val(val.bloodgroup_name);
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
    	 })
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
var updated=( year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec);

function update(){
	 var bloodgroup_id=sessionStorage.getItem("bloodgroup_id");
	 var bloodgroup_name=$("#editname").val();
	 var check = 0;
     if($('#checkbox1').is(":checked"))
	  check =1;
	 var postData=JSON.stringify({ "bloodgroup_id":bloodgroup_id,"bloodgroup_name":bloodgroup_name,"updated_on":updated,"active":check })
	 $.ajax({
	    url:"https://"+ipadd+":3000/api/v1/bloodgroup",
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
	  })//done end
	 .fail(function(jqXHR, exception) {
    	   failure(jqXHR, exception)
    	})//fail end  
}

/*form validations starts here*/
function add(){
	  $("#register").show();
	  $("#list").hide();
	  $("#edit").hide();
	  $("#badd").hide();
	}


$(document).ready(function(){
    bloodtable = $('#bloodgroup_list').DataTable();
	ShowBloodgroup();
	
	$("#register").hide();
    $("#edit").hide();
    
    
	jQuery.validator.addMethod("noSpace", function(value, element) { 
		 return value.indexOf(" ") < 0 && value != ""; 
		}, "No space and numbers are not allowed");
		 

		
$("#registration").validate({
	  rules: {
		  bloodname: {
	        required: true,
	        noSpace:false
	       
	    }
	  },
	  messages: {
		  bloodname: {
	        required: "Please provide a Bloodgroupname"
	      
	    },
	  },
	  submitHandler: function(submit) {
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
	         required: "Please provide a Bloodgroupname"
	   
	    },
	  },
	  submitHandler: function(submit) {
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
/*form validations closed*/
function cancel(){
	//location.assign("index.html");
	$("#list").show();
	$("#register").hide();
	$("#edit").hide();
	$("#badd").show();
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
	$('#bloodgroup_list').dataTable().fnClearTable();
	$('#bloodgroup_list').dataTable().fnDestroy();
	ShowBloodgroup();
}
function display(){
	$('#badd').show();
	$('#list').show();
	$('#register').hide();
	$('#edit').hide();
}