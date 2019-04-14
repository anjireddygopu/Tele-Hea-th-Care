var oTable;
var token = sessionStorage.getItem("token");
const headers={'x-access-token' : token};
var ipadd=sessionStorage.getItem("ip-add");
$.ajax({
		type : "GET",
		headers :headers,
		url : "https://"+ipadd+":3000/api/v1/expert-center-details",
		data : ""}).done(function (response) {
		          var result = JSON.parse(response);
				$.each(result, function(index, item) {
				$("#eid").append("<option value=" + item.facility_center_id + ">"+ item.facility_center_name + "</option>");});

				})
				.fail(function (jqXHR, exception) {
					error(jqXHR, exception);
				});
 
  $('#eid').on("change", function () {  
	    var id = $('#eid').val();
			$.ajax({
				type : "GET",
				headers : headers,
				url : "https://"+ipadd+":3000/api/v1/doctor-details/"+id,
				data : "",}).done(function (response) {

					var result = JSON.parse(response);
					$.each(result, function(index, item) {
						$("#did").append(
								"<option value=" + item.doctor_id + ">"
								+ item.doctor_name + "</option>");
					});

				})
				.fail(function (jqXHR, exception) {
					error(jqXHR, exception);
				});
  });

			function post(){
				var caseid=sessionStorage.getItem("caseid");
				var mrno=sessionStorage.getItem("mrno");
				var eid=sessionStorage.getItem("eid");
				var vid=sessionStorage.getItem("vid");
				var expert=$("#eid").val();
				var did=$("#did").val();
				var query=$("#query").val();
				var postData=JSON.stringify({"case_id":caseid,"expert_center_id":expert,"doctor_id":did,"query":query,"medical_record_no":mrno,"episode_id":eid,"visit_id":vid});
				$.ajax({
					url:"https://"+ipadd+":3000/api/v1/case-details/post",
					type:"POST",
					data: postData ,
					contentType: "application/json" ,	
					dataType: "text" ,
					headers: headers,
					processdata: true
					})
					.done(function (response) { 
						document.getElementById("form1").reset(); 
						$("#caseinfo").show();
					})
					.fail(function (jqXHR, exception) {
						error(jqXHR, exception);
					});
			}