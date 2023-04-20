<template>
  <div>
    <Header></Header>
    <!-- 根据路由规则，动态地加载对应的组件，并将其渲染到这个位置，实现单页应用的效果。 -->
    <router-view></router-view>
    <Footer v-show="$route.meta.show"></Footer>
    
  </div>
</template>

<script>
// 引入header
import Header from "./components/Header.vue";
// 引入Footer
import Footer from "./components/Footer.vue";
export default {
  name: "App",
  components: { Header, Footer },
  mounted() {
    this.$store.dispatch("categoryList");     //入口文件只执行一次，避免重复请求
  },
};
</script>