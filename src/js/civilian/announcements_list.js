fetchAnnouncements();

function fetchAnnouncements() {
    fetch('/src/php/civilian/announcements_list.php?func=1')
    .then(response=>response.text())
    .then(announcements=>{
        createList(JSON.parse(announcements));
    })
    .catch(error=>{console.log('Error:'+error)});
}

function createList(list) {
    var container = document.getElementById('announcements-container');
    container.innerHTML = '';
    var c = 0;

    if (list.id == 0) {
        document.getElementById('message-not-found').innerHTML = list.message;
    } else {
        document.getElementById('message-not-found').style.display='none';
        for(let i=0; i<list.length; i=i+c) {
            var announcementDiv = document.createElement('div');
            announcementDiv.id = 'announcement';
            var items = '';
            var quantity = '';
            var items_id = '';

            for(let j=0; j<parseInt(list[i].counter); j++){
                items += '<p>Item ID: '+ list[i+j].item_id +', Item name: '+ list[i+j].item_name +' </p>';
                quantity += '<label class="announcemt" for="' + list[i+j].announcement_id + '-' + list[i+j].item_id + '">' + list[i+j].item_name + ':</label>'+
                            '<input class="announcemt" type="number" id="'+ list[i+j].announcement_id + '-' + list[i+j].item_id +'" placeholder="Set quantity" required min="0"><br>';
                items_id += list[i+j].item_id + 'a';
            }

            announcementDiv.innerHTML = `
            <details id="announcement-details" onclick="handleDetailsClick(this)">
                <summary id="announcement-summary">
                    <h3>Announcement ID: ${list[i].announcement_id}</h3>
                    ${items}
                    <p>Date Announced: ${list[i].date_announced}</p>
                </summary>
                <div id="announcement-expand">
                    <h3>Set Quantities</h3>
                    ${quantity}
                    <button id="create-offer-button" type="submit" onclick="createOffer(event, '${items_id}', ${list[i].announcement_id})">Create Offer</button>
                </div>
            </details>
            
            `;
            container.appendChild(announcementDiv);
            c = parseInt(list[i].counter);
        }
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
    ids = ids.toString().split('a');
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