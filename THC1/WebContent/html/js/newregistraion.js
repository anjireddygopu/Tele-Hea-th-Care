
//$.ajaxSetup({cache:false});
var ipadd=sessionStorage.getItem("ip-add");
function olduser(){
	var username=$('#oldusername').val();
	var password=$('#olduserpassword').val();
	var postData = {};
	postData.username=username;
	postData.password=password;
	var userdata=JSON.stringify(postData)
	
	$.ajax({
		type :"post",
		url :"https://"+ipadd+":3000/login",
		data : userdata,
		contentType : "application/json",
		async:false
		})
	.done(function(json) {
		if(json.status === 200){
			sessionStorage.setItem("token",json.token);
			sessionStorage.setItem("module","satellite");
			sessionStorage.setItem("username",json.user.username);
			//alert(json.token);
			window.open("index.html","_self");
		
		
		}
		else{
			alert(json.message);
		}
		})
	.fail(function(jqXHR,exception) {
		errormessage(jqXHR,exception);			
		})		
}
function errormessage(jqXHR, exception) {
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
     }else if (jqXHR.status === 401) {
         msg = 'Invalid credentials';
     } else if (jqXHR.status === 403) {
         msg = 'username and password incorrect';
     }
     else {
         msg = 'Uncaught Error.\n' + jqXHR.responseText;
     }
    alert(msg);
     }
