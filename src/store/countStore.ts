import { defineStore } from 'pinia';

interface CountState {
  count: number;
}

export const useCountStore = defineStore('count', {
  state: (): CountState => {
    return {
      count: 0,
    };
  },
  actions: {
    increase(value: number) {
      this.count += value;
    },
  },
});
