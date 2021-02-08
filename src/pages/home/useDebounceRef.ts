import { customRef } from 'vue';

export default function useDebounceRef<T = unknown>(value: T, delay = 200) {
  let timeout: number;

  /**
   * 创建具有自定义ref，显式控制它的依赖跟踪(track)和触发更新(trigger)
   * 它需要一个工厂函数customRef，该函数接收track和trigger作为参数，返回带有get和的set对象
   */
  return customRef((track, trigger) => {
    return {
      get() {
        track();
        return value;
      },
      set(newValue: T) {
        clearTimeout(timeout);
        timeout = window.setTimeout(() => {
          value = newValue;
          trigger();
        }, delay);
      },
    };
  });
}
