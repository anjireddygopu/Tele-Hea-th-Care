var tokenKey=sessionStorage.getItem('token');
var headers = {
	'x-access-token' :tokenKey};
var oTable;
var tr;
var ipadd=sessionStorage.getItem("ip-add");
$(document).ready(function() { 
	showlist();
function addrecord(){
	var dobject={};
	var id=$("#diseasenme option:selected").val();
	dobject.id=id;
	if(id==0){
	alert('Please Select Option');	
	}else{
   	var disease_name=$("#diseasenme option:selected").text();
   	dobject.disease_name=disease_name;
   	var Mother="<input type='checkbox' name='abc' id='mo1' />";
   	dobject.Mother=Mother;
   	var Father="<input type='checkbox'  name='abc' id='mo1' />";
   	dobject.Father=Father;
   	var Brother="<input type='checkbox' name='abc' id='mo1' />";
   	dobject.Brother=Brother;
   	var Sister="<input type='checkbox'   name='abc' id='mo1' />";
   	dobject.Sister=Sister;
   	var Paternal="<input type='checkbox'   name='abc' id='mo1'/>";
   	dobject.Paternal=Paternal;
   	var Maternal="<input type='checkbox' name='abc' id='mo1'/>";
   	dobject.Maternal=Maternal;
   	var Remove="<button '_Remove' id='deletebtn'><i class='fa fa-trash-o btn-primary btn-sm' title='Delete' data-toggle='tooltip'></i></button>";
   	dobject.Remove=Remove;
  	var data1=oTable.data()
  	
  	for(var i=0;i<data1.length;i++){
  	if(dobject.id== data1[i].id)
  	{	
  		alert('Entered Duplicate');  		
  		$("#diseasenme").prop("selectedIndex", 0);
  		oTable.tr.row(data1[i].id).remove();
  		oTable.ajax.reload();
  		
  	}
  	else if(dobject.id=='Select')
  		{
  		alert('Please Select Option');
  		$("#diseasenme").prop("selectedIndex", 0);
  		oTable.tr.row(select).remove();
  		oTable.ajax.reload();
		}
  		
  	}
  	oTable.row.add(dobject).draw(true);
  	$("#diseasenme").prop("selectedIndex", 0);
	}
}
$('#example').on('click', 'button', function(e){
oTable.row($(this).parents('tr')).remove().draw(false);
})

document.getElementById("addbtn").addEventListener("click", addrecord);
document.getElementById("savebtn").addEventListener("click",save);

});

function save(){
var txnid=sessionStorage.getItem('txn_id');
if(txnid=="undefined")
	{
	newpost();

	}
else{
	update();
}	
}

function update() {
	var tableLength = $('#example tr').length - 1;
	var id = sessionStorage.getItem('txn_id');
	var postData = {};
	postData.id=id;
	postData.Notes = $('#textareaa').val();
	var datee = new Date();
	var date = (datee.getFullYear() + '/' + (datee.getMonth() + 1) + '/' + datee.getDate()
			+ ' T:' + datee.getHours() + ':' + datee.getMinutes() + ':' + datee
			.getSeconds());
	postData.date = date;
	var createdby = "user";
	postData.createdby = createdby;
	var recordsList = [];
	for (var i = 0; i < tableLength; i++) {
		var id = (oTable.cell(i, 0).data());
		if(id==null){}
		else{
		var datarecord = {};
		var mother = (oTable.cell(i, 2).nodes().to$().find('input').is(
				':checked') ? 1 : 0);
		datarecord.mother = mother;
		var father = (oTable.cell(i, 3).nodes().to$().find('input').is(
				':checked') ? 1 : 0);
		datarecord.father = father;
		var brother = (oTable.cell(i, 4).nodes().to$().find('input').is(
				':checked') ? 1 : 0);
		datarecord.brother = brother;
		var sister = (oTable.cell(i, 5).nodes().to$().find('input').is(
				':checked') ? 1 : 0);
		datarecord.sister = sister;
		var paternal = (oTable.cell(i, 6).nodes().to$().find('input').is(
				':checked') ? 1 : 0);
		datarecord.paternal = paternal;
		var maternal = (oTable.cell(i, 7).nodes().to$().find('input').is(
				':checked') ? 1 : 0);
		datarecord.maternal = maternal;
		var id = (oTable.cell(i, 0).data());
		datarecord.family_disease_id = id;
		recordsList.push(datarecord);
		}
	}
	postData.data = recordsList;
	$(function() {
		$.ajax({
			type : "put",
			headers : headers,
			url : "https://"+ipadd+":3000/api/v1/editfamilyhistory/editfamilyhistory",
			dataType : "json",
			data : JSON.stringify(postData),
			contentType : "application/json"
			})
		.done(function(json) {
				reload();
			})
		.fail(function(jqXHR,exception) {
			errormeassage(jqXHR,exception);			
			})				
	});
	

}

$(function() {
$.ajax({
		type : "GET",
		headers : headers,
		url : "https://"+ipadd+":3000/api/v1/editfamilyhistoryd",
		data : ""
		})
	.done(function(json) {
			var result = JSON.parse(json);
			$.each(result, function(index, item) {
				$("#diseasenme").append(
						"<option value=" + item.id + ">" + item.disease_name
								+ "</option>");
			});
		})
	.fail(function(jqXHR,exception){
		errormeassage(jqXHR,exception);				
		})			
});

function showlist() {
var mrno=sessionStorage.getItem("mrno");
$.ajax({
	"type" : "GET",
	"headers" : headers,
	"url" : "https://"+ipadd+":3000/api/v1/editfamilyhistory/"+mrno,
	"data" : "",
	"dataType" : 'json'
})
	.done(function(rdata) {
		var Data = JSON.stringify(rdata);
		var data = rdata.family_history_txn_dtls;
		var data1=rdata.family_history_txn.id;
		var data2=rdata.family_history_txn.additional_notes;
		$('#textareaa').val(data2);
		sessionStorage.setItem("txn_id",data1);
		sessionStorage.setItem("notes",data2);
		oTable = $('#example').DataTable({
			"paging" : false,
			"ordering" : false,
			"info" : false,
			"searching" : false,
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
				"data" : "disease_name" },
				{
				"data" : "mother",
				render : function(data,type, row) {
					if (data == true) {
						return "<input type='checkbox' id='"+ row.id+ "_active' checked='checked'/>"
						} else {
						return "<input type='checkbox' id='"+ row.id+ "_active'/>"
						};
						},   	 
},
{
				"data" : "father",
				render : function(data,	type, row) {
					if (data == true) {
					   return "<input type='checkbox' id='"+ row.id	+ "_active' checked='checked'/>"
					   } else {
					   return "<input type='checkbox' id='"+ row.id+ "_active'/>"
					   };
					   },   	 
},
{
				"data" : "brother",
				render : function(data,type, row) {
					if (data == true) {
						return "<input type='checkbox' id='"+ row.id+ "_active' checked='checked'/>"
						} else {
						return "<input type='checkbox' id='"+ row.id+ "_active'/>"
						};
						},   	 
},
{
				"data" : "sister",
				render : function(data,type, row) {
					if (data == true) {
						return "<input type='checkbox' id='"+ row.id+ "_active' checked='checked'/>"
						} else {
						return "<input type='checkbox' id='"+ row.id+ "_active'/>"
						};
						},   	 
},
{
				"data" : "paternal",
				render : function(data,type, row) {
					if (data == true) {
						return "<input type='checkbox' id='"+ row.id+ "_active' checked='checked'/>"
						} else {
						return "<input type='checkbox' id='"+ row.id+ "_active'/>"
						};
						},   	 
},
{
				"data" : "maternal",
				render : function(data,type, row) {
					if (data == true) {
						return "<input type='checkbox' id='"+ row.id+ "_active' checked='checked'/>"
						} else {
						return "<input type='checkbox' id='"+ row.id+ "_active'/>"
						};
						},
},
{
				"data" : "",
				render : function(data,type, row) {
					return "<button id='"+ row.id+ "'_Remove' id='deletebtn'><i class='fa fa-trash-o btn-primary btn-sm' title='Delete' data-toggle='tooltip'></i></button>"
					}
									},					
						
						]
					});
				})		
	.fail(function(jqXHR,exception) {
		errormeassage(jqXHR,exception);				
	})			
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
	   text: "Your Record Added Successfully !",   
	   timer: 2000,   
	   showConfirmButton: false 
   });
});
function newpost() {
	var mrno=sessionStorage.getItem("mrno");
	var tableLength = $('#example tr').length - 1;
	var postData = {};
	postData.mrno = mrno;
	postData.Notes = $('#textareaa').val();
	var datee = new Date();
	var date = (datee.getFullYear() + '/' + (datee.getMonth() + 1) + '/' + datee.getDate()
			+ ' T:' + datee.getHours() + ':' + datee.getMinutes() + ':' + datee
			.getSeconds());
	postData.date = date;
	var createdby = "user";
	postData.createdby = createdby;
	var recordsList = [];
	for (var i = 0; i < tableLength; i++) {
		var datarecord = {};
		var id = (oTable.cell(i, 0).data());
		if(id==null){}
		else{
		var mother = (oTable.cell(i, 2).nodes().to$().find('input').is(
				':checked') ? 1 : 0);
		datarecord.mother = mother;
		var father = (oTable.cell(i, 3).nodes().to$().find('input').is(
				':checked') ? 1 : 0);
		datarecord.father = father;
		var brother = (oTable.cell(i, 4).nodes().to$().find('input').is(
				':checked') ? 1 : 0);
		datarecord.brother = brother;
		var sister = (oTable.cell(i, 5).nodes().to$().find('input').is(
				':checked') ? 1 : 0);
		datarecord.sister = sister;
		var paternal = (oTable.cell(i, 6).nodes().to$().find('input').is(
				':checked') ? 1 : 0);
		datarecord.paternal = paternal;
		var maternal = (oTable.cell(i, 7).nodes().to$().find('input').is(
				':checked') ? 1 : 0);
		datarecord.maternal = maternal;
		var id = (oTable.cell(i, 0).data());
		datarecord.family_disease_id = id;
		recordsList.push(datarecord);
		}
	}
	postData.data = recordsList;

	$(function() {
		$.ajax({
			type : "post",
			headers : headers,
			url : "https://"+ipadd+":3000/api/v1/editfamilyhistory/",
			dataType : "json",
			data : JSON.stringify(postData),
			contentType : "application/json"
			})
		.done(function(json) {
			reload();
			})
		.fail(function(jqXHR,exception) {
			errormeassage(jqXHR,exception);			
			})				
	});
}

function errormeassage(jqXHR,exception) {
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

function reload(){
	$('#example').dataTable().fnClearTable();
    $('#example').dataTable().fnDestroy();
    showlist();
}
function cancel(){
	reload();
}