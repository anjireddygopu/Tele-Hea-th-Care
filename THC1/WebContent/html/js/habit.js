var token = sessionStorage.getItem("token");
headers= {'x-access-token':token,'Content-Type':'application/json','x-key':'haritha'};
var oTable;
var ipadd=sessionStorage.getItem("ip-add");
$(document).ready(function() {
	var token = sessionStorage.getItem(token);
	showHabits();
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
	
	function showHabits() {
		$.ajax({
			"type": "GET",
			"url": "https://"+ipadd+":3000/api/v1/habits",
			"data": "",
			"dataSrc": "",
			"headers": headers,
			dataType: 'json'})
			.done(function (data) {
				oTable = $('#habitmaster').DataTable({
					"language": {
						"zeroRecords": "No Records Found"
					},
					"dom": '<"toolbar">frtip',
					data: data,
					"columns": [
						{ "data": "habit_id" },
						{ "data": "habit_name" },
						{
							"data": "active",
							render: function (data, type, row) {
								if (data == true) {
									return "<input type='checkbox' id='" + row.habit_id + "_active' checked='checked'/>"
								} else {
									return "<input type='checkbox' id='" + row.habit_id + "_active'/>"
								};
							}
						},
						{
							"data": "habit_id", sortable: false,
							render: function (data, type, row) {

								return "<button id='" + row.habit_id + "_edit' onclick='Edit(" + row.habit_id + ")'><i class='fa fa-pencil-square-o btn-primary btn-sm' title='Edit' data-toggle='tooltip'></i></button>"
							}
						}
						]
				});
			})
			.fail(function (jqXHR, exception) {
				error(jqXHR, exception);
			});//error end	
	}	

function Edit(id){
	$("#addbtn").hide();
	sessionStorage.setItem("id",id);
	var id=sessionStorage.getItem("id");
	$(function(){ 
		if(!(id==null)){
			$.ajax({
				type:"GET",
				headers :headers,
				url:"https://"+ipadd+":3000/api/v1/habits/"+id,
				data:""})
				.done(function (data) {
					var data=JSON.parse(data);
					$.each(data,function(key,obj){
						$("#edit_habit_name").val(obj.habit_name);            
						var ac=obj.active;
						if(ac==1){
							$("#active").prop('checked', true);
						}else{
							$("#active").prop('checked', false);
						}
						$("#listdiv").hide();
						$("#editdiv").show();
					});
				})
				.fail(function (jqXHR, exception) {
					error(jqXHR, exception);
				});//error end
		}
	});
}

function update(){
	var id=sessionStorage.getItem("id");
	var name=$("#edit_habit_name").val();
	var ch=$("#active").is(':checked')?1:0;
	var updated="haritha"
		var postData=JSON.stringify({ "habit_id":id,"habit_name":name,"updated_by":updated,"active":ch })
		$.ajax({
			url:"https://"+ipadd+":3000/api/v1/habits/update",
			type:"PUT",
			data: postData , 
			contentType: "application/json" ,
			dataType: "text" ,
			headers :headers,
			processdata: true })			
			.done(function (data) {
				display();
				 reload_table();
			})
			.fail(function (jqXHR, exception) {
				error(jqXHR, exception);
			});//error end
}

function myfunction(){	
	var name=$("#habit_name").val();
	var ch=$('#test').is(':checked') ? 1 : 0;
	var created="haritha"
		var date = new Date();
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	month = (month < 10 ? "0" : "") + month;
	var day  = date.getDate();
	day = (day < 10 ? "0" : "") + day;
	var cid=(day+""+month+""+year);
	var postData=JSON.stringify({ "habit_name":name,"created_by":created,"active":ch,"created_on":cid})
	$.ajax({
		url:"https://"+ipadd+":3000/api/v1/habits/",
		type:"POST",
		data: postData , 
		contentType: "application/json" ,	
		dataType: "text" ,
		headers: {'x-access-token':token,'Content-Type':'application/json','x-key':'haritha'},
		processdata: true })
		.done(function (data) {
			document.getElementById("commentForm").reset();
			display();
			 reload_table();
		})
		.fail(function (jqXHR, exception) {
			error(jqXHR, exception);
		});
}
function reload_table(){
	$('#habitmaster').dataTable().fnClearTable();
	$('#habitmaster').dataTable().fnDestroy();
	showHabits();
}
function display(){
	$("#addbtn").show();
	$('#listdiv').show();
	$('#editdiv').hide();
	$('#adddiv').hide();
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