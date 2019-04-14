var token=sessionStorage.getItem("token");
var ipadd=sessionStorage.getItem("ip-add");
const headers={'x-access-token':token};
function postFeedback(){
	var caseid=sessionStorage.getItem("caseid");
	var mrno=sessionStorage.getItem("mrno");
	var eid=sessionStorage.getItem("eid");
	var vid=sessionStorage.getItem("vid");
    var feedback=$("#feedback").val();
	var postData=JSON.stringify({ "feedback_description":feedback,"case_id":caseid,"medical_record_no":mrno,"episode_id":eid,"visit_id":vid})
	$.ajax({
		url:"https://"+ipadd+":3000/api/v1/feedback/post",
		type:"POST",
		data: postData ,
		contentType: "application/json" ,	
		dataType: "text" ,
		headers: headers,
		processdata: true ,
		async:false
		})
		.done(function (response) {  
		document.getElementById("form1").reset();
		$("#expertinfo").show();
		})
		.fail(function (jqXHR, exception) {
			error(jqXHR, exception);
		});
}