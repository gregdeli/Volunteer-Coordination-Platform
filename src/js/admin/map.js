fetch('/src/php/admin/map.php').then(response => {return response.text();})
    .then(fileContents => {
        let data = JSON.parse(fileContents);
        let requests_on = get_unique_list(data.requests_on);
        let requests_off = get_unique_list(data.requests_off);
        let offers_on = get_unique_list(data.offers_on);
        let offers_off = get_unique_list(data.offers_off);
        let trucks_loaded = get_unique_list(data.trucks_loaded);   // some active, some inactive
        let trucks_empty = data.trucks_empty;   // some active, some inactive

        let trucks_active = [];
        let trucks_inactive = [];
        // classify loaded trucks by activity and not by load
        for (let i = 0; i < trucks_loaded.length; i++) {
            if (trucks_loaded[i][2].split(", ")[1]=="active") {
                trucks_active.push(trucks_loaded[i]);
            } else {
                trucks_inactive.push(trucks_loaded[i]);
            }
        }
        // classify empty trucks by activity and not by load
        for (let i = 0; i < trucks_empty.length; i++) {
            if (trucks_empty[i][2].split(", ")[1]=="active") {
                trucks_active.push(trucks_empty[i]);
            } else {
                trucks_inactive.push(trucks_empty[i]);
            }
        }

        map(requests_on, requests_off, offers_on,
            offers_off, trucks_active, trucks_inactive, data.base, data.lines);
});


function map(requests_on, requests_off, offers_on, offers_off, trucks_active, trucks_inactive, base, lines){
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
    const requests_on_layer = L.layerGroup();
    const requests_off_layer = L.layerGroup();
    const offers_on_layer = L.layerGroup();
    const offers_off_layer = L.layerGroup();
    const active_trucks_layer = L.layerGroup();
    const inactive_trucks_layer = L.layerGroup();
    const lines_layer = L.layerGroup();

    for (let i = 0; i < requests_on.length; i++) {
        L.marker([requests_on[i][0],requests_on[i][1]], {icon: redex})
        .bindPopup('<b>'+requests_on[i][2]+'</b>').addTo(requests_on_layer);
    }
    for (let i = 0; i < requests_off.length; i++) {
        L.marker([requests_off[i][0],requests_off[i][1]], {icon: blackex})
        .bindPopup('<b>'+requests_off[i][2]+'</b>').addTo(requests_off_layer);
    }
    for (let i = 0; i < offers_on.length; i++) {
        L.marker([offers_on[i][0],offers_on[i][1]], {icon: redgift})
        .bindPopup('<b>'+offers_on[i][2]+'</b>').addTo(offers_on_layer);
    }
    for (let i = 0; i < offers_off.length; i++) {
        L.marker([offers_off[i][0],offers_off[i][1]], {icon: blackgift})
        .bindPopup('<b>'+offers_off[i][2]+'</b>').addTo(offers_off_layer);
    }
    for (let i = 0; i < trucks_active.length; i++) {
        L.marker([trucks_active[i][0],trucks_active[i][1]], {icon: truck})
        .bindPopup('<b>'+trucks_active[i][2]+'</b>').addTo(active_trucks_layer); 
    }
    for (let i = 0; i < trucks_inactive.length; i++) {
        L.marker([trucks_inactive[i][0],trucks_inactive[i][1]], {icon: truck})
        .bindPopup('<b>'+trucks_inactive[i][2]+'</b>').addTo(inactive_trucks_layer); 
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
        } else {
            markxy = [marker6.getLatLng().lat, marker6.getLatLng().lng];
            fetch('/src/php/admin/base.php?lat='+markxy[0]+'&lon='+markxy[1]);
        }
    });

    // Lines
    for (let i = 0; i < lines.length; i++) {
        let polyline1 = L.polyline([lines[i][0], lines[i][1]], {color: lines[i][2]});
        polyline1.addTo(lines_layer);
    }

    const layerControl = L.control.layers().addTo(map);
    layerControl.addOverlay(requests_on_layer, 'Available Requests');
    layerControl.addOverlay(requests_off_layer, 'Requests Undertaken');
    layerControl.addOverlay(offers_on_layer, 'Available Offers');
    layerControl.addOverlay(offers_off_layer, 'Offers Undertaken');
    layerControl.addOverlay(active_trucks_layer, 'Active Trucks');
    layerControl.addOverlay(inactive_trucks_layer, 'Inactive Trucks');
    layerControl.addOverlay(lines_layer, 'Routes');
}


function get_unique_list(ilist) {
    if (ilist.length<1) {
        return [];
    }
    let flist = [];

    // get unique ids
    let ids = [];
    for (let i = 0; i < ilist.length; i++) {
        if (!ids.includes(ilist[i]["id"])) {
            ids.push(ilist[i]["id"]);
        }
    }
    // get final data
    let met_ids = [];
    for (let i = 0; i < ilist.length; i++) {
        let new_id = ilist[i]["id"];
        if (!met_ids.includes(new_id)) {
            flist.push([ilist[i]["coo"][0], ilist[i]["coo"][1], get_description(ilist,new_id)]);
            met_ids.push(new_id);
        }
    }
    return flist;
}


function get_description(ilist, given_id) {
    // start of the description
    let start = "";
    for (let i = 0; i < ilist.length; i++) {
        if (ilist[i]["id"]==given_id) {
            start = ilist[i]["common_per_id"];
            break;
        }
    }
    // end of the description
    let end = "";
    for (let i = 0; i < ilist.length; i++) {
        if (ilist[i]["id"]==given_id) {
            end+=ilist[i]["special_per_id"]+", ";
        }
    }
    return start+end.slice(0,-2);
}
