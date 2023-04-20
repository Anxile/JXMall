<template>
  <div class="swiper-container" ref="Swiper">
    <div class="swiper-wrapper">
      <div
        class="swiper-slide"
        v-for="(carousel, index) in list"
        :key="list.id"
      >
        <img :src="carousel.imgUrl" />
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
import Swiper from "swiper";
export default {
  name: "Carousel",
  props: ["list"],
  watch: {
    list: {
      //监听bannerList的数据变化
      immediate:true,
      handler(newvalue, oldvalue) {
        this.$nextTick(() => {
          //此时循环已经结束，结构已经生成，若没有在nextTick函数内创建swiper对象，会出错
          var mySwiper = new Swiper(
            this.$refs.Swiper,
            {
              loop: true, // 循环模式选项
              // 如果需要分页器
              pagination: {
                el: ".swiper-pagination",
                clickable: true, //点击小球的时候也切换图片
              },
              // 如果需要前进后退按钮
              navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              },
            }
          );
        });
      },
    },
  },
};
</script>

<style>
</style>