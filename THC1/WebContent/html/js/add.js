var id=sessionStorage.getItem("id");
var ipadd=sessionStorage.getItem("ip-add");
$(function(){ 
	if(!(id==null)){
		 $.ajax({
		          type:"GET",
		          headers: {'x-access-token':"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1MzA3NDY4MjI3OTh9.nJ5WTCI0sUvTYSdT-ieMv4CvRqjIWPMq2xkk2ewOtz0"},
		          url:"https://"+ipadd+":3000/api/v1/countries/"+id,
		          data:"",
		          success:function(json){
		        	  var data=JSON.parse(json);
		            $.each(data,function(key,obj){
		            	var d=$("#cname").val(obj.country_name);
		            	$("#edit").show();
		           
		            });
		          },
		 });
	}

});