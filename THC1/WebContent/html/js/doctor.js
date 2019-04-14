var token = sessionStorage.getItem("token");
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
$(function(){
	 $.ajax({
		       "type": "GET",
		       "url": "https://"+ipadd+":3000/api/v1/expert",
		       "data": "",
		       "dataSrc": "",
		     	headers: {"x-access-token":token},
		       dataType: 'json'
		       })
		       .done( function (data) {
		    	   var options;
		           options += '<option  id="" value="">Select</option>'; 
		           $.each(data,function(i,f){ 
		             $('#expert').html('');  
		             options += '<option  id="' + f.facility_center_id  + '" value="' + f.facility_center_id+ '">' + f.facility_center_name + '</option>'; 
		             $('#expert').append(options); 
		             $('#expert1').append(options); 
		             });
		       })
		   	.fail(function (jqXHR, exception) {
				error(jqXHR, exception);
			});
})
    var oTable;
	function ShowLists() {
		   $.ajax({
		       "type": "GET",
		       "url": "https://"+ipadd+":3000/api/v1/doctor",
		       "data": "",
		       "dataSrc": "",
		     	headers: {"x-access-token":token},
		       dataType: 'json',
			   })
			   
		       .done( function (data) {
		           oTable = $('#example').DataTable({
		               "language": {
		                   "zeroRecords": "No Records Found"
		               },
		               "dom": '<"toolbar">frtip',
		               data: data,
		               "columns": [

		           { "data": "doctor_id" },
		           { "data":"salutation_name",
		        	 "data":"doctor_name",
		        	 "data":null,
		        	   render:function(data,type,row){
		        		   return data.salutation_name+" "+data.doctor_name;
		        	   }
		           },
		           { "data": "qualification" },
		           { "data": "specialization_name" },
		           { "data": "personal_contact_no"},
		           { "data": "email_id"},
		           { "data": "doctor_id", sortable: false,
		    		    render: function (data, type, row) {

		    		        return "<button id='" + row.doctor_id + "_edit' onclick='editDoctors(" + row.doctor_id + ")'><i class='fa fa-pencil-square-o btn-primary btn-sm' title='Edit' data-toggle='tooltip'></i></button>"

		    		    }
		    		}   
		         ]
		           });
		       })
		   	.fail(function (jqXHR, exception) {
				error(jqXHR, exception);
			});
		};	
	function addDoctor() {
		var expertname=$("#expert").val();
		var did=$("#id").val();
		var salutation=$("#salu").val();
		var doctorname=$("#dname").val();
		var qualification=$("#qual").val();
		var specialization=$("#special").val();
		var regno=$("#rgno").val();
		var address1=$("#hmno").val();
		var address2=$("#sname").val();
		var officeno=$("#ocno").val();
		var mobile=$("#mobile").val();
		var email=$("#email").val();
		var country=$("#country option:selected").val();
		var state=$("#state option:selected").val();
		var district=$("#district option:selected").val();
		var city=$("#city option:selected").val();
		var zipcode=$("#pcode").val();
		var resaddress1=$("#hmno1").val();
		var resaddress2=$("#sname1").val();
		var resofficeno=$("#rcno").val();
		var rescountry=$("#rcountry option:selected").val();
		var resstate=$("#rstate option:selected").val();
		var resdistrict=$("#rdistrict option:selected").val();
		var rescity=$("#rcity option:selected").val();
		var zipcode1=$("#rpcode").val();
		var username="Ramya";
		var data={
				"expert_center_name":expertname,
				"doctor_id":did,   
				 "doctor_name":doctorname, 
				 "title":salutation,
				 "qualification":qualification,
				 "specialisatiion":specialization,
				 "register_no":regno,
				 "address_line_1":address1,       
				 "address_line_2":address2,
				 "office_contact_no":officeno,
				 "personal_contact_no":mobile,
				 "email_id":email,
				 "country":country, 
				 "state":state,
				 "district":district,
				 "city":city, 
				 "zipcode":zipcode,
				 "residence_address_line_1":resaddress1,
				 "residence_address_line_2":resaddress2,
				 "residence_contact_no":resofficeno,
				 "res_country":rescountry, 
				 "res_state":resstate,
				 "res_district":resdistrict,
				  "res_city":rescity, 
				 "zip":zipcode1,                   
				 "craeted_by":username 
		        };
		$.ajax({
			type:"POST",
			url:"https://"+ipadd+":3000/api/v1/doctor/",
			headers: {"x-access-token":token},
			data:JSON.stringify(data),
			contentType:"application/json",
	        dataType: "text" , //Expected data format from server
	    	async:false
		    })
			.done(function(data) 
			{   $("#doctor-add")[0].reset();
			     display();
			     reload_table();
			})
			.fail(function (jqXHR, exception) {
				error(jqXHR, exception);
			});
	};
    function editDoctors(id){
    	$("#list").hide();
    	$("#add").hide();
    	$("#badd").hide();
    	$("#edit").show();
    	sessionStorage.setItem("doctorid",id);
    	var id=sessionStorage.getItem("doctorid");
    	if(!(id==null)){
    		 $.ajax({
    	          type:"GET",
    	          url:"https://"+ipadd+":3000/api/v1/doctor/"+id,
    	          data:"",
    	          headers: {"x-access-token":token},
    		      })
    	       .done(function(json) {
    	            var data=JSON.parse(json);
    	            $.each(data,function(i,obj){
    	            	 $("#expert1").find( 'option[value="' + obj.expert_center_name + '"]' ).prop( "selected", true );
    	            	$("#id1").val(obj.doctor_id);
    	        		 $("#salu1" ).find( 'option[value="' + obj.title + '"]' ).prop( "selected", true );
    	        		$("#dname1").val(obj.doctor_name);
    	        		$("#qual1").val(obj.qualification);
    	        		 $("#special1" ).find( 'option[value="' + obj.specialisatiion + '"]' ).prop( "selected", true );
    	        	    $("#rgno1").val(obj.register_no);
    	        		$("#hmno11").val(obj.address_line_1);
    	        		$("#sname11").val(obj.address_line_2);
    	        		$("#ocno1").val(obj.office_contact_no);
    	        		$("#mobile1").val(obj.personal_contact_no);
    	        	    $("#email1").val(obj.email_id);
    	        	    $("#country1" ).find( 'option[value="' + obj.country + '"]' ).prop( "selected", true );
    	        	    $("#state1" ).find( 'option[value="' + obj.state + '"]' ).prop( "selected", true );
    	        		$("#district1" ).find( 'option[value="' + obj.district + '"]' ).prop( "selected", true );
    	        		$("#city1" ).find( 'option[value="' + obj.city + '"]' ).prop( "selected", true );
    	        		$("#pcode1").val(obj.zip);
    	        		$("#hmno12").val(obj.residence_address_line_1);
    	        		$("#sname12").val(obj.residence_address_line_2);
    	        		$("#rcno1").val(obj.residence_contact_no);
    	        		$("#rcountry1" ).find( 'option[value="' + obj.res_country + '"]' ).prop( "selected", true );
    	        	    $("#rstate1" ).find( 'option[value="' + obj.res_state + '"]' ).prop( "selected", true );
    	        		$("#rdistrict1" ).find( 'option[value="' + obj.res_district + '"]' ).prop( "selected", true );
    	        		$("#rcity1" ).find( 'option[value="' + obj.res_city + '"]' ).prop( "selected", true );
    	        	    $("#rpcode1").val(obj.zip);
    	            });
    	          })
    	          .fail(function (jqXHR, exception) {
    	  			error(jqXHR, exception);
    	  		});
    }
    }
    function editDoctor()
       {  
    	var did=sessionStorage.getItem("doctorid");
    	var expert=$("#expert1").val();
		var salutation=$("#salu1").val();
		var doctorname=$("#dname1").val();
		var qualification=$("#qual1").val();
		var specialization=$("#special1").val();
		var regno=$("#rgno1").val();
		var address1=$("#hmno11").val();
		var address2=$("#sname11").val();
		var officeno=$("#ocno1").val();
		var mobile=$("#mobile1").val();
		var email=$("#email1").val();
		var country=$("#country1 option:selected").val();
		var state=$("#state1 option:selected").val();
		var district=$("#district1 option:selected").val();
		var city=$("#city1 option:selected").val();
		var zipcode=$("#pcode1").val();
		var resaddress1=$("#hmno12").val();
		var resaddress2=$("#sname12").val();
		var resofficeno=$("#rcno1").val();
		var rescountry=$("#rcountry1 option:selected").val();
		var resstate=$("#rstate1 option:selected").val();
		var resdistrict=$("#rdistrict1 option:selected").val();
		var rescity=$("#rcity1 option:selected").val();
		var zipcode1=$("#rpcode1").val();
		var username="Ramya";
		var time=updatetime();
		var data={
				"expert_center_name":expert,
				"doctor_id":did,   
				 "doctor_name":doctorname, 
				 "title":salutation,
				 "qualification":qualification,
				 "specialisatiion":specialization,
				 "register_no":regno,
				 "address_line_1":address1,       
				 "address_line_2":address2,
				 "office_contact_no":officeno,
				 "personal_contact_no":mobile,
				 "email_id":email,
				 "country":country, 
				 "state":state,
				 "district":district,
				 "city":city, 
				 "Zipcode":zipcode,
				 "residence_address_line_1":resaddress1,
				 "residence_address_line_2":resaddress2,
				 "residence_contact_no":resofficeno,
				 "res_country":rescountry, 
				 "res_state":resstate,
				 "res_district":resdistrict,
				  "res_city":rescity, 
				 "zip":zipcode1,                   
				 "updated_by":username,
				 "updated_on":time
		        };
		$.ajax({
			type:"PUT",
			url:"https://"+ipadd+":3000/api/v1/doctor/update",
			headers: {"x-access-token":token},
			data:JSON.stringify(data),
			contentType:"application/json",
	        dataType: "text" , //Expected data format from server
	        async:false
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
    function reload_table(){
		  $("#example").dataTable().fnClearTable();
		  $("#example").dataTable().fnDestroy();
		  ShowLists();	
		   }
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
		$("#badd").show();
	}
  function add(){
	$("#badd").hide();
  	$("#list").hide();
  	$("#add").show();
  	$("#edit").hide();
    }
    function updatetime()
    {
        var today = new Date();
        var date = today.getFullYear()+"-"+(today.getMonth()+1)+"-"+today.getDate();
        var time = today.getHours() +":"+ today.getMinutes()+":"+ today.getSeconds();
        var time=date+" "+time;
        return time;
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

  
