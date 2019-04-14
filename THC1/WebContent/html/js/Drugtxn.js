var tblSearchDrug;
var tblDrugSelection;
var ipadd=sessionStorage.getItem("ip-add");
var tokenKey = sessionStorage.getItem("token");
var headers = {
	'x-access-token' : tokenKey
};
function cancel() {
	$("#list").show();
	$("#list2").show();
	$("#textarea").show();
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

function showDrugList() {
   $('#search_drug').DataTable().clear();
	$('#search_drug').DataTable().destroy();
	var id1=$("#searchform").val();
	if(id1.length==0){
		alert("Please enter a value")
		tblSearchDrug= $('#search_drug').DataTable({
			/*"scrollY": "130px",
			 "lengthChange":false*/
		});
	}else{
	 $.ajax({
	        "type":"GET",
	        "url":"https://"+ipadd+":3000/api/v1/drugtxn/all/"+id1,
	        "data":"",
	        "dataSrc": "",
	        "headers": headers,
	        "dataType": 'json'
	       })
	      .done(function (data) {
	        	tblSearchDrug= $('#search_drug').DataTable({
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
	                "columns": [
	                { "data": "drug_id" },
	                { "data": "drug_name" },
	                {
	            	   "data": "drug_id",
	            	      render: function (data, type, row) {
	            	    	  return "<button class='btn-view' id='" + row.drug_id + "_add'><i class='fa fa-plus btn-primary btn-sm' title='Edit' data-toggle='tooltip'></i></button>"
	            	                      	       
	            	      }
	                }
	             ]
	          
	         });
	        $('#searchform').val('');
	        })
	        .fail(function (jqXHR, exception) {
		error(jqXHR, exception);
	})
	      }
}

function ShowDrugChild() {
	var mrno=sessionStorage.getItem("mrno");
	var eid=sessionStorage.getItem("eid");
	var vid=sessionStorage.getItem("vid");
	const jqxhr= $.ajax({
       "type": "GET",
       "url": "https://"+ipadd+":3000/api/v1/drugtxn/"+mrno+"/"+eid+"/"+vid,
       "data": "",
       "dataSrc": "",
       "headers": headers,
       "dataType": 'json'})
       .done(function (data) {
    	   if (JSON.stringify(data)=="[]") {
     		  $("#update").hide();
     		 }
     		 else {
     		 $("#submit").hide();
     		 }
    	  tblDrugSelection = $('#drug_selection').DataTable({
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
               "columns": [
               { "data": "drug_id" },
               { "data": "drug_name" },
               {
           	   "data": "",
           	      render: function (data, type, row) { 
           	    	$("#text").val(row.additional_notes);
           	        return "<button class='btn-delete'><i class='fa fa-trash-o btn-primary btn-sm' title='Delete' data-toggle='tooltip'></i></button>"
           	 	
           	      }
               }
            ]
        });
    })
    
   .fail(function (jqXHR, exception) {
		error(jqXHR, exception);
	});
}
$(document).ready(function() {
	
	$("#list").show();
	$("#list2").show();
	$("#textarea").show();
	tblSearchDrug = $('#search_drug').DataTable({
		/*"paging": false,
	     "searching": false,
	     "bInfo": false,
	     "scrollY": "200px",
	     "scrollcollapse": true,*/
	});
	
	tblDrugSelection = $('#drug_selection').DataTable({
		"paging": false,
	     "searching": false,
	     "bInfo": false,
	     "scrollY": "200px",
	     "scrollcollapse": true,
		  data: "",
          "columns": [
          { "data": "drug_id" },
          { "data": "drug_name" },
          {
      	   "data": "",
      	      render: function (data, type, row) { 
      	    	
      	        return "<button class='btn-delete'><i class='fa fa-trash-o btn-primary btn-sm' title='Delete' data-toggle='tooltip'></i></button>"
      	 	
      	      }
          }
       ]
		
	});
	
	$('#search_drug tbody').on('click', '.btn-view', function (e) {
        var data = tblSearchDrug.row($(this).parents('tr') ).data();
        var dobject={};
	        dobject.drug_id = data["drug_id"];
	        dobject.drug_name = data["drug_name"];
	        var data1=tblDrugSelection.data();
	        for(var i=0;i<data1.length;i++){
	           if(dobject.drug_id ==data1[i].drug_id){
	             alert("Duplicate...")
	             //location.reload(Drug.html)
	             tr.row("#"+data1[i].diet_id).remove().draw();
	           }
	        }
	 	tblDrugSelection.row.add(dobject).draw(true);
	} );
	
	$('#drug_selection tbody').on('click', '.btn-delete', function (e) {
		  tblDrugSelection.row($(this).parent().parent()).remove().draw(true);
    });

		$('#drug_selection').DataTable().clear();
		$('#drug_selection').DataTable().destroy();
		ShowDrugChild();
});


function post(){
	var tableLength = $('#drug_selection tr').length - 1;
	var mrno=sessionStorage.getItem("mrno");
	var eid=sessionStorage.getItem("eid");
	var vid=sessionStorage.getItem("vid");
	var postData ={};
	postData.MRNo =mrno;
	postData.ENo=eid;
	postData.VNo=vid;
	postData.Notes=$('#text').val();
	
	var recordsList =[];
	for(var i=0;i<tableLength;i++){
		 
		var datarecord={};
	
		var id = (tblDrugSelection.cell(i, 0).data());
			datarecord.id=id;
		var name=(tblDrugSelection.cell(i,1).data());
			datarecord.name=name;
		recordsList.push(datarecord);
 }
 if(datarecord.id==null){
	alert("Please add some Drugs");
}else{
	postData.data =recordsList;
 
	const jqxhr=$.ajax({
    	type:"post",
    	headers: headers,
    	url:"https://"+ipadd+":3000/api/v1/drugtxn/",
    	dataType: "json",
    	data:JSON.stringify(postData),
    	contentType:"application/json"})
    	 .done(function (data) {
    	{    $("#update").show();
    		reload_table();
    	}
    	})

	.fail(function (jqXHR, exception) {
		error(jqXHR, exception);
	})
			}
		}
 


function update() {
	sessionStorage.setItem("id",4);
	var id=sessionStorage.getItem("id");
    var note=$("#text").val();
	var tableLength = $('#drug_selection tr').length-1;
	var mrno=sessionStorage.getItem("mrno");
	var eid=sessionStorage.getItem("eid");
	var vid=sessionStorage.getItem("vid");
	var postData ={};
	postData.MRNo =mrno;
	postData.ENo=eid;
	postData.VNo=vid;
	postData.Notes=note;
	var recordsList =[];
	for (var i = 0; i < tableLength; i++) {
		var datarecord={};
		var id=tblDrugSelection.cell(i,0).data();
		var dname=tblDrugSelection.cell(i,1).data();
		datarecord.id=id;
		datarecord.dname=dname;
		recordsList.push(datarecord);
	}
	if(datarecord.id==null){
		alert("Please add some Diets");
	}else{
   postData.data =recordsList;
   $.ajax({
		type : "PUT",
		"headers": headers,
		url :"https://"+ipadd+":3000/api/v1/drugtxn/update",
		"data" : JSON.stringify(postData),
		contentType : "application/json"})
	 .done(function (data) {
		{
			$("#update").show();
			reload_table();
		}
		
	})
   
 .fail(function (jqXHR, exception) {
		error(jqXHR, exception);
	})
}
   	}
function reload_table(){
	$('#search_drug').dataTable().fnClearTable();
	$('#search_drug').dataTable().fnDestroy();
	$('#drug_selection').dataTable().fnClearTable();
	$('#drug_selection').dataTable().fnDestroy();
	$('#search_drug').dataTable()
	ShowDrugChild();
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


