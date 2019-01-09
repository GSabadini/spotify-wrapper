/* to run: babel-node albums.js */

global.fetch = require('node-fetch');

import SpotifyWrapper from '../src/index';

const spotify = new SpotifyWrapper({
  token: 'BQD6DeDxMyHeNTD5it-1_PNz9rWswGQjFDcxeNIsNknmkR882Z7CgE0GTB6oi1nSFU5RI4ZNxYVpJuJ_vVnJWGKKDvtxVsYUPUALk_8-Aoc5gcemWMOiqCdRHkkzXXhMJ-hTHDtzhcflrKM'
});

const albums = spotify.search.albums('Incubus');

albums.then(data => data.albums.items.map(item => console.log(item.name)));
