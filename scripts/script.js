let restaurants = [];

// Create a map object
const map = L.map('map', {
    center: [42.0038, 21.4361],
    zoom: 12
});

// Add an OpenStreetMap tile layer to the map
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);


// Create an array to store markers for the restaurants
const markers = [];

// Function to add a marker for a restaurant to the map
function addMarker(restaurant) {
    // Create a marker for the restaurant
    const marker = L.marker([restaurant.lat, restaurant.lon], {
        title: restaurant.name
    }).addTo(map);

    // Add the marker to the array of markers
    markers.push(marker);

    // Add an event listener to the marker to show the info window when clicked
    marker.on('click', function () {
        marker.bindPopup(restaurant.name).openPopup();
    });
}
// Function to search for restaurants that match the given search term
function searchRestaurants(searchTerm) {
    // Clear the current markers from the map
    for (let i = 0; i < markers.length; i++) {
        map.removeLayer(markers[i]);
    }
    markers.length = 0;

    // Loop through the restaurants array and add a marker for each restaurant
    // that matches the search term
    for (let i = 0; i < restaurants.length; i++) {
        if(restaurants[i].tags.name == undefined){
            continue;
        }
        if (restaurants[i].tags.name.toLowerCase().includes(searchTerm.toLowerCase())) {
            addMarker(restaurants[i]);
        }
    }
}


function filterBy(property, value){
    for (let i = 0; i < markers.length; i++) {
        map.removeLayer(markers[i]);
    }
    markers.length = 0;
    for (let i = 0; i < restaurants.length; i++) {
        if(!restaurants[i].tags.hasOwnProperty(property)){
            continue;
        }
        if(restaurants[i].tags[property] == value){
            addMarker(restaurants[i]);
        }
    }
}

function filterOpenedRestaurants(){
    for (let i = 0; i < markers.length; i++) {
        map.removeLayer(markers[i]);
    }
    markers.length = 0;
    for(let i = 0; i < restaurants.length; i++){
        if(!restaurants[i].tags.hasOwnProperty("opening_hours")){
            continue;
        }else{
            let isOpen = false;
            let now = new Date();
            let restaurant_time = restaurants[i].tags["opening_hours"];
            let parts = restaurant_time.split(";");

            for(let i = 0; i < parts.length; i++){
                isOpen = false;
                let hours = parts[i].split(" ")[1];
                let days = parts[i].split(" ")[0];
                let beginnigHour = Number(hours[0] + hours[1]);
                let endingHour = Number(hours[6] + hours[7]);
                let openingDay = Number(days[0]);
                let closingDay = Number(days[2]);
                if(now.getHours() >= beginnigHour && now.getHours() <= endingHour && now.getDay() >= openingDay
                && now.getDay() <= closingDay){
                    isOpen = true;
                    break;
                }
            }
            if(isOpen){
                addMarker(restaurants[i]);
            }
        }
    }
    if(markers.length == 0){
        let date = new Date();
        alert("???????? ?????????????????? ???? ???????????????? ?????? ??????????????");
    }
}

// Get a reference to the search input and search button
const searchInput = document.getElementById('search-input');
const searchButton = document.getElementById('search-button');

const nearestEl = document.getElementById("nearest-el");
const smokingEl = document.getElementById("smoking-el");
const deliveryEl = document.getElementById("delivery-el");
const outdoorseatingEl = document.getElementById("outdoorseating-el");
const openEl = document.getElementById("open-el");
const wifiEl = document.getElementById("wifi-el");

// Add an event listener to the search button to search for restaurants
// when it is clicked
searchButton.addEventListener('click', function () {
    searchRestaurants(searchInput.value);
});

// Add an event listener to the search input to search for restaurants
// when the user hits enter
searchInput.addEventListener('keyup', function (event) {
    if (event.key === 'Enter') {
        console.log("inside")
        searchRestaurants(searchInput.value);
    }
});

smokingEl.addEventListener('click', function(){
    filterBy("smoking", "isolated");
});

deliveryEl.addEventListener('click', function(){
    filterBy("delivery", "yes");
});

outdoorseatingEl.addEventListener('click', function(){
    filterBy("outdoor_seating", "yes");
});

openEl.addEventListener('click', function(){
    filterOpenedRestaurants();
});

wifiEl.addEventListener('click', function(){
    filterBy("internet_access", "wlan");
});

// axios.get("http://localhost:8080/app/home").then((res) => {
//     restaurants = Array.from(res.data.restaurants.elements);
//     for (let i = 0; i < restaurants.length; i++) {
//         addMarker(restaurants[i]);
//     }
// })


// fetch('../data/data.json')
//     .then(response => response.json())
//     .then(data => {
//         restaurants = Array.from(data.data.restaurants.elements);
//         for (let i = 0; i < restaurants.length; i++) {
//             addMarker(restaurants[i]);
//         }
//     })
// .catch(error => console.error(error));


const dataObject = {
    "restaurants": {
      "version": 0.6,
      "generator": "Overpass API 0.7.59 e21c39fe",
      "osm3s": {
        "timestamp_osm_base": "2022-11-09T18:16:09Z",
        "copyright": "The data included in this document is from www.openstreetmap.org. The data is made available under ODbL."
      },
      "elements": [
        {
          "type": "node",
          "id": 470916907,
          "lat": 42.0003611,
          "lon": 21.4268596,
          "tags": {
            "amenity": "fast_food",
            "name": "???????? ??????",
            "shop": "bakery"
          }
        },
        {
          "type": "node",
          "id": 918590533,
          "lat": 41.9870500,
          "lon": 21.4313196,
          "tags": {
            "amenity": "fast_food",
            "cuisine": "pizza",
            "name": "four seasons"
          }
        },
        {
          "type": "node",
          "id": 933634409,
          "lat": 41.9896275,
          "lon": 21.4597832,
          "tags": {
            "amenity": "fast_food",
            "name": "Fast food 7"
          }
        },
        {
          "type": "node",
          "id": 1355336585,
          "lat": 42.0008922,
          "lon": 21.4173939,
          "tags": {
            "amenity": "fast_food",
            "cuisine": "sandwich",
            "name": "???????????????????? ????????"
          }
        },
        {
          "type": "node",
          "id": 1381654588,
          "lat": 41.9990725,
          "lon": 21.4217901,
          "tags": {
            "amenity": "fast_food",
            "cuisine": "kebab",
            "name": "????????????????"
          }
        },
        {
          "type": "node",
          "id": 1866179709,
          "lat": 41.9930256,
          "lon": 21.4302496,
          "tags": {
            "addr:city": "????????????",
            "addr:housenumber": "12",
            "addr:postcode": "1000",
            "addr:street": "????????????????????",
            "amenity": "fast_food",
            "cuisine": "italian",
            "name": "Pizza FRESKO",
            "name:mk": "???????????????? ????????????",
            "phone": "+389 70 567295",
            "website": "http://www.facebook.com/Picerijafresko",
            "wheelchair": "yes"
          }
        },
        {
          "type": "node",
          "id": 1870054369,
          "lat": 41.9936252,
          "lon": 21.4275081,
          "tags": {
            "amenity": "fast_food",
            "drive_through": "no",
            "name": "????????",
            "takeaway": "yes"
          }
        },
        {
          "type": "node",
          "id": 2004962771,
          "lat": 42.0015351,
          "lon": 21.4059587,
          "tags": {
            "amenity": "fast_food",
            "name": "????????"
          }
        },
        {
          "type": "node",
          "id": 2472332550,
          "lat": 41.9855468,
          "lon": 21.4330638,
          "tags": {
            "amenity": "fast_food",
            "name": "Go Get Burger"
          }
        },
        {
          "type": "node",
          "id": 2858315264,
          "lat": 42.0035281,
          "lon": 21.4167758,
          "tags": {
            "addr:city": "????????????",
            "addr:street": "???????? ??????????????",
            "amenity": "fast_food",
            "cuisine": "regional",
            "name": "DM Restaurant",
            "opening_hours": "0-6 10:00-00:00"
          }
        },
        {
          "type": "node",
          "id": 2887575858,
          "lat": 41.9893772,
          "lon": 21.4635675,
          "tags": {
            "amenity": "fast_food",
            "name": "???????????????????? ????????"
          }
        },
        {
          "type": "node",
          "id": 3304519276,
          "lat": 41.9892217,
          "lon": 21.4634495,
          "tags": {
            "addr:city": "Skopje",
            "addr:postcode": "1000",
            "addr:street": "?????????????? ???????? ??????????????????",
            "amenity": "fast_food",
            "name": "????????????????",
            "smoking": "isolated",
            "outdoor_seating": "yes"
          }
        },
        {
          "type": "node",
          "id": 3484100383,
          "lat": 41.9914096,
          "lon": 21.4223968,
          "tags": {
            "amenity": "fast_food"
          }
        },
        {
          "type": "node",
          "id": 3484101195,
          "lat": 41.9906511,
          "lon": 21.4207515,
          "tags": {
            "amenity": "fast_food",
            "cuisine": "burger",
            "name": "MFC - Macedonian Fried Chicken",
            "smoking": "isolated",
            "outdoor_seating": "yes"
          }
        },
        {
          "type": "node",
          "id": 3623547525,
          "lat": 41.9952491,
          "lon": 21.4238539,
          "tags": {
            "addr:city": "C??o??je",
            "addr:city:en": "Skopje",
            "addr:country": "MK",
            "addr:housenumber": "28",
            "addr:postcode": "1000",
            "addr:street": "???????????????????? ???????????????? ??????????????????",
            "amenity": "fast_food",
            "cuisine": "burger",
            "name": "Burger Friends",
            "takeaway": "only",
            "website": "http://www.burgerfriends.mk/",
            "smoking": "isolated",
            "outdoor_seating": "yes"
          }
        },
        {
          "type": "node",
          "id": 3832366896,
          "lat": 41.9898733,
          "lon": 21.4197501,
          "tags": {
            "amenity": "fast_food",
            "opening_hours": "0-6 10:00-24:00"
          }
        },
        {
          "type": "node",
          "id": 4190893589,
          "lat": 42.0000584,
          "lon": 21.4237032,
          "tags": {
            "amenity": "fast_food",
            "delivery": "yes",
            "name": "??????????????",
            "name:en": "Pempele's Pizza",
            "takeaway": "yes",
            "website": "http://www.pizzapempele.mk"
          }
        },
        {
          "type": "node",
          "id": 4355253301,
          "lat": 41.9877171,
          "lon": 21.4531813,
          "tags": {
            "amenity": "fast_food",
            "name": "???????????????????? ????????",
            "smoking": "isolated",
            "outdoor_seating": "yes",
            "opening_hours": "0-6 10:00-24:00"
          }
        },
        {
          "type": "node",
          "id": 4394802591,
          "lat": 42.0031488,
          "lon": 21.4005479,
          "tags": {
            "amenity": "fast_food",
            "name": "7",
            "name:en": "7",
            "name:mk": "7",
            "website": "http://www.7.mk"
          }
        },
        {
          "type": "node",
          "id": 4594432344,
          "lat": 41.9952816,
          "lon": 21.4348936,
          "tags": {
            "amenity": "fast_food",
            "cuisine": "mexican",
            "int_name": "La Puerta",
            "name": "???? ????????????",
            "outdoor_seating": "no",
            "takeaway": "yes",
            "smoking": "isolated"
          }
        },
        {
          "type": "node",
          "id": 4986311021,
          "lat": 41.9909648,
          "lon": 21.4650587,
          "tags": {
            "amenity": "fast_food",
            "name:en": "Kono pizza",
            "opening_hours": "0-6 10:00-24:00"
          }
        },
        {
          "type": "node",
          "id": 5131817487,
          "lat": 41.9955107,
          "lon": 21.4255670,
          "tags": {
            "addr:city": "C??o??je",
            "addr:housenumber": "26",
            "addr:postcode": "1000",
            "addr:street": "???????????????? ????????????????",
            "amenity": "fast_food",
            "brand": "Domino's Pizza",
            "brand:wikidata": "Q839466",
            "brand:wikipedia": "en:Domino's Pizza",
            "cuisine": "pizza",
            "delivery": "yes",
            "description": "Limited seating options",
            "name": "Domino's Pizza",
            "opening_hours": "0-6 10:00-24:00",
            "outdoor_seating": "yes",
            "short_name": "Domino's",
            "takeaway": "yes",
            "smoking": "isolated"
          }
        },
        {
          "type": "node",
          "id": 5204164823,
          "lat": 42.0033980,
          "lon": 21.4170443,
          "tags": {
            "amenity": "fast_food",
            "name": "Royal Burger",
            "outdoor_seating": "yes",
            "opening_hours": "0-6 10:00-24:00"
          }
        },
        {
          "type": "node",
          "id": 5289706560,
          "lat": 41.9915759,
          "lon": 21.4279999,
          "tags": {
            "amenity": "fast_food",
            "brand": "Burger King",
            "brand:wikidata": "Q177054",
            "brand:wikipedia": "en:Burger King",
            "cuisine": "burger",
            "name": "Burger King",
            "takeaway": "yes",
            "smoking": "isolated",
            "outdoor_seating": "yes"
          }
        },
        {
          "type": "node",
          "id": 5292130849,
          "lat": 41.9965778,
          "lon": 21.4245830,
          "tags": {
            "amenity": "fast_food",
            "name": "American best burger"
          }
        },
        {
          "type": "node",
          "id": 5299947547,
          "lat": 42.0029952,
          "lon": 21.4000902,
          "tags": {
            "amenity": "fast_food",
            "name": "Foodio"
          }
        },
        {
          "type": "node",
          "id": 5331095878,
          "lat": 42.0065896,
          "lon": 21.4020786,
          "tags": {
            "amenity": "fast_food",
            "name": "Etna"
          }
        },
        {
          "type": "node",
          "id": 5333318377,
          "lat": 42.0028979,
          "lon": 21.4006990,
          "tags": {
            "amenity": "fast_food",
            "name": "???????? ????????????",
            "outdoor_seating": "yes"
          }
        },
        {
          "type": "node",
          "id": 5431407636,
          "lat": 42.0032708,
          "lon": 21.4012616,
          "tags": {
            "amenity": "fast_food",
            "name": "Magic"
          }
        },
        {
          "type": "node",
          "id": 5660202454,
          "lat": 41.9999867,
          "lon": 21.4231465,
          "tags": {
            "amenity": "fast_food",
            "name": "Dogs bar",
            "outdoor_seating": "yes"
          }
        },
        {
          "type": "node",
          "id": 5687563887,
          "lat": 41.9944177,
          "lon": 21.4318165,
          "tags": {
            "addr:city": "????????????",
            "addr:housenumber": "2",
            "addr:postcode": "1000",
            "addr:street": "???????????????? ????????????????",
            "amenity": "fast_food",
            "cuisine": "waffle",
            "drive_through": "no",
            "name": "BubbleWaffle's",
            "opening_hours": "0-6 10:00-21:00",
            "outdoor_seating": "no",
            "phone": "+389 78 243 483",
            "takeaway": "yes",
            "website": "https://www.facebook.com/bubblewaffleskopje/"
          }
        },
        {
          "type": "node",
          "id": 5782900754,
          "lat": 41.9878133,
          "lon": 21.4457433,
          "tags": {
            "addr:postcode": "1000",
            "amenity": "fast_food",
            "cuisine": "sandwich;italian_pizza",
            "email": "bokiev44@gmail.com",
            "name": "???????????????? ??????????",
            "name:en": "Pizza Joker",
            "opening_hours": "1-5 09:00-23:00; 6 11:00-11:00; 0 12:00-20:00",
            "phone": "+38976840031",
            "smoking": "isolated",
            "outdoor_seating": "yes"
          }
        },
        {
          "type": "node",
          "id": 5869018606,
          "lat": 42.0026892,
          "lon": 21.4605034,
          "tags": {
            "amenity": "fast_food",
            "cuisine": "regional;sandwich",
            "name": "???????????? ?????????????????? ??????",
            "outdoor_seating": "yes"
          }
        },
        {
          "type": "node",
          "id": 5968279888,
          "lat": 41.9989349,
          "lon": 21.4353025,
          "tags": {
            "amenity": "fast_food",
            "cuisine": "kebab",
            "internet_access": "wlan",
            "name:en": "Gelateria Mony",
            "outdoor_seating": "yes"
          }
        },
        {
          "type": "node",
          "id": 6054036207,
          "lat": 41.9911273,
          "lon": 21.4449511,
          "tags": {
            "amenity": "fast_food"
          }
        },
        {
          "type": "node",
          "id": 6054048496,
          "lat": 41.9927909,
          "lon": 21.4301511,
          "tags": {
            "amenity": "fast_food",
            "smoking": "isolated",
            "outdoor_seating": "yes",
            "internet_access": "wlan"
          }
        },
        {
          "type": "node",
          "id": 6054048498,
          "lat": 42.0027291,
          "lon": 21.4387967,
          "tags": {
            "amenity": "fast_food"
          }
        },
        {
          "type": "node",
          "id": 6054048507,
          "lat": 41.9968420,
          "lon": 21.4395864,
          "tags": {
            "amenity": "fast_food",
            "smoking": "isolated",
            "outdoor_seating": "yes",
            "internet_access": "wlan"
          }
        },
        {
          "type": "node",
          "id": 6054048692,
          "lat": 41.9993211,
          "lon": 21.4184238,
          "tags": {
            "amenity": "fast_food",
            "name": "Cafe Pauza",
            "outdoor_seating": "yes"
          }
        },
        {
          "type": "node",
          "id": 6054048693,
          "lat": 41.9989695,
          "lon": 21.4184652,
          "tags": {
            "amenity": "fast_food",
            "internet_access": "wlan"
          }
        },
        {
          "type": "node",
          "id": 6054048728,
          "lat": 41.9971577,
          "lon": 21.4120582,
          "tags": {
            "amenity": "fast_food"
          }
        },
        {
          "type": "node",
          "id": 6054049788,
          "lat": 41.9975168,
          "lon": 21.4238695,
          "tags": {
            "amenity": "fast_food"
          }
        },
        {
          "type": "node",
          "id": 6054049814,
          "lat": 42.0004829,
          "lon": 21.4603461,
          "tags": {
            "amenity": "fast_food"
          }
        },
        {
          "type": "node",
          "id": 6054050094,
          "lat": 41.9982041,
          "lon": 21.4239494,
          "tags": {
            "amenity": "fast_food"
          }
        },
        {
          "type": "node",
          "id": 6164755129,
          "lat": 42.0053452,
          "lon": 21.4101783,
          "tags": {
            "amenity": "fast_food",
            "cuisine": "sandwich",
            "name": "Bon Appetit",
            "operator": "????????-???????????? ????????????????"
          }
        },
        {
          "type": "node",
          "id": 6291341775,
          "lat": 41.9856700,
          "lon": 21.4375301,
          "tags": {
            "amenity": "fast_food",
            "internet_access": "wlan"
          }
        },
        {
          "type": "node",
          "id": 6604781586,
          "lat": 41.9819621,
          "lon": 21.4682623,
          "tags": {
            "addr:postcode": "1000",
            "amenity": "fast_food",
            "email": "contact@lapizza.mk",
            "internet_access": "wlan",
            "name": "???? ????????",
            "name:en": "LaPizza",
            "opening_hours": "0-6 09:00-23:00",
            "operator": "?????????? ??????????????",
            "phone": "+38972575756",
            "website": "http://lapizza.mk"
          }
        },
        {
          "type": "node",
          "id": 6632801985,
          "lat": 41.9953660,
          "lon": 21.4348630,
          "tags": {
            "addr:postcode": "1000",
            "addr:street": "?????? 13 ??????????????",
            "amenity": "fast_food",
            "cuisine": "mexican",
            "diet:vegan": "yes",
            "name": "La Puerta",
            "opening_hours": "0-6 08:00-00:00",
            "phone": "+389 78 442 897",
            "website": "http://www.lapuerta.mk/",
            "internet_access": "wlan"
          }
        },
        {
          "type": "node",
          "id": 6796436186,
          "lat": 41.9966825,
          "lon": 21.4276421,
          "tags": {
            "addr:housenumber": "3",
            "amenity": "fast_food",
            "drive_through": "no",
            "name:en": "Bon Appetit 2",
            "opening_hours": "1-5 08:00-20:00; 0 09:00-18:00",
            "internet_access": "wlan"
          }
        },
        {
          "type": "node",
          "id": 6811622585,
          "lat": 41.9997339,
          "lon": 21.4358076,
          "tags": {
            "amenity": "fast_food",
            "cuisine": "sandwich;turkish",
            "diet:vegan": "yes",
            "diet:vegetarian": "only",
            "name": "Engin Cigk??fte (vegetarian)",
            "name:mk": "Engin Cigk??fte (very good vegetarian)"
          }
        },
        {
          "type": "node",
          "id": 6814231699,
          "lat": 42.0000697,
          "lon": 21.4373728,
          "tags": {
            "amenity": "fast_food",
            "name": "Proper pizza",
            "internet_access": "wlan"
          }
        },
        {
          "type": "node",
          "id": 6814236601,
          "lat": 42.0025858,
          "lon": 21.4381868,
          "tags": {
            "amenity": "fast_food",
            "name": "Cardak",
            "internet_access": "wlan"
          }
        },
        {
          "type": "node",
          "id": 6814236605,
          "lat": 42.0029094,
          "lon": 21.4387207,
          "tags": {
            "amenity": "fast_food",
            "name": "Tetekis",
            "internet_access": "wlan"
          }
        },
        {
          "type": "node",
          "id": 6814246713,
          "lat": 42.0023225,
          "lon": 21.4389514,
          "tags": {
            "amenity": "fast_food",
            "name": "Doner",
            "internet_access": "wlan"
          }
        },
        {
          "type": "node",
          "id": 6814246719,
          "lat": 42.0004802,
          "lon": 21.4398152,
          "tags": {
            "amenity": "fast_food",
            "name": "Turkish Doner",
            "internet_access": "wlan"
          }
        },
        {
          "type": "node",
          "id": 6814247285,
          "lat": 42.0021842,
          "lon": 21.4384421,
          "tags": {
            "amenity": "fast_food",
            "name": "Hamza Doner",
            "internet_access": "wlan"
          }
        },
        {
          "type": "node",
          "id": 6815434690,
          "lat": 42.0000500,
          "lon": 21.4176339,
          "tags": {
            "amenity": "fast_food",
            "name": "??????????"
          }
        },
        {
          "type": "node",
          "id": 6815435286,
          "lat": 42.0029095,
          "lon": 21.4387997,
          "tags": {
            "amenity": "fast_food",
            "name:en": "Teteks",
            "opening_hours": "0-6 07:00-00:00",
            "outdoor_seating": "yes"
          }
        },
        {
          "type": "node",
          "id": 6815931187,
          "lat": 41.9958593,
          "lon": 21.4323639,
          "tags": {
            "amenity": "fast_food",
            "brand": "Burger King",
            "brand:wikidata": "Q177054",
            "brand:wikipedia": "en:Burger King",
            "cuisine": "burger",
            "drive_through": "no",
            "name": "Burger King",
            "takeaway": "yes"
          }
        },
        {
          "type": "node",
          "id": 6830542286,
          "lat": 42.0056279,
          "lon": 21.4161576,
          "tags": {
            "amenity": "fast_food"
          }
        },
        {
          "type": "node",
          "id": 7528237388,
          "lat": 41.9923177,
          "lon": 21.4308681,
          "tags": {
            "amenity": "fast_food",
            "name": "Per te"
          }
        },
        {
          "type": "node",
          "id": 8188519796,
          "lat": 41.9968334,
          "lon": 21.4263872,
          "tags": {
            "amenity": "fast_food",
            "cuisine": "pasta",
            "drive_through": "no",
            "name": "?????? ??????????",
            "name:en": "????S Pasta",
            "opening_hours": "1-5 08:00-18:00; 0 08:00-14:00",
            "phone": "+38926090192",
            "website": "https://www.instagram.com/jes_pasta/",
            "outdoor_seating": "yes"
          }
        },
        {
          "type": "node",
          "id": 8549720690,
          "lat": 42.0009144,
          "lon": 21.4162609,
          "tags": {
            "addr:city": "C??o??je",
            "addr:housenumber": "27",
            "addr:postcode": "1000",
            "addr:street": "???????? ??????????????",
            "amenity": "fast_food",
            "cuisine": "sandwich",
            "drive_through": "no",
            "name": "Subzy",
            "opening_hours": "1-5 09:00-19:00; 0 11:00-19:00",
            "phone": "+38971328554;+38923228044",
            "website": "https://subzy.mk/"
          }
        },
        {
          "type": "node",
          "id": 8745676374,
          "lat": 41.9931575,
          "lon": 21.4283944,
          "tags": {
            "amenity": "fast_food",
            "cuisine": "sandwich;burger;chips",
            "drive_through": "no",
            "name": "Brisket Sandwich Bar",
            "outdoor_seating": "yes",
            "opening_hours": "1-5 08:00-20:00; 0 09:00-18:00"
          }
        },
        {
          "type": "node",
          "id": 8946991737,
          "lat": 42.0013583,
          "lon": 21.4206316,
          "tags": {
            "amenity": "fast_food",
            "cuisine": "waffle",
            "drive_through": "no",
            "name": "Fluffy",
            "opening_hours": "1-5 08:00-20:00; 0 09:00-18:00"
          }
        },
        {
          "type": "node",
          "id": 9200216076,
          "lat": 42.0025366,
          "lon": 21.4390081,
          "tags": {
            "amenity": "fast_food",
            "opening_hours": "1-5 08:00-20:00; 0 09:00-18:00"
          }
        },
        {
          "type": "node",
          "id": 9200216077,
          "lat": 42.0028083,
          "lon": 21.4385702,
          "tags": {
            "amenity": "fast_food",
            "opening_hours": "1-5 08:00-20:00; 0 09:00-18:00"
          }
        },
        {
          "type": "node",
          "id": 9200216348,
          "lat": 42.0026080,
          "lon": 21.4389588,
          "tags": {
            "amenity": "fast_food",
            "name": "Lama Palace",
            "opening_hours": "1-5 08:00-20:00; 0 09:00-18:00"
          }
        },
        {
          "type": "node",
          "id": 9200216551,
          "lat": 42.0033090,
          "lon": 21.4395663,
          "tags": {
            "amenity": "fast_food",
            "name": "Plaset",
            "opening_hours": "1-5 08:00-20:00; 0 09:00-18:00"
          }
        },
        {
          "type": "node",
          "id": 9200216554,
          "lat": 41.9983293,
          "lon": 21.4159274,
          "tags": {
            "amenity": "fast_food",
            "name:en": "Fat kitchen",
            "opening_hours": "1-5 08:00-20:00; 0 09:00-18:00"
          }
        },
        {
          "type": "node",
          "id": 9200216562,
          "lat": 41.9932172,
          "lon": 21.4252785,
          "tags": {
            "amenity": "fast_food",
            "name": "Spizzicotto",
            "opening_hours": "1-5 08:00-20:00; 0 09:00-18:00"
          }
        }
      ]
    }
  }


restaurants = dataObject.restaurants.elements;

    for (let i = 0; i < restaurants.length; i++) {
        addMarker(restaurants[i]);
    }



