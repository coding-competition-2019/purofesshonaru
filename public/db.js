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

let activitiesDocRef = db.collection('activities').doc('activities');
let getDoc = activitiesDocRef.get()
    .then(doc => {
    if (!doc.exists) {
        console.log('No such document!');
    } else {
        console.log('Document data:', doc.data());
    }
    })
    .catch(err => {
    console.log('Error getting document', err);
    });
