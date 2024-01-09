function loginCheck(event) {

    event.preventDefault();
    var uname = document.getElementById("username").value;
    var pw = document.getElementById("password").value;
    
    $.ajax({
        type: "POST",
        url: "/src/php/login.php",
        data: {username: uname, password: pw, func: 1},
        success: function(response) {
            response = JSON.parse(response);
            if (response.value) {
                window.location.replace(response.message); 
            } else {
                document.getElementById("message").innerHTML = response.message;
                document.getElementById("username").value = "";
                document.getElementById("password").value = "";
            }
        }
    });
}

function sign_up(){
    window.location.href = "/src/pages/civilian/sign_up.html"; 
}



