function registerCheck(event) {

    event.preventDefault();

    var uname = document.getElementById("username").value;
    var pw = document.getElementById("password").value;
    var r_pw = document.getElementById("repeat-password").value;
    var fname = document.getElementById("fullname").value;
    var phone = document.getElementById("phone").value;

    $.ajax({
        type: "POST",
        url: "/src/php/register.php",
        data: {username: uname, password: pw, r_password: r_pw, fullname: fname, phone: phone },
        success: function(response) {
            response = JSON.parse(response);
            if (response.value) {
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
                document.getElementById("message").innerHTML = "Passwords do not match. Try again";
                document.getElementById("password").value = "";
                document.getElementById("repeat-password").value = "";
            }
        },
        error: function (request) {
          alert(request.responseText);
        }
    });
}
