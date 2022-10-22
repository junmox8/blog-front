import { createApp } from "vue";
import App from "./App.vue";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import router from "./router";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import store from "./store";
import "./assets/iconfont.css";
import "./assets/iconfont2.css";
import "./assets/iconfont3.css";
import VMdPreview from "@kangc/v-md-editor/lib/preview";
import "@kangc/v-md-editor/lib/style/preview.css";
import VMdEditor from "@kangc/v-md-editor";
import "@kangc/v-md-editor/lib/style/base-editor.css";
import githubTheme from "@kangc/v-md-editor/lib/theme/github.js";
import createTipPlugin from "@kangc/v-md-editor/lib/plugins/tip/index";
import "@kangc/v-md-editor/lib/plugins/tip/tip.css";
import createEmojiPlugin from "@kangc/v-md-editor/lib/plugins/emoji/index";
import "@kangc/v-md-editor/lib/plugins/emoji/emoji.css";
import createTodoListPlugin from "@kangc/v-md-editor/lib/plugins/todo-list/index";
import "@kangc/v-md-editor/lib/plugins/todo-list/todo-list.css";
import createLineNumbertPlugin from "@kangc/v-md-editor/lib/plugins/line-number/index";
import createCopyCodePlugin from "@kangc/v-md-editor/lib/plugins/copy-code/index";
import "@kangc/v-md-editor/lib/plugins/copy-code/copy-code.css";
import "@kangc/v-md-editor/lib/theme/style/github.css";
import hljs from "highlight.js";
import Prism from "prismjs";
import vuepressTheme from "@kangc/v-md-editor/lib/theme/vuepress.js";
import "@kangc/v-md-editor/lib/theme/style/vuepress.css";
VMdPreview.use(githubTheme, {
  Hljs: hljs,
});
VMdEditor.use(githubTheme, {
  Hljs: hljs,
  Prism,
})
  .use(createTipPlugin())
  .use(createEmojiPlugin())
  .use(createTodoListPlugin())
  .use(createLineNumbertPlugin())
  .use(createCopyCodePlugin());
const app = createApp(App);
app
  .use(store)
  .use(router)
  .use(ElementPlus)
  .use(VMdEditor)
  .use(VMdPreview)
  .mount("#app");
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
