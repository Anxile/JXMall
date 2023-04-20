//引入Vue
import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
//引入路由器
import router from "./router";
//统一接口api文件夹里面全部请求函数
//统一引入
import * as API from "@/api";
// 三级联动组件--全局组件
import TypeNav from "@/components/TypeNav/index.vue";
//轮播图
import Carousel from "@/components/Carousel/index";
// 分页器--全局组件
import Pagination from "@/components/pagnation/index.vue";
//引入MockServer.js----mock数据
import "@/mock/mockServe";
//饿了么UI
import { Button, MessageBox } from "element-ui";
// 引入仓库
import store from "@/store";
// 引入swiper
import "swiper/css/swiper.css";
// 第一个参数组件的名字,第二个参数哪一个组件
Vue.component(TypeNav.name, TypeNav);
Vue.component(Carousel.name, Carousel);
Vue.component(Pagination.name, Pagination);
Vue.component(Button.name, Button);
// 使用路由插件
Vue.use(VueRouter);
//ElementUI注册组件的时候，还有一种写法，挂在原型上
Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
// 引入图片懒加载
import img from '@/components/images/lazy_load.gif'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload, {
    preLoad: 0.9,
    error: 'images/error.png',
    loading: img,
    attempt: 1
})
//引入表单校验插件
import "@/plugins/validate";

//关闭Vue的生产提示
Vue.config.productionTip = false;


new Vue({
    el: "#app",
    beforeCreate() {
        // 注册全局事件总线
        Vue.prototype.$bus = this;

        
        Vue.prototype.$API = API;
    },
    render: (h) => h(App),
    // 配置路由
    router,
    // 注册仓库
    store,
});