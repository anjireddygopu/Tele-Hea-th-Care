var tokenKey = sessionStorage.getItem("token");
var headers = {
	'x-access-token' : tokenKey
};
var oTable;
$(document).ready(function() {
	ShowCountries();
});
$('#savebtn').click(function(){
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
var ipadd=sessionStorage.getItem("ip-add");
function ShowCountries() {
	$.ajax({
			"type" : "GET",
			"url" : "https://"+ipadd+":3000/api/v1/nationality",
			"data" : "",
			"dataSrc" : "",
			"headers" : headers,
			"dataType" : 'json'
			})
	.done(function(data) {
			oTable = $('#example23').DataTable({
			"" : {
			"zeroRecords" : "No Records Found"
			},
			"dom" : '<"toolbar">frtip',
			data : data,
			"columns" : [
			{
			"data" : "nationality_id"
			},
			{
			"data" : "nationality_name"
			},
			{
			"data" : "active",
			render : function(data,type,row) {
				if (data == true) {
				return "<input type='checkbox' id='"+ row.nationality_id+ "_active' checked='checked'/>";
				} else {
				return "<input type='checkbox' id='"+ row.nationality_id+ "_active'/>";
				}
				}
			 },
			 {
			 "data" : "Id",
			 render : function(data,type,row) {
				return "<button id='"+ row.nationality_id+ "'_edit' onclick='edit(this.id)'><i class='fa fa-pencil-square-o btn-primary btn-sm' title='Edit' data-toggle='tooltip'></i></button>";
				}
				} ]
				});
				})
		.fail(function (jqXHR, exception) {
			errormessage(jqXHR, exception);   
			       	})				
}
	

function edit(id) {
	$("#addbtn").hide();
	sessionStorage.setItem("id", id)
	var id = sessionStorage.getItem("id");
	if (!(id == null)) {
		$.ajax({
			type : "GET",
			headers : headers,
			url : "https://"+ipadd+":3000/api/v1/nationality/" + id,
			data : ""
			})
		.done(function(json) {
				var data = JSON.parse(json);
				$.each(data, function(key, obj) {
					$("#nation").val(obj.nationality_name);
					$("#checkbox-15").val(obj.active);
					var ac = obj.active;
					if (ac == 1) {
						$("#checkbox-15").prop('checked', true);
					} else {
						$("#checkbox-15").prop('checked', false);
					}
				});
			})
		.fail(function(jqXHR, exception){
			errormessage(jqXHR, exception);})
	}
	$('#listdiv').hide();
	$('#adddiv').hide();
	$('#editdiv').show();
}
function update() {
	var datee = new Date();
	var date = (datee.getFullYear() + '/' + (datee.getMonth() + 1) + '/' + datee.getDate()
			+ ' T:' + datee.getHours() + ':' + datee.getMinutes() + ':' + datee
			.getSeconds());
	var id = sessionStorage.getItem("id");
	var nationalityname = $("#nation").val();
	var check = $('#checkbox-15').is(':checked') ? 1 : 0;
	var postData = JSON.stringify({
		"nationality_id" : id,
		"nationality_name" : nationalityname,
		"updated_on" : date,
		"active" : check
	});
	$.ajax({
		url : "https://"+ipadd+":3000/api/v1/nationality/" + id,
		type : "PUT",
		data : postData,
		contentType : "application/json",
		dataType : "text",
		headers : headers,
		processdata : true
		})
	.done(function(data, textStatus, jqXHR) {
		reload_table();
		document.getElementById("editform").reset();
		$("#addbtn").show();
			$("#listdiv").show();
			$("#editdiv").hide();
			$("#adddiv").hide();
		})
	.fail(function(jqXHR,exception) {
		errormessage(jqXHR, exception);		
		})
}

function cancel() {
	$("#addbtn").show();
	$("#listdiv").show();
	$("#editdiv").hide();
	$("#adddiv").hide();
}

function log() {
	var nname = $('#nationname').val();
	var check = $('#test').is(':checked') ? 1 : 0;
	var createdby = "user";
	var updatedby = "user";
	var datee = new Date();
	var date = (datee.getFullYear() + '/' + (datee.getMonth() + 1) + '/' + datee.getDate()
			+ ' T:' + datee.getHours() + ':' + datee.getMinutes() + ':' + datee
			.getSeconds());
	$(function() {
		var postData = JSON.stringify({
			"nationality_name" : nname,
			"created_by" : createdby,
			"created_on" : date,
			"updated_by" : updatedby,
			"updated_on" : date,
			"active" : check
		});
		$.ajax({
			type : "post",
			headers : headers,
			url : "https://"+ipadd+":3000/api/v1/nationality/",
			dataType : "json",
			data : postData,
			contentType : "application/json"
			})
		.done(function(json) {
			document.getElementById("addform").reset();
			reload_table();
			$("#addbtn").show();
				$("#listdiv").show();
				$("#editdiv").hide();
				$("#adddiv").hide();
				//location.assign("nationalitymaster.html");
			})
		.fail(function(jqXHR,exception) {
			errormessage(jqXHR, exception);
			})
	});
}
function errormessage(jqXHR, exception) {
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


function reload_table(){
	$('#example23').dataTable().fnClearTable();
	$('#example23').dataTable().fnDestroy();
	ShowCountries();
}