import { defineStore } from 'pinia';

type LoadingState = {
  loadingCount: number;
};

export const useLoadingStore = defineStore('loading', {
  state: (): LoadingState => {
    return {
      loadingCount: 0
    };
  },
  getters: {
    loading(): boolean {
      return this.loadingCount > 0;
    }
  },
  actions: {
    showLoading() {
      this.loadingCount++;
    },
    hideLoading() {
      this.loadingCount--;
    }
  }
});
