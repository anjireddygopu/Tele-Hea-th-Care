var token= sessionStorage.getItem("token");
var ipadd=sessionStorage.getItem("ip-add");
    var oTable;
	function ShowLists() {
		   $.ajax({
		       "type": "GET",
		       "url": "https://"+ipadd+":3000/api/v1/facilitator",
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

		           { "data": "facilitator_id" },
		           { "data":"first_name",
		        	 "data":"last_name",
		        	 "data":null,
		        	   render:function(data,type,row){
		        		   return data.first_name+" "+data.last_name;
		        	   }
		           },
		           { "data": "personal" },
		           { "data": "email_id" },
		           { "data": "facilitator_id", sortable: false,
		    		    render: function (data, type, row) {

		    		        return "<button id='" + row.facilitator_id + "_edit' onclick='editFacilitators(" + row.facilitator_id + ")'><i class='fa fa-pencil-square-o btn-primary btn-sm' title='Edit' data-toggle='tooltip'></i></button>"

		    		    }
		    		}
		           
		        	    
		         ]
		           });

		           
		       })
		      .fail(function (jqXHR, exception) {
					error(jqXHR, exception);
				});
		  
		};

		
	function addFacilitator() {
		var fid=$("#id").val();
		var firstname=$("#fname").val();
		var lastname=$("#lname").val();
		var address1=$("#hmno").val();
		var address2=$("#sname").val();
		var country=$("#country option:selected").val();
		var state=$("#state option:selected").val();
		var district=$("#district option:selected").val();
		var city=$("#city option:selected").val();
		var zipcode=$("#pcode").val();
		var email=$("#email").val();
		var officeno=$("#ocno").val();
		var officeno1=$("#ocno1").val();
		var mobile=$("#mobile").val();
		var username="Ramya";
		var data={
				"facilitator_id":fid,   
				 "first_name":firstname, 
				 "last_name":lastname,              
				 "address_line_1":address1,       
				 "address_line_2":address2,      
				 "country":country,                            
				 "district": district,            
				 "zip":zipcode,                   
				 "email_id":email,
				 "office_contact_no":officeno,
				 "office_extension":officeno1,
				 "personal":mobile,
				 "created_by":username,
				 "state":state, 
				 "city":city
		        };
		$.ajax({
			type:"POST",
			url:"https://"+ipadd+":3000/api/v1/facilitator/",
			headers: {"x-access-token":token},
			data:JSON.stringify(data),
			contentType:"application/json",
	        dataType: "text" , //Expected data format from server
	    	async:false
		    })
			.done(function(data) 
			{  
				 $("#facilitator-add")[0].reset();
			     display();
			     reload_table();
			})
			.fail(function (jqXHR, exception) {
				error(jqXHR, exception);
			});
	};
	 
    function editFacilitators(id){
    	$("#badd").hide();
    	$("#list").hide();
    	$("#add").hide();
    	$("#edit").show();
    	sessionStorage.setItem("facilitatorid",id);
    	var id=sessionStorage.getItem("facilitatorid");
    	if(!(id==null)){
    		 $.ajax({
    	          type:"GET",
    	          url:"https://"+ipadd+":3000/api/v1/facilitator/"+id,
    	          data:"",
    	          headers: {"x-access-token":token},
    		  })
    	         .done(function(json) {
    	            var data=JSON.parse(json);
    	            $.each(data,function(i,obj){
    	            	$("#id1").val(obj.facilitator_id);
    	        		$("#fname1").val(obj.first_name);
    	        		$("#lname1").val(obj. last_name);
    	        	    $("#hmno1").val(obj.address_line_1);
    	        		$("#sname1").val(obj.address_line_2);
    	        		$("#country1" ).find( 'option[value="' + obj.country + '"]' ).prop( "selected", true );
    	        	    $("#state1" ).find( 'option[value="' + obj.state + '"]' ).prop( "selected", true );
    	        		$("#district1" ).find( 'option[value="' + obj.district + '"]' ).prop( "selected", true );
    	        		$("#city1" ).find( 'option[value="' + obj.city + '"]' ).prop( "selected", true );
    	        		$("#pcode1").val(obj.zip);
    	        		$("#email1").val(obj.email_id);
    	        		$("#ocno11").val(obj.office_contact_no);
    	        		$("#ocno12").val(obj.office_extension);
    	        		$("#mobile1").val(obj.personal);
    	        	
    	        		
    	            });
    	          })
    	          .fail(function (jqXHR, exception) {
    	  			error(jqXHR, exception);
    	  		   });
    	      
    	
    	
    }
    }
    function editFacilitator()
    {
    	var fid=sessionStorage.getItem("facilitatorid");
   		var firstname=$("#fname1").val();
		var lastname=$("#lname1").val();
		var address1=$("#hmno1").val();
		var address2=$("#sname1").val();
		var country=$("#country1 option:selected").val();
		var state=$("#state1 option:selected").val();
		var district=$("#district1 option:selected").val();
		var city=$("#city1 option:selected").val();
		var zipcode=$("#pcode1").val();
		var email=$("#email1").val();
		var officeno=$("#ocno11").val();
		var officeno1=$("#ocno12").val();
		var mobile=$("#mobile1").val();
		var username="Ramya";
		var time=updatetime();
	
		var data={
				"facilitator_id":fid,   
				 "first_name":firstname, 
				 "last_name":lastname,              
				 "address_line_1":address1,       
				 "address_line_2":address2,      
				 "country":country,                            
				 "district": district,            
				 "zip":zipcode,                   
				 "email_id":email,
				 "office_contact_no":officeno,
				 "office_extension":officeno1,
				 "personal":mobile,
				 "updated_by":username,
				 "updated_on":time,
				 "state":state,
				 "city":city
		        };
		
		$.ajax({
			type:"PUT",
			url:"https://"+ipadd+":3000/api/v1/facilitator/update",
			headers:{"x-access-token":token},
			data:JSON.stringify(data),
			contentType:"application/json",
	        dataType:"text",
	    	async:false//Expected data format from server
		})
		.done(function(data) 
			{  
			     display();
			     reload_table();
			})
		.fail(function (jqXHR,exception) {
				error(jqXHR,exception);
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

