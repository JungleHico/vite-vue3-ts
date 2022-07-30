import { defineStore } from 'pinia';

interface SidebarState {
  isFold: boolean;
}

export const useSidebarStore = defineStore('sidebar', {
  state: (): SidebarState => {
    return {
      isFold: false,
    };
  },
  actions: {
    toggleSidebar() {
      this.isFold = !this.isFold;
    },
  },
});
