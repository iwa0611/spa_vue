<template>
  <div class="home">
    <div v-for="content in contents" :key="content.id">
      <AnimeInfo v-for="(l, i) in { content }" @clickedRemoveList="removeFromList" :item="l" :index='i + 1' :key="l.id"></AnimeInfo>
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
      list: ''
    }
  },
  // リストの読み込み
  created: function() {
      axios.defaults.baseURL = process.env.VUE_APP_API_URL
      this.$http('/contents')
      .then(response =>  (this.contents = response.data))
  },
  components: {
    AnimeInfo
  },
  // 子コンポーネントから削除のイベントを受け取りリロード
  methods: {
    removeFromList: function() {
      this.$router.go({path: this.$router.currentRoute.path, force: true})
    }
  }
}
</script>
