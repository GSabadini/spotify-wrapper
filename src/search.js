/* global fetch */

import API_URL from './config';
import toJSON from './utils';

export const search = (query, type) => {
  const headers = {
    headers: {
      Authorization: `Bearer BQDItSzCx7lEq43DIGqEWNVSdakTXG7SYbucyh9BvvnRPINo6Csn3tAL83i0nnBLP-B1bjodnKyBrB2TL2fpbOMYrz76FkJzNzrsAjvdOIRhRynE6YfLDqMww8-roWJP-8CWH2H37pjfMz4`,
    },
  };
  return fetch(`${API_URL}/search?q=${query}&type=${type}`, headers).then(toJSON);
};

export const searchArtists = (query) => {
  return search(query, 'artist');
};

export const searchAlbums = (query) => {
  return search(query, 'album');
};

export const searchTracks = (query) => {
  return search(query, 'track');
};

export const searchPlaylists = (query) => {
  return search(query, 'playlist');
};
