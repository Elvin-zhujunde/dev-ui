import { createVNode, render } from "vue";
import type { VNode, Directive } from "vue";
import Loading from "./Loading";
import type { LoadingProps } from "./types";

// 维护 loading 实例 Map
const loadingMap = new Map<HTMLElement, VNode>();

// 获取配置
const getLoadingOptions = (el: HTMLElement): Partial<LoadingProps> => {
  return (el as any).__loading_config || {};
};

// 创建 loading 组件
const createLoading = (el: HTMLElement) => {
  // 创建容器
  const container = document.createElement("div");
  container.className = "y-loading-container";

  // 获取配置
  const options = getLoadingOptions(el);

  // 创建 loading vnode
  const vnode = createVNode(Loading, {
    ...options,
    class: "y-loading-mask",
  });

  // 渲染 loading
  render(vnode, container);
  el.appendChild(container);

  // 保存实例
  loadingMap.set(el, vnode);

  return vnode;
};

// 移除 loading
const removeLoading = (el: HTMLElement) => {
  const vnode = loadingMap.get(el);
  if (vnode) {
    render(null, el.querySelector(".y-loading-container")!);
    el.querySelector(".y-loading-container")?.remove();
    loadingMap.delete(el);
  }
};

export const vLoading: Directive<HTMLElement, boolean> = {
  mounted(el, binding) {
    // 设置元素定位
    if (window.getComputedStyle(el).position === "static") {
      el.style.position = "relative";
    }

    if (binding.value) {
      createLoading(el);
    }
  },

  updated(el, binding) {
    if (binding.value !== binding.oldValue) {
      if (binding.value) {
        createLoading(el);
      } else {
        removeLoading(el);
      }
    }
  },

  unmounted(el) {
    removeLoading(el);
  },
};

// 导出插件安装函数
export const LoadingDirective = {
  install(app: any) {
    // 注册 loading 指令
    app.directive("loading", vLoading);
    
    // 注册 loading-config 指令
    app.directive("loading-config", {
      mounted(el, binding) {
        (el as any).__loading_config = binding.value;
      },
      updated(el, binding) {
        (el as any).__loading_config = binding.value;
      }
    });
  },
};
