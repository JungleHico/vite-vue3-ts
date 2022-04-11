import { defineStore } from 'pinia';

type menuState = {
  fold: boolean;
};

export const useMenuStore = defineStore('menu', {
  state: (): menuState => {
    return {
      fold: false
    };
  },
  actions: {
    toggle() {
      this.fold = !this.fold;
    }
  }
});
