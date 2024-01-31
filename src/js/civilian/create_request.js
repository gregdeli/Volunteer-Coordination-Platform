var items = [];
initializeDropDown();
getItems();
autocomplete();

document.addEventListener("change", function(){
    storeCheckedCheckboxes();
});

function getCategories() {
    fetch('/src/php/civilian/create_request.php?func=1')
    .then(response=>response.text())
    .then(categoriesLoaded=>{
        setCategories(JSON.parse(categoriesLoaded));
    })
    .catch(error=>{console.log('Error:'+error)});
}

function initializeDropDown() {
    document.addEventListener('DOMContentLoaded', function(){
        getCategories();
    });
}

function setCategories(categories) {
    var dropdown = document.getElementById('create-request-dropdown');

    categories.forEach(function(category) {
        var option = document.createElement('option');
        option.value = category.id; 
        option.text = category.name;
        dropdown.add(option);
    });
}

function getItems() {
    fetch('/src/php/civilian/create_request.php?func=2')
    .then(response=>response.text())
    .then(itemsLoaded=>{
        items = JSON.parse(itemsLoaded);
    })
    .catch(error=>{console.log('Error:'+error)});
}

function getSearchedItem(event) {
    event.preventDefault(); 

    document.getElementById('create-request-dropdown').value = 0;
    var name = document.getElementById('input-search').value;
    if (name != '') {
        document.getElementById('input-search').value = '';
        
        fetch('/src/php/civilian/create_request.php?func=3&name='+name)
        .then(response=>response.text())
        .then(itemsLoaded=>{
            var item = JSON.parse(itemsLoaded);
            changeListItems(item);
        })
        .catch(error=>{console.log('Error:'+error)});        
    }
}

function autocomplete() {
    var input = document.getElementById('input-search');
    
    input.addEventListener('input', function() {
        var parent, child, val = this.value;

        closeAllLists();

        if (!val) {return false;}

        parent = document.createElement('DIV');
        parent.setAttribute('id', this.id + 'autocomplete-list');
        parent.setAttribute('class', 'autocomplete-items');
        this.parentNode.appendChild(parent);

        for (let i = 0; i < items.length; i++) {
            let item = items[i].name;
            if (item.substr(0, val.length).toUpperCase() == val.toUpperCase()) {

            child = document.createElement('DIV');

            child.innerHTML = '<strong>' + item.substr(0, val.length) + '</strong>';
            child.innerHTML += item.substr(val.length);
            child.innerHTML += "<input type='hidden' value='" + item + "'>";

            child.addEventListener('click', function() {
                input.value = this.getElementsByTagName('input')[0].value;
                closeAllLists();
            });
            parent.appendChild(child);
            }
        }
    });

    document.addEventListener('click', function (event) {
        closeAllLists(event.target);
    });
}

function closeAllLists(elmnt) {
    var input = document.getElementById('input-search');
    var list = document.getElementsByClassName('autocomplete-items');
    for (let i = 0; i < list.length; i++) {
        if (elmnt != list[i] && elmnt != input) {
            list[i].parentNode.removeChild(list[i]);
        }
    }
}

function getCatItems() {
    var selectedCategory = document.getElementById('create-request-dropdown').value;
    document.getElementById('input-search').value = '';
    fetch('/src/php/civilian/create_request.php?func=4&cat='+selectedCategory)
    .then(response=>response.text())
    .then(itemsLoaded=>{
        var items = JSON.parse(itemsLoaded);
        changeListItems(items);
    })
    .catch(error=>{console.log('Error:'+error)});  
}


function changeListItems(items) {
    var list = document.getElementById("itemslist");

    var liElements = list.getElementsByTagName("li");
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

function isAlreadyChecked(item) {
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

function createRequest(event) {
    event.preventDefault();
    var numofpeople = document.getElementById('input-num').value;
    if (checkedCheckboxes.length != 0 && numofpeople > 0) {
        fetch('/src/php/civilian/create_request.php?func=5&items='+checkedCheckboxes+'&number='+numofpeople)
        .then(response=>response.text())
        .then(messageReturned=>{        
            alert(JSON.parse(messageReturned).response);
            document.getElementById('input-search').value = '';
            document.getElementById('create-request-dropdown').value = 0;
            document.getElementById('input-num').value = '';

            let list = document.getElementById("itemslist");
            let liElements = list.getElementsByTagName("li");
            let lenLi = liElements.length;
            let liArray = Array.from(liElements);
            for (let i = 0; i < lenLi; i++) {
                list.removeChild(liArray[i]);
            }
            checkedCheckboxes = [];
        
        })
        .catch(error=>{console.log('Error:'+error)});
    } else if (checkedCheckboxes.length == 0) {
        alert('Please select an item!');
    } else {
        alert('Please enter number of people!');
    }
}
