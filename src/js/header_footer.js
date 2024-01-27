function header_footer(category) {
    if (category=='admin') {
        fetch('/src/pages/admin/header.html').then(response => response.text())
        .then(fileContents => {document.getElementById('header').innerHTML = fileContents;});
    } else if (category=='rescuer') {
        fetch('/src/pages/rescuer/header.html').then(response => response.text())
        .then(fileContents => {document.getElementById('header').innerHTML = fileContents;});
    } else if (category=='civilian') {
        fetch('/src/pages/civilian/header.html').then(response => response.text())
        .then(fileContents => {document.getElementById('header').innerHTML = fileContents;});
    }
}