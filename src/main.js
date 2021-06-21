import { createApp } from 'vue';

// import vee-validate
import {
  Field, Form, ErrorMessage, defineRule, configure,
} from 'vee-validate';
import { required, email, min } from '@vee-validate/rules';
import { localize, setLocale } from '@vee-validate/i18n';
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json';

// import vue-axios
import axios from 'axios';
import VueAxios from 'vue-axios';

// import font-awesome
// import { dom } from '@fortawesome/fontawesome-svg-core';
// import fontawesome from '@fortawesome/fontawesome-free';
// import fas from '@fortawesome/fontawesome-free-solid';
// import far from '@fortawesome/fontawesome-free-regular';

import Alert from '@/components/Alert.vue';

import App from './App.vue';
import router from './router';

defineRule('required', required);
defineRule('email', email);
defineRule('min', min);
// 設定 vee-validate 全域規則
configure({
  generateMessage: localize({ zh_TW: zhTW }), // 載入繁體中文語系
  validateOnInput: true, // 當輸入任何內容直接進行驗證
});

// 設定預設語系
setLocale('zh_TW');

const app = createApp(App);
app.use(router);
app.use(VueAxios, axios);
app.component('Form', Form);
app.component('Field', Field);
app.component('ErrorMessage', ErrorMessage);
app.component('Alert', Alert);

app.mount('#app');
