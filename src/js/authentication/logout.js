function logout()
{
    $.ajax({
        type: "POST",
        url: "/src/php/authentication/logout.php",
        success: function(response) {
            response = JSON.parse(response);
            if (response.value) 
                window.location.replace(response.message);
        },
        error: function () {
            console.log("ERROR");
        }
    });
}