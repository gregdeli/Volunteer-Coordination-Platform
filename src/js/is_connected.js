$.ajax({
    type: "POST",
    url: "/src/php/is_connected.php",
    success: function(response) {
        if (response.trim() === "notConnected") {
            window.location.replace("/src/pages/index.html"); 
        } else {
            document.getElementById("admin_name").innerHTML = response;
            console.log("connected");
        }
    }
});
