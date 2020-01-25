// variables
var mood;
var feelingsArea = $("#feelings-area");
const modal = $(".modal");
var navBarBurger = $(".navbar-burger");
var navBarMenu = $(".navbar-menu");
var giphyContainer = $(".giphy-container");
var spotifyContainer = $(".spotify-container");
var instagramContainer = $(".instagram-container");
var userInfoBox = $("#userInfoBox");

// userinfo pull and print
// var userInfo = localStorage.getItem("user");
// var userInfoArray = JSON.parse(userInfo);
// console.log(userInfoArray);
// var userName = userInfoArray.displayName;
// var userPic = userInfoArray.photoURL;
// var userFigure = $("<figure>");
// userFigure.attr("class", "image is-128x128");
// var userImage = $("<img>");
// userImage.attr("src", userPic);
// userImage.attr("alt", "user image");
// userInfoBox.append(userImage);
// userInfoBox.append(userName);



// login stuff
$("#myBtn").click(function () {
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
      // page for live testing
      // location.replace('http://127.0.0.1:5500/Coding-Cats-Project/feelings.html');
      // page for final hosted page
      location.replace('https://jefftab.github.io/Coding-Cats-Project/feelings');

    });

});

// clicking on the moods
$(document).on("click", ".moodButton", handleClick);

function handleClick(event) {
  navBarBurger.removeClass("is-active");
  navBarMenu.removeClass("is-active");
  mood = this.getAttribute("data-mood");
  console.log(mood);
  modal.addClass("is-active");
  giphyContainer.empty();
  spotifyContainer.empty();
  instagramContainer.empty();
  $(".modal-close").click(function () {
    modal.removeClass("is-active");
  });
};

// clicking on the APIs
$("#giphy").click(runGiphy);
$("#spotify").click(runSpotify);
$("#instagram").click(runInstagram);

function runGiphy() {
  modal.removeClass("is-active");
  feelingsArea.addClass("hidden");
  giphyContainer.removeClass("hidden");
  spotifyContainer.addClass("hidden");
  instagramContainer.addClass("hidden");

  var GiphyqueryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + mood;

  $.ajax({
    url: GiphyqueryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);

    for (var i = 0; i < 11; i++) {
      var gifURL = response.data[i].images.downsized_medium.url;
      var gifImage = $("<img>");
      gifImage.attr("src", gifURL);
      giphyContainer.append(gifImage);
    };
  });
};

function runSpotify() {
  modal.removeClass("is-active");
  feelingsArea.addClass("hidden");
  giphyContainer.addClass("hidden");
  spotifyContainer.removeClass("hidden");
  instagramContainer.addClass("hidden");

  // spotify functionality
  selectPlaylist(mood);
};

function runInstagram() {
  modal.removeClass("is-active");
  feelingsArea.addClass("hidden");
  giphyContainer.addClass("hidden");
  spotifyContainer.addClass("hidden");
  instagramContainer.removeClass("hidden");


  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://instagramdimashirokovv1.p.rapidapi.com/tag/" + mood + "/optional",
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "InstagramdimashirokovV1.p.rapidapi.com",
      "x-rapidapi-key": "6810fa7ef1msh4961884680403f2p17bac4jsnd77de8b9da63"
    }
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  })

    .then(function (response) {

      for (var i = 0; i < 99; i++) {
        var imageURL = response.edges[i].node.display_url;
        var instaFigure = $("<figure>");
        instaFigure.attr("class", "image is-128x128");
        var instaImage = $("<img>");
        var instaAlt = response.edges[i].node.accessibility_caption;
        instaImage.attr("src", imageURL);
        instaImage.attr("alt", instaAlt);
        (instagramContainer).append(instaImage);

      };
    });
};

// hamburger menu
$(".navbar-burger").click(openMenu);

function openMenu() {
  if (navBarBurger.hasClass("is-active")) {
    navBarBurger.removeClass("is-active");
    navBarMenu.removeClass("is-active");
  }
  else {
    navBarBurger.addClass("is-active");
    navBarMenu.addClass("is-active");
  };
};
