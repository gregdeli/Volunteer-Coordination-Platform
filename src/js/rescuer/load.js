let id = 2;


fetch('/src/php/rescuer/cargo/inventory.php').then(response => {return response.text();})
    .then(fileContents => {
        let inventory = JSON.parse(fileContents);
        load_from_inventory(inventory);
});


function load_from_inventory(inventory){
    
    let categories_seen = [];
    for (let i = 0; i < inventory.length; i++) {
        let c = inventory[i];

        if (categories_seen.includes(c["category"])) {
        
            row = document.getElementById('cat_'+c["category"]).insertRow(-1);
            row.insertCell(0).innerText = c["name"];
            //getElementsByTagName().classList.add("inventory_item");
            row.insertCell(1).innerHTML = "<input value=\"0\" min=\"0\" max=\""+c["quantity"]+"\" type=\"number\" name=\""+c["id"]+"\"/>";

        } else {
            html_str = "<details>\
                        <summary><h3>"+c["category"]+"</h3></summary>\
                        <table id=\"cat_"+c["category"]+"\">\
                            <tr>\
                                <td>"+c["name"]+"</td>\
                                <td><input value=\"0\" min=\"0\" max=\""+c["quantity"]+"\" type=\"number\" name=\""+c["id"]+"\"/></td>\
                            </tr>\
                        </table></details><br/>"
            document.getElementById('inventory_items').innerHTML += html_str;
        }
        categories_seen.push(c["category"]);
    }

    if (document.getElementById('inventory_items').innerHTML===""){
        document.getElementById('inventory_items').innerHTML="No items in inventory.";
    }
}


