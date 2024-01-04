fetch('/src/php/map.php').then(response => {return response.text();})
    .then(fileContents => {
        let data = JSON.parse(fileContents);
        map(data.requests_on, data.requests_off, data.offers_on,
        data.offers_off, data.trucks, data.base, data.lines);
    
});


function map(requests_on, requests_off, offers_on, offers_off, trucks, base, lines){

    const map = L.map('map').setView([38.2, 23], 6.2);

    const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);

    // images of pins
    let iconSize = [40, 40];
    let redex = L.icon({iconUrl: '/src/img/redex.png', iconSize: iconSize});
    let redgift = L.icon({iconUrl: '/src/img/redgift.png', iconSize: iconSize});
    let blackex = L.icon({iconUrl: '/src/img/blackex.png', iconSize: iconSize});
    let blackgift = L.icon({iconUrl: '/src/img/blackgift.png', iconSize: iconSize});
    let truck = L.icon({iconUrl: '/src/img/truck.png',iconSize: iconSize});
    let building = L.icon({iconUrl: '/src/img/building.png',iconSize: [80, 80]});

    // layers
    const all_layer = L.layerGroup();
    const requests_on_layer = L.layerGroup();
    const requests_off_layer = L.layerGroup();
    const offers_on_layer = L.layerGroup();
    const offers_off_layer = L.layerGroup();
    const trucks_layer = L.layerGroup();
    const lines_layer = L.layerGroup();

    for (let i = 0; i < requests_on.length; i++) {
        const marker1 = L.marker([requests_on[i][0],requests_on[i][1]], {icon: redex})
        .bindPopup('<b>'+requests_on[i][2]+'</b>');
        marker1.addTo(requests_on_layer);
        marker1.addTo(all_layer);
    }
    for (let i = 0; i < requests_off.length; i++) {
        const marker2 = L.marker([requests_off[i][0],requests_off[i][1]], {icon: blackex})
        .bindPopup('<b>'+requests_off[i][2]+'</b>');
        marker2.addTo(requests_off_layer);
        marker2.addTo(all_layer);
    }
    for (let i = 0; i < offers_on.length; i++) {
        const marker3 = L.marker([offers_on[i][0],offers_on[i][1]], {icon: redgift})
        .bindPopup('<b>'+offers_on[i][2]+'</b>');
        marker3.addTo(offers_on_layer);
        marker3.addTo(all_layer);
    }
    for (let i = 0; i < offers_off.length; i++) {
        const marker4 = L.marker([offers_off[i][0],offers_off[i][1]], {icon: blackgift})
        .bindPopup('<b>'+offers_off[i][2]+'</b>');
        marker4.addTo(offers_off_layer);
        marker4.addTo(all_layer);
    }
    for (let i = 0; i < trucks.length; i++) {
        const marker5 = L.marker([trucks[i][0],trucks[i][1]], {icon: truck})
        .bindPopup('<b>'+trucks[i][2]+'</b>');
        marker5.addTo(trucks_layer);
        marker5.addTo(all_layer);
    }
    let marker6 = L.marker([base[0],base[1]], {icon: building, draggable:true, autoPan:true})
        .addTo(map).bindPopup('<b>'+base[2]+'</b>');

    // Draggable base
    let markxy;
    marker6.on('dragstart', function(e) {
        markxy = [marker6.getLatLng().lat, marker6.getLatLng().lng];
    });
    marker6.on('dragend', function(e) {
        if (!confirm("Move?")) {
            marker6.setLatLng(markxy)
        }
    });

    // Lines
    for (let i = 0; i < lines.length; i++) {
        let polyline1 = L.polyline([lines[i][0], lines[i][1]], {color: lines[i][2]});
        polyline1.addTo(lines_layer);
        polyline1.addTo(all_layer);
    }

    const overlays = {
        'All': all_layer,
        'Requests_on': requests_on_layer,
        'Requests_off': requests_off_layer,
        'Offers_on': offers_on_layer,
        'Offers_off': offers_off_layer,
        'Trucks': trucks_layer,
        'Lines': lines_layer
    };
    const layerControl = L.control.layers(overlays).addTo(map);
}
