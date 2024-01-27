setInterval(fetchOffers, 60000);//refresh: 60sec
fetchOffers();

function fetchOffers() {
    fetch('/src/php/civilian/offers_list.php?func=1')
    .then(response=>response.text())
    .then(offers=>{
        createList(JSON.parse(offers));
    })
    .catch(error=>{console.log('Error:'+error)});
}

function createList(list) {
    var container = document.getElementById('offers-container');
    container.innerHTML = '';
    if (list.id == 0) {
        document.getElementById('offers-container').style.display='none';
        document.getElementById('message-not-found').innerHTML = list.message;
    } else {
        document.getElementById('message-not-found').style.display='none';
        list.forEach(function(offer) {
            var offerDiv = document.createElement('div');
            offerDiv.id = 'offer';
    
            cancelButton = '';
            if (offer.date_completed == null)
                cancelButton = '<button id="cancel-button-offer" type="submit" onclick="cancelOffer(event,' + offer.id + ')">Cancel Offer</button>';
    
            if (offer.date_undertaken == null)
                    offer.date_undertaken = 'Not yet undertaken';
            if (offer.date_completed == null)
                    offer.date_completed = 'Not yet completed';
        
            offerDiv.innerHTML = `
                <h3>Offer ID: ${offer.id}</h3>
                <p>Item ID: ${offer.item_id}, Item name: ${offer.item_name} </p>
                <p>Quantity Offered: ${offer.quantity_offered}</p>
                <p>Date Submitted: ${offer.date_submitted}</p>
                <p>Date Undertaken: ${offer.date_undertaken}</p>
                <p>Date Completed: ${offer.date_completed}</p>
                ${cancelButton}
            `;
            container.appendChild(offerDiv);   
        });
    }
}

function cancelOffer(event, id) {
    event.preventDefault();
    var isConfirmed = window.confirm('Are you sure you want to cancel this offer?');

    if (isConfirmed) {
        fetch('/src/php/civilian/offers_list.php?func=2&offer_id='+id)
        .then(response=>response.text())
        .then(messageReturned=>{
            alert(JSON.parse(messageReturned).response);
            fetchOffers();   
        })
        .catch(error=>{console.log('Error:'+error)});   
    }      
}