<template>
  <div>
    <div class="watch-list">今期視聴作品</div>
    <div class="home flex-container">
      <div class="contents-box" v-for="content in contents" :key="content.id">
        <AnimeInfo v-for="l in { content } " @clickedRemoveList="removeFromList" :item="l" :key="l.id"></AnimeInfo>
      </div>
    </div>
    <div class="watch-list">過去視聴作品</div>
    <WatchList></WatchList>
  </div>
</template>

<script>
import AnimeInfo from './AnimeInfo.vue'
import WatchList from './WatchList.vue'
import axios from 'axios'

export default {
  data() {
    return {
      contents: null
    }
  },
  // リストの読み込み
  created: function() {
      axios.defaults.baseURL = process.env.VUE_APP_API_URL
      this.$http('/contents')
      .then(response => (this.contents = response.data))
  },
  components: {
    AnimeInfo,
    WatchList
  },
  // 子コンポーネントから削除のイベントを受け取りリストを更新
  methods: {
    removeFromList: function() {
      axios.defaults.baseURL = process.env.VUE_APP_API_URL
      this.$http('/contents')
      .then(response =>  (this.contents = response.data))
    }
  }
}
</script>

<style>
.flex-container {
  display: flex;
  flex-wrap: wrap;
}
.contents-box {
  width: 50%;
}
.watch-list {
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  margin-top: 20px;
  border-bottom: 2px solid  #42b983;
  width: 130px;
}
</style>
