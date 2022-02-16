<template>
  <div class="home">
    <div id="comment-list">
      <ul class="box">
        <li class="comment-box" v-for=" item in contents" :key="item.id">
          <p>コメント:{{ item.comment }}</p>
          <button @click="deleteComment(item.id)">削除</button>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      contents: null
    }
  },
  created: function() {
      this.$http('http://localhost:3000/api/v1/contents')
      .then(response =>  (this.contents = response.data.contents))
  },
  methods: {
    deleteComment(id) {
      axios.delete('http://localhost:3000/api/v1/contents/' + id )
      this.$router.go({path: this.$router.currentRoute.path, force: true})
    }
  }
}
</script>

<style>
#comment-list ul li {
  width: 45%;
  float: left;
  display: block;
}
.comment-box {
  border: 1px solid rgb(153, 105, 105);
}
</style>
