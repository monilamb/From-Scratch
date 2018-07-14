$(document).ready(function(){
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
                var parentRankDiv = $("<div>");
                var newRankDiv = $("<div>");
                newRankDiv.addClass("trending-select");
                parentRankDiv.addClass("")
                newRankDiv.attr("data-index", index);
                newRankDiv.html(this.title);
                parentRankDiv.append(newRankDiv);
                $("#trending-recipe-list").push(this);
                console.log(this);
            });
        });
    };
})