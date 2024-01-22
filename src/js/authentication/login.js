function loginCheck(event) {

    event.preventDefault();
    var uname = document.getElementById("username").value;
    var pw = document.getElementById("password").value;
    
    $.ajax({
        type: "POST",
        url: "/src/php/authentication/login.php",
        data: {username: uname, password: pw},
        success: function(response) {
            response = JSON.parse(response);
            if (response.value) {
                window.location.replace(response.message); 
            } else {
                alert(response.message);
                document.getElementById("username").value = "";
                document.getElementById("password").value = "";
            }
        }
    });
}

function sign_up(){
    window.location.href = "/src/pages/authentication/sign_up.html"; 
}



