// TODO: Replace the following with your app's Firebase project configuration
var firebaseConfig = {
    apiKey: "AIzaSyDH99P3NWRXhXaF9cUTvuXe8clxEvGb3a0",
    authDomain: "purofesshonaru-mckinsley.firebaseapp.com",
    databaseURL: "https://purofesshonaru-mckinsley.firebaseio.com",
    projectId: "purofesshonaru-mckinsley",
    storageBucket: "purofesshonaru-mckinsley.appspot.com",
    messagingSenderId: "1085962007391",
    appId: "1:1085962007391:web:df1717fedc06f70d8abcea",
    measurementId: "G-FDFXDY8283"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

console.log("trololo")

let placesRef = db.collection('places');

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
}

var activitiesList = null;
let activitiesDocRef = db.collection('activities').doc('activities');
let getDoc = activitiesDocRef.get()
    .then(doc => {
    if (!doc.exists) {
        console.log('No such document!');
    } else {
        
        activitiesList = doc.data()["activities"];
        ul = document.getElementById("sports");
        console.log(ul);
        for (let i = 0; i < activitiesList.length; i++) {
            //<li><input type="checkbox" name="HTML" value="0">HTML</li>
            var li = document.createElement("li");
            var checkbox = document.createElement("input");
            checkbox.setAttribute("type", "checkbox");
            checkbox.checked = false;
            checkbox.value = 0;
            checkbox.name = activitiesList[i].capitalize();
            li.appendChild(checkbox);
            li.innerHTML = li.innerHTML + activitiesList[i].capitalize();
            console.log(li);
            ul.appendChild(li);
        }

        console.log('Document data:', activitiesList);
    }
    })
    .catch(err => {
    console.log('Error getting document', err);
    });


function searchSports(search_string) {
    var found = [];
    if (activitiesList == null) {
        console.log("activities not downloaded");
        return found;
    }
    for (let i = 0; i < activitiesList.length; i++) {
        if (activitiesList[i].includes(search_string)) {
            found.push(activitiesList[i]);
        }
    }
    return found;
}


function getPlacesByActivities(activities, callback_function) {
    var queries = [];
    for (let i = 0; i < activities.length; i++) {
        queries.push(placesRef.where("activities."+activities[i], "==" , true));
    }
    var results = [];
    var query_i = 0;



    Array.prototype.unique = function() {
        var a = this.concat();
        for(var i=0; i<a.length; ++i) {
            for(var j=i+1; j<a.length; ++j) {
                if(a[i].id === a[j].id)
                    a.splice(j--, 1);
            }
        }
    
        return a;
    };

    var or_results = [];

    function processNextQuery(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            //  console.log(doc.id, " => ", doc.data());
            var data = doc.data();
            data.id = doc.id;
            results.push(data);
        });
        if (query_i < queries.length-1){
            query_i++;
            queries[query_i].get().then(processNextQuery);
        } else {
            or_results = results.unique();
            console.log(or_results);
            callback_function(or_results)
        }
    }

    queries[query_i].get().then(processNextQuery);
    
}
