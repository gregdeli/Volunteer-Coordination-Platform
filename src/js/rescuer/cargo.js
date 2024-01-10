let id = 2;


fetch('/src/php/rescuer/cargo/cargo.php?id='+id).then(response => {return response.text();})
    .then(fileContents => {
        let data = JSON.parse(fileContents);
        update_cargo(data.vehicle, data.base, data.cargo);
});


function update_cargo(vehicle,base,cargo){
    const map = L.map('map4distance').setView([37.9, 22], 9);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let dist = map.distance([vehicle[0],vehicle[1]],[base[0],base[1]]);
    document.getElementById('distance').innerHTML = "<p>Distance to Base: "+Math.round(dist)+"m</p>";
    
    if (dist<=100) {
        document.getElementById('cargo_load_button').onclick = function()
        {location.replace(location.href+"/../load.html");};
        document.getElementById('cargo_unload_button').onclick = function()
        {fetch('/src/php/rescuer/cargo/unload.php?id='+id);
            location.reload();};
    } else {
        document.getElementById('cargo_load_button').onclick = function()
        {alert('Go to base!');};
        document.getElementById('cargo_unload_button').onclick = function()
        {alert('Go to base!');};
    }

    let categories_seen = [];
    for (let i = 0; i < cargo.length; i++) {
        let c = cargo[i];

        if (categories_seen.includes(c["category"])) {
            row = document.getElementById('cat_'+c["category"]).insertRow(-1);
            row.insertCell(0).innerText = c["name"];
            row.insertCell(1).innerText = c["quantity"];

        } else {
            html_str = "<details>\
                        <summary><h3>"+c["category"]+"</h3></summary>\
                        <table id=\"cat_"+c["category"]+"\">\
                            <tr>\
                                <td class=\"cargo_item\">"+c["name"]+"</td>\
                                <td>"+c["quantity"]+"</td>\
                            </tr>\
                        </table></details><br/>"
            document.getElementById('cargo_items').innerHTML += html_str;
        }
        categories_seen.push(c["category"]);
    }
    // If there are items, show the unload button
    if (cargo.length>0) {
        document.getElementById('cargo_unload_button').style.display = "inline";}
    // If there are NO items, DONT show the unload button
    if (document.getElementById('cargo_items').innerHTML===""){
        document.getElementById('cargo_items').innerHTML="No items in cargo.<br>Go load some!";
        document.getElementById('cargo_unload_button').style.display = "none";
    }



}


