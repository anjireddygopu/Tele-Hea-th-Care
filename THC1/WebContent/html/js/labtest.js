var tblSearchTest;
var tblTestSelection;
var tokenKey = sessionStorage.getItem("token");
const headers = {
 'x-access-token': tokenKey
};
var ipadd=sessionStorage.getItem("ip-add");
$(document).ready(function() {
	 $('#search_test').DataTable({
		 "scrollY": "130px",
		 "lengthChange":false
	 });
	 $("#list").show();
	 $("#list2").show();
	 $("#textarea").show();
	 $("#update").show();
	 $("#submit").show();
	 $('#test_selection').DataTable().clear();
	$('#test_selection').DataTable().destroy();
	ShowTestSelection();
	 $('#search_test tbody').on('click', '.btn-view', function(e) {
			  var data = tblSearchTest.row(
			   $(this).parents('tr')).data();
			  var dobject = {};
			  dobject.test_id = data["test_id"];
			  dobject.test_name = data["test_name"];
			  var data1=tblTestSelection.data();
			  for(var i=0;i<data1.length;i++){
			  if(dobject.test_id ==data1[i].test_id){
			  alert("Duplicate...")
			  tr.row(data1[i].test_id).remove.draw();
			  }
			  }
			  tblTestSelection.row.add(dobject).draw(true);
	 });
	
	 $('#test_selection tbody').on('click', '.btn-delete', function(e) {
			  tblTestSelection.row(
			    $(this).parent().parent()).remove()
			   .draw(true);
	 });
	 
	// document.getElementById("searchbutton").addEventListener("click",showTestList);
	 document.getElementById("cancel").addEventListener("click",cancel);
	 document.getElementById("update").addEventListener("click",update);
	 document.getElementById("submit").addEventListener("click",post);
	
	 	
	 		
});
function cancel() {
	$("#list").show();
	 $("#list2").show();
	 $("#textarea").show();
}
function showTestList() {
	$('#search_test').DataTable().clear();
		$('#search_test').DataTable().destroy();
	var id1=$("#searchtest").val();
	if(id1.length==0)
	{
	alert("enter a value");
	tblSearchTest = $('#search_test')
    .DataTable({
    	"scrollY": "130px",
		 "lengthChange":false
		 })
	}
	else
		{
			 $.ajax({
			  "type": "GET",
			  "url": "https://"+ipadd+":3000/api/v1/labtest/labtest"+id1,
			  "data": "",
			  "dataSrc": "",
			  "headers": headers,
			  dataType: 'json',
			 })
			   .done(function (data) {
			    tblSearchTest = $('#search_test')
			     .DataTable({
			    	 "scrollY": "130px",
					 "lengthChange":false,
				     "language": {
				      "zeroRecords": "No Records Found"
				     },
				     "dom": '<"toolbar">frtip',
			      data: data,
			      "columns": [{
			       "data": "test_id"
			      }, {
			       "data": "test_name"
			      }, {
			       "data": "test_id",
			       render: function(data,
			        type, row) {
			        return "<button class='btn-view' id='" + row.test_id + "_add'><i class='fa fa-plus btn-primary btn-sm' title='Add' data-toggle='tooltip'></i></button>"
			       }
			      }]
			    
			     })
			     $('#searchtest').val('');
			   } )
			 /*error message*/
			    
			   .fail(function(jqXHR, exception) {
	               error(jqXHR, exception)
				 $('#search_test').DataTable({
					 "scrollY": "130px",
					 "lengthChange":false
					 });
				})//fail end
		}				   		
}

function ShowTestSelection() {
 var mrno=sessionStorage.getItem("mrno");
 var eid=sessionStorage.getItem("eid");
 var vid=sessionStorage.getItem("vid");
			 $.ajax({
			  "type": "GET",
			  "url": "https://"+ipadd+":3000/api/v1/labtest/"+mrno+"/"+eid+"/"+vid,
			  "data": "",
			  "dataSrc": "",
			  "headers": headers,
			  dataType: 'json',
			 })
			  .done(function (data) {
				 if (JSON.stringify(data)=="[]") {
					  $("#update").hide();
				 }
				 else {
					 $("#submit").hide();
				 }
			   tblTestSelection = $('#test_selection')
			    .DataTable({
			     "paging": false,
			     "searching": false,
			     "bInfo": false,
			     "scrollY": "200px",
			     "scrollcollapse": true,
			     "language": {
			      "zeroRecords": "No Records Found"
			     },
			     "dom": '<"toolbar">frtip',
			     data: data,
			     "columns": [{
			      "data": "test_id"
			     }, {
			      "data": "test_name"
			     }, {
			      "data": "",
			      render: function(data,
			       type, row) {
			       $("#text").val(
			        row.notes);
			       return "<button class='btn-delete'><i class='fa fa-trash-o btn-primary btn-sm' title='Delete' data-toggle='tooltip'></i></button>"
			      }
			     }]
			    })
			  })
			  .fail(function (jqXHR, exception) {
				  $('#test_selection').DataTable();
					   			error(jqXHR, exception)
					   		})//fail end
					   		
};

function post() {
			 var note = $('#text').val();
			 var tableLength = $('#test_selection tr').length - 1;
			 var mrno=sessionStorage.getItem("mrno");
		       var eid=sessionStorage.getItem("eid");
		       var vid=sessionStorage.getItem("vid");
			 var postData = {};
			 postData.MRNo =mrno;
			 postData.ENo = eid;
			 postData.VNo =vid;
			 postData.Notes = note;
			 var recordsList = [];
			 for (var i = 0; i < tableLength; i++) {
			  var datarecord = {};
			  var id = (tblTestSelection.cell(i, 0).data());
			  datarecord.id = id;
			  var test = (tblTestSelection.cell(i, 1).data());
			  datarecord.test_name = test;
			  recordsList.push(datarecord);
			 }
			 if(datarecord.id==null)
			 {
				 alert("Please add some Tests");
			 }
			 else
			 {
			 postData.data = recordsList;
			 $.ajax({
			  "type": "post",
			  "headers": headers,
			  "url": "https://"+ipadd+":3000/api/v1/labtest",
			  "data": JSON.stringify(postData),
			  contentType: "application/json",
			 })
			 .done(function (data) {
				 $("#update").show();
				 reload_table();
				})
				.fail(function (jqXHR, exception) {
					 $('#test_selection').DataTable();
					error(jqXHR, exception)
				})//fail end
			}
				 
}
$('#submit').click(function(){
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

function update() {
			 var note = $('#text').val();
			 var tableLength = $('#test_selection tr').length - 1;
			 var mrno=sessionStorage.getItem("mrno");
		       var eid=sessionStorage.getItem("eid");
		       var vid=sessionStorage.getItem("vid");
			 var postData = {};
			 postData.MRNo =mrno;
			 postData.ENo =eid;
			 postData.VNo =vid;
			 postData.Notes = note;
			 var recordsList = [];
			 for (var i = 0; i < tableLength; i++) {
			  var datarecord = {};
			  var id = (tblTestSelection.cell(i, 0).data());
			  datarecord.id = id;
			  var test = (tblTestSelection.cell(i, 1).data());
			  datarecord.test_name = test;
			  recordsList.push(datarecord);
			 }
			 if(datarecord.id==null)
			 {
				 alert("Please add some Tests");
			 }
			 else
			 {
			 postData.data = recordsList;
			 $.ajax({
			  "type": "PUT",
			  "headers": headers,
			  "url": "https://"+ipadd+":3000/api/v1/labtest/update",
			  "data": JSON.stringify(postData),
			  contentType: "application/json",
			 })
			 .done(function (data) {
				 $("#update").show();
				 reload_table();
				})
				.fail(function (jqXHR, exception) {
					
					error(jqXHR, exception)
				})//fail end
			}
					 
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


function reload_table(){
	$('#search_test').dataTable().fnClearTable();
	$('#search_test').dataTable().fnDestroy();
	$('#test_selection').dataTable().fnClearTable();
	$('#test_selection').dataTable().fnDestroy();
	$('#search_test').dataTable()
	ShowTestSelection();
}