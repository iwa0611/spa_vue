<template>
  <div>
    <!-- 過去作表示用セレクタ -->
    <select  v-model="year">
      <option v-for="i in 10" :key="i">
        {{ 2023 - i }}
      </option>
    </select>
    <select  v-model="season">
      <option v-for="(option, i) in options" :value="option.value" :key="i">
        {{ option.text }}
      </option>
    </select>
    <button @click="getIndex">表示</button>
    <button v-if="loggedIn" @click="getIndexAll">全表示</button>
    <div class="flex-container">
      <div class="contents-box" v-for="content in contents" :key="content.id">
        <AnimeInfo v-for="l in { content } " @clickedRemoveList="reloadList" :item="l" :key="l.id"></AnimeInfo>
      </div>
    </div>
  </div>
</template>

<script>
import AnimeInfo from './AnimeInfo.vue'
import axios from 'axios'

export default {
  data() {
    return {
      contents: null,
      searchWord: null,
      list: '',
      year: 2022,
      season: '-winter',
      isLoading: false,
      currentPage: 1, // 現在のページ
      perPage: 20, // １ページ辺りの表示数
      total: '', // 検索結果の数
      options: [
        { text: '春', value: '-spring' },
        { text: '夏', value: '-summer' },
        { text: '秋', value: '-autumn' },
        { text: '冬', value: '-winter' }
      ]
    }
  },
  // リストの読み込み
  created: function() {
      this.reloadList()
  },
  components: {
    AnimeInfo
  },
  computed: {
    loggedIn: function() {
      return this.$store.state.loggedIn
    }
  },
  // 子コンポーネントから削除のイベントを受け取りリストを更新
  methods: {
    reloadList: async function() {
      await axios.post('/search_index?', { season: this.season, year: this.year })
      .then(response =>  (this.contents = response.data))
    },
    getIndex: function() {
      this.reloadList()
    },
    getIndexAll: function() {
      axios.post('/search_index?', { season: '', year: '' })
      .then(response =>  (this.contents = response.data))
    }
  }
}
</script>
