var Table;
var tokenKey = sessionStorage.getItem("token");
var token = sessionStorage.getItem(tokenKey);
var headers = {'x-access-token':tokenKey};
var ipadd=sessionStorage.getItem("ip-add");
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
$(document).ready(function() {
	Table = $('#incomelist').DataTable();
			 $('#adddiv').hide();
			 $('#editdiv').hide();
			 $("#addbtn").click(function(){
				 	$('#editdiv').hide();
				 	$('#listdiv').hide();
				 	$('#adddiv').show();
				 	$('#addbtn').hide();
			    	});
			 		IncomeList();
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
 function IncomeList() {
	 	$.ajax({
			   		"type": "GET",
				    "url": "https://"+ipadd+":3000/api/v1/income",
				    "data": "",
				    "dataSrc": "",
				    "headers": headers,
				     dataType: 'json',
					 })
				     .done(function (data) {
				     $('#incomelist').DataTable().clear();
				     $('#incomelist').DataTable().destroy();
				     Table = $('#incomelist').DataTable({
				      "": {
				                   "zeroRecords": "No Records Found"
				          },
				          "dom": '<"toolbar">frtip',
				           data: data,
				           "columns": [
				           { "data": "income_group_id" },
				           { "data": "income_group_name" },
				           {
				        	   "data": "active",
				               render: function (data, type, row) {
				                if (data == true) {
				                      return "<input type='checkbox' id='" + row.income_group_id + "_active' checked='checked'/>"
				                 } else {
				                	   return "<input type='checkbox' id='" + row.income_group_id + "_active'/>"
				 			             };
				 			     $('#dataa').append(tr);
				               		}
				           			},
				          {
				           "data": "Id",
				       	   render: function (data, type, row) {
				   	       return "<button id='" + row.income_group_id + "'_edit' onclick='IncomeEdit(this.id)'><i class='fa fa-pencil-square-o btn-primary btn-sm' title='Edit' data-toggle='tooltip'></i></button>"
				      	   }
				     	}
				       ]
				   })
				 })//done end
					   		.fail(function (jqXHR, exception) {
					   			error(jqXHR, exception)
					   		})//fail end
				}
			    		
function IncomeEdit(id){
	$("#addbtn").hide();
			sessionStorage.setItem("id",id);
			var id=sessionStorage.getItem("id");
			$(function(){ 
			if(!(id==null)){
			$.ajax({
			         type:"GET",
			         headers: headers,
			         url:"https://"+ipadd+":3000/api/v1/income/"+id,
			         data:"",
			})
			         .done(function (json) {
			       	 var data=JSON.parse(json);
			           $.each(data,function(key,obj){
			            $("#incomename").val(obj.income_group_name);
			            var ac=obj.active;
			            if(ac==1){
			            $("#checkbox-16").prop('checked', true);
			            }else{
			            $("#checkbox-16").prop('checked', false);
			            }
			           	$("#listdiv").hide();
			          	$("#editdiv").show();
			           });
			         })
			         .fail(function (jqXHR, exception) {
			        	 error(jqXHR, exception)
					  })//fail end
					 			}
			});
	}

function IncomeUpdate(){
			var id=sessionStorage.getItem("id");
			var income_name=$("#incomename").val();
			var ch=$("#checkbox-16").is(':checked')?1:0;
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			month = (month < 10 ? "0" : "") + month;
			var day  = date.getDate();
			day = (day < 10 ? "0" : "") + day;
			var cid=(day+"/"+month+"/"+year);
			var updated_on="mahesh";
			var postData=JSON.stringify({ "income_group_id":id,"income_group_name":income_name,"active":ch,"updated_on":cid,"updated_by":updated_on })
					$.ajax({
					url:"https://"+ipadd+":3000/api/v1/income/update",
					type:"PUT",
					data: postData , //Data sent to server
					contentType: "application/json" ,	// content type sent to server
					dataType: "text" ,
					headers: headers,
					processdata: true ,
					})
						.done(function (data) {
							reload_table();
							display();
						})
						.fail(function (jqXHR, exception) {
							error(jqXHR, exception)
						})//fail end
		}

function IncomeAdd(){
			var iname=$("#incomeadd").val();
			var ch=$("#test").is(':checked')?1:0;
			var created="mahesh"
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			month = (month < 10 ? "0" : "") + month;
			var day  = date.getDate();
			day = (day < 10 ? "0" : "") + day;
			var cid=(day+""+month+""+year);
			var postData=JSON.stringify({ "income_group_name":iname,"created_by":created,"active":ch,"created_on":cid})
				$.ajax({
					url:"https://"+ipadd+":3000/api/v1/income/",
					type:"POST",
					data: postData , //Data sent to server
					contentType: "application/json" ,	// content type sent to server
					dataType: "text" ,
					headers: headers,
					processdata: true ,
					})
					.done(function (data) {
						reload_table();
						display();
					})
					.fail(function (jqXHR, exception) {
						error(jqXHR, exception)
					})//fail end
		}

function cancel()
	    {
	$("#addbtn").show();
	$('#editdiv').hide();
 	$('#listdiv').show();
 	$('#adddiv').hide();
	    }  
function reload_table(){
	$('#incomelist').dataTable().fnClearTable();
	$('#incomelist').dataTable().fnDestroy();
	IncomeList();
}
function display(){
	$('#listdiv').show();
	$('#editdiv').hide();
	$('#adddiv').hide();
	$('#addbtn').show();
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
