$(document).ready(function(){


        var trendURL = "https://food2fork.com/api/search?key=ac439ce8f238ddbc8d1f8d5d4e74839a"
        $.ajax({
            url: trendURL,
            method: "GET"
        }).then(function (response) {


            var result = JSON.parse(response);
            console.log(result);
        $.each(result.recipes, function(index) {    
            
            var index = index;
            console.log(index);
            console.log(this);
            var div = $("<div>");
            div.addClass("trend-item");
            div.val(this.recipe_id);
            
            var imgDiv = $("<img>");
            imgDiv.addClass("trend-img");
            
            var titleDiv = $("<div>");
            titleDiv.addClass("trend-title");


            imgDiv.attr("src", this.image_url);
            titleDiv.text(this.title);

            div.append(imgDiv);
            div.append(titleDiv);
            $(".images").append(div);

        });
    });    
});

//Click function to return to main using session storage to transfer ID.
$(document).on("click", ".trend-item", function(){

    var displayTrendID = $(this).val();

    sessionStorage.setItem("trendID", displayTrendID);

    self.location.href = 'main-page.html';

});