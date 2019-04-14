var tblDisease;
var token=sessionStorage.getItem("token");
var ipadd=sessionStorage.getItem("ip-add");
var headers = {
	'x-access-token' : token
};

function showDiseasesList() {
	var mrno=sessionStorage.getItem("mrno");
	var eid=sessionStorage.getItem("eid");
	var vid=sessionStorage.getItem("vid");
    $.ajax({
       "type": "GET",
       "url": "https://"+ipadd+":3000/api/v1/diagnosis/"+mrno+"/"+eid+"/"+vid,
       "data": "",
       "dataSrc": "",
       "headers": headers,
       dataType: 'json'
    })
       .done(function (data) {
       
    	   tblDisease=$('#disease_list').DataTable({
    		   bSort:false,
               "language": {
                   "zeroRecords": "No Records Found"
               },
               "dom": '<"toolbar">frtip',
               data: data,
               "columns": [
               { "data": "disease_id" },
               { "data": "disease_name" }
            ]
         });
         $("#note").val(data[0].notes);
       })//done end
       .fail(function(jqXHR, exception) {
       	   failure(jqXHR, exception)
       })//fail end   
}
showDiseasesList();

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
