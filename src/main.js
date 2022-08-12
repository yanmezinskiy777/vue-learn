import { createApp } from "vue";
import App from "./App.vue";
import UiComponents from "./components/ui";
import Directives from "./directives";
import Router from "./router";
import Store from "./store/store";

const app = createApp(App);

UiComponents.forEach((component) => {
  app.component(component.name, component);
});
Directives.forEach((directive) => {
  app.directive(directive.name, directive);
});

app.use(Store).use(Router).mount("#app");
