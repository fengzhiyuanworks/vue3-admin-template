import { createApp } from "vue";
import "@common/style/index.less";
import App from "./App.vue";
import store from "@/common/store";
import router from "@/common/router";
// import Antd from 'ant-design-vue';
// import 'ant-design-vue/dist/antd.css';
const app = createApp(App);
// app.use(Antd)
app.use(store);
app.use(router);
app.mount("#app");
