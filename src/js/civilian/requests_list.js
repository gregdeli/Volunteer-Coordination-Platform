setInterval(fetchRequests, 60000)//refresh: 60 sec

function fetchRequests() {
        console.log("FETCHING");
        fetch('/src/php/civilian/requests_list.php')
        .then(response=>response.text())
        .then(requests=>{
            var list = JSON.parse(requests);
            createList(list);
        })
        .catch(error=>{console.log('Error:'+error)});
}

function createList(list) {
        var container = document.getElementById('requests-container');
        container.innerHTML = '';
        list.forEach(function(request) {
            var requestDiv = document.createElement('div');
            requestDiv.className = 'request';
            if (request.date_undertaken == null)
                request.date_undertaken = 'Not yet undertaken';
            if (request.date_completed == null)
                request.date_completed = 'Not yet completed';
            requestDiv.innerHTML = `
                <h3>Request ID: ${request.id}</h3>
                <p>Item ID: ${request.item_id}, Item name: ${request.item_name} </p>
                <p>Number of People: ${request.num_people}</p>
                <p>Date Submitted: ${request.date_submitted}</p>
                <p>Date Undertaken: ${request.date_undertaken}</p>
                <p>Date Completed: ${request.date_completed}</p>
                <hr>
            `;
            container.appendChild(requestDiv);   
        });
}