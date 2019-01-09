const searchInput = {
  props: ['search'],
  computed: {
    searchTerm: {
      get() {
        return this.search;
      },
      set(newValue) {
        this.$emit('update:search', newValue);
      },
    },
  },
  template: `
    <div class="searchInput">
      <v-text-field
        v-model="searchTerm"
        label="Search..."
      ></v-text-field>
    </div>
  `,
};

const selectCategory = {
  props: ['selectedCategory'],
  computed: {
    selected: {
      get() {
        return this.selectedCategory;
      },
      set(newValue) {
        this.$emit('update:selected-category', newValue);
      },
    },
  },
  data: () => ({
    items: [
      {
        text: 'Artists',
        value: 'artists',
      },
      {
        text: 'Albums',
        value: 'albums',
      },
      {
        text: 'Tracks',
        value: 'tracks',
      },
      {
        text: 'Playlists',
        value: 'playlists',
      },
    ],
  }),
  template: `
    <div class="selectCategory">
      <v-select
        v-model="selected"
        :items="items"
        label="Category"
      ></v-select>
    </div>
  `,
};

const buttonClear = {
  props: ['payload'],
  computed: {
    pay: {
      get() {
        return this.payload;
      },
      set() {
        this.$emit('updated:payload', {});
      },
    },
  },
  methods: {
    clearPayload() {
      this.pay = {};
    },
  },
  template: `
    <div class="buttonClear">
      <v-btn
        dark
        block
        color="error"
        @click="clearPayload()"
      >Clear data</v-btn>
    </div>
  `,
};

const buttonInput = {
  props: [
    'search',
    'selectedCategory',
    'payload',
  ],
  computed: {
    pay: {
      get() {
        return this.payload;
      },
      set(newValue) {
        this.$emit('updated:payload', newValue);
      },
    },
  },
  methods: {
    getAlbums(query) {
      const albums = spotifyWrapper.searchAlbums(query);

      albums
        .then((data) => {
          console.log(data)
          if (data.items) return {};
          this.pay = data.albums.items.map(item => ({
            image: item.images[0] ? item.images[0].url : './assets/default-image.png',
            name: item.name,
          }));
        })
        .catch((error) => {
          alert('RENEW YOUR TOKEN!')
        });
    },
    getArtists(query) {
      const artists = spotifyWrapper.searchArtists(query);

      artists
        .then((data) => {
          console.log(data)
          if (data.items) return {};
          this.pay = data.artists.items.map(item => ({
            image: item.images[0] ? item.images[0].url : './assets/default-image.png',
            name: item.name,
            popularity: item.popularity,
          }));
        })
        .catch((error) => {
          alert('RENEW YOUR TOKEN!')
        });
    },
    getTracks(query) {
      const tracks = spotifyWrapper.searchTracks(query);

      tracks
        .then((data) => {
          console.log(data)
          if (data.items) return {};
          this.pay = data.tracks.items.map(item => ({
            artist: item.artists[0].name,
            preview_url: item.preview_url || '',
            name: item.name,
            popularity: item.popularity,
          }));
        })
        .catch((error) => {
          alert('RENEW YOUR TOKEN!')
        });
    },
    getPlaylists(query) {
      const playlists = spotifyWrapper.searchPlaylists(query);

      playlists
        .then((data) => {
          console.log(data)
          if (data.items) return {};
          this.pay = data.playlists.items.map(item => ({
            image: item.images[0] ? item.images[0].url : './assets/default-image.png',
            name: item.name,
            tracks: item.tracks.href,
          }));
        })
        .catch((error) => {
          alert('RENEW YOUR TOKEN!')
        });
    },
    getSearch(query, type) {
      const self = this;

      if (!query) {
        return;
      }

      if (!this.selectedCategory) {
        alert('Selecione uma categoria');
        return;
      }

      const search = {
        albums() {
          self.getAlbums(query);
        },
        artists() {
          self.getArtists(query);
        },
        tracks() {
          self.getTracks(query);
        },
        playlists() {
          self.getPlaylists(query);
        },
      };

      search[type]();
    },
  },
  watch: {
    selectedCategory() {
      this.getSearch(this.search, this.selectedCategory)
    },
  },
  template: `
    <div class="buttonInput">
      <v-btn
        dark
        block
        color="primary"
        @keydown.enter="getSearch(search, selectedCategory)"
        @click="getSearch(search, selectedCategory)"
      >Search</v-btn>
    </div>
  `,
};

const resultAlbums = {
  props: ['payload'],
  template: `
    <v-layout class="mt-5" row wrap align-center>
      <v-flex sm12 md6 lg4 v-for="(album, index) in payload" :key="index">
        <h3 class="my-2"> {{ album.name }} </h3>
        <v-img :src="album.image" width="439" heigth="439"/>
      </v-flex>
    </v-layout>
  `,
};

const resultArtists = {
  props: ['payload'],
  template: `
    <v-layout class="mt-5" row wrap align-center>
      <v-flex sm12 md6 lg4 v-for="(artist, index) in payload" :key="index">
        <h3 class="my-2"> {{ artist.name }} - Popularity: {{ artist.popularity }} </h3>
        <v-img :src="artist.image" width="439" heigth="439"/>
      </v-flex>
    </v-layout>
  `,
};

const resultTracks = {
  props: ['payload'],
  template: `
    <v-layout class="mt-5" row wrap align-center>
      <v-flex sm12 md6 lg4 v-for="(track, index) in payload" :key="index">
        <video controls name="media">
          <source :src="track.preview_url" type="audio/mpeg">
        </video>
        <h3 class="my-2"> {{ track.name }} - &#9733 {{ track.popularity }} </h3>
        <p> {{ track.artist }} </p>
      </v-flex>
    </v-layout>
  `,
};

const resultPlaylists = {
  props: ['payload'],
  template: `
    <v-layout class="mt-5" row wrap align-center>
      <v-flex sm12 md6 lg4 v-for="(playlist, index) in payload" :key="index">
        <h3 class="my-2"> {{ playlist.name }}</h3>
          <v-img :src="playlist.image" width="439" heigth="439"/>
        <p> {{ playlist.tracks }} </p>
      </v-flex>
    </v-layout>
  `,
};

const notFound = {
  template: `
    <v-layout class="mt-5" row wrap align-center justify-center>
      <v-flex xs12>
        <h1 color="red" class="my-2"> NENHUM RESULTADO ! ! !</h1>
      </v-flex>
    </v-layout>
  `,
};

const result = {
  props: [
    'payload',
    'selectedCategory',
  ],
  components: {
    resultAlbums,
    resultArtists,
    resultTracks,
    resultPlaylists,
    notFound,
  },
  computed: {
    payloadExist() {
      return !!Object.keys(this.payload).length;
    },
  },
  template: `
    <div class="resultSearch" v-if="payloadExist">
      <result-albums v-if="selectedCategory === 'albums'" :payload="payload"/>
      <result-playlists v-if="selectedCategory === 'playlists'" :payload="payload"/>
      <result-artists v-if="selectedCategory === 'artists'" :payload="payload"/>
      <result-tracks v-if="selectedCategory === 'tracks'" :payload="payload"/>
    </div>
    <div class="notFound" v-else>
      <not-found/>
    </div>
  `,
};

const containerView = {
  components: {
    buttonInput,
    buttonClear,
    searchInput,
    selectCategory,
    result,
  },
  data: () => ({
    selectedCategory: '',
    search: '',
    payload: {},
  }),
  template: `
    <v-container fluid grid-list-md>
      <v-layout row wrap align-center justify-center>
        <v-flex xs7 sm6>
          <search-input
            :search="search"
            @update:search="search = $event"
          ></search-input>
        </v-flex>
        <v-flex xs5 sm3>
          <select-category
            :selectedCategory="selectedCategory"
            @update:selected-category="selectedCategory = $event"
          ></select-category>
        </v-flex>
        <v-flex xs7>
          <button-input
            :search="search"
            :selectedCategory="selectedCategory"
            :payload="payload"
            @updated:payload="payload = $event"
          ></button-input>
        </v-flex>
        <v-flex xs2>
          <button-clear
            :payload="payload"
            @updated:payload="payload = $event"
          ></button-clear>
        </v-flex>
      </v-layout>
      <result
        :payload="payload"
        :selectedCategory="selectedCategory"
      ></result>
    </v-container>
  `,
};

const app = new Vue({
  el: '#app',
  components: {
    'container-view': containerView,
  },
});
