var tblSearchDisease;
var tblDiseaseSelection;
var token = sessionStorage.getItem("token");
var headers = {
	'x-access-token':token
};
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
var ipadd=sessionStorage.getItem("ip-add");
function showDiseasesList() {
	$('#search_disease').DataTable().clear();
	$('#search_disease').DataTable().destroy();
	var id1=$("#searchbox").val();
	if(id1.length==0)
	{
	alert("Please Enter a value");
	tblSearchDisease = $('#search_disease').DataTable({
		 "scrollY": "130px",
		 "lengthChange":false
	 })
	}else{
		  $.ajax({
		        "type": "GET",
		        "url": "https://"+ipadd+":3000/api/v1/diseases/all/"+id1,
		        "data": "",
		        "dataSrc": "",
		        "headers": headers,
		        dataType: 'json'
		  })
	      .done(function (data) {
	        	tblSearchDisease= $('#search_disease').DataTable({
	        		"bSort":false,
	        		"scrollY": "100px",
	    	        "scrollCollapse": true,
	                "language": {
	                    "zeroRecords": "No Records Found"
	                },
	                "dom": '<"toolbar">frtip',
	                data: data,
	                "columns": [
	                { "data": "diseases_id" },
	                { "data": "diseases_name" },
	                {
	            	   "data": "diseases_id",
	            	      render: function (data, type, row) {
	            	    	  return "<button class='btn-view' id='" + row.diseases_id + "_add'><i class='fa fa-plus-square-o btn-primary btn-sm' title='Add' data-toggle='tooltip'></i></button>"
	            	                      	       
	            	      }
	                }
	             ]
	          
	         });
$('#searchbox').val('');
	        })//done end
	        
	       .fail(function(jqXHR, exception) {
	       	   failure(jqXHR, exception)
	       })//fail end    
}
}

function ShowDiseaseChild() {
	var mrno=sessionStorage.getItem("mrno");
	var eid=sessionStorage.getItem("eid");
	var vid=sessionStorage.getItem("vid");
    $.ajax({
       "type":"GET",
       "url":"https://"+ipadd+":3000/api/v1/diagnosis/"+mrno+"/"+eid+"/"+vid,
       "data": "",
       "dataSrc": "",
       "headers": headers,
       dataType: 'json'
    })
       .done(function (data) {
    	  var d=JSON.stringify(data);
    	  if(d=="[]"){
     		  $("#update").hide();
     	  }else{
     		 $("#submit").hide();
     	  }
     	   
    	  tblDiseaseSelection = $('#disease_selection').DataTable({
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
               { "data": "disease_id" },
               { "data": "disease_name" },
               {
           	   "data": "",
           	      render: function (data, type, row) { 
           	    	$("#text").val(row.notes);
           	        return "<button class='btn-delete'><i class='fa fa-trash-o btn-primary btn-sm' title='Delete' data-toggle='tooltip'></i></button>"
           	 	
           	      }
               }
            ]
         })
       })//done end
       .fail(function(jqXHR, exception) {
       	   failure(jqXHR, exception)
       })//fail end   
}

$(document).ready(function() {		
	tblSearchDisease = $('#search_disease').DataTable({
	     "paging": false,
	     "searching": false,
	     "bInfo": false,
	     "scrollY": "200px",
	     "scrollcollapse": true,
	})
	tblDiseaseSelection = $('#disease_selection').DataTable({
	     "paging": false,
	     "searching": false,
	     "bInfo": false,
	     "scrollY": "200px",
	     "scrollcollapse": true,    
		  data: "",
          "columns": [
          { "data": "diseases_id" },
          { "data": "diseases_name" },
          {
      	   "data": "",
      	      render: function (data, type, row) { 
      	        return "<button class='btn-delete' ><i class='fa fa-trash-o btn-primary btn-sm' title='Delete' data-toggle='tooltip'></i></button>"
      	 	
      	      }
          }
       ]
		
	});
	
	$('#search_disease tbody').on('click', '.btn-view', function (e) {
        var data = tblSearchDisease.row($(this).parents('tr') ).data();
        var dobject={};
	        dobject.disease_id = data["diseases_id"];
	        dobject.disease_name = data["diseases_name"];
	        var data1=tblDiseaseSelection.data();
	        for(var i=0;i<data1.length;i++){
	        if(dobject.disease_id ==data1[i].disease_id){
	        alert("Duplicate...")
	        //location.reload(Diseases.html)
	        tr.row("#"+data1[i].disease_id).remove.draw();
	        }
	        }
	 	tblDiseaseSelection.row.add(dobject).draw(true);
	} );
	
	$('#disease_selection tbody').on('click', '.btn-delete', function (e) {
		  tblDiseaseSelection.row($(this).parent().parent()).remove().draw(true);
    });

	$('#disease_selection').DataTable().clear();
	$('#disease_selection').DataTable().destroy();
	ShowDiseaseChild();
} );

function post() {
    var note=$("#text").val();
	var tableLength = $('#disease_selection tr').length-1;
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
		var id=tblDiseaseSelection.cell(i,0).data();
		var dname=tblDiseaseSelection.cell(i,1).data();
		datarecord.id=id;
		datarecord.dname=dname;
		recordsList.push(datarecord);
	}
	if(datarecord.id==null){
		alert("Please add some Diseases");
	}else{
   postData.data =recordsList;
	 $.ajax({
			type : "POST",
			"headers": headers,
			url : "https://"+ipadd+":3000/api/v1/diagnosis",
			dataType : "json",
			data : JSON.stringify(postData),
			contentType : "application/json"
	 })
    .done(function (json) {
    	  $("#update").show();
    	reload_table();
	})
	 .fail(function(jqXHR, exception) {
     	   failure(jqXHR, exception)
     })//fail end 
}
}

function update() {
	sessionStorage.setItem("id",4);
	var id=sessionStorage.getItem("id");
    var note=$("#text").val();
	var tableLength = $('#disease_selection tr').length-1;
	var mrno=sessionStorage.getItem("mrno");
	var eid=sessionStorage.getItem("eid");
	var vid=sessionStorage.getItem("vid");
	var postData ={};
	postData.MRNo=mrno;
	postData.ENo=eid;
	postData.VNo=vid;
	postData.Notes=note;
	var recordsList =[];
	for (var i = 0; i < tableLength; i++) {
		var datarecord={};
		var id=tblDiseaseSelection.cell(i,0).data();
		var dname=tblDiseaseSelection.cell(i,1).data();
		datarecord.id=id;
		datarecord.dname=dname;
		recordsList.push(datarecord);
	}
	if(datarecord.id==null){
		alert("Please add some Diseases");
	}else{
   postData.data =recordsList;
	   $.ajax({
			type : "PUT",
			"headers": headers,
			url : "https://"+ipadd+":3000/api/v1/diagnosis",
			data : JSON.stringify(postData),
			contentType : "application/json"
	   })
		 .done(function (json) {
			 reload_table();
		})
		.fail(function(jqXHR, exception) {
	     	   failure(jqXHR, exception)
	     })//fail end 
}
}

function cancel() {
	$("#list").show();
	$("#list2").show();
	$("#textarea").show();
}

function failure(jqXHR, exception) {
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
	$('#search_disease').dataTable().fnClearTable();
	$('#search_disease').dataTable().fnDestroy();
	$('#disease_selection').dataTable().fnClearTable();
	$('#disease_selection').dataTable().fnDestroy();
	$('#search_disease').dataTable()
	ShowDiseaseChild();
}