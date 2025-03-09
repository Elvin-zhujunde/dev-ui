import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import Loading, { loading } from "./components/Loading";

const app = createApp(App);

// 注册指令和组件
app.use(Loading);

// 声明类型
declare module "@vue/runtime-core" {
  export interface ComponentCustomProperties {
    $loading: typeof loading;
  }
}

app.mount("#app");
