function header_footer() {
    fetch('header.html').then(response => {return response.text();})
    .then(fileContents => {document.getElementById('header').innerHTML = fileContents;});
    fetch('footer.html').then(response => {return response.text();})
    .then(fileContents => {document.getElementById('footer').innerHTML = fileContents;});
  }
