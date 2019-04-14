var oTable;
var tokenKey = sessionStorage.getItem("token");
var token = sessionStorage.getItem(tokenKey);
var headers = {
	'x-access-token' : tokenKey
};
var ipadd=sessionStorage.getItem("ip-add");
$(document).ready(function() {
	$("#savebtn").hide();
	datatable();
});
$(function() {
	sessionStorage.setItem("id", null);
	$.ajax({
		type : "GET",
		headers : headers,
		url : "https://"+ipadd+":3000/api/v1/edit-signs",
		data : "",
	}).done(
			function(data) {
				var result = JSON.parse(data);
				
				$.each(result, function(index, item) {
					$("#ename").append(
							"<option value=" + item.id + ">" + item.sign_name
									+ "</option>");
				});
			}).fail(function(jqXHR, exception) {
		msg(jqXHR, exception);
	});

});

function datatable(){
	var mrno=sessionStorage.getItem("mrno");
	var epno=sessionStorage.getItem("eid");
	var vid=sessionStorage.getItem("vid");
	
	$.ajax({
				"type" : "GET",
				"url" :"https://"+ipadd+":3000/api/v1/edit-signs/"+mrno+"/"+epno+"/"+vid,
				"data" : "",
				"dataSrc" : "",
				"headers" : headers,
				dataType : 'json',
			})
			.done(
					
					function(rdata) {
						var txndata=rdata.sign_txn;
						var data = rdata.sign_txn_dtls;
						sessionStorage.setItem("txn", txndata.id);
						sessionStorage.setItem("notes",txndata.additional_notes);
						$("#notes").val(txndata.additional_notes);
						oTable = $('#signs')
								.DataTable(
										{
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
														"data":"sign_id","data" : "sign_name"
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
															return "<button id='"+row.id+ "'_edit' onclick='remove(this.id)'><i class='fa fa-trash-o btn-primary btn-sm' title='Delete' data-toggle='tooltip'></i></button>"

														}
													}

											]
										});
					}).fail(function(jqXHR, exception) {
				msg(jqXHR, exception);
			});
	$("#ename").on('change',function(e){
		var sign = $("#ename option:selected").val();
		var data = oTable.data();
		for(var i=0;i<data.length;i++){
			if(data[i].sign_id == sign){
				alert("already added....!");
			}
		}
	});

}
function Edit(id) {
	$("#addbtn").hide();
	$("#savebtn").show();
	$('#signs tbody').on('click', 'tr', function() {
		var data = oTable.row(this).data();
		$("#ename").val(data.sign_id);
		$("#description").val(data.description);
		var notes=sessionStorage.getItem("notes");
		$("#notes").val(notes);
		sessionStorage.setItem("tid", data.sign_txn_id);
		sessionStorage.setItem("id", data.id);
		
	});

}
function update() {
	var postData = {};
	postData.Notes = $("#notes").val();
	var tid = sessionStorage.getItem("tid");
	postData.tid = tid;
	var id = sessionStorage.getItem("id");
	postData.id = id;
	var recordsList = [];
	var datarecord = {};
	var signs = $("#ename option:selected").val();
	datarecord.sign_id = signs;
	var tid = sessionStorage.getItem("tid");
	datarecord.sign_txn_id = tid;
	var desc = $("#description").val();
	datarecord.description = desc;
	var created = "aravind";
	datarecord.updated_by = created;
	var date = new Date();
	datarecord.updated_on = date;
	recordsList.push(datarecord);
	postData.data = recordsList;
	var Data = JSON.stringify(postData);
	$.ajax({
		url : "https://"+ipadd+":3000/api/v1/edit-signs-up/:id",
		type : "PUT",
		data : Data,
		contentType :"application/json",
		dataType : "json",
		headers : headers,
		processdata : true,
	}).done(function(response) {
		table();
		display();
		$("#savebtn").hide();
		$("#addbtn").show();
		$("#description").val('');
		$("#notes").val('');
	}).fail(function(jqXHR, exception) {
		msg(jqXHR, exception);
	});
}

function remove(id){
	var data1 = {
			"id" : id
		};
	$.ajax({
	url : "https://"+ipadd+":3000/api/v1/edit-signs-delete/"+id,
	type : "DELETE",
	data : "",
	contentType :"application/json", 
	dataType : "json",
	headers : headers,
	processdata : true,
	})
	.done(function (response) {
		$("#description").val('');
		$("#ename").prop("selectedIndex", 0);
	table();
	})
	.fail(function (jqXHR, exception) {
	msg(jqXHR, exception);
	})
	}
function post() {
	var sign= $("#ename option:selected").val();
	var desc = $("#description").val();
	var notes = $("#notes").val();
	var id = sessionStorage.getItem("txn");
	var date = new Date();
	var update = "aravind";
	var datadtls = {
			"additional_notes" : notes,
			"id" : id,
			"sign_txn_id" : id,
			"sign_id" : sign,
			"description" : desc,
			"updated_by" : update,
			"updated_on" : date
	};
	var tid = sessionStorage.getItem("txn");
	var mrno=sessionStorage.getItem("mrno");
	var eid=sessionStorage.getItem("eid");
	var vid=sessionStorage.getItem("vid");
	var notes=$("#notes").val();
	var Data={"medical_record_no":mrno,"episode_id":eid,"visit_id":vid,"additional_notes":notes,datadtls};
	if(tid=="undefined"){
		if (desc=="") {
			$.ajax({
				url : "https://"+ipadd+":3000/api/v1/edit-signs-create/:id",
				type : "PUT",
				data : JSON.stringify(Data),
				contentType : "application/json",
				dataType : "json",
				headers : headers,
				processdata : true,
			}).done(function(response) {
				table();
				display();
				$("#savebtn").hide();
			}).fail(function(jqXHR, exception) {
				msg(jqXHR, exception);
			});
		}else{
		$.ajax({
			url : "https://"+ipadd+":3000/api/v1/edit-signs-txn/data",
			type : "POST",
			data :JSON.stringify(Data),
			contentType : "application/json",
			dataType : "json",
			headers : headers,
			processdata : true,
		}).done(function(response) {
			table();
			display();
			$("#description").val('');
			$("#ename").prop("selectedIndex", 0);
		}).fail(function(jqXHR, exception) {
			msg(jqXHR, exception);
		});
		}
	}else{
	$.ajax({
		url : "https://"+ipadd+":3000/api/v1/edit-signs-add",
		type : "POST",
		data : JSON.stringify(datadtls),
		contentType : "application/json",
		dataType : "json",
		headers : headers,
		processdata : true,
	}).done(function(response) {
		table();
		display();
		$("#description").val('');
		$("#ename").prop("selectedIndex", 0);
	}).fail(function(jqXHR, exception) {
		msg(jqXHR, exception);
	});
	}
}
$('#addbtn').click(function(){
	swal({  
		title:"",   
	   text: "Your Record Added Successfully !",   
	   timer: 2000,   
	   showConfirmButton: false 
   });
});
$('#savebtn').click(function(){
	swal({  
		title:"",   
	   text: "Your Record Updated Successfully !",   
	   timer: 2000,   
	   showConfirmButton: false 
   });
});

function msg(jqXHR, exception) {
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


function table() {
	$('#signs').dataTable().fnClearTable();
	$('#signs').dataTable().fnDestroy();
	datatable();
}
function display() {
	$("#add").hide();
	$("#list").show();
	$("#edit").show();
}
function cancel() {
	$("#addbtn").show();
	$("#update").hide();
	table();
	$("#desc").val('');
	$("#ename").prop("selectedIndex", 0);
}


