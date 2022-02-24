<template>
  <div>
    <input placeholder="search word" type="text" v-model="searchWord" />
    <select  v-model="year">
      <option value="">年</option>
      <option v-for="i in 10" v-bind:key="i">
        {{ 2023 - i }}
      </option>
    </select>
    <select  v-model="season">
      <option value="">季節</option>
      <option v-for="(option, i) in options" :value="option.value" :key="i">
        {{ option.text }}
      </option>
    </select>
    <button @click="onclick">検索</button>
    <transition>
      <spinner v-show="isLoading" size="huge" class="spin"></spinner>
    </transition>
    <AnimeInfo v-for="l in list" :item="l" :key="l.id"></AnimeInfo>
  </div>
</template>

<script>
import axios from 'axios'
import AnimeInfo from './AnimeInfo.vue'
import Spinner from 'vue-simple-spinner'

export default {
  data() {
    return {
      searchWord: null,
      list: '',
      year: '',
      season: '',
      isLoading: false,
      options: [
        { text: '春', value: '-spring' },
        { text: '夏', value: '-summer' },
        { text: '秋', value: '-autumn' },
        { text: '冬', value: '-winter' }
      ]
    }
  },
  components: {
    AnimeInfo,
    Spinner
  },
  methods: {
    // 検索時の処理
    onclick: async function() {
      this.isLoading = true
      axios.defaults.baseURL = process.env.VUE_APP_API_URL // 環境変数をセット
      await axios.post('/search?', { word: this.searchWord, season: this.season, year: this.year })
      .then(response =>  (this.list = response.data.works))
      this.isLoading = false
    }
  }
}
</script>

<style>
.spin {
  display: block;
  position: absolute;
  top: 50%;
  right: 45%;
  z-index: 1;
  margin: 10px auto;
  max-width: fit-content;
  opacity: 0.9;
  background-color: #42b983;
  border-radius: 20px;
}
</style>
