$.ajax({
    type: "POST",
    url: "/src/php/is_connected.php",
    success: function(response) {
        response = JSON.parse(response);
        if (!response.value) {
            window.location.replace(response.message);
        } 
        else if (response.value) {
            console.log(response.message);
        }
    },
    error: function () {
        console.log("ERROR");
    }
});
