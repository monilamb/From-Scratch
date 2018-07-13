var favoritesArray = ["35171", "47319", "35382", "47024"];

//Populates favorites from user array
$(document).ready(function(){

    for(var i=0; i<favoritesArray.length; i++){ 

        console.log(favoritesArray);

        rID = favoritesArray[i];
        var favURL = "https://food2fork.com/api/get?key=ac439ce8f238ddbc8d1f8d5d4e74839a&rId=" + rID;

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
            var titleDiv = $("<div>");
            

            imgDiv.attr("src", result.recipe.image_url);
            titleDiv.text(result.recipe.title);

            div.append(imgDiv);
            div.append(titleDiv);
            $(".favorites").append(div);

        });


    }
});

//Click function to return to main using session storage to transfer ID.
$(document).on("click", ".favorite-item", function(){

    var displayFavID = $(this).val();

    sessionStorage.setItem("favID", displayFavID);

    self.location.href = 'main-page.html';

});