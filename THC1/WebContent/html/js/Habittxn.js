var tokenKey = sessionStorage.getItem("token");
var headers = {
	'x-access-token' : tokenKey,
	'x-key' : 'arvind'
};
var oTable;
var ipadd=sessionStorage.getItem("ip-add");
$(document).ready(function() {
	$("#update").hide();
	datatable();
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
function datatable() {
	
	var mrno=sessionStorage.getItem("mrno");
	$.ajax({
				"type" : "GET",
				"url" : "https://"+ipadd+":3000/api/v1/habitstxn-txn/"+mrno,
				"data" : "",
				"dataSrc" : "",
				"headers" : headers,
				dataType : 'json',
			})
			.done(function(rdata) {
						var txndata=rdata.habits_txn;
						var data = rdata.habits_txn_dtls;
						sessionStorage.setItem("txn", txndata.id);
						sessionStorage.setItem("notes",txndata.additional_notes);
						$("#eTextarea2").val(txndata.additional_notes);
						oTable = $('#editTable')
								.DataTable(
										{
											"searching" : false,
											"paging" : false,
											"bInfo" : false,
											"ordering" : false,
											"language" : {
												"zeroRecords" : "No Records Found"
											},

											"dom" : '<"toolbar">frtip',

											data : data,
											"columns" : [

													{
														"data" : "id"
													},
													{
														"data":"habit_id","data" : "habit_name"
													},
													{
														"data" : "description"
													},
													{
														"data" : "Id",
														render : function(data,
																type, row) {
															return "<button id='"+ row.id+ "'_edit' onclick='Edit(this.id)'><i class='fa fa-pencil-square-o btn-primary btn-sm' title='Edit' data-toggle='tooltip'></i></button>";
														}
													},
													{
														"data" : "Id",
														render : function(data,
																type, row) {
															return "<button class='row' id='" + row.id + "'_edit' onclick='delet(this.id)'><i class='fa fa-trash-o btn-primary btn-sm' title='Delete' data-toggle='tooltip'></i></button>";
														}
													}

											]
										});
					}).fail(function(jqXHR, exception) {
				msg(jqXHR, exception);
			});
	$("#ename").on('change',function(e){
		var habit = $("#ename option:selected").val();
		var data = oTable.data();
		for(var i=0;i<data.length;i++){
			if(data[i].habit_id == habit){
				alert("Alredy added.Please add new habit....!");
			}
		}
	});

}
$(function() {
	sessionStorage.setItem("id", null);
	$.ajax({
		type : "GET",
		headers : headers,
		url : "https://"+ipadd+":3000/api/v1/habitstxn",
		data : "",
	}).done(
			function(response) {
				var result = JSON.parse(response);
				$.each(result, function(index, item) {
					$("#ename").append(
							"<option value=" + item.habit_id + ">" + item.habit_name
									+ "</option>");
				});
			}).fail(function(jqXHR, exception) {
		msg(jqXHR, exception);
	});
});

function Edit(id) {
	$("#save").hide();
	$("#update").show();
	$('#editTable tbody').on('click', 'tr', function() {
		data = oTable.row(this).data();
		$("#desc").val(data.description);
		$("#ename").val(data.habit_id);
		sessionStorage.setItem("tid", data.habit_txn_id);
		sessionStorage.setItem("id", data.id);
		var notes = sessionStorage.getItem("notes");
		$("#eTextarea2").val(notes);
	});
}

function update() {
	var postData = {};
	postData.Notes = $("#eTextarea2").val();
	var tid = sessionStorage.getItem("tid");
	postData.tid = tid;
	var id = sessionStorage.getItem("id");
	postData.id = id;
	var recordsList = [];
	var datarecord = {};
	var habit = $("#ename option:selected").val();
	datarecord.habit_id = habit;
	var tid = sessionStorage.getItem("tid");
	datarecord.habit_txn_id = tid;
	var desc = $("#desc").val();
	datarecord.description = desc;
	var created = "arvind";
	datarecord.updated_by = created;
	var date = new Date();
	datarecord.updated_on = date;
	recordsList.push(datarecord);
	postData.data = recordsList;
	var Data = JSON.stringify(postData);
	$.ajax({
		url : "https://"+ipadd+":3000/api/v1/habitstxn/:id",
		type : "PUT",
		data : Data,
		contentType : "application/json",
		dataType : "json",
		headers : headers,
		processdata : true,
	}).done(function(response) {
		display();
		table();
		$("#update").hide();
		$("#save").show();
		$("#desc").val('');
		$("#ename").prop("selectedIndex", 0);
	}).fail(function(jqXHR, exception) {
		msg(jqXHR, exception);
	});
}

function post() {
	var habit = $("#ename option:selected").val();
	var desc = $("#desc").val();
	var notes = $("#eTextarea2").val();
	var id = sessionStorage.getItem("txn");
	var date = new Date();
	var update = "Dileep";
	var datadtls = {
		"additional_notes" : notes,
		"id" : id,
		"habit_txn_id" : id,
		"habit_id" : habit,
		"description" : desc,
		"updated_by" : update,
		"updated_on" : date
	};
	var tid = sessionStorage.getItem("txn");
	var mrno=sessionStorage.getItem("mrno");
	var notes=$("#eTextarea2").val();
	var Data={"mediacl_record_no":mrno,"additional_notes":notes,datadtls};
	if(tid=="undefined"){
		if (desc=="") {
			$.ajax({
				url : "https://"+ipadd+":3000/api/v1/habitstxn-create/:id",
				type : "PUT",
				data : JSON.stringify(Data),
				contentType : "application/json",
				dataType : "json",
				headers : headers,
				processdata : true,
			}).done(function(response) {
				display();
				table();
				$("#update").hide();
			}).fail(function(jqXHR, exception) {
				msg(jqXHR, exception);
			});
		}else{
		$.ajax({
			url : "https://"+ipadd+":3000/api/v1/habitstxn-txn/table",
			type : "POST",
			data :JSON.stringify(Data),
			contentType : "application/json",
			dataType : "json",
			headers : headers,
			processdata : true,
		}).done(function(response) {
			table();
			$("#desc").val('');
			$("#ename").prop("selectedIndex", 0);
		}).fail(function(jqXHR, exception) {
			msg(jqXHR, exception);
		});
		}
	}else{
	$.ajax({
		url : "https://"+ipadd+":3000/api/v1/habitstxn-dtls-add",
		type : "POST",
		data : JSON.stringify(datadtls),
		contentType : "application/json",
		dataType : "json",
		headers : headers,
		processdata : true,
	}).done(function(response) {
		display();
		table();
		$("#desc").val('');
		$("#ename").prop("selectedIndex", 0);
	}).fail(function(jqXHR, exception) {
		msg(jqXHR, exception);
	});
	}
}

function delet(id) {
	var data1 = {
		"id" : id
	};
	$.ajax({
		url : "https://"+ipadd+":3000/api/v1/habitstxn-delete/:id",
		type : "DELETE",
		data : JSON.stringify(data1),
		contentType : "application/json",
		dataType : "json",
		headers : headers,
		processdata : true,
	}).done(function(response) {
		display();
		table();
		$("#desc").val('');
		$("#ename").prop("selectedIndex", 0);
	}).fail(function(jqXHR, exception) {
		msg(jqXHR, exception);
	});
}

function msg(jqXHR, exception) {
	var msg = '';
	if (jqXHR.status === 0) {
		msg = 'Server is not connect.\nVerify Network.';
	} else if (jqXHR.status == 400) {
		msg = 'Requested page not found. [400]';
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
function table() {
	$('#editTable').dataTable().fnClearTable();
	$('#editTable').dataTable().fnDestroy();
	datatable();
}
function display() {
	$("#add").hide();
	$("#list").show();
	$("#edit").show();
}
function cancel() {
	$("#save").show();
	$("#update").hide();
	table();
	$("#desc").val('');
	$("#ename").prop("selectedIndex", 0);
}
