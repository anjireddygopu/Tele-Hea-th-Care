var token = sessionStorage.getItem("token");
$("#dob").change(function() {
	var dob=$("#dob").val();
	dob = new Date(dob);
	var today = new Date();
	var age = Math.floor((today-dob) / (365.25 * 24 * 60 * 60 * 1000));
	$('#age').val(age);

	});
document.getElementById('aadharno').addEventListener('input', function (e) {
    e.target.value = e.target.value.replace(/[^\dA-Z]/g, '').replace(/(.{4})/g, '$1 ').trim();
  });
  var ipadd=sessionStorage.getItem("ip-add");
    var oTable;
	function ShowLists() {
		   $.ajax({
		       "type": "GET",
		       "url": "https://"+ipadd+":3000/api/v1/patient",
		       "data": "",
		       "dataSrc": "",
		   	headers: {"x-access-token":token},
		       dataType: 'json',
		   })
		     .done(function (data) {
		           oTable = $('#example').DataTable({
		               "language": {
		                   "zeroRecords": "No Records Found"
		               },
		               "dom": '<"toolbar">frtip',
		               data: data,
		               "columns": [

		           { "data": "record_no" },
		           { "data":"first_name",
			        	 "data":"last_name",
			        	 "data":null,
			        	   render:function(data,type,row){
			        		   return data.first_name+" "+data.last_name;
			        	   }
			           },
		           { "data": "date_of_birth" },
		           { "data": "mobile_number" },
		           { "data": "emergency_name" },
		           {
		    		    "data": "record_no", sortable: false,
		    		    render: function (data, type, row) {

		    		        return "<button id='\"" + row.record_no + "\"_edit' onclick='editPatients(\"" + row.record_no + "\")'><i class='fa fa-pencil-square-o btn-primary btn-sm' title='Edit' data-toggle='tooltip'></i></button>  <button id='" + row.record_no + "_edit' onclick='history(\"" + row.record_no + "\")'><i class='fa fa-reply-all btn btn-primary btn-sm' title='Patient History' data-toggle='tooltip'></i></button> <button id='" + row.record_no + "_edit' onclick='caseinfo(\"" + row.record_no + "\")' ><i class='fa fa-plus-square btn-primary btn-sm' title='New Case' data-toggle='tooltip'></i></button>"

		    		    }
		    		}
		           
		        	    
		         ]
		           });  
		       })
		   	.fail(function (jqXHR, exception) {
				error(jqXHR, exception);
			});
		};
    function addPatient(){
    	var recordno=getId();
    	var firstname=$("#fname").val();
    	var lastname=$("#lname").val();
    	var gender=$("#gender").val();
    	var dob=$("#dob").val();
    	var age=$("#age").val();
    	var maritalstatus=$("#mstatus").val();
    	var bloodgroup=$("#bgroup").val();
    	var language=$("#language").val();
    	var aadharno=$("#aadharno").val();
    	var occupation=$("#occupation").val();
    	var religion=$("#religion").val();
    	var nationality=$("#nationality").val();
    	var incomegroup=$("#igroup").val();
    	var address1=$("#hmno").val();
    	var address2=$("#sname").val();
    	var address3=$("#location").val();
    	var email=$("#email").val();
    	var mobilenumber=$("#mobile").val();
    	var phonenumber=$("#hphno").val();
    	var country=$("#country").val();
    	var state=$("#state").val();
    	var district=$("#district").val();
    	var city=$("#city").val();
    	var pincode=$("#pcode").val();
    	var emergencyname=$("#emname").val();
    	var relation=$("#relation").val();
    	var phonenumber1=$("#phno1").val();
    	var mobilenumber1=$("#phno2").val();
    	var username="ramya";
    	var data={ "record_no":recordno,
    		       "first_name":firstname,
    		       "last_name":lastname,
    		       "gender":gender,
    			   "date_of_birth":dob,
    			   "patient_age":age,
    			   "marital_status":maritalstatus,
    			   "blood_group":bloodgroup,
    			   "language":language,
    			    "aadhar_number":aadharno,
    			    "occupation":occupation,
    			    "religion":religion,
    			    "nationality":nationality,
    			    "income_group":incomegroup,
    			    "address_line_1":address1,
    			    "address_line_2":address2,
    			    "address_line_3":address3,
    			    "email_id":email,
    			    "mobile_number":mobilenumber,
    			    "phone_number":phonenumber,
    			    "country":country,
    			    "state":state,
    			    "district":district,
    			    "city":city,
    			    "pincode":pincode,
    			    "emergency_name":emergencyname,
    			    "relationship":relation,
    			    "emergency_phone_number":phonenumber1,
    			    "emergency_mobile_number":mobilenumber1,
    			     "created_by":username    	 	    	
    	}
    	$.ajax({
    		type:"POST",
    		url:"https://"+ipadd+":3000/api/v1/patient/",
    		headers: {"x-access-token":token},
    		data:JSON.stringify(data),
    		contentType: "application/json" ,
			dataType: "text"
    	   })
    		.done(function(data) 
    		{    
    			 $("#patient-reg")[0].reset();
    		     display();
    		     reload_table();
    		  
    		})
    		.fail(function (jqXHR, exception) {
    			error(jqXHR, exception);
    		});
    }	
  
    function editPatients(id){
    	$("#list").hide();
    	$("#add").hide();
    	$("#badd").hide();
    	$("#edit").show();
    	sessionStorage.setItem("recordno",id);
    	var id=sessionStorage.getItem("recordno");
    	if(!(id==null)){
    		 $.ajax({
    	          type:"GET",
    	          url:"https://"+ipadd+":3000/api/v1/patient/"+id,
    	          data:"",
    	          headers: {"x-access-token":token},
    		   })
    	         .done(function(json) {
    	        var data=JSON.parse(json);
    	            $.each(data,function(i,obj){
    	            	$("#recordno1").val(obj.record_no);
    	                $("#fname1").val(obj.first_name);
    	            	$("#lname1").val(obj.last_name);
    	            	$("#gender1" ).find( 'option[value="' + obj.gender + '"]' ).prop( "selected", true );
    	                $("#dob1").val(obj.date_of_birth);
    	            	$("#age1").val(obj.patient_age);
    	            	$("#mstatus1" ).find( 'option[value="' + obj.marital_status + '"]' ).prop( "selected", true );
    	            	$("#bgroup1" ).find( 'option[value="' + obj.blood_group + '"]' ).prop( "selected", true );
    	            	$("#language1" ).find( 'option[value="' + obj.language + '"]' ).prop( "selected", true );
    	            	$("#aadharno1").val(obj.aadhar_number);
    	            	$("#occupation1" ).find( 'option[value="' + obj.occupation + '"]' ).prop( "selected", true );
    	            	$("#religion1" ).find( 'option[value="' + obj.religion + '"]' ).prop( "selected", true );
    	            	$("#nationality1" ).find( 'option[value="' + obj.nationality + '"]' ).prop( "selected", true );
    	            	$("#igroup1" ).find( 'option[value="' + obj.income_group + '"]' ).prop( "selected", true );
    	                $("#hmno1").val(obj.address_line_1);
    	            	$("#sname1").val(obj.address_line_2);
    	                $("#location1").val(obj.address_line_3);
    	            	$("#email1").val(obj.email_id);
    	            	$("#mobile1").val(obj.mobile_number);
    	            	$("#hphno1").val(obj.phone_number);
    	            	$("#country1" ).find( 'option[value="' + obj.country + '"]' ).prop( "selected", true );
    	        	    $("#state1" ).find( 'option[value="' + obj.state + '"]' ).prop( "selected", true );
    	        		$("#district1" ).find( 'option[value="' + obj.district + '"]' ).prop( "selected", true );
    	        		$("#city1" ).find( 'option[value="' + obj.city + '"]' ).prop( "selected", true );
    	            	$("#pcode1").val(obj.pincode);
    	            	$("#emname1").val(obj.emergency_name);
    	            	$("#relation1").val(obj.relationship);
    	            	$("#phno11").val(obj.emergency_phone_number);
    	            	$("#phno21").val(obj.emergency_mobile_number);
    	            });
    	          })
    	          .fail(function (jqXHR, exception) {
    	  			error(jqXHR, exception);
    	  		});
    }
    }
    function editPatient(){
    	var recordno=sessionStorage.getItem("recordno");
    	var firstname=$("#fname1").val();
    	var lastname=$("#lname1").val();
    	var gender=$("#gender1").val();
    	var dob=$("#dob1").val();
    	var age=$("#age1").val();
    	var maritalstatus=$("#mstatus1").val();
    	var bloodgroup=$("#bgroup1").val();
    	var language=$("#language1").val();
    	var aadharno=$("#aadharno1").val();
    	var occupation=$("#occupation1").val();
    	var religion=$("#religion1").val();
    	var nationality=$("#nationality1").val();
    	var incomegroup=$("#igroup1").val();
    	var address1=$("#hmno1").val();
    	var address2=$("#sname1").val();
    	var address3=$("#location1").val();
    	var email=$("#email1").val();
    	var mobilenumber=$("#mobile1").val();
    	var phonenumber=$("#hphno1").val();
    	var country=$("#country1").val();
    	var state=$("#state1").val();
    	var district=$("#district1").val();
    	var city=$("#city1").val();
    	var pincode=$("#pcode1").val();
    	var emergencyname=$("#emname1").val();
    	var relation=$("#relation1").val();
    	var phonenumber1=$("#phno11").val();
    	var mobilenumber1=$("#phno21").val();
    	var username="ramya";
    	var time=updatetime();
    	var data={ "record_no":recordno,
    		       "first_name":firstname,
    		       "last_name":lastname,
    		       "gender":gender,
    			   "date_of_birth":dob,
    			   "patient_age":age,
    			   "marital_status":maritalstatus,
    			   "blood_group":bloodgroup,
    			   "language":language,
    			    "aadhar_number":aadharno,
    			    "occupation":occupation,
    			    "religion":religion,
    			    "nationality":nationality,
    			    "income_group":incomegroup,
    			    "address_line_1":address1,
    			    "address_line_2":address2,
    			    "address_line_3":address3,
    			    "email_id":email,
    			    "mobile_number":mobilenumber,
    			    "phone_number":phonenumber,
    			    "country":country,
    			    "state":state,
    			    "district":district,
    			    "city":city,
    			    "pincode":pincode,
    			    "emergency_name":emergencyname,
    			    "relationship":relation,
    			    "emergency_phone_number":phonenumber1,
    			    "emergency_mobile_number":mobilenumber1,
    			     "updated_by":username ,
    			     "updated_on":time
    	}
    	$.ajax({
    		type:"PUT",
    		url:"https://"+ipadd+":3000/api/v1/patient/update",
    		headers: {"x-access-token":token},
    		data:JSON.stringify(data),
            contentType: "application/json" ,	// content type sent to server
            dataType: "text" ,
            async:false//Expected data format from server
    	   })
    		.done(function(data) 
    		{  
    		     display();
    		     reload_table();
    		})
    		.fail(function (jqXHR, exception) {
    			error(jqXHR, exception);
    		});
    }
    function new_case(mrno){
    	var postData={"mrno":mrno};
    	$.ajax({
			url:"https://"+ipadd+":3000/api/v1/patient/case",
			type:"POST",
			data: JSON.stringify(postData) ,
			contentType: "application/json" ,	
			dataType: "json",
			headers: {"x-access-token":token},
			processdata: true ,
			async:false
			})
			.done(function (response) {
				
				var data1=response.patient_case_details;
				
				sessionStorage.setItem("caseid",data1[0].id);
				sessionStorage.setItem("mrno",data1[0].mrno);
				sessionStorage.setItem("eid",data1[0].episode_id);
				sessionStorage.setItem("vid",data1[0].visit_id);
			})
			.fail(function (jqXHR, exception) {
				error(jqXHR, exception);
			})
	}
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
    function display(){
		$("#list").show();
		$("#add").hide();
		$("#edit").hide();
		$("#badd").show();
	}
	function cancel(){
		$("#list").show();
		$("#add").hide();
		$("#edit").hide();
	}

    function add(){
    	$("#list").hide();
    	$("#badd").hide();
    	$("#add").show();
    	$("#edit").hide();
    }
    function reload_table(){
        $("#example").dataTable().fnClearTable();
        $("#example").dataTable().fnDestroy();
        ShowLists();
        	
        }
    function updatetime()
    {
        var today = new Date();
        var date = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
        var time = today.getHours() +":"+ today.getMinutes()+":"+ today.getSeconds();
        var time=date+" "+time;
        return time;
    }
    function getId()
    {
        var today = new Date();
        var date = today.getFullYear()+""+(today.getMonth()+1)+""+today.getDate();
        var time = today.getHours() +""+ today.getMinutes()+""+ today.getSeconds()+""+Math.floor(today.getMilliseconds() / 10).toFixed(0);
        var id="PT"+date+""+time;
        return id;
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
    
    function history(mrno){
    	 $("#page-wrapper").empty();
    	sessionStorage.setItem("mrno",mrno);
    	$("#patientinformation").show();
    	 $("#caseinfo").hide();
    	 $("#masterinformation").hide();
    	 $("#side-menu").hide();
    	
    }
    function caseinfo(mrno){
    	 $("#page-wrapper").empty();
    	sessionStorage.setItem("mrno",mrno);
    	var mrno=sessionStorage.getItem("mrno");
    	$("#patientinformation").hide();
    	 $("#caseinfo").show();
    	 $("#masterinformation").hide();
    	 $("#side-menu").hide();
    	 new_case(mrno);
    	
    }
    function visitcaseinfo(id,mrno,eid,visitid){
    	sessionStorage.setItem("mrno",mrno);
    	var mrno=sessionStorage.getItem("mrno");
   	 	follow_up_visit(mrno);
    	$("#patientinformation").hide();
    	 $("#caseinfo").show();
		 $("#masterinformation").hide();
		 $("#page-wrapper").empty();
    	 $("#side-menu").hide();
    
    	
    }
    
    var oTable1;
function ShowLists1() {
 $.ajax({
     "type": "GET",
     "url": "https://"+ipadd+":3000/api/v1/patient/case-details",
     "data": "",
     "dataSrc": "",
 	headers: {"x-access-token":token},
     dataType: 'json',
 })
   .done(function (data) {
         oTable1 = $('#example1').DataTable({
             "language": {
                 "zeroRecords": "No Records Found"
             },
             "dom": '<"toolbar">frtip',
             data: data,
             "columns": [
          { "data": "id" },
         { "data": "mrno" },
         { "data": "episode_id" },
         { "data": "visit_id" },
         { "data": "posted" },
         {
  		    "data": "id","data":"mrno","data":"episode_id","data":"visit_id", sortable: false,
  		    render: function (data, type, row) {
  		        return "<button id='" + data.id + "_edit' onclick='visitcaseinfo("+row.id+",\"" + row.mrno + "\","+row.episode_id+","+row.visit_id+")'><i class='fa fa-clock-o btn-primary btn-sm' title='Follow Up Visit' data-toggle='tooltip'></i></button> <button id='" + data.id + "_edit' onclick='edit(\"" + row.mrno + "\","+row.episode_id+","+row.visit_id+")'><i class='fa fa-eye btn-primary btn-sm' title='Edit/View' data-toggle='tooltip'></i></button> <button id='" + data.id + "_edit' onclick='pdf(\"" + row.mrno + "\","+row.episode_id+","+row.visit_id+")'><i class='fa fa-file-pdf-o btn-primary btn-sm' title='Download' data-toggle='tooltip'></i></button>"

  		    }
  		}
         
      	    
       ]
         });  
     })
 	.fail(function (jqXHR, exception) {
		error(jqXHR, exception);
	});
};
function edit(mrno,eid,vid){
	sessionStorage.setItem("mrno",mrno);
  	sessionStorage.setItem("eid",eid);
  	sessionStorage.setItem("vid",vid);
//	var mrno=sessionStorage.getItem("mrno");
//	var eid=sessionStorage.getItem("eid");
//	var visitid=sessionStorage.getItem("vid");
	 $("#patientinformation").hide();
	 $("#page-wrapper").empty();
	 $("#caseinfo").show();
	 $("#masterinformation").hide();
	 $("#side-menu").hide();
}
function pdf(mrno,eid,vid){
	pdfgenerate();
	sessionStorage.setItem("mrno",mrno);
  	sessionStorage.setItem("eid",eid);
  	sessionStorage.setItem("vid",vid);
  	
}
function follow_up_visit(mrno){
  	var mrno=sessionStorage.getItem("mrno");
  	var postData={"mrno":mrno};
  	$.ajax({
			url:"https://"+ipadd+":3000/api/v1/patient/visit",
			type:"POST",
			data: JSON.stringify(postData) ,
			contentType: "application/json" ,	
			dataType: "json" ,
			headers: {"x-access-token":token},
			processdata: true
		
			})
			.done(function (response) { 
				// alert((response));
				// alert((response.patient_case_details));
				var data1=response.patient_case_details;
				// alert(data1[0].id);
			//	alert(JSON.stringify(response.patient_case_details));
				sessionStorage.setItem("caseid",data1[0].id);
				sessionStorage.setItem("mrno",data1[0].mrno);
				sessionStorage.setItem("eid",data1[0].episode_id);
				sessionStorage.setItem("vid",data1[0].visit_id);
				reload_table1();
			})
			.fail(function (jqXHR, exception) {
				error(jqXHR, exception);
			});
	}
function reload_table1(){
    $("#example1").dataTable().fnClearTable();
    $("#example1").dataTable().fnDestroy();
    ShowLists1();	
    }
