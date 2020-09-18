import { ref, Ref } from 'vue';
export default function usePage(data: Ref<any[]>, loop?: boolean) {
  const page = ref(0);

  const prev = () => {
    if (data.value.length > 0) {
      if (page.value === 0) {
        if (loop) {
          page.value = data.value.length - 1;
        }
      } else {
        page.value--;
      }
    }
  };

  const next = () => {
    if (data.value.length > 0) {
      if (page.value >= data.value.length - 1) {
        if (loop) {
          page.value = 0;
        }
      } else {
        page.value++;
      }
    }
  };

  return { next, prev, page };
}
