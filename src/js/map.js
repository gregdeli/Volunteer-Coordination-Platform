let requests_on = [[38, 21.5], [38.1,21.8]];
let offers_on = [[37.66, 21.7],[37.62, 21.49]];
let requests_off = [[37.9, 21.35], [38, 21.4]];
let offers_off = [[38.11, 21.59], [38.11, 21.94]];
let trucks = [[38.13, 21.43], [38.13, 21.84]];
let base = [37.93, 21.72];


const map = L.map('map').setView([38.2, 23], 6.2);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

// images of pins
let iconSize = [40, 40];
let redex = L.icon({iconUrl: '/src/img/redex.png', iconSize: iconSize});
let redgift = L.icon({iconUrl: '/src/img/redgift.png', iconSize: [40, 40]});
let blackex = L.icon({iconUrl: '/src/img/blackex.png', iconSize: [40, 40]});
let blackgift = L.icon({iconUrl: '/src/img/blackgift.png', iconSize: [40, 40]});
let truck = L.icon({iconUrl: '/src/img/truck.png',iconSize: [40, 40]});
let building = L.icon({iconUrl: '/src/img/building.png',iconSize: [80, 80]});


// layers
const all_layer = L.layerGroup();
const requests_on_layer = L.layerGroup();
const offers_on_layer = L.layerGroup();
const requests_off_layer = L.layerGroup();
const offers_off_layer = L.layerGroup();
const trucks_layer = L.layerGroup();

const lines_layer = L.layerGroup();

for (let i = 0; i < requests_on.length; i++) {
  const marker1 = L.marker(requests_on[i], {icon: redex})
    .bindPopup('<b>Fire!!!</b>');
    marker1.addTo(requests_on_layer);
    marker1.addTo(all_layer);
}
for (let i = 0; i < offers_on.length; i++) {
    const marker2 = L.marker(offers_on[i], {icon: redgift})
      .bindPopup('<b>Fire!!!</b>');
      marker2.addTo(offers_on_layer);
      marker2.addTo(all_layer);
}
for (let i = 0; i < requests_off.length; i++) {
    const marker3 = L.marker(requests_off[i], {icon: blackex})
      .bindPopup('<b>Fire!!!</b>');
      marker3.addTo(requests_off_layer);
      marker3.addTo(all_layer);
}
for (let i = 0; i < offers_off.length; i++) {
    const marker4 = L.marker(offers_off[i], {icon: blackgift})
      .bindPopup('<b>Fire!!!</b>');
      marker4.addTo(offers_off_layer);
      marker4.addTo(all_layer);
}
for (let i = 0; i < trucks.length; i++) {
    const marker5 = L.marker(trucks[i], {icon: truck})
      .bindPopup('<b>Fire!!!</b>');
      marker5.addTo(trucks_layer);
      marker5.addTo(all_layer);
}

let marker6 = L.marker(base, {icon: building, draggable:true, autoPan:true}).addTo(map)
    .bindPopup('<b>Fire!!!</b>');

let markxy;

marker6.on('dragstart', function(e) {
    markxy = [marker6.getLatLng().lat, marker6.getLatLng().lng];
});
marker6.on('dragend', function(e) {
    if (!confirm("Move?")) {
        marker6.setLatLng(markxy)
    }
});


let lines_list = [];
let polyline1 = L.polyline([[38.13, 21.43], [37.9, 21.35]], {color: 'blue'});
let polyline2 = L.polyline([[38.13, 21.43], [38, 21.4]], {color: 'red'});
let polyline3 = L.polyline([[38.13, 21.84], [38.11, 21.59]], {color: 'red'});

lines_list.push(polyline1);
lines_list.push(polyline2);
lines_list.push(polyline3);

for (let i = 0; i < lines_list.length; i++) {
    lines_list[i].addTo(lines_layer);
    lines_list[i].addTo(all_layer);
}

const overlays = {
    'All': all_layer,
	'Requests_on': requests_on_layer,
    'Offers_on': offers_on_layer,
    'Requests_off': requests_off_layer,
    'Offers_off': offers_off_layer,
    'Trucks': trucks_layer,
    'Lines': lines_layer
};

const layerControl = L.control.layers(overlays).addTo(map);


/*--------------------

function onMapClick(e) {
    L.popup(e.latlng, {content: `You clicked the map at ${e.latlng.toString()}`})
    .openOn(map);
}
map.on('click', onMapClick);

const popup = L.popup()
    .setLatLng([51.513, -0.09])
    .setContent('I am a standalone popup.')
    .openOn(map);

*/