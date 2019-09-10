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
    .then(json => {
      let h2 = document.querySelector('.details > h2');
      h2.innerText = json[0].title;
      let p = document.querySelector('.details > p');
      p.innerText = json[0].artist;
      json.forEach(e => {
        let li = document.createElement('li');
        let span1 = document.createElement('span');
        let span2 = document.createElement('span');
        span2.className = 'time';
        span1.innerText = e.title;
        span2.innerText = `${Math.floor(e.duration / 60)}:${Math.floor(
          e.duration
        ) -
          Math.floor(e.duration / 60) * 60}`;
        li.appendChild(span1);
        li.appendChild(span2);
        tracks.appendChild(li);
      });
    });
});
window.addEventListener('load', e => {
  fetch('/playlist')
    .then(res => res.json())
    .then(json => {console.log(json);
      json.forEach(e => {
        if (e.playlist !== '0') {
          let div = document.createElement('div');
          div.innerHTML = e.playlist;
          playlists.appendChild(div);
        }
      });
    })
    .catch(console.log);
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
