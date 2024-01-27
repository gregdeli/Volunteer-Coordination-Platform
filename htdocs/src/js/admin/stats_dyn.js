function on_click_js() {
    try {
        let date1 = new Date(document.getElementById('date1').value);
        let date2 = new Date(document.getElementById('date2').value);

        if (date1=="Invalid Date" || date2=="Invalid Date")
            throw new Error();

        date1 = get_date_str(date1);
        date2 = get_date_str(date2);
        sessionStorage.setItem('date1', date1);
        sessionStorage.setItem('date2', date2);
    } catch (error) {}
}

function get_date_str(date0) {
    let year = date0.getFullYear().toString();
    let month = (date0.getMonth()+1).toString().padStart(2,'0');
    let day = date0.getDate().toString().padStart(2,'0');
    let hour = date0.getHours().toString().padStart(2,'0');
    let minute = date0.getMinutes().toString().padStart(2,'0');
    let second = date0.getSeconds().toString().padStart(2,'0');
    return year+"-"+month+"-"+day+" "+hour+":"+minute+":"+second;
}
