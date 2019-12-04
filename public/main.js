document.addEventListener('DOMContentLoaded', function() {

    var mymap = L.map('mapid', { zoomControl:false }).setView([50.104098, 14.390438], 18);
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
      attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: 'mapbox/streets-v11',
      accessToken: 'pk.eyJ1IjoiZXBhbmVtdSIsImEiOiJjazNyMzhqbDUwNjlhM2hwczJibXptYzdtIn0.ZD4apJYeraoXDM9tVaV0eA'
    }).addTo(mymap); ;

    POIs = [];  

    const provider = new window.GeoSearch.OpenStreetMapProvider();

    function place_POI(res) {
        loc = res[0];
        var marker = L.marker([Number(loc.y), Number(loc.x)]).addTo(mymap);
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
    
    mymap.on('click', e => removePOIs());

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
      document.getElementById('mymap').innerHTML = `Firebase SDK loaded with ${features.join(', ')}`;
    } catch (e) {
      console.error(e);
      document.getElementById('mymap').innerHTML = 'Error loading the Firebase SDK, check the console.';
    }
});