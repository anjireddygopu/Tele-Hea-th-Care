var token=sessionStorage.getItem("token");
var ipadd=sessionStorage.getItem("ip-add");
var headers = {'x-access-token':token};

function CheifComplaintList() {
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
CheifComplaintList();

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