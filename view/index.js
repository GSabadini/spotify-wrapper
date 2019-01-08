var searchInput = {
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

var selectCategory = {
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

var buttonInput = {
  props: [
    'search',
    'selectedCategory',
    'payload',
  ],
  watch: {
    payload(newValue, oldValue) {
      console.log('watch', newValue, oldValue);
    },
  },
  data: () => ({
    pay: {},
  }),
  methods: {
    handleSearch(query, type) {
      const search = {
        albums() {
          const albums = spotifyWrapper.searchAlbums(query);

          albums
            .then(data => {

              this.pay = data.albums.items.map(item => {
                return {
                  image: item.images[0].url,
                  name: item.name,
                }
              })
            })
            return albums;
        },
        artists() {
          const artists = spotifyWrapper.searchArtists(query);

          return searchArtists;
        },
        tracks() {
          const tracks = spotifyWrapper.searchTracks(query);

          return tracks;
        },
        playlist() {
          const playlist = spotifyWrapper.searchPlaylist(query);

          return playlist;
        },
      }

      return search[type]();
    },
    getSearch(query, type = 'album') {
      if (!query) {
        return
      }
      this.pay = this.handleSearch(query, type)

      this.$emit('updated:payload', this.pay);
    }
  },
  template: `
    <div class="buttonInput">
      <v-btn
        block
        dark
        color="primary"
        @click="getSearch(search, selectedCategory)"
      >Search</v-btn>
    </div>
  `,
};

var resultSearch = {
  props: ['payload'],
  computed: {
    payloadExist() {
      return !!Object.keys(this.payload).length;
    },
  },
  watch: {
    payload(newValue, oldValue) {
      console.log('watch', newValue, oldValue)
    }
  },
  template: `
    <div class="resultSearch">
      <pre> {{ payload }} </pre>
      <v-layout class="mt-5" row wrap align-center justify-center>
        <v-flex sm12 md6 lg4 v-for="(album, index) in payload" :key="index">
          <h3 class="my-2"> {{ album.name }} </h3>
          <v-img :src="album.image" width="439" heigth="439"/>
        </v-flex>
      </v-layout>
    </div>
  `,
};

var containerView = {
  components: {
    buttonInput,
    searchInput,
    selectCategory,
    resultSearch,
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
        <v-flex xs6>
          <button-input
            :search="search"
            :selectedCategory="selectedCategory"
            :payload="payload"
            @updated:payload="payload = $event"
          ></button-input>
        </v-flex>
      </v-layout>
      <result-search
        :payload="payload"
      ></result-search>
    </v-container>
  `,
};

var app = new Vue({
  el: '#app',
  components: {
    'container-view': containerView,
  },
});
