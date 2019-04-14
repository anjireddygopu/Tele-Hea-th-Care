var token=sessionStorage.getItem("token");
var ipadd=sessionStorage.getItem("ip-add");
headers= {'x-access-token':token};

$(document).ready(
		function() {
			edit();
			$("#bmi1").blur(
					function() {
						var Weight = Number($("#weight1").val());
						var height = Number($("#height1").val());
						var inch = Number(($("#height21").val()));
						if ((Weight == "" && height == "")
								|| (Weight == "" || height == "")) {
							$("#bmi1").val(0);
						} else {
							var height1 = ((height) * 12) + inch;
							var height2 = Math.pow(height1, 2);
							var bmi = (Weight) / height2;
							var bmi1 = bmi.toFixed(3);
							$("#bmi1").val(bmi1);
						}
					});

			$("#bmi1").blur(
					function() {
						var Weight = Number($("#weight1").val());
						var height = Number($("#height1").val());
						var inch = Number(($("#height21").val()));
						if ((Weight == "" && height == "")
								|| (Weight == "" || height == "")) {
							$("#bmi1").val(0);
						} else {

							var height1 = ((height) * 12) + inch;
							var height2 = Math.pow(height1, 2);
							var bmi = (Weight) / height2;
							var bmi1 = bmi.toFixed(3);
							$("#bmi1").val(bmi1);
						}
					});
		});


function edit(){
	var mrno=sessionStorage.getItem("mrno");
	var eid=sessionStorage.getItem("eid");
	var vid=sessionStorage.getItem("vid");	
	$(function(){ 
		if(!(mrno==null)){  
			$.ajax({
				type:"GET",
				headers:headers,
				url:"https://"+ipadd+":3000/api/v1/vitals/"+mrno+"/"+eid+"/"+vid,
				data:""
			})
			.done(function (data) {
				var data=JSON.parse(data);
				$.each(data,function(key,obj){	         	   
					$("#weight1").val(obj.weight);
					$("#weight_unit1").val(obj.weight_unit);
					$("#height1").val(obj.height1);
					$("#height1_unit1").val(obj.height1_unit);
					$("#height21").val(obj.height2);
					$("#height2_unit1").val(obj.height2_unit);
					$("#bmi1").val(obj.bmi);
					$("#bp_systolic1").val(obj.bp_systolic);
					$("#bp_diastolic1").val(obj.bp_diastolic);
					$("#temperature1").val(obj.temperature);
					$("#pulse_rate1").val(obj.pulse_rate);
					$("#pulse_pattern1").val(obj.pulse_pattern);
					$("#pulse_volume1").val(obj.pulse_volume);
					$("#notes1").val(obj.additional_notes);    	     			            
				});
			})
			.fail(function (jqXHR, exception) {
				error(jqXHR, exception);
			
			});
		}
	});	
}
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
