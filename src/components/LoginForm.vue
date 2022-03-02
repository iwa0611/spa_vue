<template>
  <div class="login">
    <!-- トースト用コンポーネント -->
    <Message ref="child"></Message>
    <div v-if="Object.keys($store.state.userData).length === 0">
      <div>
        <input placeholder="email" v-model="email" type="email">
      </div>
      <div>
        <input placeholder="password" v-model="passWord" type="passwrod">
      </div>
      <button @click="login">LogIn</button>
      <div>
        <!-- Railsからのエラーメッセージ表示 -->
        {{ $store.state.err }}
      </div>
    </div>
    <div v-else>
      <div>
        <!-- ログイン中のメールアドレス表示 -->
        {{ $store.state.userData.data.data.email }}
      </div>
      <button @click="logout">LogOut</button>
    </div>
  </div>
</template>

<script>
import Message from './ResMessage.vue'

export default {
  data() {
    return {
      email: '',
      passWord: ''
    }
  },
  components: {
    Message
  },
  // トースト用に値を監視
  computed: {
    userData: function() {
      return this.$store.state.userData.status
    }
  },
  // トースト表示
  watch: {
    userData(e) {
      e == 200 ?
      this.$refs.child.toastMessage('ログインしました') :
      this.$refs.child.toastMessage('ログアウトしました')
    }
  },
  methods: {
    login() {
      // mutationのログインにフォームの情報を渡す
      this.$store.commit('login', { email: this.email, passWord: this.passWord})
      // パスワードフォームのクリア
      this.passWord = ''
    },
    logout() {
      // mutationのログアウトにヘッダーを含めて渡す
      let headers = this.$store.state.userData.headers
      this.$store.commit('logout', { token: headers['access-token'],
                                     client: headers.client,
                                     expiry: headers.expiry,
                                     uid: headers.uid,
                                     type: headers['token-type'] })
    }
  }
}
</script>
