<template>
  <div>
    <!-- トースト用コンポーネント -->
    <Message ref="child"></Message>
    <!-- モーダル用 -->
    <transition name="modal" appear>
      <div class="modal modal-overlay">
        <div class="modal-window">
          <div class="modal-content">
            <!-- 公式URLと画像URLがない場合の処理 -->
            <div class="list-box" v-if="item.images.recommended_url === ''">
              <a class="modal-img" href="#">
               <img src="@/assets/no_image_square.jpg" alt="#">
              </a>
            </div>
            <!-- 公式URLがない場合の処理 -->
            <div class="list-box" v-else-if="item.official_site_url === ''">
              <a class="modal-img" href="#">
                <img :src="item.images.recommended_url" href="">
              </a>
            </div>
            <div class="list-box" v-else>
              <a class="modal-img" :href="item.official_site_url">
                <img :src="item.images.recommended_url" href="">
              </a>
            </div>
            <p>{{ item.title }}</p>
            <div>
              放送時期 : {{ item.season_name_text }}
              <table>
                <tr>
                  <td>可愛い<StarRating :star-size="15" v-model="kawaii"></StarRating></td>
                  <td>面白い<StarRating :star-size="15" v-model="omosiroi"></StarRating></td>
                  <td>作画<StarRating :star-size="15" v-model="sakuga"></StarRating></td>
                </tr>
                <tr>
                  <td>泣ける<StarRating :star-size="15" v-model="nakeru"></StarRating></td>
                  <td>熱い<StarRating :star-size="15" v-model="atui"></StarRating></td>
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
import axios from 'axios'
import Message from './ResMessage.vue'
import StarRating from 'vue-star-rating'

export default {
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
    },
    // StarRatingの値取得用
    kawaii: {
      get () {
        return this.$store.state.review.rate.kawaii
      },
      set (value) {
        this.$store.commit('setKawaii', value)
      }
    },
    omosiroi: {
      get () {
        return this.$store.state.review.rate.omosiroi
      },
      set (value) {
        this.$store.commit('setOmosiroi', value)
      }
    },
    sakuga: {
      get () {
        return this.$store.state.review.rate.sakuga
      },
      set (value) {
        this.$store.commit('setSakuga', value)
      }
    },
    nakeru: {
      get () {
       return this.$store.state.review.rate.nakeru
      },
      set (value) {
       this.$store.commit('setNakeru', value)
      }
    },
    atui: {
      get () {
        return this.$store.state.review.rate.atui
      },
      set (value) {
        this.$store.commit('setAtui', value)
      }
    },
    comment: {
      get () {
        return this.$store.state.review.rate.comment
      },
      set (value) {
        this.$store.commit('setComment', value)
      }
    }
  },
  methods: {
    // 編集時の処理
    editReview: async function() {
      await axios.put('/contents/' + this.item.id, { comment: this.comment,
                                                      kawaii: this.kawaii,
                                                      omosiroi: this.omosiroi,
                                                      nakeru: this.nakeru,
                                                      atui: this.atui,
                                                      sakuga: this.sakuga })
      .then(() => this.$refs.child.toastMessage('編集しました'))
      .catch(() => this.$refs.child.toastMessage('失敗しました'))
    }
  }
}
</script>

<style>
/* モーダル時の背景 */
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
/* モーダルのサイズ等 */
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
  height: 262.5px;
}
p {
  margin-top: 5px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
table {
  margin: 15px auto 0;
}
table td{
  padding: 0 15px;
  max-width: 90px;
}
textarea {
  background-color: rgb(37, 37, 37);
  border: 1px solid rgba(114, 114, 114, 0.342);
  border-radius: 4px;
  resize: none;
  outline: none;
  color: #e7e7e7;
  padding: 5px;
  margin-top: 15px;
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
