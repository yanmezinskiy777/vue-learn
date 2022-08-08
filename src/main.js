import { createApp } from "vue";
import App from "./App.vue";
import UiComponents from "./components/ui";

const app = createApp(App);
UiComponents.forEach((component) => {
  app.component(component.name, component);
});

app.mount("#app");
