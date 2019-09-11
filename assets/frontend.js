'use strict';

const addToPlayListButton = document.querySelector('.add');
const addPlaylist = document.querySelector('.playlist-header > button');
const addToFavorites = document.querySelector('.favorite');
const tracks = document.querySelector('ol');
const playlists = document.querySelector('.playlist');
const audio = document.querySelector('audio');
const deletebuttons = document.q;
//FUNCTIONS
function createDivToPlaylist(innerText, id) {
  let div = document.createElement('div');
  div.innerHTML = innerText;
  div.classList = `'${id} tracks-in-list`;
  let button = document.createElement('button');
  button.className = id;
  button.innerHTML = '<i class="far fa-trash-alt"></i>';
  div.appendChild(button);
  return div;
}
//LOAD
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
        li.className = e.id;
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
    .then(json => {
      json.forEach(e => {
        if (e.playlist !== '0') {
          playlists.appendChild(createDivToPlaylist(e.playlist, e.id));
        }
      });
    })
    .catch(console.log);
});

//AUDIO EVENTLISTENERS
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
//CLICKS
addPlaylist.addEventListener('click', e => {
  if (document.querySelector('input')) {
    return;
  } else {
    e.preventDefault();
    alert('Type & hit enter!');
    //creating input
    let newPlaylist = document.createElement('input');
    newPlaylist.setAttribute('type', 'text');
    playlists.appendChild(newPlaylist);
    newPlaylist.focus();
    //POST to database
    let input = document.querySelector('input');
    input.addEventListener('keypress', e => {
      if (e.key === 'Enter') {
        fetch('/playlists', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ playlist: input.value })
        })
          .then(res => res.json())
          .then(json => {
            console.log(json);
            let newDiv = createDivToPlaylist(input.value, json.insertId);
            playlists.removeChild(playlists.lastChild);
            playlists.appendChild(newDiv);
          });
      }
    });
  }
});
document.querySelector('.playlist').addEventListener('click', e => {
  console.log(e.target.className);
  if (e.target.className === 'far fa-trash-alt') {
    const audioId = `${e.target.parentElement.className}`;
    console.log(audioId);
    fetch(`/playlists/${audioId}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(json => console.log(json, 'ok'))
      .catch(console.log);
    e.target.parentNode.parentNode.parentNode.removeChild(
      e.target.parentNode.parentNode
    );
  }
});
//KEYPRESS
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
