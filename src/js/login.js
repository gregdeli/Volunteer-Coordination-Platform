function LoginCheck(event) {

    event.preventDefault();
    var uname = document.getElementById("username").value;
    var pw = document.getElementById("password").value;
    
    $.ajax({
        type: "POST",
        url: "/src/php/login.php",
        data: {username: uname, password: pw},
        success: function(response) {
            if (response.trim() === "admin") {
                //u can use also href but then u can go back
                //with replace u cant return to login_form.html 
                window.location.replace("/src/pages/admin/main/map.html"); 
            } else {
                document.getElementById("message").innerHTML = response;
                document.getElementById("username").value = "";
                document.getElementById("password").value = "";
            }
        },
        error: function (request, status, error) {
          alert(request.responseText);
  }
    });
  }
