<template>
  <h1>Hello World</h1>
  <p>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Adipisci aspernatur consectetur debitis, doloremque
    dolorum enim eum labore, minus, nam perspiciatis porro praesentium quae tempora totam ullam veniam vero voluptatem
    voluptatum?
  </p>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      color: 'red',
      background: 'green',
    };
  },
});
</script>

<style vars="{color, background}" lang="less">
h1 {
  color: var(--color);
  background-color: var(--background);
  text-align: center;
}
</style>
