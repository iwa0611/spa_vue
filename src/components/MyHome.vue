<template>
  <div class="home">
    <div v-for="content in contents" :key="content.id">
      <AnimeInfo v-for="l in { content } " @clickedRemoveList="removeFromList" :item="l" :key="l.id"></AnimeInfo>
    </div>
  </div>
</template>

<script>
import AnimeInfo from './AnimeInfo.vue'
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
    AnimeInfo
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
