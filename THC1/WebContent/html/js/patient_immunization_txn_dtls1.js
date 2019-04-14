var oTable;
var ipadd=sessionStorage.getItem("ip-add");
var token = sessionStorage.getItem("token");
function error(jqXHR, exception){
	var msg ='';
	   if (jqXHR.status === 0) {
	       msg = 'Server is in off';
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

var headers = {'x-access-token':token};
$(document).ready(function(){
	ShowCountries();
});
$('#add_button').click(function(){
	swal({  
		title:"",   
	   text: "Your Record Added Successfully !",   
	   timer: 2000,   
	   showConfirmButton: false 
   });
});
$('#update_button').click(function(){
	swal({  
		title:"",   
	   text: "Your Record Updated Successfully !",   
	   timer: 2000,   
	   showConfirmButton: false 
   });
});

function ShowCountries() {
	var mrno=sessionStorage.getItem("mrno");
	    $.ajax({
	        "type":"GET",
	        "url":"https://"+ipadd+":3000/api/v1/patient_immunization_txn_dtls1/"+mrno,
	        "data": "",
	        "dataSrc": "",
	        "headers": headers,
	        dataType: 'json'}).
	        done(function (data) {
	        	p_txn_id=data.patient_immunization_txn.pa_i_t_id;
	        	p_txn_notes=data.patient_immunization_txn.notes;
	        	data1=data.patient_immunization_txn_dtls;
	        	id=data.patient_immunization_txn_dtls.id;
	        	sessionStorage.setItem("pa_i_t_id",p_txn_id);
	        	sessionStorage.setItem("notes",p_txn_notes);
	        	
	            oTable = $('#example23').DataTable({
	            	
	            	"searching" : false,
					"paging" : false,
					"bInfo" : false,
					"ordering" : false,
				
	                "language": {
	                    "zeroRecords": "No Records Found"
	                },
	                "dom": '<"toolbar">frtip',
	                data: data1,
	                "columns": [
					
		            { "data": "id" },
		            { "data": "immunization_name" },
		            { "data": "dose_amount" },
		            { "data": "dose_unit" },
		            {
		            	   "data": "Id",
		            	   render: function (data, type, row) {

		            	       return "<button id1='" + row.id + "'_edit' onclick='edit(this.id1)'><i class='fa fa-pencil-square-o btn-primary btn-sm' title='Edit' data-toggle='tooltip'></i></button>"
  									}
		            	},
		            	 {
			            	   "data": "Id",
			            	   render: function (data, type, row) {

			            	       return "<button id='" + row.id + "'_edit' onclick='Remove(this.id)'><i class='fa fa-trash-o btn-primary btn-sm' title='Delete' data-toggle='tooltip'></i></button>"
	  									}
			            	} 
		         ]
	            });    
	        }).fail(function (jqXHR, exception) {
	      		error(jqXHR, exception);
	      	});
	};
	
	
$(function(){
	  $.ajax({
	         type:"GET",
	         headers: {'x-access-token':token},
	         url:"https://"+ipadd+":3000/api/v1/immunization",
	         data:""}).done(function(json) 
	         	{ 
	        	 	var results=JSON.parse(json);
	        	 	
	        	 		$.each(results, function(index, item)
	        	 				{
	        	 				$("#immunization").append("<option value="+item.immunization_id+">" + item.immunization_name + "</option>");
	        	 				}); 
	         	}).
	         	fail(function (jqXHR, exception) {
		      		error(jqXHR, exception);
		      	});
	});
function edit(id){
	$('#example23 tbody').on('click', 'tr', function () {
		$("#add_button").hide();
		$("#update_button").show();
	    var data = oTable.row( this ).data();
	    var index=oTable.row(this).index();
	    var notes=sessionStorage.getItem("notes")
	    $("#immunization").val(data.immunization_id);
	    $("#idate").val(data.immunization_date);
	    $("#ir option:selected").text(data.immunization_route);
        $("#ia").val(data.administration_site);
        $("#iamount").val(data.dose_amount);
        $("#iunit").val(data.dose_unit);
        $("#iform").val(data.dose_form);
        $("#notes").val(notes); 
        sessionStorage.setItem("id",data.id);
        
	} );
}
function save(){
	var pa_txn_id=sessionStorage.getItem("pa_i_t_id");
	var immunization_id=$("#immunization").val();
	pa_t_i_id=pa_txn_id;
	if(pa_t_i_id=="undefined"){
		if(immunization_id==""){
			add2();
		}else{
			Add();
		}
		
	}
	else{
		update();
	}
	
}
function update(){
	var pa_txn_id=sessionStorage.getItem("pa_i_t_id");
	var mrno=sessionStorage.getItem("mrno");
	var postData ={};
	
	var immunization_id=$("#immunization").val();
	var immunization_date=$("#idate").val();
	var immunization_route=$("#ir option:selected").text();
	var administration_site=$("#ia").val();
	var dose_amount=$("#iamount").val();
	var dose_unit=$("#iunit").val();
	var dose_form=$("#iform").val();
	postData.notes=$("#notes").val();
	postData.updated_by="anji";
	postData.updated_on=new Date();
	postData.MRNo =mrno;
	postData.pa_i_t_id=pa_txn_id;
	postData.immunization_id=immunization_id;
	postData.immunization_date=immunization_date;
    postData.immunization_route=immunization_route;
    postData.administration_site=administration_site;
    postData.dose_amount=dose_amount;
    postData.dose_unit=dose_unit;
    postData.dose_form=dose_form;
       
$(function() {
		$.ajax({
					type :"put",
					headers : {
						'x-access-token' : token
					},
					url :"https://"+ipadd+":3000/api/v1/patient_immunization_txn_dtls1/patient_immunization_txn_dtls1",
					dataType:"json",
					data:JSON.stringify(postData),
					contentType : "application/json"})
					.done(function(data){
						document.getElementById("addform").reset();
						$("#ir").prop("selectedIndex", 0);
						reload_table();
						
					}).
					fail(function (jqXHR,exception) {
			      		error(jqXHR, exception);
			      	});
				});
}


function add2(){
	var pa_txn_id=sessionStorage.getItem("pa_i_t_id");
	var mrno=sessionStorage.getItem("mrno");
	var postData ={};
	postData.MRNo =mrno;		
	 postData.notes=$("#notes").val();
	 postData.pa_i_t_id=pa_txn_id;
	 $(function() {
			$.ajax({
						type :"post",
						headers : {
							'x-access-token' : token
						},
						url :"https://"+ipadd+":3000/api/v1/patient_immunization_txn_dtls1/create",
						dataType :"json",
						data :JSON.stringify(postData),
						contentType : "application/json"}).done(function(data) {
							document.getElementById("addform").reset();
							$("#add_button").show();
							$("#update_button").hide();
							 reload_table();
						}).
						fail(function (jqXHR, exception) {
				      		error(jqXHR, exception);
				      	});
					});
}

function update1(){
	var pa_txn_id=sessionStorage.getItem("pa_i_t_id");
	var mrno=sessionStorage.getItem("mrno");
	var id=sessionStorage.getItem("id");
	var postData ={};
	postData.MRNo =mrno;
	postData.pa_i_t_id=pa_txn_id;
	postData.id=id;
	postData.updated_by="anji";
	postData.updated_on=new Date();
	postData.immunization_id=$("#immunization").val();
	postData.immunization_date=$("#idate").val();
    postData.immunization_route=$("#ir option:selected").text();
    postData.administration_site=$("#ia").val();
    postData.dose_amount=$("#iamount").val();
    postData.dose_unit=$("#iunit").val();
    postData.dose_form=$("#iform").val();
    postData.notes=$("#notes").val();
    $(function() {
		$.ajax({
					type :"PUT",
					headers : {
						'x-access-token' : token
					},
					url :"https://"+ipadd+":3000/api/v1/patient_immunization_txn_dtls1/patient_immunization_txn_dtls1/patient_immunization_txn_dtls1",
					contentType: "application/json" ,
					dataType: "text",
					data :JSON.stringify(postData),
					contentType : "application/json"}).done(function(data) {
						 reload_table();
						 $("#add_button").show();
						 $("#update_button").hide();
						document.getElementById("addform").reset();
						$("#ir").prop("selectedIndex", 0);
						
					}).
					fail(function (jqXHR, exception) {
			      		error(jqXHR, exception);
			      	});
				});
	
	
}
	
function Add(){
	var mrno=sessionStorage.getItem("mrno");
	var postData ={};
	postData.MRNo =mrno;
	postData.notes=$("#notes").val();
	postData.created_by="anji";
	postData.created_on=new Date();
	postData.immunization_id=$("#immunization").val();
	postData.immunization_date=$("#idate").val();
    postData.immunization_route=$("#ir option:selected").text();
    postData.administration_site=$("#ia").val();
    postData.dose_amount=$("#iamount").val();
    postData.dose_unit=$("#iunit").val();
    postData.dose_form=$("#iform").val();
    postData.id =sessionStorage.getItem("id");   
$(function() {
		$.ajax({
					type :"POST",
					headers : {
						'x-access-token' : token
					},
					url :"https://"+ipadd+":3000/api/v1/patient_immunization_txn_dtls1/",
					dataType : "json",
					data :JSON.stringify(postData),
					contentType : "application/json"}).done(function(data) {
						document.getElementById("addform").reset();
						$("#ir").prop("selectedIndex", 0);
						 reload_table();
						
					}).
					fail(function (jqXHR, exception) {
			      		error(jqXHR, exception);
			      	});
				});
	
	
}
function Remove(id1){
		$(function() {
			$.ajax({
						type :"DELETE",
						headers : {
							'x-access-token' : token
						},
						url :"https://"+ipadd+":3000/api/v1/patient_immunization_txn_dtls1/patient_immunization_txn_dtls1/"+id1,
						dataType :"json",
						data :"",
						contentType :"application/json"
							}).done(function(data){
								document.getElementById("addform").reset();
								$("#ir").val('');
								$("#ir").prop("selectedIndex", 0);
							 reload_table();
							 $("#add_button").show();
							 $("#update_button").hide();
							 
						}).
						fail(function (jqXHR, exception) {
				      		error(jqXHR, exception);
				      	});
					});
	
	
	
	
}
function reload_table(){
	$('#example23').dataTable().fnClearTable();
	$('#example23').dataTable().fnDestroy();
	ShowCountries();
}
function cancel(){
	$("#add_button").show();
	$("#update_button").hide();
	$("#ir").prop("selectedIndex", 0);
}
