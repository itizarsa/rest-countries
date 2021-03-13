updateVisitCount();

function fetchData() {
	// Initiate a GET Request to Rest Country API
	fetch("https://restcountries.eu/rest/v2/all")
		.then((res) => res.json())
		.then((data) => loadCard(data));
}

function updateVisitCount() {
	fetch(`https://api.countapi.xyz/hit/arsadvc/rest-countries`)
		.then((res) => res.json())
		.then((res) => console.log(`Visited ${res.value} times`));
}

function createDiv(parentElement, elementClass, index) {
	// Creates a Div Element
	var div = document.createElement("div");

	// Set Id for Div Element
	div.id = elementClass + "-" + index;

	// Set Class Attribute for Div Element
	div.className = elementClass;

	// Append Div Element to DOM
	parentElement.appendChild(div);
}

function createImg(parentElement, source, alt) {
	var img = document.createElement("img");
	img.src = source;
	img.alt = alt;
	parentElement.appendChild(img);
}

function countryDetails(parentElement, countryDetail) {
	var country = document.createElement("h1");
	country.innerHTML = countryDetail.name;
	parentElement.appendChild(country);

	var alpha = document.createElement("h3");
	alpha.innerHTML = "Alpha Code : " + countryDetail.alpha2Code;
	parentElement.appendChild(alpha);

	var region = document.createElement("h3");
	region.innerHTML = "Region : " + countryDetail.region;
	parentElement.appendChild(region);

	var borderTitle = document.createElement("h3");
	borderTitle.id = "border-title";
	borderTitle.innerHTML = "Border : ";
	parentElement.appendChild(borderTitle);

	var border = document.createElement("h3");
	border.id = "border";
	border.innerHTML = countryDetail.border;
	parentElement.appendChild(border);
}

function createCard(cont, countryDetail, index) {
	// Create Root Container for Card
	createDiv(cont, "flip-card", index);

	// Stores that created container element in variabble
	var imgCont = document.getElementById("flip-card" + "-" + index);

	// Create Inner Container for Card
	createDiv(imgCont, "flip-card-inner", index);

	// Stores that created container element in variabble
	var innerCont = document.getElementById("flip-card-inner" + "-" + index);

	// Create Card Front Container
	createDiv(innerCont, "flip-card-front", index);

	// Stores that created container element in variabble
	var cardFront = document.getElementById("flip-card-front" + "-" + index);

	// Create Image Elemnt inside the front Card
	createImg(cardFront, countryDetail.flag, countryDetail.name);

	// Create Card Back Container
	createDiv(innerCont, "flip-card-back", index);

	// Stores that created container element in variabble
	var cardBack = document.getElementById("flip-card-back" + "-" + index);

	countryDetails(cardBack, countryDetail);
}

function loadCard(data) {
	// Stores Root Container Elemnt of Document in Variable
	var cont = document.querySelector(".image-container");
	// Iterating over the response from API
	data.forEach((element, index) => {
		// Obbject having Country Details
		var countryDetail = {};
		countryDetail.name = element.name;
		countryDetail.flag = element.flag;
		countryDetail.alpha2Code = element.alpha2Code;
		countryDetail.region = element.region;
		var border = "";
		if (element.borders.length == 0) {
			border = "No Borders";
		} else {
			for (i = 0; i < element.borders.length; i++) {
				border += element.borders[i] + " ";
			}
		}
		countryDetail.border = border;

		// Createing Card for each Country
		createCard(cont, countryDetail, index);
	});
}
