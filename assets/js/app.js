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

//ajax prefilter to allow Cors
$.ajaxPrefilter(function (options) {
    if (options.crossDomain && $.support.cors) {
        options.url = 'https://cors-anywhere.herokuapp.com/' + options.url;
    }
});

var q = "q=";
var ingredient = [];
var searchedRecipeList = [];
var socialRankRecipeList = [];
var index = 0;
var ingredientBtn = false;
var queryMode = "";
var queryURL = "https://food2fork.com/api/" + queryMode + "?key=ac439ce8f238ddbc8d1f8d5d4e74839a&";
var rankURL = "http://food2fork.com/api/search?key=ac439ce8f238ddbc8d1f8d5d4e74839a&sort=r";
var email = null;
var password = null;
var favoritesArray = [];
var favoritesIndex = 0;
var pushkey;

$(document).ready(function () {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            var displayName = user.uid;
            console.log("page load...");
            console.log(user);
        } else {
            // User is signed out.
            // ...
        }
    });

});

//constructs q= portion of queryURL for ingredient add category. 
function ingredientAdd() {

    ingredient[index] = $("#table_filter").val().trim();

    if (ingredient[index].includes(" ", 0)) {

        var ingredientSplit = ingredient[index].split(" ");

        for (var i = 0; i < ingredientSplit.length; i++) {

            if (i == 0) {

                ingredient[index] = ingredientSplit[i];

            } else {

                ingredient[index] += "+" + ingredientSplit[i];

            }

        }

    }



    index++;

    if (ingredient.length == 1) {

        q += ingredient;

    } else {

        for (j = 1; j < ingredient.length - 2; j++) {

            q += "," + ingredient[j];

        }

        q += "," + ingredient[ingredient.length - 1];

    }


    console.log(ingredient);
    console.log(q);

    $("#table_filter").val("");


}

//email validation function
function validateEmail(email) {

    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);

}

//display the top socially ranked recipes
function displaySocialRank(){
    //ajax call to return results for query
    $.ajax({
        url: rankURL,
        method: "GET"
    }).then(function (response) {
        var results = JSON.parse(response);
        console.log(results);

        $.each(results.recipes, function (index) {
            //dynamically write the recipes to the page
        });
    });
}

//Triggers search request, need to connect to ajax call.
$(document).on("click", "#searchBtn", function (event) {

    event.preventDefault();

    //reset #recipe-list and searchedRecipeList array on new search
    $("#recipe-list").html("");
    searchedRecipeList = [];
    $("#recipe-image").attr("src", "");

    var category = $(".category-input:checked").val();

    //if ingredient category selected and input box contains user input, will add to ingredient list if enter is pressed, constructs queryURL in proper format if enter and no input.    
    if (category == 'i') {

        if ($("#table_filter").val() != "") {

            ingredientAdd();

        } else {

            queryURL = queryURL + q;

            console.log("i search: " + queryURL);

        }

        //if recipe search constructs queryURL in proper format. 
    } else if (category == 'r') {


        var recipe = $("#table_filter").val();
        console.log(recipe);
        var queryRecipe = "q=";

        recipe = recipe.split(" ");

        for (var i = 0; i < recipe.length; i++) {

            if (i == 0) {

                queryRecipe += recipe[i];

            } else {


                queryRecipe += ("+" + recipe[i]);

            }

        }

        queryMode = "search";
        queryURL = "https://food2fork.com/api/" + queryMode + "?key=ac439ce8f238ddbc8d1f8d5d4e74839a&";
        queryURL = queryURL + queryRecipe;
        $("#table_filter").val("");

        console.log(recipe);
        console.log("r search: " + queryURL);

    } else {

    };

    //ajax call to return results for query
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = JSON.parse(response);
        console.log(results);

        $.each(results.recipes, function (index) {

            var parentDiv = $("<div>");
            var newDiv = $("<div>");
            var likeBtn = $("<a>")
            likeBtn.addClass("fa fa-heart like-btn");
            likeBtn.attr("href", "#");
            console.log(this.recipe_id);
            likeBtn.val(this.recipe_id);
            newDiv.addClass("recipe-select");
            parentDiv.addClass("clearfix")
            newDiv.attr("data-index", index);
            newDiv.html(this.title);
            parentDiv.append(newDiv);
            parentDiv.append(likeBtn);
            $("#recipe-list").append(parentDiv);
            
            searchedRecipeList.push(this);

        });
    });

    //reset queryURL
    queryURL = "https://food2fork.com/api/search?key=ac439ce8f238ddbc8d1f8d5d4e74839a&";

});

//adds/removes ingredient add button based on selected category.
$(document).on("click", ".category-input", function () {

    var category = $(".category-input:checked").val();

    console.log(category);

    var addIngredientBtn = $("<button>");
    addIngredientBtn.addClass("btn btn-light");
    addIngredientBtn.attr("id", "add-ingredient");
    addIngredientBtn.attr("form", "user-input");
    addIngredientBtn.attr("type", "submit");
    addIngredientBtn.text("Add");

    if (category == 'i' && ingredientBtn == false) {

        ingredientBtn = true;
        $("#dropdown-button").append(addIngredientBtn);

        console.log(addIngredientBtn);

    } else if (category == 'r' && ingredientBtn == true) {

        ingredientBtn = false;
        $("#add-ingredient").remove();

    } else {

    }

});

//ties ingredient add button to ingredientAdd() function.
$(document).on("click", "#add-ingredient", function (event) {

    event.preventDefault();

    ingredientAdd();

});

//takes in input from login page, validates email address, displays modal if invalid input is provided.
//Issues: minor: modal does not pause script execution so continuing to press enter runs click event code repeatedly, User would be unaffected.
$(document).on("click", "#login-submit", function (event) {

    event.preventDefault();
    console.log("Entered on click");
    var proceed = false;
    if ($("#inputEmail").val().trim()) {


        email = $("#inputEmail").val().trim();

        var valid = validateEmail(email);
        password = $("#inputPassword").val().trim();
        if (valid == true) {
            proceed = true;
            //DEMENCIA
            firebase.auth().signInWithEmailAndPassword(email, password).catch(function (error) {
                // Handle Errors here.
                proceed = false;
                console.log("esto es proceed en error.. " + proceed);
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(error.code);
                console.log(error.code == "auth/user-not-found");
                alert("error");
                if (error.code == "auth/user-not-found") {
                    alert("This email is not associated with an account. Please register.");
                }

            }).then(function () {
                console.log("esto es proceed afuera... " + proceed);
                if (proceed) {
                    setTimeout(function () {
                        self.location.href = 'main-page.html'
                    }, 2000)
                }
            });
        



    } else {

        email = null;

        $("#modal-text").text("Please Enter a Valid Email.");

        $("#myModal").css("display", "block");




    }

}else {

        $("#modal-text").text("Please Enter an Email Address.");
        
        $("#myModal").css("display", "block");

    }
    
    if (email != null) {

    if ($("#inputPassword").val().trim()) {

        password = $("#inputPassword").val().trim();

    } else {

        $("#modal-text").text("Please Enter a Password.");

        $("#myModal").css("display", "block");



    }
}

console.log(email);
console.log(password);
$("#inputPassword").val("");
$("#inputEmail").val("");


});

$(document).on("click", "#signup-submit", function (event) {
    //REGISTER BUTTON
    var proceed = false;
    event.preventDefault();
    console.log("Entered on click");
    var username = $("#inputUsername").val().trim();

    if ($("#inputEmail").val().trim()) {

        email = $("#inputEmail").val().trim();
        var valid = validateEmail(email);
        password = $("#inputPassword").val().trim();
        if (valid == true) {
            proceed = true;
            console.log("email was valid");
            firebase.auth().createUserWithEmailAndPassword(email, password).catch(function (error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                proceed = false;
                if (errorCode) {
                    alert(error.code + ": " + error.message);
                }
            }).then(function () {
                firebase.auth().onAuthStateChanged(function (user) {
                    
                    if (user) {
                        localStorage.clear();
                        pushkey = database.ref().push({
                            uid: user.uid,
                            username: username,
                            recipeid: ""
    
                        });
                        console.log(pushkey);
                        localStorage.setItem("pushKey", pushkey.path.pieces_[pushkey.path.pieceNum_]);
                        console.log(user);
                    } else {
                        // User is signed out.
                        // ...
                    }
                });

                console.log("esto es proceed afuera... " + proceed);
                if (proceed) {
                    setTimeout(function () {
                        self.location.href = 'main-page.html'
                    }, 2000)
                }
            });
            

        }
        else {

            email = null;

            $("#modal-text").text("Please Enter a Valid Email.");

            $("#myModal").css("display", "block");




        }

    } else {

        $("#modal-text").text("Please Enter an Email Address.");

        $("#myModal").css("display", "block");

    }

    if (email != null) {

        if ($("#inputPassword").val().trim()) {

            password = $("#inputPassword").val().trim();


        } else {

            $("#modal-text").text("Please Enter a Password.");

            $("#myModal").css("display", "block");



        }
    }

    console.log(email);
    console.log(password);
    $("#inputPassword").val("");
    $("#inputEmail").val("");

});


//hides modal when user presses close button
$(document).on("click", "#modal-close", function () {

    $("#myModal").css("display", "none");

});

$(document).on("click", ".recipe-select", function () {
    var selectedRecipe = searchedRecipeList[parseInt($(this).attr("data-index"))];

    $("#recipe-image").attr("src", selectedRecipe.image_url);

    //reset #ingredient-list
    $("#ingredient-list").html("");

    queryMode = "get";
    queryURL = "https://food2fork.com/api/" + queryMode + "?key=ac439ce8f238ddbc8d1f8d5d4e74839a&rId=";
    queryURL += selectedRecipe.recipe_id;

    //ajax call to return results for query
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var results = JSON.parse(response);
        console.log(results);
        $.each(results.recipe.ingredients, function (index) {
            var newInput = $("<input>");
            newInput.attr("type", "checkbox");
            newInput.attr("name", "ingredient" + index);
            newInput.attr("value", this)

            var newLabel = $("<label>");
            newLabel.html(this);

            var newDiv = $("<div>");
            newDiv.html("<br>");

            $("#ingredient-list").append(newInput);
            $("#ingredient-list").append(newLabel);
            $("#ingredient-list").append(newDiv);
        });
    });

});


//favorites index needs to be set to recipeArray.length when user favorites are loaded on login.
$(document).on("click", ".like-btn", function(){

    var recipeID = $(this).val();
    
    favoritesArray[favoritesIndex] = recipeID;

    console.log("favorite added: " + favoritesArray[favoritesIndex]);

    favoritesIndex++;

    console.log(favoritesArray);


});

