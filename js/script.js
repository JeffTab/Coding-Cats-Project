// variables
var mood;
var feelingsArea = $("#feelings-area");
const modal = $(".modal");
var navBarBurger = $(".navbar-burger");
var navBarMenu = $(".navbar-menu");
var instagramContainer = $(".instagram-container");

// var userInfo = localStorage.getItem("user");
// // var userInfoArray = userInfo.split(",");
// // console.log(userInfoArray);
// // var userName = userInfoArray.displayName;
// // console.log(userName);
// // var userPic = userInfoArray.photoURL;
// // console.log(userPic);

// var userName = userInfo.getDisplayName();
// console.log(userName);


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
      location.replace('http://127.0.0.1:5501/feelings.html');
      // page for final hosted page
      // location.replace('https://jefftab.github.io/Coding-Cats-Project/feelings');
      console.log(result);
    });
  console.log(result);
});

// clicking on the moods
$(document).on("click", ".moodButton", handleClick);

function handleClick(event) {
  navBarBurger.removeClass("is-active");
  navBarMenu.removeClass("is-active");
  mood = this.getAttribute("data-mood");
  console.log(mood);
  modal.addClass("is-active");
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

