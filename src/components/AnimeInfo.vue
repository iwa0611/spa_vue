<template>
<div class="flex-list">
    <div class="list-container">
    <!-- トースト用コンポーネント -->
    <Message ref="child"></Message>
    <AnimeReview @close="closeModal" :item="item" v-if="modal"></AnimeReview>
    <div class="list">
      <p class="modal-title" @click="openModal">
        {{ item.title }}
      </p>
      <!-- ログイン時追加or削除ボタン表示 -->
      <div v-if="loggedIn">
        <!-- search画面では追加を表示 -->
        <div class="add-remove" v-if="this.$route.path === '/search'">
          <button class="add-list" @click="addList">+追加+</button>
        </div>
        <!-- home画面では削除を表示 -->
        <div class="add-remove" v-if="this.$route.path === '/'">
          <button class="add-list" @click="removeList(item.id)">-削除-</button>
        </div>
      </div>
      <!-- 公式URLと画像URLがない場合の処理 -->
      <div class="list-box" v-if="item.images.recommended_url === ''">
        <a class="list-img" href="#">
         <img src="@/assets/no_image_square.jpg" alt="#">
        </a>
      </div>
      <!-- 公式URLがない場合の処理 -->
      <div class="list-box" v-else-if="item.official_site_url === ''">
        <a class="list-img" href="#">
          <img :src="item.images.recommended_url" href="">
        </a>
      </div>
      <div class="list-box" v-else>
        <a class="list-img" :href="item.official_site_url">
          <img :src="item.images.recommended_url" href="">
        </a>
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
    async addList() {
      let infoJSON = JSON.stringify(this.item) // JSONを変換
      let res = await axios.post('/contents', { infoJSON, title_id: this.item.id })
      console.log(res.data)
      this.$refs.child.toastMessage(res.data.message)  // 子コンポーネントにトースト用メッセージを渡す
    },
    async removeList() {
      let res = await axios.delete('contents/' + this.item.id)
      console.log(res.data)
      this.$emit('clickedRemoveList') // 親コンポーネントにイベントを通知
      this.$refs.child.toastMessage(res.data.message)  // 子コンポーネントにトースト用メッセージを渡す
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

<style>
.add-remove  > button {
  position: absolute;
  right: 0;
  color: wheat;
  background-color: rgb(65, 65, 219);
  border: 1px solid rgb(192, 198, 252);
  border-radius: 5px;
  margin: 0 3px 3px;
  z-index: 1;
}
.add-remove  > button:hover {
  opacity: 0.4;
  transition: 0.3s;
  cursor: pointer;
}
.list-container {
  background-color: rgb(19, 19, 19);
  display: block;
  border: 2px solid #42b983;
  max-width: 75%;
  border-radius: 15px;
  padding: 0;
  margin: 25px auto;
}
.list{
  position: relative;
  margin-bottom: -6px;
}
.list-box > img {
  object-fit: cover;
}
.list-img > img {
  width: 100%;
  height: 170px;
  border-radius: 0 0 12px 12px;
}
.list-img > img:hover {
  opacity: 0.4;
  transition: 0.7s;
}
.list > p {
  text-align: left;
  margin: 10px;
  overflow-wrap: break-word;
}
.modal-title {
  transition: all 0.3s;
}
.modal-title:hover {
  cursor: pointer;
  color: #42b983;
}
</style>
