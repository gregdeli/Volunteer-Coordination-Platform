function getCategories() {
    return new Promise((resolve) => {
        fetch('/src/php/admin/create_announcement.php?func=1')
        .then(response=>response.text())
        .then(categoriesLoaded=>{
            let categories = JSON.parse(categoriesLoaded);
            setCategories(categories);
            resolve();
        })
        .catch(error=>{console.log('Error:'+error)});
    });
}

async function initializeDropDown() {
    await getCategories();
    await getItems();
    setItems();
}

async function refreshDropDown() {
    await getCategories();
    changeListItems();
}

function setCategories(categories) {
    var dropdown = document.getElementById('dropdown');
    categories.forEach(function(category) {
        var option = document.createElement('option');
        option.value = category.id; 
        option.text = category.name;
        dropdown.add(option);
    });
}

var items = [];

function getItems() {
    return new Promise((resolve) => {
        var selectedCategory = document.getElementById('dropdown').value;
        fetch('/src/php/admin/create_announcement.php?func=2&cat='+selectedCategory)
        .then(response=>response.text())
        .then(itemsLoaded=>{
            items = JSON.parse(itemsLoaded);
            resolve();
        })
        .catch(error=>{console.log('Error:'+error)});
    });
    
}

function setItems() {
    if (items.id != 0) {
        items.forEach(function(item) {
            var itemsList = document.getElementById('itemslist');
            var listItem = document.createElement('li');

            var checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.id = item.id;
            listItem.appendChild(checkbox);

            var announcementTextSpan = document.createElement('span');
            announcementTextSpan.textContent = item.name;
            listItem.appendChild(announcementTextSpan);
            itemsList.appendChild(listItem);
        });
    }
}

async function changeListItems() {
    var list = document.getElementById('itemslist');
    await getItems();

    var liElements = list.getElementsByTagName('li');
    var lenItems = items.length;
    var lenLi = liElements.length;
    var liArray = Array.from(liElements);

    if (items.id == 0) {      
        for (let i = 0; i < lenLi; i++) 
            list.removeChild(liArray[i]);        
    } else {
        for (let i = 0; i < Math.min(lenLi, lenItems); i++) {
            liArray[i].innerHTML = '<input type="checkbox" id="' + items[i].id + '">' + items[i].name;
            document.getElementById(items[i].id).checked = isAlreadyChecked(items[i].id);
        }

        for (let i = lenItems; i < lenLi; i++) {
            list.removeChild(liArray[i]);
        }

        for (let i = lenLi; i < lenItems; i++) {
            var newLi = document.createElement('li');
            newLi.innerHTML = '<input type="checkbox" id="' + items[i].id + '">' + items[i].name;
            list.appendChild(newLi);
            document.getElementById(items[i].id).checked = isAlreadyChecked(items[i].id);
        }
    }

    
}


function isAlreadyChecked(item){
    let isPresent = checkedCheckboxes.includes(item);
    if (isPresent){
        return true;
    }
    return false;
}


var checkedCheckboxes = [];

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
        }
    });
}


function createAnnouncement(){
    if (checkedCheckboxes.length != 0) {
        fetch('/src/php/admin/create_announcement.php?func=3&items='+checkedCheckboxes)
        .then(response=>response.text())
        .then(messageReturned=>{        
            alert(JSON.parse(messageReturned).response);
            document.querySelectorAll('input[type="checkbox"]').forEach( function(checkbox) {
                checkbox.checked = false;
            })
            checkedCheckboxes = [];
            var dropdown = document.getElementById("dropdown");
            while (dropdown.options.length > 0) {
                dropdown.remove(0);
            }
            refreshDropDown();
        })
        .catch(error=>{console.log('Error:'+error)});
    } else {
        alert('There is no Item Selected!');
    }
    
}



