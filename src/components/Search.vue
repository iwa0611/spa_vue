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
  <AnimeInfo v-for="l in list" :item="l" :key="l.id"></AnimeInfo>
</div>
</template>

<script>
import axios from 'axios'
import AnimeInfo from './AnimeInfo.vue'

export default {
  data() {
    return {
      searchWord: null,
      list: '',
      year: '',
      season: '',
      options: [
        { text: '春', value: '-spring' },
        { text: '夏', value: '-summer' },
        { text: '秋', value: '-autumn' },
        { text: '冬', value: '-winter' }
      ]
    }
  },
  components: {
    AnimeInfo
  },
  methods: {
    // 検索時の処理
    onclick: function() {
      axios.defaults.baseURL = process.env.VUE_APP_API_URL // 環境変数をセット
      axios.post('/search?', { word: this.searchWord, season: this.season, year: this.year })
      .then(response =>  (this.list = response.data.works))
    }
  }
}
</script>
