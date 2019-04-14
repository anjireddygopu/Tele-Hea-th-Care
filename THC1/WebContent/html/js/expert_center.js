var token = sessionStorage.getItem("token");
var ipadd=sessionStorage.getItem("ip-add");
		var oTable;
		function ShowLists() {
			$.ajax(
							{
								"type":"GET",
								"url":"https://"+ipadd+":3000/api/v1/facilities",
								"data" : "",
								"dataSrc" : "",
								headers : {
									"x-access-token":token
								},
								dataType : 'json',
							})
					.done(
							function(data) {
								sessionStorage.setItem("user1",data.contact_no1);
								oTable = $('#example')
										.DataTable(
												{
													"language" : {
														"zeroRecords" : "No Records Found"
													},
													"dom" : '<"toolbar">frtip',
													data : data,
													"columns" : [

															{
																"data" : "facility_center_id"
															},
															{
																"data" : "facility_center_name"
															},
															{
																"data" : "contact_person_name"
															},
															{
																"data" : "contact_no1"
															},
															{
																"data" : "email_id"
															},
															{
																"data" : "active",
																render : function(
																		data,
																		type,
																		row) {
																	if (data == true) {
																		return "<input type='checkbox' id='" + row.facility_center_id + "_active' checked='checked'/>"
																	} else {
																		return "<input type='checkbox' id='" + row.facility_center_id + "_active'/>"
																	}
																	;
																}
															},
															{
																"data" : "facility_center_id",
																sortable : false,
																render : function(
																		data,
																		type,
																		row) {

																	return "<button id='"
																			+ row.facility_center_id
																			+ "_edit' onclick='editFacilities("
																			+ row.facility_center_id
																			+ ")'><i class='fa fa-pencil-square-o btn-primary btn-sm' title='Edit' data-toggle='tooltip'></i></button>"

																}
															}

													]
												});

							}).fail(function(jqXHR, exception) {
						error(jqXHR, exception);
					});

		};

		function addFacilities() {
			var fid = $("#id").val();
			var name = $("#name").val();
			var status = $("#check1:checked").val();
			var address1 = $("#hmno").val();
			var address2 = $("#sname").val();
			var country = $("#country option:selected").val();
			var state = $("#state option:selected").val();
			var district = $("#district option:selected").val();
			var city = $("#city option:selected").val();
			var zipcode = $("#pcode").val();
			var longitude = $("#longi").val();
			var latitude = $("#lati").val();
			var contactname = $("#cname").val();
			var email = $("#email").val();
			var mobile = $("#mobile").val();
			var phno = $("#phno").val();
			var fax = $("#fno").val();
			var password=$("#password").val();
			var username = "Ramya";
			var data = {
				"facility_center_id" : fid,
				"facility_center_name" : name,
				"active" : status,
				"address_line1" : address1,
				"address_line2" : address2,
				"country" : country,
				"state" : state,
				"district" : district,
				"zip" : zipcode,
				"longitude" : longitude,
				"latitude" : latitude,
				"contact_person_name" : contactname,
				"email_id" : email,
				"contact_no1" : mobile,
				"contact_no2" : phno,
				"fax" : fax,
				"created_by" : username,
				"city" : city,
				"password":password
			};
		
			$.ajax({
								type : "POST",
								url : "https://"+ipadd+":3000/api/v1/facilities/",
								headers : {
									"x-access-token":token
								},
								data :JSON.stringify(data),
								// contentType: "application/json" ,	// content type sent to server
								contentType: "application/json" ,
								dataType: "text" 
							})//Expected data format from server
					.done(function(data) {
						 $("#expert-add")[0].reset();
						display();
						reload_table();
					}).fail(function(jqXHR, exception) {
						error(jqXHR, exception);
					});
		};
		function editFacilities(id) {
			$("#badd").hide();
			$("#list").hide();
			$("#add").hide();
			$("#edit").show();
			sessionStorage.setItem("id", id);
			var id = sessionStorage.getItem("id");
			if (!(id == null)) {
				$.ajax({
									type : "GET",
									url :"https://"+ipadd+":3000/api/v1/facilities/"+ id,
									data : "",
									headers : {
										"x-access-token":token
									},
								})
						.done(
								function(json) {
									var data = JSON.parse(json);
									$
											.each(
													data,
													function(i, obj) {
														$("#id1")
																.val(
																		obj.facility_center_id);
														$("#name1")
																.val(
																		obj.facility_center_name);
														$("#check1:checked")
																.val(obj.active);
														if (obj.active == 1) {
															$("#check11").prop(
																	"checked",
																	true);
														} else {
															$("#check11").prop(
																	"checked",
																	false);
														}

														$("#hmno1")
																.val(
																		obj.address_line1);
														$("#sname1")
																.val(
																		obj.address_line2);
														$("#country1")
																.find(
																		'option[value="'
																				+ obj.country
																				+ '"]')
																.prop(
																		"selected",
																		true);
														$("#state1")
																.find(
																		'option[value="'
																				+ obj.state
																				+ '"]')
																.prop(
																		"selected",
																		true);
														$("#district1")
																.find(
																		'option[value="'
																				+ obj.district
																				+ '"]')
																.prop(
																		"selected",
																		true);
														$("#city1")
																.find(
																		'option[value="'
																				+ obj.city
																				+ '"]')
																.prop(
																		"selected",
																		true);
														$("#pcode1").val(
																obj.zip);
														$("#longi1").val(
																obj.longitude);
														$("#lati1").val(
																obj.latitude);
														$("#cname1")
																.val(
																		obj.contact_person_name);
														$("#email1").val(
																obj.email_id);
														$("#mobile1")
																.val(
																		obj.contact_no1);
														$("#phno1")
																.val(
																		obj.contact_no2);
														$("#fno1").val(obj.fax);
														$("#password1").val(obj.password);
														$("#cpassword1").val(obj.password);

													});
								}).fail(function(jqXHR, exception) {
							error(jqXHR, exception);
						});
			}
		}
		function editFacilitie() {
			var fid = sessionStorage.getItem("id");
			var name = $("#name1").val();
			var status = $("#check11:checked").val();
			var address1 = $("#hmno1").val();
			var address2 = $("#sname1").val();
			var country = $("#country1 option:selected").val();
			var state = $("#state1 option:selected").val();
			var district = $("#district1 option:selected").val();
			var city = $("#city1 option:selected").val();
			var zipcode = $("#pcode1").val();
			var longitude = $("#longi1").val();
			var latitude = $("#lati1").val();
			var contactname = $("#cname1").val();
			var email = $("#email1").val();
			var mobile = $("#mobile1").val();
			var phno = $("#phno1").val();
			var fax = $("#fno1").val();
			var password=$("#password1").val();
			var username = "Ramya";
			var time = updatetime();
			var data = {
				"facility_center_name" : name,
				"active" : status,
				"address_line1" : address1,
				"address_line2" : address2,
				"country" : country,
				"state" : state,
				"district" : district,
				"zip" : zipcode,
				"longitude" : longitude,
				"latitude" : latitude,
				"contact_person_name" : contactname,
				"email_id" : email,
				"contact_no1" : mobile,
				"contact_no2" : phno,
				"fax" : fax,
				"updated_by" : username,
				"updated_on" : time,
				"city" : city,
				"password":password,
				"facility_center_id" : fid,

			};
	         		$.ajax({
								type : "PUT",
								url : "https://"+ipadd+":3000/api/v1/facilities/update",
								headers : {
									"x-access-token":token
								},
								data:JSON.stringify(data),
								contentType:"application/json",
								dataType : "text", //Expected data format from server
								async : false
							}).done(function(data) {
						display();
						reload_table();
					}).fail(function(jqXHR, exception) {
						error(jqXHR, exception);
					});

		}
		function reload_table() {
			$("#example").dataTable().fnClearTable();
			$("#example").dataTable().fnDestroy();
			ShowLists();
		}
		function display() {
			$("#list").show();
			$("#badd").show();
			$("#add").hide();
			$("#edit").hide();
		}
		function cancel() {
			$("#list").show();
			$("#add").hide();
			$("#edit").hide();
			$("#badd").show();
		}
		function add() {
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
		function updatetime() {
			var today = new Date();
			var date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-"
					+ today.getDate();
			var time = today.getHours() + ":" + today.getMinutes() + ":"
					+ today.getSeconds();
			var time = date + " " + time;
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
