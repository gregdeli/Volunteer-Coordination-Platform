function header_footer(category) {
    if (category=='admin') {
        fetch('/src/pages/admin/header.html').then(response => {return response.text();})
        .then(fileContents => {document.getElementById('header').innerHTML = fileContents;});
        fetch('/src/pages/admin/footer.html').then(response => {return response.text();})
        .then(fileContents => {document.getElementById('footer').innerHTML = fileContents;});
    } else if (category=='rescuer') {
        fetch('/src/pages/rescuer/header.html').then(response => {return response.text();})
        .then(fileContents => {document.getElementById('header').innerHTML = fileContents;});
        fetch('/src/pages/rescuer/footer.html').then(response => {return response.text();})
        .then(fileContents => {document.getElementById('footer').innerHTML = fileContents;});
    } else if (category=='civilian') {
        fetch('/src/pages/civilian/header.html').then(response => {return response.text();})
        .then(fileContents => {document.getElementById('header').innerHTML = fileContents;});
        fetch('/src/pages/civilian/footer.html').then(response => {return response.text();})
        .then(fileContents => {document.getElementById('footer').innerHTML = fileContents;});
    }

}