<template>
  <header>
    <Logo />
    <div class="nav nav-pills">
      <div
        v-for="nav in navigations"
        :key="nav.name"
        class="nav-item">
        <router-link
          :to="nav.href"
          active-class="active"
          class="nav-link"
          :class="{ active : isMatch(nav.path) }"
          v-text="nav.name" />
      </div>
    </div>
    <div
      class="user"
      @click="toAbout">
      <img
        :src="image"
        :alt="name" />
    </div>
  </header>
</template>

<script>
import Logo from '~/components/Logo'
import { mapState } from 'vuex'

export default {
  components: {
    Logo
  },
  data() {
    return {
      navigations: [
        {
          name: "Search",
          href: "/",
        },
        {
          name: "Movie",
          href: "/movie/tt4520988",
          path: /^\/movie/ // '/movie'
        },
        {
          name: "About",
          href: "/about",
        },
      ],
    }
  },
  computed: {
    ...mapState('about', [
      'image',
      'name'
    ]),
    // 다른 것 예시
    // ...mapState('movie', [
    //   'movies',
    //   'loading',
    //   'message',
    //   'theMovie'
    // ])

    // image() {
    //   return this.$store.state.about.image
    // },
    // name() {
    //   return this.$store.state.about.name
    // },
  },
  methods: {
    isMatch(path) {
      if(!path) return false
      console.log(this.$route)
      return path.test(this.$route.fullPath)
    },

    toAbout() {
      // 페이지 이동 시 $router.push()
      this.$router.push('/about')
    }
  }
}
</script>

<style lang="scss" scoped>
header {
  position: relative;
  display: flex;
  align-items: center;
  height: 70px;
  padding: 0 40px;

  .logo {
    margin-right: 40px;
  }

  .user {
    width: 40px;
    height: 40px;
    padding: 6px;
    border-radius: 50%;
    box-sizing: border-box;
    background-color: $gray-200;
    cursor: pointer;
    position: absolute;
    top: 0;
    bottom: 0;
    right: 40px;
    margin: auto;
    transition: .4s;
    &:hover {
      background-color: darken($gray-200, 10%);
    }
    img {
      width: 100%;
    }
  }

  @include media-breakpoint-down(sm) {
    .nav {
      display: none;
    }
  }
}
</style>