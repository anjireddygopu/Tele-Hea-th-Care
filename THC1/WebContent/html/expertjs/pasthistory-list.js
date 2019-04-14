
var token = sessionStorage.getItem("token");
var headers = {'x-access-token':token};
var ipadd=sessionStorage.getItem("ip-add");
function pasthistoryList(){
	 var mrno=sessionStorage.getItem("mrno");
	     $.ajax({
		      type:"GET",
		      headers: headers,
		      url:"https://"+ipadd+":3000/api/v1/pasthistory/"+mrno,
		      data:""
	     })
	     .done(function (json) {  
		      var data=JSON.parse(json);
		      $.each(data,function(key,val){
		  	    $("#editmedical").val(val.medical_history)
		  	    $("#editsurgical").val(val.surgical_history)
		  	    $("#editmedication").val(val.medication_history)
		  	    $("#edit").show();
		  	    $("#register").hide();
		  	    $("#list").hide();	    
		  	  });
		 })
		 .fail(function(jqXHR, exception) {
  	     failure(jqXHR, exception)
  	    })
}
pasthistoryList()

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