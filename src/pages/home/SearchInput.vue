<template>
  <input
    v-model="searchText"
    :class="{ 'has-result': matchList.length }"
    @keydown.down.prevent="handleKeydown"
    @keydown.up.prevent="handleKeyUp"
    @keydown.enter.prevent="handleSelect"
    @keydown.esc.prevent="handleExit"
    @focus="handleFocus"
    placeholder="请输入基金代码或名称"
  />
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  setup() {
    const handleKeydown = () => {};
    const handleKeyUp = () => {};
    const handleSelect = () => {};
    const handleExit = () => {};
    const handleFocus = () => {};
    return { handleKeydown, handleKeyUp, handleSelect, handleExit, handleFocus };
  },
});
</script>
