'use strict';

const addToPlayListButton = document.querySelector('.add');
const addPlaylist = document.querySelector('.fa-plus');
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