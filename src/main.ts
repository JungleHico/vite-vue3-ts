import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';
import './styles/animate.css';

const app = createApp(App);

app.use(router).use(createPinia()).mount('#app');
