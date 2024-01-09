let id = 2;


fetch('/src/php/rescuer/cargo/cargo.php?id='+id).then(response => {return response.text();})
    .then(fileContents => {
        let data = JSON.parse(fileContents);
        update_cargo(data.vehicle, data.base);
});


function update_cargo(vehicle,base){
    const map = L.map('map-1').setView([37.9, 22], 9);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    let dist = map.distance([vehicle[0],vehicle[1]],[base[0],base[1]]);
    document.getElementById('distance').innerHTML = "<p>Distance to Base: "+Math.round(dist)+"m</p>";
    
    
}


