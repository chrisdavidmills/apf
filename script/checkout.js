// basic variable setup

// selects
const regionSelect = document.querySelector('#region');
const postageSelect = document.querySelector('#postage');

// cost amounts to display
const postage = document.querySelector('.postage-cost span');
const total = document.querySelector('.total span');

let jsonObj;

// hardcoded number of items ordered and total cost of items.
// on the real page these would be gotten from the shopping cart JSON
let orderQuantity = 5;
let itemTotal = 65;

// fetch JSON
fetch('script/sample-checkout.json')
.then(response => response.json())
.then(json => init(json));

// init functionality - populate regions and initial postage valus
function init(json) {
  jsonObj = json;
  for (let region in jsonObj) {
    let optionElem = document.createElement('option');
    optionElem.setAttribute('value', region);
    optionElem.textContent = jsonObj[region]['name'];
    regionSelect.appendChild(optionElem);
  }

  populatePostage();
}

// function to populate postage select box

function populatePostage() {
  while (postageSelect.firstChild) {
    postageSelect.removeChild(postageSelect.firstChild);
  }

  let currentRegion = regionSelect.value;
  let postageOptions = jsonObj[currentRegion]['postageOptions'];

  for(let i = 0; i < postageOptions.length; i++) {
    let optionMinItems = postageOptions[i].minItems;
    let optionMaxItems = postageOptions[i].maxItems;

    if(orderQuantity >= optionMinItems && orderQuantity <= optionMaxItems) {
      let optionElem = document.createElement('option');
      optionElem.setAttribute('value', postageOptions[i].price);
      optionElem.textContent = postageOptions[i].name + ': £' + postageOptions[i].price;
      postageSelect.appendChild(optionElem);
    }
  }

  updateTotal();
}

// function to update the postage and total on the "your order" column whenever the postage is changed

function updateTotal() {
  let currentPostage = postageSelect.value;
  let overallTotal = Number(itemTotal) + Number(currentPostage);

  postage.textContent = currentPostage;
  total.textContent = overallTotal;
}

// Event handler to update postage and total cost values whenever postage changes

postageSelect.addEventListener('change', updateTotal);

// Event handler to update postage select whenever region changes

regionSelect.addEventListener('change', populatePostage);
