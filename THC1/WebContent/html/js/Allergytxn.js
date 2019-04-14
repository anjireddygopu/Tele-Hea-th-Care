var oTable;
var tokenKey = sessionStorage.getItem("token");
var headers = {
	'x-access-token' : tokenKey
};
var ipadd=sessionStorage.getItem("ip-add");
$(document).ready(function() { 
	    $("#update").hide();
	  
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

    var headers = {
	'x-access-token' : tokenKey,
	'x-key' : 'arvind'
   }; 
 $(function() {
	sessionStorage.setItem("id",null);
	$.ajax({
	type : "GET",
	headers : headers,
	url : "https://"+ipadd+":3000/api/v1/allergystxn",
	data : ""
	})
	.done(function(response) {
	var result = JSON.parse(response);
	$("#ename").empty();
	$("#ename").append("<option value=> Select </option>");
	$.each(result, function(index, item) {
	$("#ename").append("<option value=" + item.allergy_id + ">" + item.allergy_name + "</option>");
	});
	})
	.fail(function(jqXHR, exception) {
		error(jqXHR, exception);
	} )
   });
 

function ShowAllergys() {
	var mrno=sessionStorage.getItem("mrno");
	$.ajax({
				"type" : "GET",
				"url" : "https://"+ipadd+":3000/api/v1/allergystxn-txn/"+mrno,
				"data" : "",
				"dataSrc": "",
				"headers": headers,
				dataType : 'json'
			})
			.done(function(rowdata) {
			var txndata=rowdata.allergys_txn;
			var data = rowdata.allergys_txn_dtls;
			sessionStorage.setItem("notes",txndata.additional_notes);
			sessionStorage.setItem("txn",txndata.id);
			 oTable = $('#allergys').DataTable(
									      { "searching" : false,
												"paging" : false,
												"bInfo" : false,
												"ordering" : false,
									      "language" : 
									       {
											"zeroRecords" : "No Records Found"
										   },
											"dom" : '<"toolbar">frtip',
											data : data,
											"columns" : [

													{
														"data" : "id"
													},
													{
														"data":"allergys_id","data" : "allergy_name"
													},
													
													{
														"data" : "description"
													},
													
													

													{
														"data" : "Id",
														render : function(data,
														type, row) {
														return "<button id='"
																	+ row.id
																	+ "'_edit' onclick='Edit(this.id)'><i class='fa fa-pencil-square-o btn-primary btn-sm' title='Edit' data-toggle='tooltip'></i></button>"
													}
													},
													 {
															"data" : "Id",
															render : function(data,
															type, row) {
															return "<button id='"
																		+ row.id
																		+ "'_Delet' onclick='delet(this.id)'><i class='fa fa-trash-o btn-primary btn-sm' title='Delete' data-toggle='tooltip'></i></button>"
																		

													  },
														
														
														
													}

											]
										});

					}).fail(function(jqXHR, exception) {
				     msg(jqXHR, exception);
			});
	  $("#ename").on('change',function(e){
			var allergy = $("#ename option:selected").val();
			
			var data = oTable.data();
			for(var i=0;i<data.length;i++){
			
				if(data[i].allergys_id == allergy){
					alert("Alredy added.Please add new allergy....!");
				}
			}
		});
};
ShowAllergys();
function Edit(id) {
	$("#save").hide();
    $("#update").show();
	$('#allergys tbody').on('click', 'tr', function() {
	var data = oTable.row(this).data();
	$("#ename").val(data.allergys_id);
	$("#description").val(data.description);
	var notes=sessionStorage.getItem("notes");
	$("#notes").val(notes);
	sessionStorage.setItem("tid", data.allergys_txn_id);
	sessionStorage.setItem("id", data.id);
	});

}
function update() {
	var postData = {};
	postData.Notes = $("#notes").val();
	var tid = sessionStorage.getItem("txn");
	postData.tid = tid;
	var id = sessionStorage.getItem("id");
	postData.id = id;
	var recordsList = [];
	var datarecord = {};
	var tid = sessionStorage.getItem("tid");
	datarecord.allergys_txn_id = tid;
	var allergys = $("#ename").val();
	datarecord.allergys_id = allergys;
	var desc = $("#description").val();
	datarecord.description = desc;
	var created = "user";
	datarecord.updated_by = created;
	var date = new Date();
	datarecord.updated_on = date;
	recordsList.push(datarecord);
	postData.data = recordsList;
	var Data = JSON.stringify(postData);
	$(function() {
		$.ajax({
			url : "https://"+ipadd+":3000/api/v1/allergystxn/update",
			type : "PUT",
			data : Data,
			contentType :"application/json",
			dataType : "json",
			headers : headers,
			processdata : true
		}).done(function(data, textStatus, jqXHR) {
			table();
            document.getElementById("form1").reset();
            display();
		}).fail(function(jqXHR, exception) {
			msg(jqXHR, exception);
		})
	});

}

function post() {
	 var allergys=$("#ename option:selected").val();
	 var desc = $("#description").val();
	 var notes = $("#notes").val();
	 var id=sessionStorage.getItem("txn");
	 var mrno=sessionStorage.getItem("mrno");
	 var date=new Date();
	 var update="user";
	 var dtls={"additional_notes":notes,"allergys_txn_id":id,"allergys_id":allergys,"description":desc,"updated_by":update,"updated_on":date};	 
     var tid = sessionStorage.getItem("txn");
     var notes = $("#notes").val();
	 var Data={"medical_record_no":mrno,"additional_notes":notes,dtls};
	 if(tid=="undefined"){
		 if (desc=="") {
				$.ajax({
					url : "https://"+ipadd+":3000/api/v1/allergystxn-createOneDtls",
					type : "POST",
					data : JSON.stringify(Data),
					contentType : "application/json",
					dataType : "json",
					headers : headers,
					processdata : true,
				}).done(function(response) {
					document.getElementById("form1").reset();
					display();
					table();
					$("#update").hide();
				}).fail(function(jqXHR, exception) {
					msg(jqXHR, exception);
				});
			}else{
			$.ajax({
				url : "https://"+ipadd+":3000/api/v1/allergystxn-createDtls/:id",
				type : "POST",
				data :JSON.stringify(Data),
				contentType : "application/json",
				dataType : "json",
				headers : headers,
				processdata : true,
			}).done(function(response) {
				table();
				display();
			       document.getElementById("form1").reset();
				$("#description").val('');
			}).fail(function(jqXHR, exception) {
				msg(jqXHR, exception);
			});
			}
		}else{
		$.ajax({
			url : "https://"+ipadd+":3000/api/v1/allergystxn-dtls-add",
			type : "POST",
			data : JSON.stringify(dtls),
			contentType : "application/json",
			dataType : "json",
			headers : headers,
			processdata : true,
		}).done(function(response) {
			document.getElementById("form1").reset();
			display();
			table();
			$("#description").val('');
		}).fail(function(jqXHR, exception) {
			msg(jqXHR, exception);
		});
		}
	}
		 

			

function delet(id) {
	var data1={"id":id};
	 $.ajax({
			url : "https://"+ipadd+":3000/api/v1/allergystxn/:id",
			type : "DELETE",
			data:JSON.stringify(data1),
			contentType : "application/json", 
			dataType : "json",
			headers : headers,
			processdata : true,
		}).done(function (response) {
			document.getElementById("form1").reset();
			table();
			display();
		}).fail(function (jqXHR, exception) {
			msg(jqXHR,exception);
		 	});
}
function msg(jqXHR, exception){
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
function table(){
	$('#allergys').dataTable().fnClearTable();
	$('#allergys').dataTable().fnDestroy();
	ShowAllergys();
	}
function display(){
		$("#update").hide();
		$("#list").show();
		$("#edit").show();
		$("#save").show();
	}
function cancel(){
	table();
	 display();
	 document.getElementById("form1").reset();
}