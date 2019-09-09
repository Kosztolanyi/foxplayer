'use strict';

const addToPlayListButton = document.querySelector('.add');
const addPlaylist = document.querySelector('.playlist-header > button');
const addToFavorites = document.querySelector('.favorite');
const tracks = document.querySelector('ol');
const playlists = document.querySelector('.playlist');
const audio = document.querySelector('audio');

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
    alert('Type & hit enter!')
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
    })
  }
});
