var token = sessionStorage.getItem("token");
const headers = {'x-access-token':token};
var mrno=sessionStorage.getItem("mrno");
var eid=sessionStorage.getItem("eid");
var vid=sessionStorage.getItem("vid");
var ipadd=sessionStorage.getItem("ip-add");
$(document).ready(function() {
	return	$.ajax({
		"type": "GET",
		"url":"https://"+ipadd+":3000/api/v1/exam_pdf/"+mrno+"/"+eid+"/"+vid,
		"data": "",
		"dataSrc": "",
		"headers": headers,
		dataType: 'json'
	})
	.done(function(json) 
			{ var patient=json.patient;
			
			for(i in patient){
				sessionStorage.setItem("firstname",patient[i].first_name);
				sessionStorage.setItem("lastname",patient[i].last_name);
				sessionStorage.setItem("gender",patient[i].gender);
				
			}
		var allergy_dtls=json.allergy;
		for(var allergy_data in allergy_dtls){
			var tr=
				"<tr><td>"+allergy_dtls[allergy_data].allergy_name+"</td>"+
				"<td>"+allergy_dtls[allergy_data].description+"</td></tr>";
			$('#allergy').append(tr);
		}
		var habit_dtls=json.habit_txn_dtls;
		for(var habit_data in habit_dtls){
			var tr=
				"<tr><td>"+habit_dtls[habit_data].habit_name+"</td>"+
				"<td>"+habit_dtls[habit_data].description+"</td></tr>";
			$('#habit').append(tr);
		}
		var immunization_dtls=json.immunization;
		for(var immunization_data in immunization_dtls){
			var tr=				
				"<tr><td>"+immunization_dtls[immunization_data].immunization_name+"</td>"+				
				"<td>"+immunization_dtls[immunization_data].dose_amount+"</td>"+
				"<td>"+immunization_dtls[immunization_data].dose_unit+"</td></tr>";
			$('#immunization').append(tr);
		}
		var past_dtls=json.pasthistory;
		for(var past_data in past_dtls){
			var tr=
				"<tr><td>"+past_dtls[past_data].medical_history+"</td>"+
				"<td>"+past_dtls[past_data].surgical_history+"</td>"+				
				"<td>"+past_dtls[past_data].medication_history+"</td></tr>";
			$('#past').append(tr);
		}
		var family_dtls=json.family;
		for(var family_data in family_dtls){
			var mother=family_dtls[family_data].mother;
			if(mother==0)
			{
				mother='no';
				}
			else
			{
				mother='yes';
			}
			var father=family_dtls[family_data].father;
			if(father==0)
			{
				father='no';
				}
			else
			{
				father='yes';
			}
			var brother=family_dtls[family_data].brother;			
			if(brother==0)
			{
				brother='no';
				}
			else
				{
				brother='yes';
				}
			var sister=family_dtls[family_data].sister;			
			if(sister==0)
			{
				sister='no';
				}
			else
				{
				sister='yes';
				}
			var paternal=family_dtls[family_data].paternal;			
			if(paternal==0)
			{
				paternal='no';
				}
			else
				{
				paternal='yes';
				}
			var maternal=family_dtls[family_data].maternal;			
			if(maternal==0)
			{
				maternal='no';
				}
			else
				{
				maternal='yes';
				}
			var tr=
				"<tr><td>"+family_dtls[family_data].disease_name+"</td>"+
				"<td>"+mother+"</td>"+
				"<td>"+father+"</td>"+
				"<td>"+brother+"</td>"+
				"<td>"+sister+"</td>"+
				"<td>"+paternal+"</td>"+
				"<td>"+maternal+"</td></tr>";
			$('#family').append(tr);
		}
		var complaint_dtls=json.complaint;
		for(var complaint_data in complaint_dtls){
			var tr=				
				"<tr><td>"+complaint_dtls[complaint_data].chief_complaint+"</td></tr>";
			$('#complaint').append(tr);
		}
		var sign_dtls=json.sign;
		for(var sign_data in sign_dtls){
			var tr=
				"<tr><td>"+sign_dtls[sign_data].sign_name+"</td>"+
				"<td>"+sign_dtls[sign_data].description+"</td></tr>";

			$('#sign').append(tr);
		}
		var symptom_dtls=json.symptom;
		for(var symptom_data in symptom_dtls){
			var tr=
				"<tr><td>"+symptom_dtls[symptom_data].symptom_name+"</td>"+
				"<td>"+symptom_dtls[symptom_data].description+"</td></tr>";
			$('#symptom').append(tr);
		}
		var exam_dtls=json.exam_txn_dtls;
		for(var exam_data in exam_dtls){
			var tr=
				"<tr><td>"+exam_dtls[exam_data].exam_type+"</td>"+
				"<td>"+exam_dtls[exam_data].exam_specific+"</td>"+
				"<td>"+exam_dtls[exam_data].status+"</td>"+
				"<td>"+exam_dtls[exam_data].description+"</td>"+
				"<td>"+exam_dtls[exam_data].exam_progress+"</td>"+
				"<td>"+exam_dtls[exam_data].exam_date+"</td></tr>";
			$('#exam').append(tr);
		}
		var diet_dtls=json.diet_details_txn_dtls;
		for(var diet_data in diet_dtls){
			var tr=				
				"<tr><td>"+diet_dtls[diet_data].diet_name+"</td></tr>";
			$('#diet').append(tr);
		}
		var drug_dtls=json.drug_details_txn_dtls;
		for(var drug_data in drug_dtls){
			var tr=
				"<tr><td>"+drug_dtls[drug_data].drug_name+"</td></tr>";
			$('#drug').append(tr);
		}
		var disease_dtls=json.diseasechild;
		for(var disease_data in disease_dtls){
			var tr=
				"<tr><td>"+disease_dtls[disease_data].disease_name+"</td></tr>";
			$('#disease').append(tr);
		}
		var test_dtls=json.test_details_txn_dtls;
		for(var test_data in test_dtls){
			var tr=
				"<tr><td>"+test_dtls[test_data].test_name+"</td></tr>";
			$('#test').append(tr);
		}
			}).fail(function(jqXHR, exception){
				error(jqXHR, exception);
			});
});
function error(jqXHR, exception) {
	var msg = '';
	if (jqXHR.status === 0) {
		msg = 'Not connected.\n Verify Your Network.';
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