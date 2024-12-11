function warehouseMainMenu() {
    var wareHouseMenuElement = document.getElementById("warehouse_main_menu");

    fetch("/src/html/admin/warehouse/warehouse_main_menu.html")
        .then((response) => response.text())
        .then((fileContents) => {wareHouseMenuElement.innerHTML = fileContents;});
}

function addItemsMenu() {
    var wareHouseMenuElement = document.getElementById("add_items_menu");

    fetch("/src/html/admin/warehouse/add_items_menu.html")
        .then((response) => response.text())
        .then((fileContents) => {wareHouseMenuElement.innerHTML = fileContents;});
}
