var favoritesArray = ["35171", "47319", "35382", "47024"];

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
            var div = $("<div>");
            div.addClass("favorite-item");
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
});

