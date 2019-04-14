token="eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MzIxMDUyMzEzOTV9.xtTk4NBfbI-7LXWr8v2-D2hpCwGMSqPb0zvHgRM2uJ0";
function error(jqXHR,exception) {
    var msg = '';
    if (jqXHR.status === 0) {
        msg = 'Not connect.\n Verify Network.';
    } else if (jqXHR.status === 404) {
        msg = 'Requested page not found. [404]';
    } else if (jqXHR.status === 500) {
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
$(function(){
  $.ajax({
         type:"GET",
         headers: {'x-access-token':token},
         url:"http://127.0.0.1:3000/api/v1/immunization",
         data:""}).done(function(json) 
         	{ 
        	 	var results=JSON.parse(json);
        	 	
        	 		$.each(results, function(index, item)
        	 				{
        	 				$("#immunization").append("<option value="+item.immunization_id+">" + item.immunization_name + "</option>");
        	 				}); 
         	}).fail(function(jqXHR,exception) 
         	{ 
         		error(jqXHR,exception);
         	})
});
function post() {
	var tableLength = $('#example23 tr').length - 1;
	var postData ={};
	postData.MRNo =1001;
	postData.notes=$("#notes").val();
	postData.created_by="anji";
	postData.created_on=new Date();
	var recordsList =[];
	for (var i = 0; i < tableLength; i++) {
		var datarecord={};
		var i_id = oTable.cell(i, 0).data();
	    datarecord.immunization_id=i_id;
		var i_date = oTable.cell(i, 2).data();
		datarecord.immunization_date=i_date;
		var i_route = oTable.cell(i, 3).data();
		datarecord.immunization_route=i_route;
		var i_site = oTable.cell(i, 4).data();
		datarecord.administration_site=i_site;
		var d_amount = oTable.cell(i, 5).data();
		datarecord.dose_amount=d_amount;
		var d_unit = oTable.cell(i, 6).data();
		datarecord.dose_unit=d_unit;
		var d_form = oTable.cell(i, 7).data();
		datarecord.dose_form=d_form;
		var user = "anji";
		datarecord.created_by=user;
		var dNow = new Date();
		var localdate = dNow.getDate() + "" + (dNow.getMonth() + 1) + ""
				+ dNow.getFullYear() + "" + dNow.getHours();
		datarecord.created_on=localdate;
		recordsList.push(datarecord);
	}
   postData.data =recordsList;
	$(function() {
		$.ajax({
					type : "post",
					headers : {
						'x-access-token' :token
					},
					url : "http://localhost:3000/api/v1/patient_immunization_txn_dtls/",
					dataType : "json",
					data : JSON.stringify(postData),
					contentType : "application/json"})
					.done(function(json) {
						location.assign("patient-Immunization-txn-dtls.html");
					}).fail(function(jqXHR,exception) {
						error(jqXHR,exception);
					
				})
	}); 
}