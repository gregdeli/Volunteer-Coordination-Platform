function check(type) {
    $.ajax({
        type: "POST",
        url: "/src/php/authentication/is_connected.php",
        data: {type: type},
        success: function(response) {
            response = JSON.parse(response);
            if (response.value) {
                window.location.href = response.message;
            }
        }
    });
}

function click(type) {
    window.history.pushState({}, null, null);
    
    window.addEventListener('popstate', () => {
        $.ajax({
                type: "POST",
                url: "/src/php/authentication/is_connected.php",
                data: {type: type},
                success: function(response) {
                    response = JSON.parse(response);
                    if (response.value) {
                        window.location.href = response.message;
                    }
                }
            });
    });
}

