<template>
  <div class="search-wrapper" ref="searchRef">
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
    <ul v-if="canShowResult" class="result-wrapper">
      <li
        v-for="(item, index) in matchList"
        :key="index"
        :class="{ active: activeIndex === index }"
        @mouseover="activeIndex = index"
      >
        <span v-html="highlight(item.code, searchText)" class="fund-code" />
        <span v-html="highlight(item.name, searchText)" />
        <span class="fund-type" :style="{ color: fundTypeColors.get(item.type) || '#3e3a3a' }">{{ item.type }}</span>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, watchEffect, computed, onUnmounted } from 'vue';
import useDebounceRef from './useDebounceRef';
import usePage from './usePage';
import data from './data';

type MatchItem = { code: string; shortcut: string; name: string; type: string };

export default defineComponent(() => {
  const searchText = useDebounceRef('');
  const matchList = ref<MatchItem[]>([]);
  const showResult = ref(false);
  const searchRef = ref<HTMLDivElement>();

  watch(searchText, () => {
    const preList = searchText.value
      ? data.filter((d) => d.some((input) => input.includes(searchText.value.toUpperCase()))).slice(0, 8)
      : [];
    matchList.value = preList.map((item) => {
      const [code, shortcut, name, type] = item;
      return { code, shortcut, name, type };
    });
  });

  watchEffect(() => {
    if (searchText.value) {
      showResult.value = true;
    }
  });

  const handleClick = (e: any) => {
    if (e.target !== searchRef.value && !searchRef.value?.contains(e.target)) {
      showResult.value = false;
    }
  };

  document.body.addEventListener('click', handleClick, false);

  onUnmounted(() => {
    document.body.removeEventListener('click', handleClick, false);
  });

  const canShowResult = computed(() => showResult.value && matchList.value.length);

  const { prev, next, page } = usePage(matchList, true);

  const fundTypeColors = new Map([
    ['混合型', '#d08a31'],
    ['债券型', '#318fbb'],
    ['股票型', '#ef0505'],
    ['货币型', '#67bf43'],
    ['定开债券', '#32af86'],
    ['联接基金', '#8e26a7'],
    ['QDII', '#d03077'],
    ['QDII-指数', '#f562a4'],
    ['股票指数', '#ce2222'],
    ['混合-FOF', '#317929'],
  ]);

  const highlight = (text: string, keyword: string) =>
    text.replace(new RegExp(keyword, 'ig'), `<span class='active'>${keyword}</span>`);

  const handleSelect = () => {};

  const handleExit = () => {
    showResult.value = false;
  };

  const handleFocus = () => {
    showResult.value = true;
  };

  return {
    searchText,
    matchList,
    fundTypeColors,
    highlight,
    handleKeydown: next,
    handleKeyUp: prev,
    handleExit,
    handleSelect,
    handleFocus,
    showResult,
    activeIndex: page,
    canShowResult,
    searchRef,
  };
});
</script>

<style scoped lang="less">
.search-wrapper {
  width: 600px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 120px;
}
input {
  display: block;
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 12px 15px;
  width: 100%;
  transition: all 0.3s;
  &:focus {
    outline: none;
    border-color: #409eff;
  }
  &.has-result {
    border-radius: 4px 4px 0 0;
  }
}
.result-wrapper {
  padding: 0;
  list-style: none;
  border: 1px solid #efefef;
  box-shadow: rgba(0, 0, 0, 0.1) 0 5px 10px;
  margin: 4px 0 0;
  max-height: 338px;
  overflow-x: hidden;
  overflow-y: auto;

  & > li {
    padding: 12px 10px;
    cursor: pointer;
    margin-left: -1px;
    margin-right: -1px;
    &:hover {
      background-color: #efefef;
    }
    .fund-code {
      margin-right: 10px;
      color: #666;
    }
    .fund-type {
      margin-left: 10px;
      font-size: 12px;
      padding: 0 4px;
      border-radius: 3px;
      border: 1px solid currentColor;
    }
    &.active {
      background-color: #efefef;
    }
    ::v-deep(.active) {
      color: #0171f6;
    }
  }
}
</style>
