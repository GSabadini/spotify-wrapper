global.fetch = require('node-fetch');

import { searchAlbums } from '../src/main';

const albums = searchAlbums('Inbucus');

albums.then(data => console.log(data));
