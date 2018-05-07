/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
// Application Constructor
    initialize: function () {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },
    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
        //this.receivedEvent('deviceready');
        $("#registerButton").click(registerUser);
        $("#buttonLogin").click(loginUser);
        if ((location.pathname + location.search).substr(1) === "home.html") {
            getAllImages();
        }
        if ((location.pathname + location.search).substr(1) === "myPhotos.html") {
            getMyPhotos();
        }
    }
    // Update DOM on a Received Event
    /*receivedEvent: function (id) {
     var parentElement = document.getElementById(id);
     var listeningElement = parentElement.querySelector('.listening');
     var receivedElement = parentElement.querySelector('.received');
     listeningElement.setAttribute('style', 'display:none;');
     receivedElement.setAttribute('style', 'display:block;');
     console.log('Received Event: ' + id);
     }*/
};
app.initialize();
var url = "http://practica07sintesis.000webhostapp.com/";
function registerUser() {
    var username = $("#inputUsernameRegister").val();
    var email = $("#inputEmailRegister").val();
    var password = $("#inputPasswordRegister").val();
    $.ajax({
        type: "POST",
        dataType: "html",
        jsonp: "callback",
                xhrFields: {
            withCredentials: true
        },
        url: url + "practicaSintesis/php/register.php",
        data: {username: username, email: email, password: password},
        success: function (data) {
            window.location.href = 'index.html';
        }
    });
}
;

function loginUser() {
    var email = $("#inputEmailLogin").val();
    var password = $("#inputPasswordLogin").val();
    $.ajax({
        type: "POST",
        dataType: "html",
        jsonp: "callback",
                xhrFields: {
            withCredentials: true
        },
        url: url + "practicaSintesis/php/login.php",
        data: {email: email, password: password},
        success: function (data) {
            if (data == "success") {
                window.location.href = 'home.html';
            } else {

            }
        }
    });
}
function getImage() {
    // Retrieve image file location from specified source
    navigator.camera.getPicture(uploadPhoto, function (message) {
        alert('get picture failed');
    }, {
        quality: 50,
        destinationType: navigator.camera.DestinationType.FILE_URI,
        sourceType: navigator.camera.PictureSourceType.PHOTOLIBRARY
    }
    );

}

function uploadPhoto(imageURI) {
    var options = new FileUploadOptions();
    options.fileKey = "file";
    options.fileName = imageURI.substr(imageURI.lastIndexOf('/') + 1);
    options.mimeType = "image/jpeg";

    var params = new Object();
    params.value1 = "test";
    params.value2 = "param";

    options.params = params;
    options.chunkedMode = false;

    var ft = new FileTransfer();
    ft.upload(imageURI, url + "practicaSintesis/php/uploadPhoto.php", win, fail, options);
}

function win(r) {
    console.log("Code = " + r.responseCode.toString() + "\n");
    console.log("Response = " + r.response.toString() + "\n");
    console.log("Sent = " + r.bytesSent.toString() + "\n");
    alert("Code Slayer!!!");
}

function fail(error) {
    alert("An error has occurred: Code = " + error.code);
}
function getAllImages() {
        $.ajax({
        type: "POST",
        dataType: "html",
        jsonp: "callback",
        xhrFields: {
            withCredentials: true
        },
        url: url + "practicaSintesis/php/getAllPhotos.php",
        success: function (response) {
            console.log(response);
            $("#addPhotos").html(response);
        }
    });
}

function getMyPhotos() {
    $.ajax({
        type: "POST",
        dataType: "html",
        jsonp: "callback",
        xhrFields: {
            withCredentials: true
        },
        url: url + "practicaSintesis/php/getAllMyPhotos.php",
        success: function (response) {
            console.log(response);
            $("#addMyPhotos").html(response);
        }
    });

}
 
function delPhoto(id){
        $.ajax({
        type: "POST",
        dataType: "html",
        jsonp: "callback",
        xhrFields: {
            withCredentials: true
        },
        url: url + "practicaSintesis/php/delPhoto.php",
        data: {id: id},
        success: function (response) {
            $("#"+ id).remove();
        }
    });
}

function votePhoto(id,vote){
            $.ajax({
        type: "POST",
        dataType: "html",
        jsonp: "callback",
        xhrFields: {
            withCredentials: true
        },
        url: url + "practicaSintesis/php/votePhoto.php",
        data: {id: id,vote: vote},
        success: function (response) {
            console.log(response);
        }
    });
}