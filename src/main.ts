import { createApp } from 'vue';
import router from './routes';
import App from './App.vue';
import 'normalize.css';
import './index.css';

createApp(App).use(router).mount('#app');
