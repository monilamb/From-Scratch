var favoritesArray = [];


console.log("1: "+favoritesArray);

//Populates favorites from user array
$(document).ready(function(){
    
    firebase.auth().onAuthStateChanged(function (user) {
        
        if (user) {
            database.ref().once('value', function(snapshot) {
                snapshot.forEach(function(childSnapshot) {
                    var childData = childSnapshot.val();
                    if(childData.uid==user.uid){
                        console.log("user matched");
                        favoritesArray = childData.recipeid;
                        console.log(childData.recipeid);
                    }
                });
            });
        
        } else {
            // User is signed out.
            // ...
        }
    
    });
    setTimeout(function(){
    console.log("2: " +favoritesArray);
    for(var i=0; i<favoritesArray.length; i++){ 

        console.log(favoritesArray);

        rID = favoritesArray[i];
        var favURL = "https://food2fork.com/api/get?key=7437f524fdb0830ecafc3da7be402e09&rId=" + rID;

    $.ajax({
            url: favURL,
            method: "GET"
        }).then(function (response) {


            var result = JSON.parse(response);
            console.log(result);
            var div = $("<div>");
            div.addClass("favorite-item");
            div.val(result.recipe.recipe_id);
            var imgDiv = $("<img>");
            div.addClass("favorite-img");
            var titleDiv = $("<div>");
            div.addClass("favorite-title");


            imgDiv.attr("src", result.recipe.image_url);
            titleDiv.text(result.recipe.title);

            div.append(imgDiv);
            div.append(titleDiv);
            $(".favorites").append(div);

        });


    }
}, 2000);
});

//Click function to return to main using session storage to transfer ID.
$(document).on("click", ".favorite-item", function(){

    var displayFavID = $(this).val();

    sessionStorage.setItem("favID", displayFavID);

    self.location.href = 'main-page.html';

});