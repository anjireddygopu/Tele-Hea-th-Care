var oTable;
var token = sessionStorage.getItem("token");
const headers = {'x-access-token':token};
var ipadd=sessionStorage.getItem("ip-add");
$(document).ready(function() {
	if (token) {
	} 
	ShowExam_dtls();
	$("#hupdate").hide();
});
function ShowExam_dtls() {
	var mrno=sessionStorage.getItem("mrno");
	var eid=sessionStorage.getItem("eid");
	var vid=sessionStorage.getItem("vid");
	$.ajax({
		"type": "GET",
		"url": "https://"+ipadd+":3000/api/v1/edit/"+mrno+"/"+eid+"/"+vid,
		"data": "",
		"dataSrc": "",
		"headers": headers,
		dataType: 'json'})
		.done (
				function(rdata) {
					document.getElementById("exam").reset();
					var txndata=rdata.physical_exam_txn;
					var data = rdata.physical_exam_txn_dtls;
					$("#notes").val(txndata.notes);
					sessionStorage.setItem("txn", txndata.id);
					sessionStorage.setItem("notes",txndata.notes);
					oTable = $('#edit').DataTable({
						"paging" : false,
						"searching" : false,
						"bInfo" : false,
						"language": {
							"zeroRecords": "No Records Found"
						},
						"dom": '<"toolbar">frtip',
						data: data,
						"columns": [
							{ "data": "exam_type" },
							{ "data": "exam_specific" },
							{ "data": "status" },
							{ "data": "description" },
							{
								"data": "exam_id",
								render: function (data, type, row) {
									return "<button type='button' id='" + row.exam_id + "'_edit' onclick='edit(" + row.exam_id + ")'><i class='fa fa-pencil-square-o btn-primary btn-sm' title='Edit' data-toggle='tooltip'></i></button>"
								}
							},
							{
								"data": "exam_id",
								render: function (data, type, row) {
									return "<button type='button' id='" + row.exam_id + "'_edit' onclick='delete_exam(" + row.exam_id + ")'><i class='fa fa-trash-o btn-primary btn-sm' title='Delete' data-toggle='tooltip'></i></button>"
								}
							}
							]
					})
				})
				.fail(function (jqXHR, exception) {
					error(jqXHR, exception);
				});
};
function edit(id){
	$("#hupdate").show();
	$("#hadd").hide();
	$('#edit tbody').on('click', 'tr',function(){
		var data = oTable.row(this).data();
		$("#type").val(data.exam_type);
		$("#specific").val(data.exam_specific);
		$("#status").val(data.status);
		$("#description").val(data.description);
		$("#progress").val(data.exam_progress);
		$("#date").val(data.exam_date);
		var notes=sessionStorage.getItem("notes");
		$("#notes").val(notes);
		sessionStorage.setItem("id",data.physical_exam_txn_id );
		sessionStorage.setItem("tid",data.exam_id );
	});
}
$('#hadd').click(function(){
	swal({  
		title:"",   
	   text: "Your Record Added Successfully !",   
	   timer: 2000,   
	   showConfirmButton: false 
   });
});
$('#hupdate').click(function(){
	swal({  
		title:"",   
	   text: "Your Record Updated Successfully !",   
	   timer: 2000,   
	   showConfirmButton: false 
   });
});
function update(){
	var postData = {};
	postData.notes = $("#notes").val();
	var tid=sessionStorage.getItem("tid");
	postData.tid = tid;
	var id=sessionStorage.getItem("id");
	postData.id= id;
	var recordsList = [];
	var datarecord = {};
	var exam_type=$("#type option:selected").val();
	datarecord.exam_type=exam_type;
	var tid=sessionStorage.getItem("tid");
	datarecord.exam_id = tid;
	var exam_specific=$("#specific option:selected").val();
	datarecord.exam_specific=exam_specific;
	var status=$("#status option:selected").val();
	datarecord.status=status;
	var description=$("#description").val();
	datarecord.description=description;
	var exam_progress=$("#progress").val();
	datarecord.exam_progress=exam_progress;
	var exam_date=$("#date").val();
	datarecord.exam_date=exam_date;
	var user = "kavya";
	datarecord.updated_by =user;
	var time=updatetime();
	datarecord.updated_on =time;
	recordsList.push(datarecord);
	postData.data = recordsList;
	var Data = JSON.stringify(postData);
	$.ajax({
		url : "https://"+ipadd+":3000/api/v1/edit/update",
		type : "PUT",
		data : Data,
		contentType : "application/json", 
		dataType : "json",
		headers : headers,
		processdata : true})
		.done(function (response) {
			reload_table();
			document.getElementById("exam").reset();
			
			$("#hupdate").hide();
			$("#hadd").show();					
		})
		.fail(function (jqXHR, exception) {
			error(jqXHR, exception);
		});
}
function updatetime()
{
	var today = new Date();
	var date = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
	var time = today.getHours() +":"+ today.getMinutes()+":"+ today.getSeconds();
	var time=date+" "+time;
	return time;
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
function reload_table(){
	$('#edit').dataTable().fnClearTable();
	$('#edit').dataTable().fnDestroy();
	ShowExam_dtls();
}
function delete_exam(id){
	$.ajax({
		url : "https://"+ipadd+":3000/api/v1/delete/"+id,
		type : "Delete",
		data : "",
		contentType : "application/json", 
		dataType : "json",
		headers : headers,
		processdata : true})
		.done(function (response) {
			reload_table();
		})
		.fail(function (jqXHR, exception) {
			error(jqXHR, exception);
		});
}
function post() {
	var notes=$("#notes").val();
	var exam_type=$("#type option:selected").val();
	var exam_specific=$("#specific option:selected").val();
	var status=$("#status option:selected").val();
	var description=$("#description").val();
	var exam_progress=$("#progress option:selected").val();
	var exam_date=$("#date").val();
	var id=sessionStorage.getItem("txn");
	var created="kavya";
	var datadtls={"notes":notes,"id":id,"exam_type":exam_type,"exam_specific":exam_specific,"status":status,"description":description,"exam_progress":exam_progress,"exam_date":exam_date,"physical_exam_txn_id":id,"created_by":created,"updated_by":created};
	var tid = sessionStorage.getItem("txn");
	var mrno=sessionStorage.getItem("mrno");
	var eid=sessionStorage.getItem("eid");
	var vid=sessionStorage.getItem("vid");
	var Data={"medical_record_no":mrno,"episode_id":eid,"visit_id":vid,"notes":notes,datadtls};
	if(tid=="undefined"){
		if (description=="") {
			$.ajax({
				url : "https://"+ipadd+":3000/api/v1/edit-create",
				type : "PUT",
				data : JSON.stringify(Data), 
				contentType : "application/json", 
				dataType : "json",
				headers : headers,
				processdata : true
			})
			.done(function (response) {
				reload_table();
				$("#description").val('');

			})
			.fail(function (jqXHR, exception) {
				error(jqXHR,exception);
			});
		}else{
			$.ajax({
				url : "https://"+ipadd+":3000/api/v1/edit-txn/table",
				type : "POST",
				data : JSON.stringify(Data),
				contentType : "application/json",
				dataType : "json",
				headers : headers,
				processdata : true
			}).done(function(response) {
				reload_table();
				$("#description").val('');
			}).fail(function(jqXHR, exception) {
				error(jqXHR, exception);
			});
		}
	}
	else{		
		$.ajax({
			url : "https://"+ipadd+":3000/api/v1/edit/",
			type : "POST",
			data : JSON.stringify(datadtls),
			contentType : "application/json",
			dataType : "json",
			headers : headers,
			processdata : true
		}).done(function(response) {
			reload_table();
			$("#description").val('');
		}).fail(function(jqXHR, exception) {
			error(jqXHR, exception);
		});
	}
}
