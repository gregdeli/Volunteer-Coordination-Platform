let global_map;
get_map_and_tasks();


function get_map_and_tasks(){
    fetch('/src/php/rescuer/map/map.php').then(response => response.text())
        .then(fileContents => {
            let data = JSON.parse(fileContents);
            let requests_on = get_unique_list(data.requests_on);
            let requests_off = get_unique_list(data.requests_off);
            let offers_on = get_unique_list(data.offers_on);
            let offers_off = get_unique_list(data.offers_off);
            
            // requests_on -> 38,21.5,Full Name 5, 2100000005,
            // [2023-12-01 12:54:19, Water, 1|1], [2023-12-02 12:54:19, Bread, 2|2]
            let map = present_map(requests_on, requests_off, offers_on,
                                  offers_off, data.truck, data.base, data.lines);
            present_current_tasks(map, requests_off, offers_off, data.truck);
            global_map = map;
    });
}


function present_map(requests_on, requests_off, offers_on, offers_off, truck, base, lines){
    let map;
    try {
        map = L.map('map').setView([37.9, 22], 9);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    } catch (error) {
        global_map.remove();
        map = L.map('map').setView([37.9, 22], 9);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    }

    // images of pins
    let iconSize = [40, 40];
    let redex = L.icon({iconUrl: '/src/img/redex.png', iconSize: iconSize});
    let redgift = L.icon({iconUrl: '/src/img/redgift.png', iconSize: iconSize});
    let blackex = L.icon({iconUrl: '/src/img/blackex.png', iconSize: iconSize});
    let blackgift = L.icon({iconUrl: '/src/img/blackgift.png', iconSize: iconSize});
    let trucki = L.icon({iconUrl: '/src/img/truck.png',iconSize: iconSize});
    let building = L.icon({iconUrl: '/src/img/building.png',iconSize: [80, 80]});

    // layers
    const requests_on_layer = L.layerGroup();
    const requests_off_layer = L.layerGroup();
    const offers_on_layer = L.layerGroup();
    const offers_off_layer = L.layerGroup();
    const lines_layer = L.layerGroup();

    for (let i = 0; i < requests_on.length; i++) {
        const marker1 = L.marker([requests_on[i][0],requests_on[i][1]], {icon: redex})
        .bindPopup('<b name="'+get_description_part(requests_on[i][2],2)+'">'+
                    get_description_part(requests_on[i][2],1)+'</b>');
        marker1.addTo(requests_on_layer);
    }
    for (let i = 0; i < requests_off.length; i++) {
        const marker2 = L.marker([requests_off[i][0],requests_off[i][1]], {icon: blackex})
        .bindPopup('<b>'+get_description_part(requests_off[i][2],1)+'</b>');
        marker2.addTo(requests_off_layer);
    }
    for (let i = 0; i < offers_on.length; i++) {
        const marker3 = L.marker([offers_on[i][0],offers_on[i][1]], {icon: redgift})
        .bindPopup('<b name="'+ get_description_part(offers_on[i][2],2) +'">'+
                    get_description_part(offers_on[i][2],1)+'</b>');
        marker3.addTo(offers_on_layer);
    }
    for (let i = 0; i < offers_off.length; i++) {
        const marker4 = L.marker([offers_off[i][0],offers_off[i][1]], {icon: blackgift})
        .bindPopup('<b>'+get_description_part(offers_off[i][2],1)+'</b>');
        marker4.addTo(offers_off_layer);
    }
    let marker5 = L.marker([truck[0],truck[1]], {icon: trucki, draggable:true, autoPan:true})
        .addTo(map).bindPopup('<b>You!</b>');

    let marker6 = L.marker([base[0],base[1]], {icon: building})
        .addTo(map).bindPopup('<b>'+base[2]+'</b>');

    // Draggable truck
    let markxy;
    marker5.on('dragstart', function(e) {
        markxy = [marker5.getLatLng().lat, marker5.getLatLng().lng];
    });
    marker5.on('dragend', function(e) {
        if (!confirm("Move?")) {
            marker5.setLatLng(markxy)
        } else {
            markxy = [marker5.getLatLng().lat, marker5.getLatLng().lng];
            fetch('/src/php/rescuer/map/truck.php?lat='+markxy[0]+'&lon='+markxy[1]).then(response => {}).then(txt => {get_map_and_tasks();});
            
        }
    });

    // Lines
    for (let i = 0; i < lines.length; i++) {
        let polyline1 = L.polyline([lines[i][0], lines[i][1]], {color: lines[i][2]});
        polyline1.addTo(lines_layer);
    }


    // Make form disapear when not needed
    let close = 0;
    function close_form(e) {
        if (document.getElementById('rescuer_tasks_field').style.display == "grid" && close==0) {close = 1;}
        if (close==1) {
            close = 2;
        } else if (close==2) {
            close = 0;
            document.getElementById('rescuer_tasks_field').style.display = "none";
        }
    }
    document.addEventListener("click", close_form);

    // helper function for handling events
    function choose_task(e, t) {
        
        let pop_text = e.target.getPopup().getContent();
        let lists = tasks_from_popup_description(pop_text);
        let ids = lists[0];
        let descs = lists[1];

        let html_str = "<legend>| <h3>Undertake Tasks</h3> |</legend>";
        for (let i = 0; i < ids.length; i++) {
            html_str = html_str + "<label>" + descs[i] + "</label>";
            html_str = html_str + "<button \
                onclick=\"fetch('/src/php/rescuer/map/undertake_task.php?task_id="+ids[i]+"&task="+t+"').then(response => {}).then(txt => {get_map_and_tasks();});\"/>Choose Task</button>";
        }
        document.getElementById("rescuer_tasks_field").innerHTML = html_str;
        document.getElementById('rescuer_tasks_field').style.display = "grid";
        close = 0;
    }

    // event handling trigger functions
    function show_req(e) {
        choose_task(e, "request");
    }
    function show_off(e) {
        choose_task(e, "offer");
    }

    // If the rescuer has less than 4 tasks
    fetch('/src/php/rescuer/map/has_space.php').then(response => {return response.text();})
    .then(fileContents => {
        let data = JSON.parse(fileContents);
        let has_space = data.has_space;

        // Event handlers for clicking on markers
        if (has_space){
            requests_on_layer.eachLayer(function (layer) {
                layer.on('click', show_req);
            });
            offers_on_layer.eachLayer(function (layer) {
                layer.on('click', show_off);
            });
        }
    });

    const layerControl = L.control.layers().addTo(map);
    layerControl.addOverlay(requests_on_layer, 'Available Requests');
    layerControl.addOverlay(requests_off_layer, 'Requests Undertaken');
    layerControl.addOverlay(offers_on_layer, 'Available Offers');
    layerControl.addOverlay(offers_off_layer, 'Offers Undertaken');
    layerControl.addOverlay(lines_layer, 'Routes');

    return map;
}


function present_current_tasks(map, requests_off, offers_off, truck){
    
    // form with all the current tasks
    if (requests_off.length!=0 || offers_off.length!=0){
        document.getElementById('rescuer_tasks_field2').style.display = "grid";
    } else {
        document.getElementById('rescuer_tasks_field2').style.display = "none";
    }
    let html_str = "<legend>| <h3>Current Tasks</h3> |</legend>";
    // requests
    for (let i = 0; i < requests_off.length; i++) {
        let ids = get_description_part(requests_off[i][2],2).split(" ");
        let fd=[];   // final descriptions to show
        let descs = get_description_part(requests_off[i][2],1);   // Full Name 6, 2100000006, [2023-12-03 12:54:19, username2, 2023-12-03 13:54:19, Water:3]
        let common_start_of_desc = descs.split('[')[0];
        let descs_end = descs.split('[');   // : 2023-12-03 12:54:19, username2, 2023-12-03 13:54:19, Water:3]
        descs_end=descs_end.slice(1,descs_end.length);
        for (let j = 0; j < descs_end.length; j++) {
            let d = descs_end[j].split(']')[0]
            // choose only date, item and quantity
            fd.push(common_start_of_desc + d.split(", ")[0] + ", " + d.split(", ")[3]);
        }
        let dist = map.distance([truck[0],truck[1]],[requests_off[i][0],requests_off[i][1]]);
        for (let j = 0; j < fd.length; j++) {
            html_str = html_str + '<label><img src="/src/img/blackex.png"/>'+fd[j]+'</label>';
            if (dist<=50) {
                html_str = html_str + "<img id=\"check"+ids[j]+"\" class=\"check\" src=\"/src/img/check_button.png\" \
                    onclick=\"fetch('/src/php/rescuer/map/complete_task.php?task_id="+ids[j]+"&task=request').then(response => {}).then(txt => {get_map_and_tasks();});\"/>";

                fetch('/src/php/rescuer/map/has_item.php?task_id='+ids[j]+'&task=request')
                    .then((response) => response.text())
                    .then((data) => {
                        if (data==0){
                            document.getElementById("check"+ids[j]).onclick = function(){alert("Not enough items in cargo.");};
                        }
                    });
            }
            html_str = html_str + "<img role=\"button\" class=\"x\" type=\"image\" src=\"/src/img/x_button.png\" \
            onclick=\"fetch('/src/php/rescuer/map/cancel_task.php?task_id="+ids[j]+"&task=request').then(response => {}).then(txt => {get_map_and_tasks();});\"/>";
        }
    }
    // offers
    for (let i = 0; i < offers_off.length; i++) {
        let ids = get_description_part(offers_off[i][2],2).split(" ");
        let fd=[];   // final descriptions to show
        let descs = get_description_part(offers_off[i][2],1);    // Full Name 6, 2100000006, [2023-12-03 12:54:19, username2, 2023-12-03 13:54:19, Water:3]
        let common_start_of_desc = descs.split('[')[0];
        let descs_end = descs.split('[');   // : 2023-12-03 12:54:19, username2, 2023-12-03 13:54:19, Water:3]
        descs_end=descs_end.slice(1,descs_end.length);
        for (let j = 0; j < descs_end.length; j++) {
            let d = descs_end[j].split(']')[0]
            // choose only date, item and quantity
            fd.push(common_start_of_desc + d.split(", ")[0] + ", " + d.split(", ")[3]);
        }
        let dist = map.distance([truck[0],truck[1]],[offers_off[i][0],offers_off[i][1]]);
        for (let j = 0; j < fd.length; j++) {
            html_str = html_str + '<label><img src="/src/img/blackgift.png"/>'+fd[j]+'</label>';
            if (dist<=50)
                html_str = html_str + "<img class=\"check\" src=\"/src/img/check_button.png\" \
                onclick=\"fetch('/src/php/rescuer/map/complete_task.php?task_id="+ids[j]+"&task=offer').then(response => {}).then(txt => {get_map_and_tasks();});\"/>";
            html_str = html_str + "<img class=\"x\" src=\"/src/img/x_button.png\" \
            onclick=\"fetch('/src/php/rescuer/map/cancel_task.php?task_id="+ids[j]+"&task=offer').then(response => {}).then(txt => {get_map_and_tasks();});\"/>";
        }
    }

    document.getElementById("rescuer_tasks_field2").innerHTML = html_str; 
}


// --- helper functions --- //

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


function get_description(ilist, given_id) {   // for combining stuff with same id
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


function get_description_part(description, part){
    // Gets requests_on[i][2]
    // Like: "Full Name 5, 2100000005,
    // [2023-12-01 12:54:19, Water, 1|1], [2023-12-02 12:54:19, Bread, 2|2]"
    // Splits it on "|"
    let parts = description.split("]");
    let part1 = "";
    let part2 = [];
    for (let i = 0; i < parts.length; i++) {
        part1 = part1 + parts[i].split("|")[0]+"]";
        part2.push(parts[i].split("|")[1]);
    }
    if (part==1)
        return part1.slice(0,-1);
    else if (part==2)
        return part2.join(" ").slice(0,-1);
}


function tasks_from_popup_description(description) {
    // description: <b name="1 2 ">Full Name 5, 2100000005,
    // [2023-12-01 12:54:19, Water, 1], [2023-12-02 12:54:19, Bread, 2]</b>
    // returns a list with task ids and task descriptions
    let ids = description.split('"')[1].split(" ");
    let fd = [];
    let common_start_of_desc = description.split('>')[1].split('<')[0].split('[')[0];
    let descs = description.split('>')[1].split('<')[0].split('[');
    descs=descs.slice(1,descs.length);
    for (let i = 0; i < descs.length; i++) {
        fd.push(common_start_of_desc + descs[i].split(']')[0]);
    }
    return [ids,fd];
}
