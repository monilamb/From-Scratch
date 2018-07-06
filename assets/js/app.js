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

$(document).ready(function(){

    //push information to Firebase
    database.ref().push({
        id: "testID",
        recipeList: [
            "List1",
            "List2",
            "List3"
        ]
    });

    //display data base info
    database.ref().on("child_added", function(snapshot){
        console.log(snapshot);
        console.log(snapshot.val().id);
        console.log(snapshot.val().recipeList);
    });
});