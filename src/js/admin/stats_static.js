stats();

function stats(){
    let date1;
    let date2;

    //sessionStorage.clear();
    date1 = sessionStorage.getItem('date1');
    date2 = sessionStorage.getItem('date2');

    if (date1===null || date2===null){
        date1 = "2024-01-01 00:00:00";
        date2 = "2024-02-01 00:00:00";
    }

    document.getElementById('start_d').innerText = " " + date1;
    document.getElementById('end_d').innerText = " " + date2;


    fetch('/src/php/admin/stats.php').then(response => response.text())
            .then(fileContents => {
                let data = JSON.parse(fileContents);
                plot_stats(data.newr, data.newo, data.undr, data.undo, date1, date2);
        });


    function plot_stats(newr, newo, undr, undo, date1, date2) {

        let nr = 0;
        let no = 0;
        let ur = 0;
        let uo = 0;

        for (let i = 0; i < newr.length; i++)
            if (newr[i]>=date1 && newr[i]<=date2)
                nr++;
        for (let i = 0; i < newo.length; i++)
            if (newo[i]>=date1 && newo[i]<=date2)
                no++;

        for (let i = 0; i < undr.length; i++)
            if (undr[i]>=date1 && undr[i]<=date2)
                ur++;
        for (let i = 0; i < undo.length; i++)
            if (undo[i]>=date1 && undo[i]<=date2)
                uo++;

        const data = [{
            x: ["New Requests","New Offers","Completed Requests","Completed Offers"],
            y: [nr, no, ur, uo],
            type: "bar",
            marker: {color:["rgba(255,0,250,100)","rgba(255,130,130,100)",
                            "rgba(130,100,100,100)","rgba(100,100,255,100)"]}
        }];

        const layout = {title:"Statistics for the given time range."};

        Plotly.newPlot("Plot", data, layout);
    }
}
