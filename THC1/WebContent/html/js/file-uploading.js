var tokenKey = sessionStorage.getItem("token");
var ipadd=sessionStorage.getItem("ip-add");
function uploadFiles() {
		
	   var file = document.getElementById("fileupload")//All files
	   for (var i = 0; i < file.files.length; i++) {
	          uploadSingleFile(file.files[i], i);
	   }
	}
function uploadSingleFile(file, i) {
	  var fileId = i;
      var ajax = new XMLHttpRequest();
      //Progress Listener
      ajax.upload.addEventListener("progress", function (e) {
          var percent = (e.loaded / e.total) * 100;
          $("#status_" + fileId).text(Math.round(percent) + "% uploaded, please wait...");
          $('#progressbar_' + fileId).css("height","20px");
          $('#progressbar_' + fileId).css("width", percent + "%");
          $("#notify_" + fileId).text("Uploaded " + (e.loaded / 1048576).toFixed(2) + " MB of " + (e.total / 1048576).toFixed(2) + " MB ");
      }, false);
      //Load Listener
      ajax.addEventListener("load", function (e) {
        //  $("#status_" + fileId).text(event.target.responseText);
          $('#progressbar_' + fileId).css("width", "100%")

          //Hide cancel button
          var _cancel = $('#cancel_' + fileId);
          _cancel.hide();
        	//document.getElementById("#upload_form").reset();
          display();
          reload_table(); 
        	//document.upload_form.reset(); 
        	$("#divFiles").empty();
        	  
         
      }, false);
     
      //Error Listener
      ajax.addEventListener("error", function (e) {
          $("#status_" + fileId).text("Upload Failed");
      }, false);
      //Abort Listener
      ajax.addEventListener("abort", function (e) {
          $("#status_" + fileId).text("Upload Aborted");
      }, false);
         ajax.open("POST", "https://"+ipadd+":3000/api/v1/upload/");
      // Your API .net, php
         ajax.setRequestHeader("x-access-token",tokenKey);
           var mrno=sessionStorage.getItem("mrno");
           var eid=sessionStorage.getItem("eid");
           var vid=sessionStorage.getItem("vid");
           var uploaderForm = new FormData(); // Create new FormData
           uploaderForm.append("file", file);
           uploaderForm.append("mrno", mrno);
           uploaderForm.append("eid", eid);
           uploaderForm.append("vid", vid);
           var other_data = $('form').serializeArray();
	       $.each(other_data,function(key,input){
	        uploaderForm.append(input.name,input.value);
	         });
          ajax.send(uploaderForm);
      //Cancel button
          var _cancel = $('#cancel_' + fileId);
             _cancel.show();
             _cancel.on('click', function () {
             ajax.abort();
          });
	  }
	 function reset(){
		//$("#upload_form").reset();
		  $('#upload_form').reset();
	 }
	  
var oTable;
var contenttype;
function ShowLists() {
	   var mrno=sessionStorage.getItem("mrno");
       var eid=sessionStorage.getItem("eid");
       var vid=sessionStorage.getItem("vid");
		   $.ajax({
		       "type": "GET",
		       "url": "https://"+ipadd+":3000/api/v1/upload/"+mrno+"/"+eid+"/"+vid,
		       "data": "",
		       "dataSrc": "",
		   	headers: {"x-access-token":tokenKey},
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

		           { "data": "document_id" },
		           { "data": "mr_no" },
		           { "data": "episode_id" },
		           { "data": "visit_id" },
		           { "data": "document_name" },
		           {"data":"document_link","data": "document_id","data":"content_type",
		           "data": null,
		        	   render: function(data, type, row, meta){
		                   if(type === 'display'){                                                                                                                                                                                                                              
		                    
		                	  data= "<button id='" + data+ "_edit' onclick='filedownload(" + data.document_id + " ,\""+ data.document_link +"\")'><i class='fa fa-download btn-primary btn-sm' title='Download' data-toggle='tooltip'></i></button>&nbsp;&nbsp;&nbsp;<button id='" + data+ "_edit' onclick='fileview( "+ data.document_id + " ,\""+ data.content_type +"\" )'><i class='fa fa-eye btn-primary btn-sm' title='View' data-toggle='tooltip'></i></button>"
		                   }
		                   return data;
		                }
		           }    
		         ]
		           });
		           
		       }).fail(function (jqXHR, exception) {
					error(jqXHR, exception);
				}); 
		};

function filedownload(id,name){
			  sessionStorage.setItem("id",id);
			  sessionStorage.setItem("name",name);
			  var id1=sessionStorage.getItem("id");
			  var name=sessionStorage.getItem("name");
			  var ajax = new XMLHttpRequest();
		      var url ="https://"+ipadd+":3000/api/v1/upload/"+id1;
		      ajax.open("GET",url,true);
		      ajax.setRequestHeader("x-access-token",tokenKey);
		          ajax.onreadystatechange = function(){
		              if(this.readyState == 4) {
		            	  var fileName = name;
		            	  var contentType = ajax.getResponseHeader("content-type"); 	 
		                  if(this.status == 200) {
		                      var blob = new Blob([this.response], {type:contentType});
		                      saveAs(blob, fileName);
		                  } else if(this.responseText != "") {
		                      console.log(this.responseText);
		                  }
		              } else if(this.readyState == 2) {
		                  if(this.status == 200) {
		                      this.responseType = "blob";
		                  } else {
		                      this.responseType = "text";
		                  }
		              }
		          };
		      ajax.send(null);  
		}
 function fileview(id,type){
    sessionStorage.setItem("id",id);
    sessionStorage.setItem("type",type);
	 var id1=sessionStorage.getItem("id");
	 var type1=sessionStorage.getItem("type");
	 $("#badd").hide();
	 $("#cancel").show();
	 var type=type1.toUpperCase();
    var url ="https://"+ipadd+":3000/api/v1/upload/"+id1;
   
    if((type==="JPG") || (type==="PNG") ){
   		    jpgcarnstonefunction(url); 
    }
    else  if(type==="DCM"){
    	dicomeimage(url); 
    } 
    
} 
function  jpgcarnstonefunction(url){
	 $("#list").hide();
	 $("#rectangleroi").hide();
	 $("#elipticalroi").hide();
	 $("#length").hide();
	 $("#probe").hide();
	 $("#angle").hide();
	 $("#highlight").hide();
	 $("#freefromroi").hide();
	 $("#erase").hide();
     $("#view").show();  
    
			sessionStorage.setItem("url",url)
			var url=sessionStorage.getItem("url");
			 cornerstoneWebImageLoader.external.cornerstone = cornerstone;
             
             cornerstoneWebImageLoader.configure({
                beforeSend: function(xhr) {
                    // Add custom headers here (e.g. auth tokens)
                	xhr.setRequestHeader("x-access-token",tokenKey);
                }
             });
             const element = document.getElementById('dicomImage');
             function onImageRendered(e) {
                 var viewport = cornerstone.getViewport(e.target);
             };

             element.addEventListener('cornerstoneimagerendered', onImageRendered);
             var config = {
                 // invert: true,
                 minScale: 0.25,
                 maxScale: 20.0,
                 preventZoomOutsideImage: true
             };

             cornerstoneTools.zoom.setConfiguration(config);
             cornerstone.enable(element);
             cornerstone.loadImage(url).then(function(image) {
                 cornerstone.displayImage(element, image);
                 cornerstoneTools.mouseInput.enable(element);
                 cornerstoneTools.mouseWheelInput.enable(element);
                 // Enable all tools we want to use with this element
                 cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button
                 cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button
                 cornerstoneTools.zoom.activate(element, 4); // zoom is the default tool for right mouse button
                 cornerstoneTools.zoomWheel.activate(element); // zoom is the default tool for middle mouse wheel
                 cornerstoneTools.probe.enable(element);
                 cornerstoneTools.length.enable(element);
                 cornerstoneTools.ellipticalRoi.enable(element);
                 cornerstoneTools.rectangleRoi.enable(element);
                 cornerstoneTools.angle.enable(element);
                 cornerstoneTools.highlight.enable(element);
             //    cornerstoneTools.eraser.enable(element);

                activate("wwwc");

                 function activate(id) {
                     document.querySelectorAll('button').forEach(function(elem) {
                         elem.classList.remove('active');
                     });

                     document.getElementById(id).classList.add('active');
                 }

                 // helper function used by the tool button handlers to disable the active tool
                 // before making a new tool active
                 function disableAllTools()
                 {
                     cornerstoneTools.wwwc.disable(element);
                     cornerstoneTools.pan.deactivate(element, 2); // 2 is middle mouse button
                     cornerstoneTools.zoom.deactivate(element, 4); // 4 is right mouse button
                     cornerstoneTools.probe.deactivate(element, 1);
                     cornerstoneTools.length.deactivate(element, 1);
                     cornerstoneTools.ellipticalRoi.deactivate(element, 1);
                     cornerstoneTools.rectangleRoi.deactivate(element, 1);
                     cornerstoneTools.angle.deactivate(element, 1);
                     cornerstoneTools.highlight.deactivate(element, 1);
                     cornerstoneTools.freehand.deactivate(element, 1);
                 //    cornerstoneTools.eraser.deactivate(element, 1);
                 }
                 document.getElementById('wwwc').addEventListener('click', function() {
                     activate('wwwc')
                     disableAllTools();
                     cornerstoneTools.wwwc.activate(element, 1);
                 });
                 document.getElementById('pan').addEventListener('click', function() {
                     activate('pan')
                     disableAllTools();
                     cornerstoneTools.pan.activate(element, 3); // 3 means left mouse button and middle mouse button
                 });
                 document.getElementById('zoom').addEventListener('click', function() {
                     activate('zoom')
                     disableAllTools();
                     cornerstoneTools.zoom.activate(element, 5); // 5 means left mouse button and right mouse button
                 });
              
             });
        } 
        $('#save').click(function(){
            swal({  
                title:"",   
               text: "Your File  Uploaded Successfully !",   
               timer: 2000,   
               showConfirmButton: false 
           });
        });
	function dicomeimage(url){
		$("#list").hide();
		 $("#rectangleroi").show();
		 $("#elipticalroi").show();
		 $("#length").show();
		 $("#probe").show();
		 $("#angle").show();
		 $("#highlight").show();
		 $("#freefromroi").show();
		 $("#erase").show();
		
        $("#view").show();
		sessionStorage.setItem("url",url)
		var url=sessionStorage.getItem("url");
		  url = "wadouri:" + url;
		cornerstoneWADOImageLoader.external.cornerstone = cornerstone;
		
	    cornerstoneWADOImageLoader.configure({
	        beforeSend: function(xhr) {
	            xhr.setRequestHeader("x-access-token",tokenKey);
	        }
	    });

	    var loaded = false;
	    loadAndViewImage(url);
	    function loadAndViewImage(imageId) {
	        var element = document.getElementById('dicomImage');

	        try {
	            var start = new Date().getTime();
	            cornerstone.loadAndCacheImage(imageId).then(function(image) {
	                console.log(image);
	                var viewport = cornerstone.getDefaultViewportForImage(element, image);
	                cornerstone.displayImage(element, image, viewport);
	                if(loaded === false) {
	                    cornerstoneTools.mouseInput.enable(element);
	                    cornerstoneTools.mouseWheelInput.enable(element);
	                    cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button
	                    cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button
	                    cornerstoneTools.zoom.activate(element, 4); // zoom is the default tool for right mouse button
	                    cornerstoneTools.zoomWheel.activate(element); // zoom is the default tool for middle mouse wheel
	                    loaded = true;
	                }

	                

	            }, function(err) {
	                alert(err);
	            });
	        }
	        catch(err) {
	            alert(err);
	        }
	    }

	     cornerstone.events.addEventListener('cornerstoneimageloadprogress', function(event) {
	         const eventData = event.detail;
	         const loadProgress = document.getElementById('loadProgress');
	       // loadProgress.textContent = `Image Load Progress: ${eventData.percentComplete}%`;
	    });

	    function getUrlWithoutFrame() {
	        var url = document.getElementById('wadoURL').value;
	        var frameIndex = url.indexOf('frame=');
	        if(frameIndex !== -1) {
	            url = url.substr(0, frameIndex-1);
	        }
	        return url;
	    }

	    var element = document.getElementById('dicomImage');
	    function onImageRendered(e) {
            var viewport = cornerstone.getViewport(e.target);
        };

        element.addEventListener('cornerstoneimagerendered', onImageRendered);
        var config = {
            // invert: true,
            minScale: 0.25,
            maxScale: 20.0,
            preventZoomOutsideImage: true
        };

        cornerstoneTools.zoom.setConfiguration(config);
        cornerstone.enable(element);
        cornerstone.loadImage(url).then(function(image) {
            cornerstone.displayImage(element, image);
            cornerstoneTools.mouseInput.enable(element);
            cornerstoneTools.mouseWheelInput.enable(element);
            // Enable all tools we want to use with this element
            cornerstoneTools.wwwc.activate(element, 1); // ww/wc is the default tool for left mouse button
            cornerstoneTools.pan.activate(element, 2); // pan is the default tool for middle mouse button
            cornerstoneTools.zoom.activate(element, 4); // zoom is the default tool for right mouse button
            cornerstoneTools.zoomWheel.activate(element); // zoom is the default tool for middle mouse wheel
            cornerstoneTools.probe.enable(element);
            cornerstoneTools.length.enable(element);
            cornerstoneTools.ellipticalRoi.enable(element);
            cornerstoneTools.rectangleRoi.enable(element);
            cornerstoneTools.angle.enable(element);
            cornerstoneTools.highlight.enable(element);
          // cornerstoneTools.eraser.enable(element);

            activate("wwwc");

            function activate(id) {
                document.querySelectorAll('button').forEach(function(elem) {
                    elem.classList.remove('active');
                });

                document.getElementById(id).classList.add('active');
            }

            // helper function used by the tool button handlers to disable the active tool
            // before making a new tool active
            function disableAllTools()
            {
                cornerstoneTools.wwwc.disable(element);
                cornerstoneTools.pan.deactivate(element, 2); // 2 is middle mouse button
                cornerstoneTools.zoom.deactivate(element, 4); // 4 is right mouse button
                cornerstoneTools.probe.deactivate(element, 1);
                cornerstoneTools.length.deactivate(element, 1);
                cornerstoneTools.ellipticalRoi.deactivate(element, 1);
                cornerstoneTools.rectangleRoi.deactivate(element, 1);
                cornerstoneTools.angle.deactivate(element, 1);
                cornerstoneTools.highlight.deactivate(element, 1);
                cornerstoneTools.freehand.deactivate(element, 1);
               // cornerstoneTools.eraser.deactivate(element, 1);
            }
            document.getElementById('wwwc').addEventListener('click', function() {
                activate('wwwc')
                disableAllTools();
                cornerstoneTools.wwwc.activate(element, 1);
            });
            document.getElementById('pan').addEventListener('click', function() {
                activate('pan')
                disableAllTools();
                cornerstoneTools.pan.activate(element, 3); // 3 means left mouse button and middle mouse button
            });
            document.getElementById('zoom').addEventListener('click', function() {
                activate('zoom')
                disableAllTools();
                cornerstoneTools.zoom.activate(element, 5); // 5 means left mouse button and right mouse button
            });
            document.getElementById('length').addEventListener('click', function() {
                activate('length')
                disableAllTools();
                cornerstoneTools.length.activate(element, 1);
            });
            document.getElementById('probe').addEventListener('click', function() {
                activate('probe')
                disableAllTools();
                cornerstoneTools.probe.activate(element, 1);
            });
            document.getElementById('elipticalroi').addEventListener('click', function() {
                activate('elipticalroi')
                disableAllTools();
                cornerstoneTools.ellipticalRoi.activate(element, 1);
            });
            document.getElementById('rectangleroi').addEventListener('click', function() {
                activate('rectangleroi')
                disableAllTools();
                cornerstoneTools.rectangleRoi.activate(element, 1);
            });
            document.getElementById('angle').addEventListener('click', function () {
                activate('angle')
                disableAllTools();
                cornerstoneTools.angle.activate(element, 1);
            });
            document.getElementById('highlight').addEventListener('click', function() {
                activate('highlight')
                disableAllTools();
                cornerstoneTools.highlight.activate(element, 1);
            });
            document.getElementById('freefromroi').addEventListener('click', function() {
                activate('freefromroi')
                disableAllTools();
                cornerstoneTools.freehand.activate(element, 1);
            });
            document.getElementById('erase').addEventListener('click', function() {
                activate('erase');
                disableAllTools();

                // In order for the eraser to work, other tools must be in the 'enable'
                // state. This allows eraser to receive mouse click events on other tools'
                // data.
                cornerstoneTools.probe.enable(element, 1);
                cornerstoneTools.length.enable(element, 1);
                cornerstoneTools.ellipticalRoi.enable(element, 1);
                cornerstoneTools.rectangleRoi.enable(element, 1);
                cornerstoneTools.angle.enable(element, 1);
                cornerstoneTools.highlight.enable(element, 1);
                cornerstoneTools.freehand.enable(element, 1);
               // cornerstoneTools.eraser.enable(element, 1);

               // cornerstoneTools.eraser.activate(element, 1);
            });
        });
	}
		
function add(){
$("#list").hide();
$("#cancel").hide();
$("#badd").hide();
$("#add").show();
$("#view").hide();
}
function reload_table(){
$("#example").dataTable().fnClearTable();
$("#example").dataTable().fnDestroy();
ShowLists();	
}
function display(){
$("#list").show();
$("#add").hide();
$("#view").hide();
$("#cancel").hide();
$("#badd").show();
}
function cancel(){
$("#badd").show();
$("#list").show();
$("#add").hide();
$("#view").hide();
$("#cancel").hide();
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