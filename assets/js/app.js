// Initialize Firebase
var config = {
    apiKey: "AIzaSyDSkiOPYaK-lO_4-FZ2rLlAWN6bXhvq_YY",
    authDomain: "from-scratch-feb1a.firebaseapp.com",
    databaseURL: "https://from-scratch-feb1a.firebaseio.com",
    projectId: "from-scratch-feb1a",
    storageBucket: "from-scratch-feb1a.appspot.com",
    messagingSenderId: "930739516063"
};

firebase.initializeApp(config);

var database = firebase.database();

var queryURL = "http://food2fork.com/api/search?key=ac439ce8f238ddbc8d1f8d5d4e74839a&q="

$(document).ready(function () {

    // queryURL += "apples";
    // $.ajax({
    //     url: queryURL,
    //     method: "GET"
    // }).then(function(response){
    //     var results = JSON.parse(response);
    //     console.log(results);
    //     $.each(results.recipes, function(index){
    //         console.log(this.title);
    //     });
    // });

    // firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email))
    //     {
    //         return true;
    //     }
    //     alert(errorCode + errorMessage);
    //     return false;
    // });

    // firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    //     // Handle Errors here.
    //     var errorCode = error.code;
    //     var errorMessage = error.message;

    //     var user = firebase.auth().currentUser;

    //     if (user) {
    //     return true;
    //     } else {
    //     alert(errorCode + errorMessage);
    //     return false;
    //     }
    // });

    //push information to Firebase
    // database.ref().push({
    //     id: "testID",
    //     recipeList: [
    //         "List1",
    //         "List2",
    //         "List3"
    //     ]
    // });

    //display data base info
    // database.ref().on("child_added", function(snapshot){
    //     console.log(snapshot);
    //     console.log(snapshot.val().id);
    //     console.log(snapshot.val().recipeList);
    // });
});