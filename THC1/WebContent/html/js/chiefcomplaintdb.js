var complainttable;
var token = sessionStorage.getItem("token");
var headers = {'x-access-token':token};
var ipadd=sessionStorage.getItem("ip-add");
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

var mrno=sessionStorage.getItem("mrno");
var eid=sessionStorage.getItem("eid");
var vid=sessionStorage.getItem("vid");
var updatedon=( year + "-" + month + "-" + day + " " + hour + ":" + min + ":" + sec);

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


function post(){
      var cheif=$("#cheif").val();
      var created="raju"	
      var postData=JSON.stringify({ "medical_record_no":mrno,"episode_id":eid,"visit_id":vid,"chief_complaint":cheif,"created_by":created })
//    alert(postData);
      $.ajax({
	      url:"https://"+ipadd+":3000/api/v1/chiefcomplaint",
	      type:"POST",
	      data: postData , //Data sent to server
          contentType:"application/json" ,	// content type sent to server
          dataType: "text" ,
          "headers": headers,//Expected data format from server
          processdata: true 
      })
	      .done(function (data) {
			  Edit();
			$("#update").show();
	      })
	      .fail(function(jqXHR, exception) {
	   	   failure(jqXHR, exception)
	   	  })//fail end 
}

function Edit(){
	var mrno=sessionStorage.getItem("mrno");
	var eid=sessionStorage.getItem("eid");
	var vid=sessionStorage.getItem("vid");
	
	     $.ajax({
		      type:"GET",
		      headers: headers,
		      url:"https://"+ipadd+":3000/api/v1/chiefcomplaint/"+mrno+"/"+eid+"/"+vid,
		      data:""
	     })//ajax end
	     .done(function (json) {  
	    	var data=JSON.parse(json);
	    	 var d=JSON.stringify(data);
	    	  if(d=="[]"){
	     		  $("#update").hide();
	     	  }else{
	     		 $("#register").hide();
	     	  }
	     	   
	    	$.each(data,function(key,val){
	    		  $("#editchief").val(val.chief_complaint)
	    		  $("#edit").show();
	    		  $("#register").hide();
	    		  $("#list").hide();	    
	    		  });
		 })//done end
		 .fail(function(jqXHR, exception) {
  	     failure(jqXHR, exception)
  	    })//fail end

}

function update(){
	 var mrno=sessionStorage.getItem("mrno");
	 var cheif=$("#editchief").val();
	 var updated="Raju"
	 var postData=JSON.stringify({"medical_record_no":mrno,"chief_complaint":cheif,"updated_by":updated,"updated_on":updatedon})
	 $.ajax({
	    url:"https://"+ipadd+":3000/api/v1/chiefcomplaint/put",
	    type:"PUT",
	    data: postData , //Data sent to server
	    contentType: "application/json" ,	// content type sent to server
	    dataType: "text" ,
	    "headers": headers,//Expected data format from server
	    processdata: true
	 })
	 .done(function (data) {  
	      //alert("updated successfully..")
		 // window.location.assign("chief-complaint-master.html")
		 Edit();
	 })//done end
	 .fail(function(jqXHR, exception) {
	 	 failure(jqXHR, exception)
	 })//fail end
}

$(document).ready(function(){ 
     $("#edit").hide();
     Edit();
	$("#registration").validate({ 
		rules: {    
			cheif: "required"
	      },
	      messages: {
	    	  cheif: "Please enter your ChiefComplaint",
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
		  element.parents( ".col-md-12" ).addClass( "has-feedback" );

		  if ( element.prop( "type" ) === "checkbox" ) {
		  error.insertAfter( element.parent( "div" ) );
		  } else {
		    error.insertAfter( element );
		  }
		  },
		  highlight: function ( element, errorClass, validClass ) {
		  $( element ).parents( ".col-md-12" ).addClass( "has-error" ).removeClass( "has-success" );
		  },
		  unhighlight: function ( element, errorClass, validClass ) {
		  $( element ).parents( ".col-md-12" ).removeClass( "has-error" );
		  },	  	  
	});
	   
	$("#editform").validate({ 
		  rules: {    
			 editcheif: "required",
	      },
	      messages: {
	    	 editcheif: "Please enter your ChiefComplaint"
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
		  element.parents( ".col-md-12" ).addClass( "has-feedback" );

		  if ( element.prop( "type" ) === "checkbox" ) {
		  error.insertAfter( element.parent( "div" ) );
		  } else {
		    error.insertAfter( element );
		  }
		  },
		  highlight: function ( element, errorClass, validClass ) {
		  $( element ).parents( ".col-md-12" ).addClass( "has-error" ).removeClass( "has-success" );
		  },
		  unhighlight: function ( element, errorClass, validClass ) {
		  $( element ).parents( ".col-md-12" ).removeClass( "has-error" );
		  },	  	  
     });
});    

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