<template>
  <div>
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <!-- <Rank></Rank>
    <Like></Like> -->
    <Floor v-for="(floor, index) in floorList" :key="floor.id" :list="floor" />
    <Brand></Brand>
  </div>
</template>

<script>
import ListContainer from '@/pagaes/Home/ListContainer/index.vue';
import Recommend from '@/pagaes/Home/Recommend/index.vue';
import Rank from '@/pagaes/Home/Rank/index.vue';
import Like from '@/pagaes/Home/Like/index.vue';
import Floor from '@/pagaes/Home/Floor/index.vue';
import Brand from '@/pagaes/Home/Brand/index.vue';
import { mapState } from 'vuex';

export default {
  name: 'Home',
  components: {
    ListContainer,
    Recommend,
    Rank,
    Like,
    Floor,
    Brand,
  },
  mounted() {
    this.$store.dispatch('getFloorList');
    //floor组件的数据请求必须在home组件里发而不能在floor本身里发，否则不能正常遍历数据
  },
  computed: {
    ...mapState({
      floorList: (state) => state.home.floorList,
    }),
  },
};
</script>

<style>
</style>