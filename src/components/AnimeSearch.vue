<template>
  <div>
    <input placeholder="search word" type="text" v-model="searchWord" />
    <select  v-model="year">
      <option value="">年</option>
      <option v-for="i in 10" :key="i">
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
      <spinner v-if="isLoading" size="huge" class="spin"></spinner>
    </transition>
    <div v-if="this.total > 0">検索結果：{{ this.total }}件</div>
    <div class="flex-container">
      <AnimeInfo v-for="l in list" :item="l" :key="l.id"></AnimeInfo>
    </div>
    <PagiNate v-if="this.total > 0"
      v-scroll-to="'#nav'"
      :v-model="currentPage" 
      :page-count="getPageCount"
      :click-handler="clickCallback"
      :page-range="5"
      :margin-pages="2"
      :prev-text="''"
      :next-text="''"
      :container-class="'pagination'"
      :page-link-class="'page-link'">
    </PagiNate>
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
  components: {
    AnimeInfo,
    Spinner
  },
  methods: {
    // 検索時の処理
    onclick: async function() {
      this.isLoading = true
      axios.defaults.baseURL = process.env.VUE_APP_API_URL // 環境変数をセット
      await axios.post('/search?', { word: this.searchWord,
                                     season: this.season,
                                     year: this.year,
                                     perPage: this.perPage,
                                     page: this.currentPage
                                   })
      .then(response =>  {(this.list = response.data.works)
        this.total = response.data.total_count})
      this.isLoading = false
    },
    // 現在の表示ページ数取得
    clickCallback: function (pageNum) {
      this.currentPage = Number(pageNum);
      this.onclick()
    }
  },
  computed: {
    // ページネーション処理 ページ内容取得
    getLists: function() {
      let current = this.currentPage * this.perPage;
      let start = current - this.perPage;
      return this.list.slice(start, current);
    },
    // 表示ページ数の算出
    getPageCount: function() {
      return Math.ceil(this.total / this.perPage);
    }
  }
}
</script>

<style scoped>
.flex-list {
  width: 50%;
}
@media screen and (max-width:767px) {
  .flex-list {
    width: 100%;
  }
}
.spin {
  display: block;
  position: absolute;
  top: 50%;
  right: 45%;
  z-index: 5;
  margin: 10px auto;
  max-width: fit-content;
  opacity: 0.9;
  background-color: #42b983;
  border-radius: 20px;
}
.pagination {
  display: flex;
  justify-content: center;
  margin-left: -40px;
  font-size: 20px;
}
</style>
