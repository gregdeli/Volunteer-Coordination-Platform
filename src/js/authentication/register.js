var valid = false;
invoker();

function registerCheck(event, type) {
    event.preventDefault();

    var uname = document.getElementById("username").value;
    var pw = document.getElementById("password").value;
    var r_pw = document.getElementById("repeat-password").value;
    var fname = document.getElementById("fullname").value;
    var phone = document.getElementById("phone").value;
    var latitude = document.getElementById("latitude");
    var longitude = document.getElementById("longitude");
    if (document.contains(latitude) && document.contains(longitude)) {
        latitude = latitude.value; 
        longitude = longitude.value;
    } else {
        latitude = 'NULL'; 
        longitude = 'NULL';
    }
           
    if(valid){
        $.ajax({
            type: "POST",
            url: "/src/php/authentication/register.php",
            data: {user: type, username: uname, password: pw, r_password: r_pw, fullname: fname, phone: phone, latitude: latitude, longitude: longitude},
            success: function(response) {
                response = JSON.parse(response);
                alert(response.message);
                document.getElementById("username").value = "";
                document.getElementById("password").value = "";
                document.getElementById("repeat-password").value = "";
                document.getElementById("fullname").value = "";
                document.getElementById("phone").value = "";
                if (document.contains(document.getElementById("latitude")) && document.contains(document.getElementById("longitude"))) {
                    document.getElementById("latitude").value = "";
                    document.getElementById("longitude").value = "";
                    if (response.value == true)
                        window.location.replace('/src/html/authentication/log_in.html');
                }
            }
        });
    }else{
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        document.getElementById("repeat-password").value = "";
        document.getElementById("fullname").value = "";
        document.getElementById("phone").value = "";
        if (document.contains(document.getElementById("latitude")) && document.contains(document.getElementById("longitude"))) {
            document.getElementById("latitude").value = "";
            document.getElementById("longitude").value = "";
        }
    }
}

function invoker(){
    document.getElementById("username").addEventListener('input', function(){
        validateUsername();
    });
    document.getElementById("password").addEventListener('input', function(){
        validatePassword();
    });
    document.getElementById("repeat-password").addEventListener('input', function(){
        validateRpassword();
    });
    document.getElementById("fullname").addEventListener('input', function(){
        validateFullname();
    });
    document.getElementById("phone").addEventListener('input', function(){
        validatePhone();
    });
    if (document.contains(document.getElementById("latitude")) && document.contains(document.getElementById("longitude"))) {
        document.getElementById("latitude").addEventListener('input', function(){
            validateCoordinates("latitude");
        });
        document.getElementById("longitude").addEventListener('input', function(){
            validateCoordinates("longitude");
        });
    }
}

function validateUsername(){
    var uname = document.getElementById("username").value;
    
    if(uname.length < 2){
        document.getElementById("username_").innerHTML = "*minimum 2 characters";
        valid = false;
    }else{
        document.getElementById("username_").innerHTML = "";
        valid =true;
    }
}
function validatePassword(){
    var pw = document.getElementById("password").value;

    if(pw.length < 5){
        document.getElementById("password_").innerHTML = "*minimum 5 characters";
        valid = false;
    }else{
        document.getElementById("password_").innerHTML = "";
        valid = true;
    }
}
function validateRpassword(){
    var r_pw = document.getElementById("repeat-password").value;
    var pw = document.getElementById("password").value;

    if(pw != r_pw){
        document.getElementById("repeat-password_").innerHTML = "*passwords don't match";
        valid = false;
    }else{
        document.getElementById("repeat-password_").innerHTML = "";
        valid = true;
    }
}
function validateFullname(){
    var fname = document.getElementById("fullname").value;

    if(fname.length < 1){
        document.getElementById("fullname_").innerHTML = "*invalid name";
        valid = false;
    }else{
       document.getElementById("fullname_").innerHTML = "";
       valid = true;
    }
}
function validatePhone(){
    var phone = document.getElementById("phone").value;

    if(!phone.match(/^[0-9]+$/) || phone.length != 10){
        document.getElementById("phone_").innerHTML = "*invalid phone number: 10 digits";
        valid = false;
    }else{
       document.getElementById("phone_").innerHTML = "";
       valid = true;
    }
}
function validateCoordinates(coordinate){
    var coordin = document.getElementById(coordinate).value;

    if(!coordin.match(/^\d{1,4}(\.\d{1,6})?$/) || coordin.length == 0){
        document.getElementById(coordinate+"_").innerHTML = `*invalid ${coordinate}: positive decimal`;
        valid = false;
    }else{
       document.getElementById(coordinate+"_").innerHTML = "";
       valid = true;
    }
}

function getGeolocation() {
    var latitude = document.getElementById("latitude");
    var longitude = document.getElementById("longitude");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        alert('Geolocation is not supported by this browser.');
    }

    function showPosition(position) {
        latitude.value = position.coords.latitude;
        longitude.value = position.coords.longitude;
    }
}