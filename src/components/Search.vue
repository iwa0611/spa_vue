<template>
<div>
  <input type="text" v-model="comment" />
  <button @click="onclick">送信</button>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      comment: null
    }
  },
  methods: {
    onclick: function() {
      axios.post('http://localhost:3000/api/v1/contents', { comment: this.comment })
      .then(response =>  console.log(response.data))
      this.comment = []
    }
  }
}
</script>
