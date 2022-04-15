import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import './styles/global.less';

const app = createApp(App);

app.use(router).use(createPinia()).mount('#app');
