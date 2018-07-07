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

var q = "q=";
var ingredient = [];
var index = 0;

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

$("#searchBtn").on("click", function() {



});

$(document).on("click", ".category-input", function() {

    var category = $(".category-input:checked").val();

    console.log(category);

    var addIngredientBtn = $("<button>");
    addIngredientBtn.addClass("btn btn-light");
    addIngredientBtn.attr("id", "add-ingredient");
    addIngredientBtn.attr("form", "user-input");
    addIngredientBtn.attr("type", "submit");
    addIngredientBtn.text("Add");

    if(category == 'i'){

        $("#user-input").append(addIngredientBtn);

        console.log(addIngredientBtn);
    
    }else if(category == "r"){

        $("#add-ingredient").remove();

    }else{}

});

$(document).on("click", "#add-ingredient", function(event) {

    event.preventDefault();
    
    ingredient[index] = $("#table_filter").val().trim();

    index++;
    
    if(ingredient.length == 1){

        q += ingredient;

    }else{

        for(j=1; j<ingredient.length - 2 ; j++){

            q += "," + ingredient[j];

        }

        q += "," + ingredient[ingredient.length - 1];

    }



    console.log(ingredient);
    console.log(q);

    $("#table_filter").val("");

});