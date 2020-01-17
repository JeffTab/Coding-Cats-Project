

var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";
var emotion = 
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response);


    });