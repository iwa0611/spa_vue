<template>
  <div class="favo-container">
  <!-- トースト用コンポーネント -->
  <Message ref="child"></Message>
  <AnimeReview @close="closeModal" :item="item" v-if="modal"></AnimeReview>
    <div class="favo-list">
      <!-- ログイン時お気に入りボタン表示 -->
      <div v-if="loggedIn">
        <div v-if="this.$route.path === '/favorite'">
          <button class="favo-button" @click="removeFavo">★</button>
        </div>
      </div>
      <!-- 公式URLと画像URLがない場合の処理 -->
      <div class="favo-box" v-if="item.images.recommended_url === ''">
        <a class="favo-img" href="#">
         <img src="@/assets/no_image_square.jpg" alt="#">
        </a>
      </div>
      <!-- 公式URLがない場合の処理 -->
      <div v-else-if="item.official_site_url === ''">
        <a href="#">
          <img :src="item.images.recommended_url" href="">
        </a>
      </div>
      <div class="favo-box" v-else>
        <a class="favo-img" :href="item.official_site_url">
          <img :src="item.images.recommended_url" href="">
        </a>
         <!-- タイトルと季節表示 -->
        <div  class="favo-title" @click="openModal">
          {{ item.title }}
          <br>
          {{ item.season_name_text }}
        </div>
      </div>
    </div>
  </div> 
</template>

<script>
import axios from 'axios'
import Message from './ResMessage.vue'
import AnimeReview from './AnimeReview.vue'

export default {
  data() {
    return {
      modal: false
    }
  },
  name: 'anime-info',
  props: {
    item: { type: Object }
  },
  components: {
    Message,
    AnimeReview
  },
  computed: {
    loggedIn: function() {
      return this.$store.state.loggedIn
    }
  },
  methods: {
    removeFavo: async function() {
      await axios.put('contents/' + this.item.id, { favorite: false })
      .then(() => this.$refs.child.toastMessage('お気に入りから削除しました')) // 子コンポーネントにトースト用メッセージを渡す
      .catch(() => this.$refs.child.toastMessage('お気に入りから削除に失敗しました'))
      this.$emit('clickedRemoveFavo') // 親コンポーネントにイベントを通知
    },
    openModal() { // reviewの取得とモーダルの表示
      this.$store.dispatch('show', this.item.id) // review.jsのアクションを呼び出し
      this.modal = true
    },
    closeModal() {
      this.modal =false
    }
  }
}
</script>

<style scoped>
.favo-container {
  max-width: 100%;
}
.favo-list {
  width: 100%;
  display: block;
  margin: 0 2px;
  position: relative;
}
.favo-button {
  position: absolute;
  z-index: 20;
  left: 0;
}
.favo-button :hover {
  cursor: pointer;
  opacity: 0.9;
}
.favo-title {
  display: none;
}
.favo-img:hover + .favo-title, .favo-title:hover {
  display: block;
  z-index: 10;
  width: 100%;
  bottom: 0;
  position: absolute;
  background-color: rgba(92, 98, 190, 0.842);
  border-radius: 10px;
  font-weight: bold;
  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.favo-img > img {
  height: 120px;
  border-radius: 5px;
}
.favo-img > img:hover {
  opacity: 0.4;
  transition: 0.7s;
}
</style>
