

$(document).ready(() => {
  const modal = $('.modal');
  $('#Modal-btn').click(function () {
    console.log('hi');
    modal.addClass('is-active');
  });
  $('#Modal-btn2').click(function () {
    console.log('hi');
    modal.addClass('is-active');
  });
  $('#Modal-btn3').click(function () {
    console.log('hi');
    modal.addClass('is-active');
  });
  $('.modal-close').click(function () {
    modal.removeClass('is-active');
  });
});

$('#myBtn').click(function () {
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
      location.replace('<feelings.html>');
    });
});
var mood;

//Spotify

const spotify_CLIENT = '3668979c29594280a923ed6392132bb4';

let stateKey = 'spotify_auth_state';

// on load, try to pull access_token from URL parameters
// localhost:5501?access_token=[token]&state=[state]
const params = getHashParams();
console.log(params);

// save access_token, state, and stored state into variables
let access_token = params.access_token,
  userId = '',
  playerId = '',
  state = params.state,
  storedState = localStorage.getItem(stateKey);

// NO NEED TO WORRY ABOUT THIS
function getHashParams() {
  const hashParams = {};
  let e,
    r = /([^&;=]+)=?([^&;]*)/g,
    q = window.location.hash.substring(1);
  while ((e = r.exec(q))) {
    hashParams[e[1]] = decodeURIComponent(e[2]);
  }
  return hashParams;
}

// NO NEED TO WORRY ABOUT THIS
function generateRandomString(length) {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}

// if there's an access_token and state is either null OR doesn't equal stored
// state, then let user know there's an issue with authentication
if ((access_token && (state == null || state !== storedState)) || !access_token) {
  console.log('You need to login.');
  spotifyLogin();
} else {
  // if authentication is successful, remove item from localStorage
  localStorage.removeItem(stateKey);
  // if there's an access token, get user information
  if (access_token) {
    $.ajax({
      url: 'https://api.spotify.com/v1/me',
      headers: {
        Authorization: 'Bearer ' + access_token
      }
    }).then(function (response) {
      console.log(response);
      // $('#login-button').hide();
      // $('#app-body').show();

      // userId = response.id;
      // $('#profile-info').html(`<h3>${response.display_name}</h3>`);
      // // <img class="img-fluid" src="${response.images[0].url}"/>
    });
  }
}

// turn on spotify player
window.onSpotifyWebPlaybackSDKReady = () => {
  const token = access_token;
  const player = new Spotify.Player({
    name: 'Web Playback SDK Quick Start Player',
    getOAuthToken: cb => {
      cb(token);
    }
  });

  // Error handling
  player.addListener('initialization_error', ({ message }) => {
    console.error(message);
  });
  player.addListener('authentication_error', ({ message }) => {
    console.error(message);
  });
  player.addListener('account_error', ({ message }) => {
    console.error(message);
  });
  player.addListener('playback_error', ({ message }) => {
    console.error(message);
  });

  // Playback status updates
  player.addListener('player_state_changed', state => {
    // console.log(state);
  });

  // Ready
  player.addListener('ready', ({ device_id }) => {
    console.log('Ready with Device ID', device_id);
    playerId = device_id;
    // setWebPlayer(device_id, access_token);
    getCategories();
  });

  // Not Ready
  player.addListener('not_ready', ({ device_id }) => {
    console.log('Device ID has gone offline', device_id);
  });

  // Connect to the player!
  player.connect();
};

// LOG INTO SPOTIFY
function spotifyLogin() {
  const redirect_uri =
    location.hostname === 'localhost' || location.hostname === '127.0.0.1'
      ? 'http://127.0.0.1:5501/feelings.html'
      : 'https://jefftab.github.io/Coding-Cats-Project/feelings.html';

  // generate random state key
  const state = generateRandomString(16);

  // set state in localStorage (will read when we get it back)
  localStorage.setItem(stateKey, state);
  // Set scope for authentication privileges
  const scope =
    'streaming user-read-birthdate user-read-private user-read-email user-read-playba' +
    'ck-state user-modify-playback-state';

  // build out super long url
  let url = 'https://accounts.spotify.com/authorize';
  url += '?response_type=token';
  url += '&client_id=' + encodeURIComponent(spotify_CLIENT);
  url += '&scope=' + encodeURIComponent(scope);
  url += '&redirect_uri=' + encodeURIComponent(redirect_uri);
  url += '&state=' + encodeURIComponent(state);

  // change pages and go to the spotify login page
  window.location = url;
}

// SET SPOTIFY WEB PLAYER TO BROWSER
function setWebPlayer(playerId, access_token) {
  $.ajax({
    url: 'https://api.spotify.com/v1/me/player',
    method: 'PUT',
    data: JSON.stringify({ device_ids: [playerId] }),
    headers: {
      Authorization: 'Bearer ' + access_token
    }
  })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (err) {
      console.log(err);
    });
}

// get playlist tracks
function selectPlaylist(mood) {
  if (mood === 'happy') {
    var playlistId = '37i9dQZF1DXdPec7aLTmlC';
    var playlistUri = 'spotify:playlist:37i9dQZF1DXdPec7aLTmlC';
  } else if (mood === 'mad') {
    var playlistId = '37i9dQZF1DX3YSRoSdA634';
    var playlistUri = 'spotify:playlist:37i9dQZF1DX3YSRoSdA634';
  } else {
    var playlistId = '37i9dQZF1DX3ND264N08pv';
    var playlistUri = 'spotify:playlist:37i9dQZF1DX3ND264N08pv';
  }

  $.ajax({
    url: `https://api.spotify.com/v1/users/${userId}/playlists/${playlistId}/tracks`,
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + access_token
    }
  }).then(function (response) {
    const trackInfo = response.items.map(function (trackInfo) {
      return trackInfo.track;
    });
    console.log(trackInfo);
    printTrackInfo(trackInfo, playlistUri);
  });
}

// print tracks to page
function printTrackInfo(trackArray, playlistContextUri) {
  trackArray.forEach(function (track) {
    console.log(track);
    const artists = track.artists.map(artist => artist.name).join(', ');
    // UPDATE THIS TO PRINT TO PAGE
  });
}

// select and play track
function selectTrack() {
  $('.track-button').removeClass('active');
  $(this).addClass('active');
  const trackId = $(this).attr('data-track-uri');
  const contextUri = $(this).attr('data-context');
  console.log(trackId);
  $.ajax({
    url: `https://api.spotify.com/v1/me/player/play?device_id=${playerId}`,
    method: 'PUT',
    data: JSON.stringify({
      offset: {
        uri: trackId
      },
      context_uri: contextUri
    }),
    headers: {
      Authorization: 'Bearer ' + access_token
    }
  })
    .then(function (response) {
      console.log(response);
      setTimeout(getCurrentSong, 1500);
      $('#play-button').attr('data-state', 'play');
      $('#play-button > i')
        .removeClass('fa-play')
        .addClass('fa-pause');
    })
    .catch(function (err) {
      console.log(err);
    });
}

// skip song
function nextSong() {
  $.ajax({
    url: 'https://api.spotify.com/v1/me/player/next',
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + access_token
    }
  }).then(function (response) {
    console.log(response);
    setTimeout(getCurrentSong, 1500);
    $('#play-button').attr('data-state', 'play');
    $('#play-button > i')
      .removeClass('fa-play')
      .addClass('fa-pause');
  });
}

// previous song
function prevSong() {
  $.ajax({
    url: 'https://api.spotify.com/v1/me/player/previous',
    method: 'POST',
    headers: {
      Authorization: 'Bearer ' + access_token
    }
  }).then(function (response) {
    console.log(response);
    setTimeout(getCurrentSong, 1500);
    $('#play-button').attr('data-state', 'play');
    $('#play-button > i')
      .removeClass('fa-play')
      .addClass('fa-pause');
  });
}

// resume playback
function resumeSong() {
  console.log('hi');
  $.ajax({
    url: 'https://api.spotify.com/v1/me/player/play',
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + access_token
    }
  }).then(function (response) {
    console.log(response);
    setTimeout(getCurrentSong, 1500);
    $('#play-button').attr('data-state', 'play');
    $('#play-button > i')
      .removeClass('fa-play')
      .addClass('fa-pause');
  });
}

// pause playback
function pauseSong() {
  console.log('hi');
  $.ajax({
    url: 'https://api.spotify.com/v1/me/player/pause',
    method: 'PUT',
    headers: {
      Authorization: 'Bearer ' + access_token
    }
  }).then(function (response) {
    console.log(response);
    $('#play-button').attr('data-state', 'pause');
    $('#play-button > i')
      .removeClass('fa-pause')
      .addClass('fa-play');
  });
}

// get current song info
function getCurrentSong() {
  $.ajax({
    url: 'https://api.spotify.com/v1/me/player/currently-playing',
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + access_token
    }
  }).then(function (response) {
    const trackUri = response.item.uri;
    console.log(response.item);
    console.log(trackUri);
    $('.track-button').removeClass('active');
    $(`[data-track-uri="${trackUri}"]`).addClass('active');
    $('#track').text(response.item.name);
    $('#artist').text(response.item.artists.map(artist => artist.name).join(', '));
  });
}

// get categories on load to select from
function getCategories() {
  $.ajax({
    url: 'https://api.spotify.com/v1/browse/categories',
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + access_token
    }
  }).then(function (response) {
    console.log(response);
    console.log(response.categories.items);
  });
}
// when selecting categories for playlists
function selectCategories() {
  // get categories out of select form
  const category_id = 'mood';

  $.ajax({
    url: `https://api.spotify.com/v1/browse/categories/${category_id}/playlists?limit=50`,
    method: 'GET',
    headers: {
      Authorization: 'Bearer ' + access_token
    }
  }).then(function (response) {
    console.log(response);
    printPlaylistInfo(response.playlists.items);
  });
}