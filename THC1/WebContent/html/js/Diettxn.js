var tblSearchDiet;
var tblDietSelection;
var tokenKey = sessionStorage.getItem("token");
var headers = {
	'x-access-token' : tokenKey
};
var ipadd=sessionStorage.getItem("ip-add");
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

function showDietList() {
	$('#search_diet').DataTable().clear();
	$('#search_diet').DataTable().destroy();
	
	var id1=$("#searchform").val();
	if((id1.length==0)) {
		alert("Please Enter a value")
		tblSearchDiet= $('#search_diet').DataTable({
		  	  "scrollY": "130px",
			  "lengthChange":false
		})
	}else{
	  $.ajax({
	        "type": "GET",
	        "url": "https://"+ipadd+":3000/api/v1/diettxn/all/"+id1,
	        "data": "",
	        "dataSrc": "",
	        "headers": headers,
	        dataType: 'json'})
	       .done(function (data) {
	        	tblSearchDiet= $('#search_diet').DataTable({
	        		"bSort":false,
	        		"scrollY": "150px",
	    	        "scrollCollapse": true,
	                "language": {
	                    "zeroRecords": "No Records Found"
	                },
	                "dom": '<"toolbar">frtip',
	                data: data,
	                "columns": [
	                { "data": "diet_id" },
	                { "data": "diet_name" },
	                {
	            	   "data": "diet_id",
	            	      render: function (data, type, row) {
	            	    	  return "<button class='btn-view' id='" + row.diet_id + "_add'><i class='fa fa-plus btn-primary btn-sm' title='Add' data-toggle='tooltip'></i></button>"
	            	                      	       
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


function ShowDietChild() {
	   var mrno=sessionStorage.getItem("mrno");
       var eid=sessionStorage.getItem("eid");
       var vid=sessionStorage.getItem("vid");
	const jqxhr= $.ajax({
       "type": "GET",
       "url": "https://"+ipadd+":3000/api/v1/diettxn/"+mrno+"/"+eid+"/"+vid,
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
    	  tblDietSelection = $('#diet_selection').DataTable({
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
               { "data": "diet_id" },
               { "data": "diet_name" },
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
			})
     	}
 
$(document).ready(function() {
	$("#list").show();
	$("#list2").show();
	$("#textarea").show();

	tblSearchDiet = $('#search_diet').DataTable({
		/*"paging": false,
	     "searching": false,
	     "bInfo": false,
	     "scrollY": "200px",
	     "scrollcollapse": true,*/
});
	tblDietSelection = $('#diet_selection').DataTable({
		 "paging": false,
	     "searching": false,
	     "bInfo": false,
	     "scrollY": "200px",
	     "scrollcollapse": true,    
		  data: "",
          "columns": [
          { "data": "diet_id" },
          { "data": "diet_name" },
          {
      	   "data": "",
      	      render: function (data, type, row) { 
      	    	
      	        return "<button class='btn-delete'><i class='fa fa-trash-o btn-primary btn-sm' title='Delete' data-toggle='tooltip'></i></button>"
      	 	
      	      }
          }
       ]
		
	});
	
	$('#search_diet tbody').on('click', '.btn-view', function (e) {
        var data = tblSearchDiet.row($(this).parents('tr') ).data();
        var dobject={};
	        dobject.diet_id = data["diet_id"];
			dobject.diet_name = data["diet_name"];
			var data1=tblDietSelection.data();
	        for(var i=0;i<data1.length;i++){
	           if(dobject.diet_id ==data1[i].diet_id){
	             alert("Duplicate...")
	             //location.reload(Drug.html)
	             tr.row("#"+data1[i].diet_id).remove().draw();
	           }
	        }
	 	tblDietSelection.row.add(dobject).draw(true);
	} );
	
	$('#diet_selection tbody').on('click', '.btn-delete', function (e) {
		  tblDietSelection.row($(this).parent().parent()).remove().draw(true);
    });
	
		$('#diet_selection').DataTable().clear();
		$('#diet_selection').DataTable().destroy();
		ShowDietChild();

});


function post(){
	var tableLength = $('#diet_selection tr').length - 1;
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
	
		var id = (tblDietSelection.cell(i, 0).data());
			datarecord.id=id;
		var name=(tblDietSelection.cell(i,1).data());
			datarecord.name=name;
		recordsList.push(datarecord);
 }
 if(datarecord.id==null){
	 alert("Please add some Diets");
 }else{
	postData.data =recordsList;
	const jqxhr= $.ajax({
    	type:"post",
    	headers:headers,
    	url:"https://"+ipadd+":3000/api/v1/diettxn/",
    	dataType: "json",
    	data:JSON.stringify(postData),
    	contentType:"application/json"})
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

function update() {
	sessionStorage.setItem("id",4);
	var id=sessionStorage.getItem("id");
    var note=$("#text").val();
	var tableLength = $('#diet_selection tr').length-1;
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
		var id=tblDietSelection.cell(i,0).data();
		var dname=tblDietSelection.cell(i,1).data();
		datarecord.id=id;
		datarecord.dname=dname;
		recordsList.push(datarecord);
	}
	if(datarecord.id==null){
		alert("Please add some Diets");
	}else{
   postData.data =recordsList;		
  const jqxhr= $.ajax({
		type : "PUT",
		"headers": headers,
		url :"https://"+ipadd+":3000/api/v1/diettxn/update",
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
	$('#search_diet').dataTable().fnClearTable();
	$('#search_diet').dataTable().fnDestroy();
	$('#diet_selection').dataTable().fnClearTable();
	$('#diet_selection').dataTable().fnDestroy();
	$('#search_diet').dataTable()
	ShowDietChild();
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