//setInterval(fetchAnnouncements, 60000);//60 sec

function fetchAnnouncements() {
    fetch('/src/php/civilian/announcements_list.php?func=1')
    .then(response=>response.text())
    .then(announcements=>{
        var list = JSON.parse(announcements);
        createList(list);
    })
    .catch(error=>{console.log('Error:'+error)});
}

function createList(list) {
    var container = document.getElementById('announcements-container');
    container.innerHTML = '';
    var c = 0;

    for(let i=0; i<list.length; i=i+c) {
        var requestDiv = document.createElement('div');
        requestDiv.className = 'announcement';
        var items = '';
        var quantity = '';
        var items_id = '';

        for(let j=0; j<parseInt(list[i].counter); j++){
            items += '<p>Item ID: '+ list[i+j].item_id +', Item name: '+ list[i+j].item_name +' </p>';
            quantity += '<label for="' + list[i+j].announcement_id + '-' + list[i+j].item_id + '">' + list[i+j].item_name + ':</label>'+
                        '<input type="number" id="'+ list[i+j].announcement_id + '-' + list[i+j].item_id +'" placeholder="Set quantity" required min="0"><br>';
            items_id += list[i+j].item_id + list[i+j].announcement_id;
        }

        requestDiv.innerHTML = `
        <details class="announcement-details" id="g" onclick="handleDetailsClick(this)">
            <summary>
                <h3>Announcement ID: ${list[i].announcement_id}</h3>
                ${items}
                <p>Date Announced: ${list[i].date_announced}</p>
            </summary>
            <div id="div-final">
                <h3>Set Quantities</h3>
                ${quantity}
                <button type="submit" onclick="createOffer(event, ${items_id}, ${list[i].announcement_id})">Create Offer</button>
                <hr>
            </div>
        </details>
        
        `;
        container.appendChild(requestDiv);
        c = parseInt(list[i].counter);
    }
}

function handleDetailsClick(clickedDetails) {
    var detailsElements = document.querySelectorAll('details');
    
    detailsElements.forEach(function(details) {
        if (details !== clickedDetails) {
            details.removeAttribute('open');
        }
    });
}

function createOffer(event, ids, announcement_id) {
    event.preventDefault();
    ids = ids.toString().split(announcement_id);
    ids.pop();
    

    var inputs = [];
    for(let i=0; i<ids.length; i++) 
        inputs[i] = document.getElementById(announcement_id+'-'+ids[i]).value;

        let res = 0;
    let invalid = 0;
    for(let i=0; i<inputs.length; i++) {
        if (inputs[i] == '') 
            invalid += 1;
        res += parseInt(inputs[i]);
    }

    if (res == 0 || invalid == inputs.length)
        alert('Sorry, Invalid Quantities!');
    else {
        fetch('/src/php/civilian/announcements_list.php?func=2&items='+ids+'&quan='+inputs)
        .then(response=>response.text())
        .then(messageReturned=>{
            alert(JSON.parse(messageReturned).response);
            for (let i=0; i<ids.length; i++) {
                document.getElementById(announcement_id+'-'+ids[i]).value = '';
            }
            handleDetailsClick(this);
            fetchAnnouncements();
        })
        .catch(error=>{console.log('Error:'+error)});
    }
}








