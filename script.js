
var provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');
firebase
  .auth()
  .signInWithPopup(provider)
  .then(function (result) {
    // This gives you a Google Access Token.
    var token = result.credential.accessToken;
    // The signed-in user info.
    var user = result.user;
    // save data to localstorage
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    // redirect to next page
    location.replace('<next-page.html>')
  });


var queryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";
var emotion =
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);


  });

//modals

fetch("https://accounts.spotify.com/authorize?client_id=audio-analysis/6EJiVf7U0p1BBfs0qqeb1f", {
  method: "GET",
  headers: {
    Authorization: `Bearer ${userAccessToken}`     
  }
})
.then(response => response.json())
.then(({beats})) => {
  beats.forEach((beat, index) => {
    console.log(`Beat ${index} starts at ${beat.start}`);
  })
}
  var searchOMDB = function(movie) {
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      createRow(response);
    });
  };
};
