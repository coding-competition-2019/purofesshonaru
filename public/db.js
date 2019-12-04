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

var activitiesList = null;
let activitiesDocRef = db.collection('activities').doc('activities');
let getDoc = activitiesDocRef.get()
    .then(doc => {
    if (!doc.exists) {
        console.log('No such document!');
    } else {
        
        activitiesList = doc.data()["activities"];
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


function getPlacesByActivities(activities) {
    var places_query = placesRef.where("activities", "array-contains", "tabata").where("activities", "array-contains", "hiit");
    places_query.get()
    .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });
}