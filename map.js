const map = L.map('map').setView([38.2, 23], 6.2);

const tiles = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);



const marker = L.marker([38.3, 23]).addTo(map)
    .bindPopup('<b>Fire!!!</b>').openPopup();

const circle = L.circle([38.3, 23], {
    color: 'red',
    fillColor: '#f03',
    fillOpacity: 0.5,
    radius: 10000
}).addTo(map).bindPopup('AAAAAAAAAAAAAAAA!!!!!!!!!');
/*
const polygon = L.polygon([
    [51.509, -0.08],
    [51.503, -0.06],
    [51.51, -0.047]
]).addTo(map).bindPopup('I am a polygon.');


const popup = L.popup()
    .setLatLng([51.513, -0.09])
    .setContent('I am a standalone popup.')
    .openOn(map);

function onMapClick(e) {
    popup
        .setLatLng(e.latlng)
        .setContent(`You clicked the map at ${e.latlng.toString()}`)
        .openOn(map);
}

map.on('click', onMapClick);
*/