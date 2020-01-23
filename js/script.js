// variables
var mood;
var feelingsArea = $("#feelings-area");
const modal = $(".modal");
var navBarBurger = $(".navbar-burger");
var navBarMenu = $(".navbar-menu");

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
      location.replace('<feelings.html>')
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

  var GiphyqueryURL = "https://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q=" + mood;

  $.ajax({
    url: GiphyqueryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
  });
  $(".giphy-container").append(mood)
};

function runSpotify() {
  modal.removeClass("is-active");
  feelingsArea.addClass("hidden");

  // spotify functionality
};

function runInstagram() {
  modal.removeClass("is-active");
  feelingsArea.addClass("hidden");

  var settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://instagramdimashirokovv1.p.rapidapi.com/tag/" + mood + "/optional",
    "method": "GET",
    "headers": {
      "x-rapidapi-host": "InstagramdimashirokovV1.p.rapidapi.com",
      "x-rapidapi-key": "6810fa7ef1msh4961884680403f2p17bac4jsnd77de8b9da63"
    }
  }

  $.ajax(settings).done(function (response) {
    console.log(response);
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

