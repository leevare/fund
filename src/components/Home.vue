<template>
  <h1>hello world</h1>
  <button @click="count++">count is: {{ count }}</button>
  <p>Edit <code>components/HelloWorld.vue</code> to test hot module replacement.</p>
  <router-link to="/about"> About </router-link>
</template>

<script>
export default {
  name: 'HelloWorld',

  data() {
    return {
      count: 0,
    };
  },
};
</script>

<style lang="less">
h1 {
  font-size: 20px;
}
</style>
