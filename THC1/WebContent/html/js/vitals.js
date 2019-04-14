var token = sessionStorage.getItem("token");
var ipadd=sessionStorage.getItem("ip-add");
var headers= {'x-access-token':token};
function myfunction(){
	var Weight=$("#weight1").val();
	var weight_unit=$("#weight_unit1").val();
	var height=Number($("#height1").val());
	var h1_unit=$("#height1_unit1").val();
	var h2=Number($("#height21").val());
	var h2_unit=$("#height2_unit1").val();	
	var bmi=$("#bmi1").val();
	var BP_Systolic=$("#bp_systolic1").val();
	var BP_Diastolic=$("#bp_diastolic1").val();
	var Temperature=$("#temperature1").val();
	var Pulse_Rate=$("#pulse_rate1").val();
	var Pulse_Pattern=$("#pulse_pattern1").val();
	var Pulse_Volume=$("#pulse_volume1").val();
	var Additional_Notes=$("#notes1").val();		
	var created="haritha";	
	var mrno=sessionStorage.getItem("mrno");
	var eid=sessionStorage.getItem("eid");
	var vid=sessionStorage.getItem("vid");
	var postData=JSON.stringify({"medical_record_no":mrno,"episode_id":eid,"visit_id":vid,"weight":Weight,"weight_unit":weight_unit,"height1":height,"height1_unit":h1_unit,"height2":h2,"height2_unit":h2_unit,"bmi":bmi,"bp_systolic":BP_Systolic,"bp_diastolic":BP_Diastolic,"temperature":Temperature,"pulse_rate":Pulse_Rate,"pulse_pattern":Pulse_Pattern,"pulse_volume":Pulse_Volume,"additional_notes":Additional_Notes,"created_by":created});
	$.ajax({		
		url:"https://"+ipadd+":3000/api/v1/vitals/",
		type:"POST",
		data: postData , 		
		contentType: "application/json" ,	
		dataType: "text" ,
		headers:headers,
		processdata: true })
		.done(function (data) {
			edit();	
			$("#Updatefunction").show();
		
		})
		.fail(function (jqXHR, exception) {
			error(jqXHR, exception);
		});
	
}
$('#submitfunction').click(function(){
	swal({  
		title:"",   
	   text: "Your Record Added Successfully !",   
	   timer: 2000,   
	   showConfirmButton: false 
   });
});
$('#updatefunction').click(function(){
	swal({  
		title:"",   
	   text: "Your Record Updated Successfully !",   
	   timer: 2000,   
	   showConfirmButton: false 
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
				if (JSON.stringify(data)=="[]") {
					$("#Updatefunction").hide();
				
				}
				else {
					$("#Submitfunction").hide();
				}
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

function Update(){
	var mrno=sessionStorage.getItem("mrno");
	var eid=sessionStorage.getItem("eid");
	var vid=sessionStorage.getItem("vid");
	var Weight=$("#weight1").val();	
	var weight_unit=$("#weight_unit1").val();
	var height=Number($("#height1").val());
	var h1_unit=$("#height1_unit1").val();
	var h2=Number($("#height21").val());
	var h2_unit=$("#height2_unit1").val();	
	var bmi=$("#bmi1").val();
	var BP_Systolic=$("#bp_systolic1").val();	
	var BP_Diastolic=$("#bp_diastolic1").val();	
	var Temperature=$("#temperature1").val();	
	var Pulse_Rate=$("#pulse_rate1").val();	
	var Pulse_Pattern=$("#pulse_pattern1").val();
	var Pulse_Volume=$("#pulse_volume1").val();	
	var Additional_Notes=$("#notes1").val(); 
	var updated="haritha"	
		var postData=JSON.stringify({"medical_record_no":mrno,"episode_id":eid,"visit_id":vid,"weight":Weight,"weight_unit":weight_unit,"height1":height,"height1_unit":h1_unit,"height2":h2,"height2_unit":h2_unit,"bmi":bmi,"bp_systolic":BP_Systolic,"bp_diastolic":BP_Diastolic,"temperature":Temperature,"pulse_rate":Pulse_Rate,"pulse_pattern":Pulse_Pattern,"pulse_volume":Pulse_Volume,"additional_notes":Additional_Notes,"updated_by":updated});
	$.ajax({
		url:"https://"+ipadd+":3000/api/v1/vitals/update",
		type:"PUT",
		data: postData , 
		contentType: "application/json" ,	
		dataType: "text",
		headers: headers,
		processdata: true })
		.done(function (data) {
			edit();
		})
		.fail(function (jqXHR, exception) {
			error(jqXHR, exception);
		});
}

function display(){
	if (JSON.stringify(data)=="[]") {
		$("#Updatefunction").hide();
	}
	else {
		$("#Submitfunction").hide();
	}
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
