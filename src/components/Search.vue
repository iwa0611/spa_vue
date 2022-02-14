<template>
<div>
  <button @click="onclick">push</button>
  <div v-for=" item in info" :key="item.id">
    <p>koko : {{ item.comment }}</p>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      info: null
    }
  },
  methods: {
    onclick: function() {
      this.$http('http://localhost:3000/api/v1/contents')
      .then(response =>  (this.info = response.data.contents))
    }
  }
}
</script>
