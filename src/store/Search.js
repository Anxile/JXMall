import { reqGetSearchInfo } from "@/api"

const actions = {       //专门处理异步操作
                        //context是vuex自动生成的对象，它包含了一些有用的方法和属性，例如commit用于提交mutation、dispatch用于分发action等
    async getSearchList(context, params = {}) {//getSearchList({ commit }, params = {})，把使用dispatch时vuex生成的context对象中的commit函数解构出来
                                //params为默认参数
        let result = await reqGetSearchInfo(params)     //reqGetSearchInfo返回一个Promise对象
        if (result.code = 200) {
            context.commit('GETSEARCHLIST', result.data)
            //commit方法是用来触发mutations中的函数的，它的第一个参数是需要调用的mutations函数的名称，第二个参数是该函数需要的参数.
        }
    }
}


const mutations = {         //只能处理同步操作
    GETSEARCHLIST(state, searchList) {
        state.searchList = searchList
    }
}

const state = {
    // 仓库初始状态
    searchList: {}
}

const getters = {
    //当前形参state，当前仓库中的state，并非大仓库中的那个state
    goodsList(state) {
        return state.searchList.goodsList || []
    },
    attrsList(state) {
        return state.searchList.attrsList || []
    },
    trademarkList(state) {
        return state.searchList.trademarkList || []
    }
}

export default {
    state,
    mutations,
    actions,
    getters
}