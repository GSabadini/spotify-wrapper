/*eslint-disable */
import chai, { expect } from 'chai';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

import {
  search,
  searchAlbums,
  searchArtists,
  searchTracks,
  searchPlaylists
} from '../src/search';

describe('Search', () => {
  let fetchedStub;
  let promise;

  beforeEach(() => {
    fetchedStub = sinon.stub(global, 'fetch');
    promise = fetchedStub.resolves({ json: () => {} });
  });

  afterEach(() => {
    fetchedStub.restore();
  });

  describe('Smoke tests', () => {

    it('should exist the search method', () => {
      expect(search).to.exist;
    });

    it('should exist the searchAlbums method', () => {
      expect(searchAlbums).to.exist;
    });

    it('should exist the searchArtists method', () => {
      expect(searchArtists).to.exist;
    });

    it('should exist the searchTracks method', () => {
      expect(searchTracks).to.exist;
    });

    it('should exist the searchPlaylists method', () => {
      expect(searchPlaylists).to.exist;
    });
  });

  describe('Generic search', () => {

    it('should call fetch function', () => {
      const artists = search();

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should receive the correct url to fetch', () => {

      context('passing one type', () => {
        const artists = search('Nirvana', 'artist');
        expect(fetchedStub)
          .to
          .have
          .been
          .calledWith('https://api.spotify.com/v1/search?q=Nirvana&type=artist');

        const albums = search('Nirvana', 'albums');
        expect(fetchedStub)
          .to
          .have
          .been
          .calledWith('https://api.spotify.com/v1/search?q=Nirvana&type=albums');
      });

      context('passing more then one type', () => {
        const artists = search('Inbucus', ['artists', 'album']);

        expect(fetchedStub)
          .to
          .have
          .been
          .calledWith('https://api.spotify.com/v1/search?q=Inbucus&type=artists,album');
      });

    });

    // it('should return the JSON Data from the Promise', () => {
    //   promise.resolves({ body: 'json' });
    //
    //   const artists = search('Incubus', 'artist');
    //   expect(artists.resolve).to.be.eql({ body: 'json' });
    // })

  });

  describe('searchArtists', () => {

    it('should call fetch function', () => {
      const artists = searchArtists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const artists = searchArtists('Incubus');
      expect(fetchedStub)
        .to
        .have
        .been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=artist');

      const artists2 = searchArtists('Muse');
      expect(fetchedStub)
        .to
        .have
        .been
        .calledWith('https://api.spotify.com/v1/search?q=Muse&type=artist');
    });

  });

  describe('searchAlbums', () => {

    it('should call fetch function', () => {
      const albums = searchAlbums('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albums = searchAlbums('Incubus');
      expect(fetchedStub)
        .to
        .have
        .been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=album');

      const albums2 = searchAlbums('Muse');
      expect(fetchedStub)
        .to
        .have
        .been
        .calledWith('https://api.spotify.com/v1/search?q=Muse&type=album');
    });

  });

  describe('searchTracks', () => {

    it('should call fetch function', () => {
      const tracks = searchTracks('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const tracks = searchTracks('Incubus');
      expect(fetchedStub)
        .to
        .have
        .been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=track');

      const tracks2 = searchTracks('Muse');
      expect(fetchedStub)
        .to
        .have
        .been
        .calledWith('https://api.spotify.com/v1/search?q=Muse&type=track');
    });

  });

  describe('searchPlaylists', () => {

    it('should call fetch function', () => {
      const playlist = searchPlaylists('Incubus');
      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const playlist = searchPlaylists('Incubus');
      expect(fetchedStub)
        .to
        .have
        .been
        .calledWith('https://api.spotify.com/v1/search?q=Incubus&type=playlist');

      const playlist2 = searchPlaylists('Muse');
      expect(fetchedStub)
        .to
        .have
        .been
        .calledWith('https://api.spotify.com/v1/search?q=Muse&type=playlist');
    });

  });

});
