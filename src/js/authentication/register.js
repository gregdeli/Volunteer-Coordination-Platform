var valid = false;

function registerCheck(event, type) {

    event.preventDefault();

    var uname = document.getElementById("username").value;
    var pw = document.getElementById("password").value;
    var r_pw = document.getElementById("repeat-password").value;
    var fname = document.getElementById("fullname").value;
    var phone = document.getElementById("phone").value;
 
    if(valid){
        $.ajax({
            type: "POST",
            url: "/src/php/authentication/register.php",
            data: {user: type, username: uname, password: pw, r_password: r_pw, fullname: fname, phone: phone},
            success: function(response) {
                response = JSON.parse(response);
                if (response.value) {//if type =2 respone -> redirect
                    document.getElementById("message").innerHTML = response.message;
                    document.getElementById("username").value = "";
                    document.getElementById("password").value = "";
                    document.getElementById("repeat-password").value = "";
                    document.getElementById("fullname").value = "";
                    document.getElementById("phone").value = "";
                }else if (!response.value){
                    document.getElementById("message").innerHTML = response.message;
                    document.getElementById("username").value = "";
                    document.getElementById("password").value = "";
                    document.getElementById("repeat-password").value = "";
                    document.getElementById("fullname").value = "";
                    document.getElementById("phone").value = "";
                }else {
                    document.getElementById("message").innerHTML = "Invalid inputs. Try again";
                    document.getElementById("password").value = "";
                    document.getElementById("repeat-password").value = "";
                }
            }
        });
    }else{
        document.getElementById("username").value = "";
        document.getElementById("password").value = "";
        document.getElementById("repeat-password").value = "";
        document.getElementById("fullname").value = "";
        document.getElementById("phone").value = "";
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
    
  
