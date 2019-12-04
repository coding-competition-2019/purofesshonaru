document.addEventListener('DOMContentLoaded', function() {

    var map = L.map('mapid', { zoomControl:false }).setView([50.104098, 14.390438], 18);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      accessToken: 'pk.eyJ1IjoiZXBhbmVtdSIsImEiOiJjazNyMzhqbDUwNjlhM2hwczJibXptYzdtIn0.ZD4apJYeraoXDM9tVaV0eA'
    }).addTo(map); ;

    function onLocationFound(e) {
        var radius = e.accuracy / 2;

        var posIcon = L.icon({
            iconUrl: './images/position.png',
            iconSize: [16, 16],
            iconAnchor: [8, 8],
            popupAnchor: [0, -8]
        });
        L.marker([50.505, 30.57], ).addTo(map);

        L.marker(e.latlng, {icon: posIcon}).addTo(map)
            .bindPopup("You are within " + radius + " meters from this point");

        L.circle(e.latlng, radius).addTo(map);
    }

    function onLocationError(e) {
        alert(e.message);
    }

    map.on('locationfound', onLocationFound);
    map.on('locationerror', onLocationError);

    map.locate({setView: true, maxZoom: 18});
    
    POIs = [];  

    const provider = new window.GeoSearch.OpenStreetMapProvider();

    function place_POI(res) {
        loc = res[0];
        var marker = L.marker([Number(loc.y), Number(loc.x)]).addTo(map);
        marker.bindPopup("<b>Hello world!</b><br>I am a popup.");
        POIs.push(marker);
    }

    function place_address(street, city, zipcode) {    
        provider.search({ query: street+", "+city+", "+zipcode })
            .then(res => place_POI(res));
    }

    place_address("Mládežnická 1119","Mladá Boleslav","29301")

    function removePOIs() {
        for (i = 0; i < POIs.length; i++) {
            POIs[i].remove()
        }
    }
    
    map.on('click', e => removePOIs());

    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥
    // // The Firebase SDK is initialized and available here!
    //
    // firebase.auth().onAuthStateChanged(user => { });
    // firebase.database().ref('/path/to/ref').on('value', snapshot => { });
    // firebase.messaging().requestPermission().then(() => { });
    // firebase.storage().ref('/path/to/ref').getDownloadURL().then(() => { });
    //
    // // 🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥🔥

    try {
      let app = firebase.app();
      let features = ['auth', 'database', 'messaging', 'storage'].filter(feature => typeof app[feature] === 'function');
      document.getElementById('map').innerHTML = `Firebase SDK loaded with ${features.join(', ')}`;
    } catch (e) {
      console.error(e);
      document.getElementById('map').innerHTML = 'Error loading the Firebase SDK, check the console.';
    }
});

function openSearch() {
  document.getElementById("search").style.top = "40%";
  document.getElementById("search").style.height = "60%";
}

function closeSearch() {
  document.getElementById("search").style.top = "90%";
  document.getElementById("search").style.height = "10%";
}


function searchSport() {

  var input, filter, ul, li, a, i;
  input = document.getElementById("input");
  filter = input.value.toUpperCase();
  ul = document.getElementById("sports");
  li = ul.getElementsByTagName("li");

  checked_sports = 0;
  for (i = 0; i < li.length; i++) {
    input = li[i].getElementsByTagName("input")[0];
    if (input.value == 0) {
      if (input.name.toUpperCase().indexOf(filter) > -1) {
        li[i].style.display = "table";
      } else {
        li[i].style.display = "none";
      }
  
      if (filter == "") {
        li[i].style.display = "none";
      }
    }
    else {
      if (input.checked == true) {
        li[i].style.display = "table";
      }
      else {
        li[i].style.display = "none";
      }
    }
    
    if (input.checked == true) {
      checked_sports = checked_sports + 1;
    }
  }
  if (checked_sports == 0) {
    document.getElementById("checked_sports").style.display = "none";
    document.getElementById("input").style.width = "100%";
  }
  else {  
    document.getElementById("input").style.width = "80%";
    document.getElementById("checked_sports").style.display = "table";
    document.getElementById("checked_sports").innerHTML = checked_sports;
  }
}


function show() {

  var input, filter, ul, li, a, i;
  input = document.getElementById("input");
  filter = input.value.toUpperCase();
  ul = document.getElementById("sports");
  li = ul.getElementsByTagName("li");

  for (i = 0; i < li.length; i++) {
    input = li[i].getElementsByTagName("input")[0];
    if (input.value == 0) {
      input.value = 1;
    }
    else{
      input.value = 0;
    }
  }
  searchSport();

}


function def_show() {
  var input, filter, ul, li, a, i;
  input = document.getElementById("input");
  filter = input.value.toUpperCase();
  ul = document.getElementById("sports");
  li = ul.getElementsByTagName("li");

  for (i = 0; i < li.length; i++) {
    input = li[i].getElementsByTagName("input")[0];
    input.value = 0;
  }
  searchSport();
}


function showSports() {
  ul = document.getElementById("sports");
  li = ul.getElementsByTagName("li");

  ul_res = document.getElementById("res");
  li_res = ul_res.getElementsByTagName("li");

  for (i = 0; i < li.length; i++) {
    input = li[i].getElementsByTagName("input")[0];
    input_res = li_res[i].getElementsByTagName("input")[0];
    if (input.value == 0) {
      input.value = 1;
      input_res.checked = input.checked;
      if (input_res.checked == true) {
        li_res[i].style.display = "table";
        li[i].style.display = "none";
      } else {
        li_res[i].style.display = "none";
      }
    }
    else {
      input.value = 0;
      li_res[i].style.display = "none";
    } 
  }
}













function deleteSport() {
  ul = document.getElementById("sports");
  li = ul.getElementsByTagName("li");

  ul_res = document.getElementById("res");
  li_res = ul_res.getElementsByTagName("li");

  checked_sports = 0;
  for (i = 0; i < li.length; i++) {
    input = li[i].getElementsByTagName("input")[0];
    input_res = li_res[i].getElementsByTagName("input")[0];
    input.checked = input_res.checked;
    if (input_res.checked == true) {
      checked_sports =  checked_sports + 1;
    }
    else {
      li_res[i].style.display = "none";
    }
  }

  if (checked_sports == 0) {
    document.getElementById("checked_sports").style.display = "none";
    document.getElementById("input").style.width = "100%";
    for (i = 0; i < li.length; i++) {
      input = li[i].getElementsByTagName("input")[0];
      input.value = 0;
    }
  }
  else {  
    document.getElementById("input").style.width = "80%";
    document.getElementById("checked_sports").style.display = "table";
    document.getElementById("checked_sports").innerHTML = checked_sports;
  }
}
