var token = sessionStorage.getItem("token");
var headers = {'x-access-token':token,'x-key':"kavya"};
var ipadd=sessionStorage.getItem("ip-add");
var oTable;
$(document).ready(function() {
	showDrugs();
	
});
$('#save').click(function(){
	swal({  
		title:"",   
	   text: "Your Record Added Successfully !",   
	   timer: 2000,   
	   showConfirmButton: false 
   });
});
$('#update').click(function(){
	swal({  
		title:"",   
	   text: "Your Record Updated Successfully !",   
	   timer: 2000,   
	   showConfirmButton: false 
   });
});
function showDrugs() {
	$.ajax({
		"type": "GET",
		"url": "https://"+ipadd+":3000/api/v1/drug",
		"data": "",
		"dataSrc": "",
		"headers": headers,
		dataType: 'json',
		async:false,})
		.done(function (data) {
			oTable = $('#drug').DataTable({

				"language": {
					"zeroRecords": "No Records Found"
				},
				"dom": '<"toolbar">frtip',
				data: data,
				"columns": [

					{ "data": "drug_id" },
					{ "data": "drug_name" },
					{
						"data": "active",
						render: function (data, type, row) {
							if (data == true) {
								return "<input type='checkbox' id='" + row.drug_id + "_active' checked='checked'/>"
							} else {
								return "<input type='checkbox' id='" + row.drug_id + "_active'/>"
							};
						}
					},
					{
						"data": "drug_id", sortable: false,
						render: function (data, type, row) {

							return "<button id='" + row.drug_id + "_edit' onclick='Edit(" + row.drug_id + ")'><i class='fa fa-pencil-square-o btn-primary btn-sm' title='Edit' data-toggle='tooltip'></i></button>"

						}
					}

					]
			});


		})
		.fail(function (jqXHR, exception) {
			error(jqXHR, exception);
		})

};
function reload_table(){
	$('#drug').dataTable().fnClearTable();
	$('#drug').dataTable().fnDestroy();
	showDrugs();
}
function display(){
	$('#addbtn').show();
	$('#listdiv').show();
	$('#editdiv').hide();
	$('#adddiv').hide();
}
function myfunction(){
	var name=$("#drug_name").val();
	var ch=$('#test').is(':checked') ? 1 : 0;
	var created="kavya";
	var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	month = (month < 10 ? "0" : "") + month;
	var day  = date.getDate();
	day = (day < 10 ? "0" : "") + day;
	var cid=(day+""+month+""+year);
	var postData=JSON.stringify({ "drug_name":name,"created_by":created,"active":ch,"created_on":cid})
	$.ajax({
		url:"https://"+ipadd+":3000/api/v1/drug/",
		type:"POST",
		data: postData ,
		contentType: "application/json" ,	
		dataType: "text" ,
		headers: headers,
		processdata: true ,})

		.done(function (response) { 
			document.getElementById("commentForm").reset();
			display();
			 reload_table();
		})
		.fail(function (jqXHR, exception) {
			error(jqXHR, exception);
		})
		
}
function Edit(id){
	$("#addbtn").hide();
	sessionStorage.setItem("id",id);
	var id=sessionStorage.getItem("id");
	$(function(){ 
		if(!(id==null)){
			$.ajax({
				type:"GET",
				headers: headers,
				url:"https://"+ipadd+":3000/api/v1/drug/"+id,
				data:"",})
				.done(function (response) {
					var data=JSON.parse(response);
					$.each(data,function(key,obj){
						$("#drug_name1").val(obj.drug_name);

						var ac=obj.active;
						if(ac==1){
							$("#checkbox-16").prop('checked', true);
						}else{
							$("#checkbox-16").prop('checked', false);
						}
						$("#listdiv").hide();
						$("#editdiv").show();

					});
				}).fail(function (jqXHR, exception) {
					error(jqXHR, exception);
				})
		}

	});
}

function update(){
	var id=sessionStorage.getItem("id");

	var name=$("#drug_name1").val();

	var ch=$("#checkbox-16").is(':checked')?1:0;
	var user="kavya";

	var postData=JSON.stringify({ "drug_id":id,"drug_name":name,"active":ch,"updated_by":user })

	$.ajax({
		url:"https://"+ipadd+":3000/api/v1/drug/update",
		type:"PUT",
		data: postData , //Data sent to server
		contentType: "application/json" ,	// content type sent to server
		dataType: "text" ,
		headers:  headers,
		processdata: true ,
	})
	.done(function (response) {
	
		display(); 
		reload_table();
	})
	.fail(function (jqXHR, exception) {
		error(jqXHR, exception);
	})
	
}
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

