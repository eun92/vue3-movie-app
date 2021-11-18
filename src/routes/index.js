import { createRouter, createWebHashHistory } from "vue-router"
import Home from "./Home"
import Movie from "./Movie"
import About from "./About"
import NotFound from "./NotFound"

export default createRouter({
  // Hash 모드 사용
  // https://google.com/#/search
  history: createWebHashHistory(),
  scrollBehavior() {
    // always scroll to top
    return { top: 0 }
  },
  // pages
  // https://google.com/
  routes: [
    {
      path: "/", // main page로 이동
      component: Home,
    },
    {
      path: "/movie/:id", // movie page로 이동
      component: Movie,
    },
    {
      path: "/about", // about page로 이동
      component: About,
    },
    {
      path: '/:NotFound(.*)',
      component: NotFound,
    }
  ],
})
