<template>
  <div>
    <div class="watch-list">今期視聴作品</div>
    <transition>
      <spinner v-if="isLoading" size="huge" class="spin"></spinner>
    </transition>
    <div class="home flex-container">
      <div class="contents-box" v-for="content in contents" :key="content.id">
        <AnimeInfo v-for="l in { content } " @clickedRemoveList="reloadList" :item="l" :key="l.id"></AnimeInfo>
      </div>
    </div>
    <div class="watch-list">過去視聴作品</div>
    <WatchList></WatchList>
  </div>
</template>

<script>
import AnimeInfo from './AnimeInfo.vue'
import WatchList from './WatchList.vue'
import Spinner from 'vue-simple-spinner'
import axios from 'axios'

export default {
  data() {
    return {
      contents: null,
      isLoading: false
    }
  },
  // リストの読み込み
  created: async function() {
    this.isLoading = true
    await this.reloadList()
    this.isLoading = false
  },
  components: {
    AnimeInfo,
    WatchList,
    Spinner
  },
  // 子コンポーネントから削除のイベントを受け取りリストを更新
  methods: {
    reloadList:  async function() {
      await axios.get('/contents')
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
@media screen and (max-width:767px) {
  .contents-box {
    width: 100%;
  }
  button, select, input{
    font-size: 22px;
  }
}
.watch-list {
  font-size: 20px;
  font-weight: bold;
  text-align: left;
  margin-top: 20px;
  border-bottom: 2px solid  #42b983;
  width: 130px;
}
.spin {
  display: block;
  z-index: 5;
  margin: 10px auto;
  max-width: fit-content;
  opacity: 0.9;
  background-color: #42b983;
  border-radius: 20px;
}
</style>
