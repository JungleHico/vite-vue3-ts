import type { App } from 'vue';
import { createPinia } from 'pinia';

// 配置状态管理
export const setupStore = (app: App<Element>) => {
  app.use(createPinia());
};
