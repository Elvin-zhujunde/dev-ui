import Loading from "./Loading";
import { LoadingDirective } from "./directive";
import { loading } from "./service";
import type { LoadingProps } from "./types";
import "./Loading.css";
import type { App } from "vue";

export { LoadingDirective, loading, Loading };
export type { LoadingProps };
export default (app: App) => {
  app.use(LoadingDirective);
  // 添加到全局属性中
  app.config.globalProperties.$loading = loading;
  app.component("DMLoading", Loading);
};
