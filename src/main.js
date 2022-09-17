import { createApp } from "vue";
import App from "./App.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import store from "./store";
import "./assets/iconfont.css";
import VMdEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import "@kangc/v-md-editor/lib/theme/style/github.css";
import hljs from "highlight.js";
VMdEditor.use(githubTheme, {
  Hljs: hljs,
});
const app = createApp(App);
app.use(store).use(router).use(ElementPlus).use(VMdEditor).mount("#app");
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
