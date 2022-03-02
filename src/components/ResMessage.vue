<template>
  <div></div>
</template>
<script>
export default {
  methods: {
  toastMessage(e) {  // メッセージを受け取りトーストに表示
    this.$toasted.show(e);
    }
  }
}
</script>
