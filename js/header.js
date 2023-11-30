var filePath = 'header.html';

fetch(filePath)
    .then(response => {return response.text();})
    .then(fileContents => {document.getElementById('header').innerHTML = fileContents;});