function sendItem() {
  var form = document.getElementById("item_form");
  var itemName = document.getElementById("itname").value;
  var itemCategory = document.getElementById("itcats").value;
  var detailsTable = document.getElementById("itemdetails").children[0];

  // Check if any of the required fields are empty
  if (itemName === "") {
    alert("Please fill the Item Name field");
    return;
  }

  var xhr = new XMLHttpRequest();
  var data = new FormData();

  // Add the name and category of the item to the form
  data.append("itemname", itemName);
  data.append("itemcategory", itemCategory);

  // Add the details to the form
  for (i = 1; i <= detailsTable.childElementCount; i++) {
    data.append(
      "detailname" + i.toString(),
      document.getElementById("itdname" + i.toString()).value,
    );
    data.append(
      "detailvalue" + i.toString(),
      document.getElementById("itdvalue" + i.toString()).value,
    );
  }

  // Open the request
  xhr.open("POST", "/src/php/warehouse/add_item.php");
  xhr.send(data);

  // Listen for a successful response
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        alert("Item submitted successfully!");
        form.reset();
        detailsTable.innerHTML = "";
        addDetail();
      } else if (xhr.status === 400) {
        var response = JSON.parse(xhr.responseText);
        if (response && response.error === "No detail_name") {
          alert("Please fill in the Detail Name field");
        } else if (response && response.error === "No detail_value") {
          alert("Please fill in the Detail Value field");
        }
      }
    }
  };

  return false;
}

function addDetail() {
  var table = document.getElementById("itemdetails");
  var row = table.insertRow(-1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  cell1.innerHTML = 'Item detail name (e.g. "volume")';
  cell3.innerHTML = 'Item detail value (e.g. "500ml")';

  var namebox = document.createElement("input");
  namebox.setAttribute("name", "itdname" + table.children[0].childElementCount.toString());
  namebox.setAttribute("id", "itdname" + table.children[0].childElementCount.toString());
  cell2.appendChild(namebox);

  var valuebox = document.createElement("input");
  valuebox.setAttribute("name", "itdvalue" + table.children[0].childElementCount.toString());
  valuebox.setAttribute("id", "itdvalue" + table.children[0].childElementCount.toString());
  cell4.appendChild(valuebox);
}

function getCategories() {
  var select = document.getElementById("itcats");
  select.innerHTML = "";

  var xhr = new XMLHttpRequest();

  xhr.open("GET", "/src/php/warehouse/get_categories.php");
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      data = JSON.parse(this.responseText)["categories"];
      // Add all the categories as options to the select element
      for (i = 0; i < data.length; i++) {
        var opt = document.createElement("option");
        opt.setAttribute("value", data[i]["id"]);
        opt.innerHTML = data[i]["name"];
        select.appendChild(opt);
      }

      // This function runs on the add available items page only
      if (document.getElementById("specified_item")) {
        getSpecifiedItems();
      }
    }
  };
}

// Wrap your JavaScript in a function to ensure it runs after the DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Attach an event listener to the itcats select element,
  // to get the items for every new category that gets selected
  var selectCategory = document.getElementById("itcats");
  selectCategory.addEventListener("change", function () {
    // Check if a category has been selected
    if (selectCategory.value !== "") {
      getSpecifiedItems();
    } else {
      // Clear specified items select if no category is selected
      var selectSpecifiedItem = document.getElementById("specified_item");
      selectSpecifiedItem.innerHTML = "";
    }
  });
});

// This function populates the specifiedItems select element with the items
// that correspond to the selected category
function getSpecifiedItems() {
  var select = document.getElementById("specified_item");
  select.innerHTML = "";
  var selectedCat = document.getElementById("itcats").value;

  var xhr = new XMLHttpRequest();

  var url =
    "/src/php/warehouse/get_specified_items.php?selectedCat=" + encodeURIComponent(selectedCat);
  xhr.open("GET", url);
  xhr.send();

  xhr.onreadystatechange = function () {
    if (xhr.readyState == XMLHttpRequest.DONE) {
      data = JSON.parse(this.responseText)["items"];
      // Add all the items as options to the select element
      for (i = 0; i < data.length; i++) {
        var opt = document.createElement("option");
        opt.setAttribute("value", data[i]["id"]);
        opt.innerHTML = data[i]["item"];
        select.appendChild(opt);
      }
    }
  };
}

function sendAvailItems() {
  var form = document.getElementById("add_avail_item_form");
  var itemId = document.getElementById("specified_item").value;
  var quantity = document.getElementById("quantity").value;

  // Check if the Item field is empy
  if (itemId === undefined || itemId == "") {
    alert("Please select an Item.");
    return;
  }

  // Check if the quantity field is empy
  if (quantity === "") {
    alert("Please fill Quantity field.");
    return;
  }

  var xhr = new XMLHttpRequest();
  var data = new FormData();

  // Add the name and category of the item to the form
  data.append("item_id", itemId);
  data.append("quantity", quantity);

  // Open the request
  xhr.open("POST", "/src/php/warehouse/add_avail_item.php");
  xhr.send(data);

  // Listen for a successful response
  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        alert("Available Item submitted successfully!");
        form.reset();
      }
    }
  };
}

function sendCategory() {
  var form = document.getElementById("category_form");
  var xhr = new XMLHttpRequest();
  var data = new FormData(form);

  var catName = document.getElementById("catname").value;

  // Add data to form before submission.
  data.append("catname", catName);
  // Open the request
  xhr.open("POST", "/src/php/warehouse/add_category.php");
  // Send the form data
  xhr.send(data);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        alert("Category submitted successfully");
        form.reset();
      } else if (xhr.status === 400) {
        var response = JSON.parse(xhr.responseText);
        if (response && response.error === "Duplicate category name") {
          alert("Category already exists. Please choose a different name.");
        }
      } else {
        console.log("Error in form submission");
      }
    }
  };

  return false;
}

function addUrlItems() {
  var form = document.getElementById("url_form");
  var xhr = new XMLHttpRequest();
  var data = new FormData(form);

  var url_input = document.getElementById("url_input").value;

  // Add extra data to the form before submission.
  data.append("url", url_input);
  // Open the request
  xhr.open("POST", "/src/php/warehouse/load_url_items.php");
  // Send the form data
  xhr.send(data);

  xhr.onreadystatechange = function () {
    if (xhr.readyState === XMLHttpRequest.DONE) {
      if (xhr.status === 200) {
        alert("Items loaded successfully!");
      } else {
        console.log("Error in form submission");
      }
    }
  };

  return false;
}

function addJsonItems() {
  var fileInput = document.getElementById("json_file");
  // Get the selected file
  var file = fileInput.files[0];

  if (file) {
    var formData = new FormData();
    formData.append("json_file", file);

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "/src/php/warehouse/load_json_items.php");
    xhr.send(formData);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          alert("JSON file uploaded successfully!");
        } else {
          alert("Error uploading JSON file");
        }
      }
    };
  } else {
    alert("Please select a JSON file.");
  }
}