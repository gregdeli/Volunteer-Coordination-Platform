function header_footer() {
    fetch('/src/pages/admin/header.html').then(response => {return response.text();})
    .then(fileContents => {document.getElementById('header').innerHTML = fileContents;});
    fetch('/src/pages/admin/footer.html').then(response => {return response.text();})
    .then(fileContents => {document.getElementById('footer').innerHTML = fileContents;});
  }
