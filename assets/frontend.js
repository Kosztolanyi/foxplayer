'use strict';

const addToPlayListButton = document.querySelector('.add');
const addPlaylist = document.querySelector('.playlist-header > button');
const addToFavorites = document.querySelector('.favorite');
const tracks = document.querySelector('ol');
const playlists = document.querySelector('.playlist');
const audio = document.querySelector('audio');

window.addEventListener('load', e => {
  fetch('/tracks')
    .then(res => res.json())
    .then(json => {console.log(json);
      //json[0]
      // for (let i = 1; json.lenght - 1; i++) {
      //   let li = document.createElement('li');
      //   let span1 = document.createElement('span');
      //   let span2 = document.createElement('span');
      //   span1.innerText = json[0].title;
      //   span2.innerText = json[0].duration;
      //   li.appendChild(span1, span2);
      //   tracks.appendChild(li);
      }
    });
});

audio.addEventListener('loadstart', e => {
  console.log(`${e.type} happened`);
});
audio.addEventListener('play', e => {
  console.log(`${e.type} happened`);
});
audio.addEventListener('ended', e => {
  console.log(`${e.type} happened`);
});
audio.addEventListener('progress', e => {
  console.log(`${e.type} happened`);
});

addPlaylist.addEventListener('click', e => {
  if (document.querySelector('input')) {
    return;
  } else {
    e.preventDefault();
    let newPlaylist = document.createElement('input');
    alert('Type & hit enter!');
    newPlaylist.setAttribute('type', 'text');
    playlists.appendChild(newPlaylist);
    newPlaylist.focus();
    let input = document.querySelector('input');
    input.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        let newDiv = document.createElement('div');
        newDiv.innerText = input.value;
        playlists.removeChild(playlists.lastChild);
        playlists.appendChild(newDiv);
      }
    });
  }
});
document.addEventListener('keypress', e => {
  switch (e.charCode) {
    case 32:
      if (!audio.paused) {
        audio.pause();
      } else {
        audio.play();
      }
      break;
  }
});
document.addEventListener('keyup', e => {
  if (e.key === 'Escape') {
    if (audio.muted) {
      audio.muted = false;
    } else {
      audio.muted = true;
    }
  }
});
