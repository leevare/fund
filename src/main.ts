import { createApp } from 'vue';
import router from './routes';
import App from './App.vue';
import 'normalize.css';
import './index.css';

const instance = createApp(App);
instance.use(router).mount('#app');
console.log(instance);
