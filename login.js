function LoginCheck(event) {

    event.preventDefault();
    var uname = document.getElementById("username").value;
    var pw = document.getElementById("password").value;
    
    $.ajax({
        type: "POST",
        url: "login.php",
        data: {username: uname, password: pw},
        success: function(response) {
            if (response.trim() === "admin") {
                window.location.href = "admin_page.php";
            } else {
                document.getElementById("message").innerHTML = response;
            }
        },
        error: function (request, status, error) {
          alert(request.responseText);
  }
    });
  }
