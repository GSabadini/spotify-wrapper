/*eslint-disable */
import chai, { expect } from 'chai';
import { getAlbum, getAlbums, getAlbumTracks } from '../src/album'
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
import sinonStubPromise from 'sinon-stub-promise';

chai.use(sinonChai);
sinonStubPromise(sinon);

global.fetch = require('node-fetch');

describe('Album', () => {
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

    it('should have getAlbum method', () => {
      expect(getAlbum).to.exist;
    });

    it('should have getAlbumTracks method', () => {
      expect(getAlbumTracks).to.exist;
    });

  });

  describe('getAlbum', () => {

    it('should call fetch method', () => {
      const album = getAlbum();

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const album = getAlbum('2i6nd4FV6y7K9fln6eelmR');

      expect(fetchedStub)
        .to
        .have
        .been
        .calledWith('https://api.spotify.com/v1/albums/2i6nd4FV6y7K9fln6eelmR');

      const album2 = getAlbum('2i6nd4FV6y7K9fln6eelmK');

      expect(fetchedStub)
        .to
        .have
        .been
        .calledWith('https://api.spotify.com/v1/albums/2i6nd4FV6y7K9fln6eelmK');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });

      const album = getAlbum('2i6nd4FV6y7K9fln6eelmR');

      // expect(album.resolveValue).to.be.eql({ album: 'name' });
    });

  });

  describe('getAlbums', () => {

    it('should call fetch method', () => {
      const albums = getAlbums();

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albums = getAlbums(['2i6nd4FV6y7K9fln6eelmR', '2i6nd4FV6y7K9fln6eelmK']);

      expect(fetchedStub)
        .to
        .have
        .been
        .calledWith('https://api.spotify.com/v1/albums/ids=2i6nd4FV6y7K9fln6eelmR,2i6nd4FV6y7K9fln6eelmK');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });

      const albums = getAlbums(['2i6nd4FV6y7K9fln6eelmR', '2i6nd4FV6y7K9fln6eelmK']);

      // expect(album.resolveValue).to.be.eql({ album: 'name' });
    });

  });

  describe('getAlbumTracks', () => {

    it('should call fetch method', () => {
      const albumTracks = getAlbumTracks();

      expect(fetchedStub).to.have.been.calledOnce;
    });

    it('should call fetch with the correct URL', () => {
      const albumTracks = getAlbumTracks('2i6nd4FV6y7K9fln6eelmR');

      expect(fetchedStub)
        .to
        .have
        .been
        .calledWith('https://api.spotify.com/v1/albums/2i6nd4FV6y7K9fln6eelmR/tracks');
    });

    it('should return the correct data from Promise', () => {
      promise.resolves({ album: 'name' });

      const albumTracks = getAlbumTracks('2i6nd4FV6y7K9fln6eelmR');

      // expect(album.resolveValue).to.be.eql({ album: 'name' });
    });

  });
});
