var dynamicOptions = [];

function getCategories() {
    return new Promise((resolve) => {
        function onSuccess(response) {
            dynamicOptions = JSON.parse(response);
            resolve();
        }
  
        const request = $.ajax({
            url: "/src/php/create_announcement.php",
            type: "GET",
            data: {func: 1}
        });
      
        request.done(onSuccess);
        request.fail(function (error) {
            console.log("ERROR");
        });
    });
}


function dynamicDropDown(){
    // await getCategories();
    var dropdown = document.getElementById('dynamicdropdown');

    dynamicOptions.forEach(function(optionText) {
        var option = document.createElement('option');
        option.value = optionText.id; 
        option.text = optionText.name;
        dropdown.add(option);
    });
}


var items = [];

function getItems(selectedCategory){
    return new Promise((resolve) => {
        function onSuccess(response) {
            console.log(response);
            items =  JSON.parse(response);
            resolve();
        }
        const request = $.ajax({
            url: "/src/php/create_announcement.php",
            type: "GET",
            data: {func: 2, cat: selectedCategory}
        });
        request.done(onSuccess);
        request.fail(function(error) {
            console.log("ERROR");
        });
    });
}


async function itemsList(){
    var selectedCategory = document.getElementById("dynamicdropdown").value;
    console.log(selectedCategory);
    await getItems(selectedCategory);
    console.log(items,"itemsList");

    items.forEach(function(item) {
        var itemsList = document.getElementById("itemslist");
        var listItem = document.createElement("li");

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = item.id;
        listItem.appendChild(checkbox);

        var announcementTextSpan = document.createElement("span");
        announcementTextSpan.textContent = item.name;
        listItem.appendChild(announcementTextSpan);
        itemsList.appendChild(listItem);
    });
}


async function changeItemsList(){
    var list = document.getElementById("itemslist");
    var selectedCategory = document.getElementById("dynamicdropdown").value;
    await getItems(selectedCategory);

    var liElements = list.getElementsByTagName("li");

    for (var i = 0; i < Math.min(liElements.length, items.length); i++) {
        liElements[i].innerHTML = '<input type="checkbox" id="' + items[i].id + '">' + items[i].name;

        document.getElementById(items[i].id).checked = isAlreadyChecked(items[i].id);
        console.log(isAlreadyChecked(items[i].id));
    }

    for (var i = items.length; i < liElements.length; i++) {
        list.removeChild(liElements[i]);
    }

    for (var i = liElements.length; i < items.length; i++) {
        var newLi = document.createElement("li");
        newLi.innerHTML = '<input type="checkbox" id="' + items[i].id + '">' + items[i].name;
        list.appendChild(newLi);

        document.getElementById(items[i].id).checked = isAlreadyChecked(items[i].id);
        console.log(isAlreadyChecked(items[i].id));
    }
    
}


function isAlreadyChecked(item){
    let isPresent = checkedCheckboxes.includes(item);
    if (isPresent){
        return true;
    }
    return false;
}


const checkedCheckboxes = [];

function storeCheckedCheckboxes() {
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');

    checkboxes.forEach(function(checkbox) {
        let isPresent = checkedCheckboxes.includes(checkbox.id);

        if (checkbox.checked && !(isPresent)) {
            checkedCheckboxes.push(checkbox.id);
        }
        else if (!(checkbox.checked) && isPresent){
            let index = checkedCheckboxes.indexOf(checkbox.id);
            checkedCheckboxes.splice(index, 1);
            console.log(index,"deleted");
        }
    });

    console.log('Checked Checkboxes:', checkedCheckboxes);
}


function createAnnouncement(){
   
    function onSuccess(response) {
        console.log(response);
    }

    const request = $.ajax({
        url: "/src/php/create_announcement.php",
        type: "POST",
        data: {func: 3, items: checkedCheckboxes}//JSON.stringify({ data: dataArray })
    });
  
    request.done(onSuccess);
    request.fail(function (error) {
        console.log("ERROR");
    });

}



