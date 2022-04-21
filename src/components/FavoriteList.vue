<template>
  <div class="favo-main">
    <Message></Message>
    <div class="favo-sub" v-for="content in contents" :key="content.id">
      <AnimeFavo v-for="l in { content } " @clickedRemoveFavo="reloadList" :item="l" :key="l.id"></AnimeFavo>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import Message from './ResMessage.vue'
import AnimeFavo from './AnimeFavo.vue'

export default {
  data() {
    return {
      modal: false,
      contents: null
    }
  },
  // リストの読み込み
  created: function() {
    this.reloadList()
  },
  components: {
    Message,
    AnimeFavo
  },
  computed: {
    loggedIn: function() {
      return this.$store.state.loggedIn
    }
  },
  methods: {
    reloadList: async function() {
      await axios.get('/favorite_index')
      .then(response =>  (this.contents = response.data))
    },
    openModal() { // reviewの取得とモーダルの表示
      this.$store.dispatch('show', this.value) // review.jsのアクションを呼び出し
      this.modal = true
    },
    closeModal() {
      this.modal =false
    }
  }
}
</script>

<style scoped>
.favo-main {
  display: flex;
  flex-wrap: wrap;
}
.favo-sub {
  width: 33%;
}
</style>
