
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


var GiphyqueryURL = "https://api.giphy.com/v1/gifs/trending?api_key=dc6zaTOxFJmzC";
var emotion =
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);


  });

  var SpotifyqueryURL = "https://accounts.spotify.com/api/token";
  var emotion = 
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
  })
  
