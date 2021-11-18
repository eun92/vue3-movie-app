import { createApp } from "vue"
import App from "./App.vue"
import router from "./routes" // index.js 생략 가능
import store from "./store"
import loadImage from "./plugins/loadImage"

createApp(App)
  .use(router) // $route, $router
  .use(store) // $store
  .use(loadImage) // $loadImage
  .mount("#app")
