function header(category) {
    if (category=='admin') {
        fetch('/src/html/admin/header.html').then(response => response.text())
        .then(fileContents => {document.getElementById('header').innerHTML = fileContents;});
    } else if (category=='rescuer') {
        fetch('/src/html/rescuer/header.html').then(response => response.text())
        .then(fileContents => {document.getElementById('header').innerHTML = fileContents;});
    } else if (category=='civilian') {
        fetch('/src/html/civilian/header.html').then(response => response.text())
        .then(fileContents => {document.getElementById('header').innerHTML = fileContents;});
    }
}