<template>
  <div>
    <!-- トースト用コンポーネント -->
    <Message ref="child"></Message>
    <transition name="modal" appear>
      <div class="modal modal-overlay">
        <div class="modal-window">
          <div class="modal-content">
              <a class="modal-img" :href="item.official_site_url">
                <img :src="item.images.recommended_url" href="">
              </a>
              <p>{{ item.title }}</p>
              <div>
                放送時期 : {{ item.season_name_text }}
                <table>
                  <tr>
                    <td>可愛い<StarRating id="kawaii" :star-size="15" :increment="0.5" v-model="kawaii"></StarRating></td>
                    <td>面白い<StarRating id="omosiroi" :star-size="15" :increment="0.5" v-model="omosiroi"></StarRating></td>
                    <td>作画<StarRating id="sakuga" :star-size="15" :increment="0.5" v-model="sakuga"></StarRating></td>
                  </tr>
                  <tr>
                    <td>泣ける<StarRating id="nakeru" :star-size="15" :increment="0.5" v-model="nakeru"></StarRating></td>
                    <td>熱い<StarRating id="atui" :star-size="15" :increment="0.5" v-model="atui"></StarRating></td>
                  </tr>
                  <tr>
                  </tr>
                </table>
              </div>
              <textarea v-model="comment" cols="60" rows="4" placeholder="コメント(120文字以内)" maxlength="120"></textarea>
              <footer>
                <button v-show="loggedIn" @click="editReview">編集</button>
                <button @click="$emit('close')">閉じる</button>
              </footer>
          </div>
        </div>  
      </div>
    </transition>
  </div>
</template>

<script>
//import axios from 'axios'
import Message from './ResMessage.vue'
import StarRating from 'vue-star-rating'


export default {
  data() {
    return {
      comment: '',
      kawaii: 3,
      omosiroi: 3,
      sakuga: 3,
      nakeru: 3,
      atui: 3
    }
  },
  name: 'anime-info',
  props: {
    item: { type: Object }
  },
  components: {
    Message,
    StarRating
  },
  computed: {
    loggedIn: function() {
      return this.$store.state.loggedIn
    }
  },
  methods: {
    editReview:function() {
      this.$refs.child.toastMessage('編集しました')
    }
  }
}
</script>

<style>
.modal.modal-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 30;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
}
.modal-window {
  position: relative;
  background: rgb(49, 49, 49);
  border-radius: 8px;
  overflow: hidden;
  width: 500px;
  height: 600px;
}
.modal-window > img{
  object-fit: cover;
}
.modal-img > img{
  width: 100%;
}
p {
  margin-top: 5px;
}
table {
  margin: 15px auto 0;
}
table td{
  padding: 0 15px;
  max-width: 90px;
}
textarea {
  position: absolute;
  bottom: 45px;
  right: 25px;
  background-color: rgb(37, 37, 37);
  border: 1px solid rgba(114, 114, 114, 0.342);
  border-radius: 4px;
  resize: none;
  outline: none;
  color: #e7e7e7;
  padding: 5px;
}
footer {
  position: absolute;
  bottom: 0;
  right: 0;
}
button {
  margin: 0 5px 5px;
  color: wheat;
  background-color: rgb(65, 65, 219);
  border: 1px solid rgb(192, 198, 252);
  border-radius: 5px;
}
/* オーバーレイのトランジション */
.modal-enter-active, .modal-leave-active {
  transition: opacity 1s;
}
.modal-enter, .modal-leave-to {
  opacity: 0;
}
</style>
