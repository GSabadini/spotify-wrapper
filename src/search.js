/* global fetch */

import API_URL from './config';
import toJSON from './utils';

export const search = (query, type) => {
  const headers = {
    headers: {
      Authorization: 'Bearer BQBjidgpAorFqAVFmxf68fxdJk6151v1v_w4MYvCSejhVEvS7ve172pDcQDMeHPnBMsK8JpwvcW2TAIbN7xNJ4YTm_G4whIVAR-KH_C1Q1C40XvVvzMwVNbuKDAyKEj7D1F2vyQOB888fVg',
    },
  };

  return fetch(`${API_URL}/search?q=${query}&type=${type}`, headers).then(toJSON);
};

export const searchArtists = query => search(query, 'artist');

export const searchAlbums = query => search(query, 'album');

export const searchTracks = query => search(query, 'track');

export const searchPlaylists = query => search(query, 'playlist');
