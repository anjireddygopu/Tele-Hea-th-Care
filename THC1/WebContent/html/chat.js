
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
var ipadd = sessionStorage.getItem("ip-add");
var token = sessionStorage.getItem("token");
$.ajax({
    url: "https://192.168.1.143:3000/api/v1/doctor",
    type: 'GET',
    data: "",
    headers: { "x-access-token": token },
    contentType: 'application/json'
}).done(function (json) {
    // alert(JSON.stringify(json));  
    var result = JSON.parse(json);
    var options;
    var expert
    $.each(result, function (i, f) {
        $('#assi').html('');
        options += '<option  value="' + f.personal_contact_no + '">' + f.personal_contact_no + '</option>';
        //sessionStorage.setItem("dphn",f.personal_contact_no);
        $('#assi').append(options);
        $('#assi1').append(options);
         expert = $("#assi option:selected").val();
              
       
    });
    sessionStorage.setItem("datano1", expert);
   
}).fail(function (jqXHR, exception) {
    error(jqXHR, exception);
});
$.ajax({
    "type": "GET",
    "url": "https://192.168.1.143:3000/api/v1/patient",
    "data": "",
    "dataSrc": "",
    headers: { "x-access-token": token },
    dataType: 'json'
})
    .done(function (data) {
        // alert(JSON.stringify(data));
        $.each(data, function (i, f) {
            $('#docname').append('<option value=' + f.mobile_number + '>' + f.mobile_number + '</option>');

            datano = $("#docname option:selected").val();
            sessionStorage.setItem("datano", datano);

            $('#docname1').append('<option value=' + f.mobile_number + '>' + f.mobile_number + '</option>');

        })
    })
    .fail(function (jqXHR, exception) {
        error(jqXHR, exception);
    });

var datano1;
if (sessionStorage.getItem("module") == "satellite") {
    var datano1 = sessionStorage.getItem("datano");
    // alert(datano1);
}
else if(sessionStorage.getItem("module1")=="expertcenter"){
    var datano1 = sessionStorage.getItem("datano1");
    // alert(datano1);
}


var chatC = document.getElementById('chat-container');
var data_user = chatC.getAttribute('data-user');
var a = chatC.setAttribute('data-user', datano1);
var data_user1 = chatC.getAttribute('data-user');
var arr = document.getElementById('docname').value = data_user1;
var chatIncluded = true;
var identity;
var i = 0;
var j = 0;
var localVideo;
var remoteVideo;
var peerConnection;
var peerConnectionConfig = { 'iceServers': [{ 'url': 'stun:stun.services.mozilla.com' }, { 'url': 'stun:stun.l.google.com:19302' }] };

navigator.getUserMedia = navigator.getUserMedia || navigator.mozGetUserMedia || navigator.webkitGetUserMedia;
window.RTCPeerConnection = window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection;
window.RTCIceCandidate = window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate;
window.RTCSessionDescription = window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription;

var panel = null;
var room = null;
var user = null;
var assigned = null;
var runWebRTC = true;
var userSet = false;
window.addEventListener("beforeunload", function () { serverConnection.close(); });

function cal() {

    if (sessionStorage.getItem("module") == "satellite") {
        // alert("satellite call");
        var assi = document.getElementById('assi');
        var assigned_data = assi.options[assi.selectedIndex].value;
        var chatC = document.getElementById('chat-container');
        var data_assigned = chatC.getAttribute('data-assigned');
        document.getElementById('userName').innerHTML = "Calling To" + "&nbsp" + assigned_data;
        chatC.setAttribute('data-assigned', assigned_data);
        readyChat();
    } else if(sessionStorage.getItem("module1")=="expertcenter") {
        //alert("expert call");
        var assi = document.getElementById('docname1');
        var assigned_data = assi.options[assi.selectedIndex].value;
        var chatC = document.getElementById('chat-container');
        var data_assigned = chatC.getAttribute('data-assigned');
        document.getElementById('userName').innerHTML = "Calling To" + "&nbsp" + assigned_data;
        chatC.setAttribute('data-assigned', assigned_data);
        readyChat();
    }
}
readyChat();
function readyChat() {
    document.getElementById("send").addEventListener("click", sendHandler);
    document.getElementById("send-text").addEventListener("keyup", function (evt) { sendTextHandler(evt); });
    panel = document.getElementById("text-chat-panel");
    user = document.getElementById("chat-container").getAttribute("data-user");
    assigned = document.getElementById("chat-container").getAttribute("data-assigned");
    room = document.getElementById("chat-container").getAttribute("data-room");
    pageReady();
}
function sendHandler() {
    var message = document.getElementById("send-text").value;
    if (!message)
        return;
    document.getElementById("send-text").value = "";
    var elem = document.createElement("li");
    elem.className = "m-b-0";
    var di = document.createElement("div");
    di.className = "chat-image";
    var im = document.createElement("img");
    im.src = '../plugins/images/users/govinda.jpg';
    im.className = "img-circle";
    var di1 = document.createElement("div");
    di1.className = "chat-body";
    var di2 = document.createElement("div");
    di2.className = "chat-text";
    var ad = document.createElement("p");
    ad.className = "message-to";
    ad.appendChild(document.createTextNode(message));
    di2.appendChild(ad);
    di1.appendChild(di2);
    di.appendChild(im);
    elem.appendChild(di);
    elem.appendChild(di1);
    panel.appendChild(elem);
    panel.scrollTop = panel.scrollHeight;
    sendMessage(message);
}
function sendTextHandler(evt) {
    if (evt.keyCode == 13)
        sendHandler();
    else
        return;
}
function sendMessage(message) {
    if (runWebRTC) serverConnection.send(JSON.stringify({ 'chat': message }));
}
var serverConnection;
function sendRoomInfo() {

    console.log('sendRoomInfo');
    if (serverConnection.readyState == 1) {
       
        if (sessionStorage.getItem("module") == "satellite") {
            serverConnection.send(JSON.stringify({ 'user': user, 'assigned': assigned }));
            // alert(JSON.stringify({ 'user': user, 'assigned': assigned }));
            userSet = true;
        }
        else if(sessionStorage.getItem("module1")=="expertcenter") {           
            serverConnection.send(JSON.stringify({ 'user': user, 'assigned': assigned }));
            // alert(JSON.stringify({ 'user': user, 'assigned': assigned }));
            userSet = true;
        }

    }
    else {
        setTimeout(sendRoomInfo, 5);
    }
}

function pageReady() {
    localVideo = document.getElementById('localVideo');
    remoteVideo = document.getElementById('remoteVideo');
    serverConnection = new WebSocket('wss://192.168.1.143:3000');
    sendRoomInfo();


    serverConnection.onmessage = function (message) {
        var signal = JSON.parse(message.data);
        //alert(message.data);
        if (signal.online, signal.from) {
            if (sessionStorage.getItem("module") == "satellite") {
                $('#modal').modal('show');
                document.getElementById('userName').innerHTML = "Call From" + "&nbsp" + signal.from;
            } else if(sessionStorage.getItem("module1")=="expertcenter") {
                $('#modal').modal('show');
                //var datano1 =sessionStorage.getItem("datano1");
                document.getElementById('userName').innerHTML = "Call From" + "&nbsp" + signal.from;
            }
            console.log('online');
            document.getElementById("status").className = "online";
            replaceText("status", "ONLINE");
            $('#modal').modal('show');
            $("#docname").prop("disabled", true);
            $('#remotevideo-container').show();
            calling();

        }
        if (signal.to) {
            $('#modal').modal('show');
            $("#assi").prop("disabled", true);
            document.getElementById('userName').innerHTML = "Calling To" + "&nbsp" + signal.to;
            $('#remotevideo-container').show();
        }
        else if (signal.user) {
            if (user !== 'unde') {
                $.ajax({
                    url: "https://" + ipadd + ":3000/status",
                    type: "POST",
                    dataType: "json",
                    data: { "userstatus": user },
                    success: function (d) {

                    },
                    error: function (err) {

                    }

                });
            } else {

            }

        }
        else if (signal.chat) {
            updateChat(signal.chat);
        }
        else if (signal.initiate) {
            start(true);
        }
        else if (signal.reload) {
            document.getElementById("page-wrapper").contentWindow.location.reload();
        }
        else if (signal.sdp) {
            console.log('received sdp info: ' + signal.identity);
            if (!peerConnection) start(false);
            peerConnection.setRemoteDescription(new RTCSessionDescription(signal.sdp), function () {
                peerConnection.createAnswer(function (localDescription) {
                    peerConnection.setLocalDescription(localDescription, function () {
                        console.log('sending sdp answer');
                        var tmp3 = identity + "-" + (j++);
                        serverConnection.send(JSON.stringify({ 'sdp': localDescription, 'identity': tmp3 }));
                    }, errorHandler);
                }, errorHandler);
            }, errorHandler);
            $('#callEnd').show();
        }
        else if (signal.ice) {
            console.log('received ice candidate: ' + signal.identity);
            if (!peerConnection) start(false);
            peerConnection.addIceCandidate(new RTCIceCandidate(signal.ice));
        }
        else if (signal.hangup) {
            console.log('call ended');
            if (peerConnection) {
                peerConnection.close();
                peerConnection = null;
            }
            if ((typeof localStream !== 'undefined') && (localStream)) {
                localStream.stop();
                localStream = null;
            }
            document.getElementById("localvideo-container").style.display = "none";
            document.getElementById("status").className = "offline";
            replaceText("status", "OFFLINE");
            $('#callEnd').hide();
        }
    };
    serverConnection.onclose = function () {
        console.log("datachannel close");
    };
}
function hangup() {
    if (document.getElementById("chat-container").getAttribute("data-user") !== null) {
        serverConnection = new WebSocket('wss://' + window.location.hostname + ':8000');
        var userId = document.getElementById("chat-container").getAttribute("data-user");
        var assignedId = document.getElementById("chat-container").getAttribute("data-assigned");
        function sendMsg() {
            if (serverConnection.readyState == 1) {
                serverConnection.send(JSON.stringify({ 'logout': userId, 'logoutAssigned': assignedId }));
            }
            else {
                setTimeout(sendMsg, 5);
            }
        }
        sendMsg();
    }
    location.reload();
    $('#remotevideo-container').hide();
    $("#assi").prop("disabled", false);
}
function calling() {
    function getMedia() {
        if ((navigator.getUserMedia) && (typeof window.RTCPeerConnection !== 'undefined')) {
            navigator.getUserMedia({ video: true, audio: true }, function (stream) {
                localStream = stream;
                localVideo.src = window.URL.createObjectURL(stream);
                serverConnection.send(JSON.stringify({ 'ready': true }));
            }, errorHandler);

        } else {
            alert('Your browser does not support video-chat.');
        }
    }
    getMedia();

}
function start(isCaller) {
    if (isCaller)
        identity = "Caller";
    else
        identity = "Answerer";
    peerConnection = new RTCPeerConnection(peerConnectionConfig);
    peerConnection.onicecandidate = function (event) {
        if (event.candidate != null) {
            console.log('sending ice candidate');
            var tmp1 = identity + "-" + (i++);
            serverConnection.send(JSON.stringify({ 'ice': event.candidate, 'identity': tmp1 }));
        }
    };
    peerConnection.onaddstream = function (event) {
        console.log("got remote stream");
        remoteVideo.src = window.URL.createObjectURL(event.stream);
        document.getElementById("localvideo-container").style.display = "block";
    };
    $('#modal').modal('hide');
    peerConnection.addStream(localStream);
    if (isCaller) {
        peerConnection.createOffer(function (localDescription) {
            peerConnection.setLocalDescription(localDescription, function () {
                console.log('sending sdp info');
                var tmp2 = identity + "-" + (j++);
                serverConnection.send(JSON.stringify({ 'sdp': localDescription, 'identity': tmp2 }));
            }, errorHandler);
        }, errorHandler);
    }
}
function errorHandler(error) {
    console.log(error);
}
function updateChat(message) {
    var elem = document.createElement("li");
    elem.className = "odd ";
    var di = document.createElement("div");
    di.className = "chat-image";
    var im = document.createElement("img");
    im.src = '../plugins/images/users/govinda.jpg';
    im.className = "img-circle";
    var di1 = document.createElement("div");
    di1.className = "chat-body";
    var di2 = document.createElement("div");
    di2.className = "chat-text";
    var ad = document.createElement("p");
    ad.className = "message-from";
    ad.appendChild(document.createTextNode(message));
    di2.appendChild(ad);
    di1.appendChild(di2);
    di.appendChild(im);
    elem.appendChild(di);
    elem.appendChild(di1);
    panel.appendChild(elem);
    panel.scrollTop = panel.scrollHeight;
}
function replaceText(id, newText) {
    var node = document.getElementById(id);
    while (node.firstChild)
        node.removeChild(node.firstChild);
    node.appendChild(document.createTextNode(newText));
}
