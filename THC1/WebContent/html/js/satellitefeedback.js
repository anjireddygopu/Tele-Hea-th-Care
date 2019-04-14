var token = sessionStorage.getItem("token");
var ipadd=sessionStorage.getItem("ip-add");
$(document).ready(function(){
	var mrno=sessionStorage.getItem("mrno");
	var eid=sessionStorage.getItem("eid");
	var vid=sessionStorage.getItem("vid");
		 $.ajax({
		       "type": "GET",
		       "url": "https://"+ipadd+":3000/api/v1/feedback/"+mrno+"/"+eid+"/"+vid,
		       "data": "",
		       "dataSrc": "",
		   	headers: {"x-access-token":token},
		       dataType: 'json'
		      })
		     .done(function(json) {
     	 		$.each(json, function(index, item){
		    	$("#feedback").val(item.feedback_description);
		       })
		     })
		      .fail(function (jqXHR, exception) {
					error(jqXHR, exception);
				});

})
function error(jqXHR, exception) {
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
