import { reqCategoryList, reqGetBannerList, reqGetFloorList } from '@/api/index'

const actions = {
    async categoryList({ commit }) {
        //reqgetCategoryList返回的是一个Promise对象
        let result = await reqCategoryList();
        // console.log(result);

        if (result.code == 200) {
            commit("CATEGORYYLIST", result.data);
        }
    },
    // 获取首页轮播图的数据
    async getBannerList({ commit }) {
        // console.log('在向服务器发送请求获取轮播图的数据');
        let result = await reqGetBannerList();
        // console.log(result)
        if (result.code == 200) {
            commit("GETBANNERLIST", result.data);
        }
    },
    // 获取floor的数据
    async getFloorList({ commit }) {

        let result = await reqGetFloorList();
        // console.log(result)
        if (result.code == 200) {
            commit("GETFlOORLIST", result.data);
        }
    },
}

const mutations = {
    CATEGORYYLIST(state, categoryList) {
        state.categoryList = categoryList
        state.categoryList.length = 16
    },
    GETBANNERLIST(state, bannerList) {
        state.bannerList = bannerList
            // console.log('在修改仓库中的bannerList数据');
    },
    GETFlOORLIST(state, floorList) {
        state.floorList = floorList
    }

}

const state = {
    categoryList: [],
    bannerList: [],
    floorList: []
    //state仓库的数据类型取决于服务器返回的数据的类型
}

const getters = {}

export default {
    state,
    mutations,
    actions,
    getters,
}