$.ajax({
    type: "POST",
    url: "isConnected.php",
    success: function(response) {
        if (response.trim() === "notConnected") {
            window.location.replace("login_form.html"); 
        } else {
            document.getElementById("admin_name").innerHTML = response;
            console.log("connected");
        }
    }
});
