<template>
  <div>
    <!-- 商品分类三级列表 -->
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag">
            <!-- 分类的面包屑 -->
            <li class="with-x" v-if="searchParams.categoryName">
              {{ searchParams.categoryName }}
              <i @click="removeCategoryName">x</i>
            </li>
            <!-- 关键字的面包屑 -->
            <li class="with-x" v-if="searchParams.keyword">
              {{ searchParams.keyword }}
              <i @click="removeKeyword">x</i>
            </li>
            <!-- 品牌的面包屑 -->
            <li class="with-x" v-if="searchParams.trademark">
              {{ searchParams.trademark.split(":")[1] }}
              <i @click="removetrademark">x</i>
            </li>
            <!-- 平台的售卖的属性值的展示 -->
            <li
              class="with-x"
              v-for="(attrValue, index) in searchParams.props"
              :key="index"
              v-show="attrValue"
            >
              {{ attrValue.split(":")[1] }}
              <i @click="removeAttr(index)">x</i>
            </li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademarkInfo="trademarkInfo" @attrInfo="attrInfo" />

        <!--details-->
        <div class="details clearfix">
          <!-- 销售产品列表 -->
          <div class="goods-list">
            <ul class="yui3-g">
              <li
                class="yui3-u-1-5"
                v-for="(good, index) in goodsList"
                :key="good.id"
              >
                <div class="list-wrap">
                  <div class="p-img">
                    <router-link :to="`detail/${good.id}`">
                      <img v-lazy="good.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥ </em>
                      <i>{{ good.price }}.00</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <router-link :to="`detail/${good.id}`">
                      <a title="快来购买吧！">{{ good.title }}</a>
                    </router-link>
                  </div>
                  <div class="operate">
                    <a
                      href="success-cart.html"
                      target="_blank"
                      class="sui-btn btn-bordered btn-danger"
                      >加入购物车</a
                    >
                    <a href="javascript:void(0);" class="sui-btn btn-bordered"
                      >收藏</a
                    >
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <Pagination :pageNo="searchParams.pageNo" :pageSize="searchParams.pageSize" :total="total" :continues="5" @getPageNo="getPageNo"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import SearchSelector from "./SearchSelector/SearchSelector";
export default {
  name: "Search",
  data() {
    return {
      searchParams: {
        //一级分类的id
        categoryId1: "",
        //二级分类id
        categoryId2: "",
        //三级分类id
        categoryId3: "",
        //分类名字
        categoryName: "",
        // 关键字
        keyword: "",
        order: "1:desc",
        //分页器用的：代表的是当前是第几页
        pageNo: 1,
        //代表的是每一个展示数据个数
        pageSize: 10,
        //平台售卖属性操作带的参数
        props: [],
        // 品牌
        trademark: "",
      },
    };
  },
  components: {
    SearchSelector,
  },
  // 当组件挂载完毕之前执行一次【先与mounted之前】
  beforeMount() {
    //在发请求之前带给服务器参数【searchParams参数发生变化有数值带给服务器】

    // obiect.assign(target, ...sources):ES6新增的语法，合并对象
    Object.assign(this.searchParams, this.$route.query, this.$route.params);
                    //目标对象
  },
  mounted() {
    // 组件挂载完毕执行一次【仅仅执行一次】
    // 在发请求之前咱们需要将searchParams里面参数进行修改带给服务器
    this.getData();


    console.log(this.searchParams)

  },
  computed: {
    ...mapGetters(["goodsList"]),
    // isOne() {
    //   return this.searchParams.order.includes("1");
    // },
    // isTow() {
    //   return this.searchParams.order.includes("2");
    // },
    // isAcs() {
    //   return this.searchParams.order.includes("asc");
    // },
    // isDesc() {
    //   return this.searchParams.order.includes("desc");
    // },
    //获取search模块展示产品一共多少数据，传给子组件分页器
    ...mapState({
      total: (state) => state.search.searchList.total,
    }),
  },
  methods: {
    //向服务器发请求获取search模块数据（根据参数不同返回不同的数据进行展示）
    //把这次请求封装为一个函数：当你需要在调用的时候调用即可
    getData() {
      this.$store.dispatch("getSearchList", this.searchParams);
    },
    // 删除分类的名字
    removeCategoryName() {
      /* 把带给服务器的参数置空了，还需要向服务器发请求带给服务器参数说明可有可无的：
      如果属性值为空的字符串还是会把相应的字段带给服务器但是你把相应的字段变为undefined，
      当前这个字段不会带给服务器 */
      this.searchParams.categoryName = undefined;
      this.searchParams.categoryId1 = undefined;
      this.searchParams.categoryId2 = undefined;
      this.searchParams.categoryId3 = undefined;
      this.getData();
      /* 地址栏也需要需改：进行路由跳转（现在的路由跳转只是跳转到自己这里）
      严谨：本意是删除query，如果路径当中东现params不应该删除，路由跳转的时候应该带着 */
      //if (this.$route.params) {
      this.$router.push({ name: "search", params: this.$route.params });
      //}
    },
    // 删除关键字
    removeKeyword() {
      //给服务器带的参数searchParams的keyword置空
      this.searchParams.keyword = undefined;
      //再次发请求
      this.getData();
      /* 地址栏也需要需改：进行路由跳转（现在的路由跳转只是跳转到自己这里）
      严谨：本意是删除params，如果路径当中东现query不应该删除，路由跳转的时候应该带着 */
      if (this.$route.query) {
        this.$router.push({ name: "search", query: this.$route.query });
      }
      //通知兄弟组件Header清除关键字
      this.$bus.$emit("clearkeyword");
    },
    // 自定义事件回调
    trademarkInfo(trademark) {
      //1：整理品牌字段的参数“ID：品牌名称”
      this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`;
      // 再次发请求获取search模块列表数据进行展示
      this.getData();
      // console.log(trademark);
    },
    //删除品牌的信息
    removetrademark() {
      //将品牌信息置空
      this.searchParams.trademark = undefined;
      // 再次发送请求
      this.getData();
    },
    //收集平台属性地方回调函数（自定义事件）
    attrInfo(attr, attrValue) {
      // 整理参数格式

      let props = `${attr.attrId}:${attrValue}:${attr.attrName}`;
      // 修改data里面的props为整理好的  push() 方法将一个或多个元素添加到数组的末尾，并返回该数组的新长度。

      // 数组去重
      //if语句里面只有一行代码：可以省略大花括号
      console.log(`${props}`);

      //if (!this.searchParams.props.includes(props))
      this.searchParams.props.push(props);


      console.log(this.searchParams.props)

      // 再次发送请求
      this.getData();
    },
    // 删除售卖的属性
    removeAttr(index) {
      // 再次整理参数
      this.searchParams.props.splice(index, 1); //splice() 方法通过删除或替换现有元素或者原地添加新的元素来修改数组,并以数组形式返回被修改的内容。此方法会改变原数组
      //  再次发送请求
      this.getData();
    },

    // 自定义事件的回调函数---获取当前第几页
    getPageNo(pageNo) {
      // console.log(pageNo);
      //整理带给服务器参数
      this.searchParams.pageNo = pageNo;
      // 再次发送请求
      this.getData();
    },
  },
  watch: {
    // 监听路由的信息是否发生变化，如果发生变化，再次发起请求
    $route(newvalue, oldvalue) {
      // 再次发请求之前整理带给服务器参数
      Object.assign(this.searchParams, this.$route.query, this.$route.params);
      //再次发起ajax请求
      this.getData();
      // 每一次请求完毕，应该把相应的1、2、3级分类的id置空的，让他接受下一次的相应1、2、3id
      this.searchParams.categoryId1 = undefined;
      this.searchParams.categoryId2 = undefined;
      this.searchParams.categoryId3 = undefined;
    },
  },
};
</script>

<style lang="less" scoped>
.main {
  margin: 10px 0;

  .py-container {
    width: 1200px;
    margin: 0 auto;

    .bread {
      margin-bottom: 5px;
      overflow: hidden;

      .sui-breadcrumb {
        padding: 3px 15px;
        margin: 0;
        font-weight: 400;
        border-radius: 3px;
        float: left;

        li {
          display: inline-block;
          line-height: 18px;

          a {
            color: #666;
            text-decoration: none;

            &:hover {
              color: #4cb9fc;
            }
          }
        }
      }

      .sui-tag {
        margin-top: -5px;
        list-style: none;
        font-size: 0;
        line-height: 0;
        padding: 5px 0 0;
        margin-bottom: 18px;
        float: left;

        .with-x {
          font-size: 12px;
          margin: 0 5px 5px 0;
          display: inline-block;
          overflow: hidden;
          color: #000;
          background: #f7f7f7;
          padding: 0 7px;
          height: 20px;
          line-height: 20px;
          border: 1px solid #dedede;
          white-space: nowrap;
          transition: color 400ms;
          cursor: pointer;

          i {
            margin-left: 10px;
            cursor: pointer;
            font: 400 14px tahoma;
            display: inline-block;
            height: 100%;
            vertical-align: middle;
          }

          &:hover {
            color: #28a3ef;
          }
        }
      }
    }

    .details {
      margin-bottom: 5px;

      .goods-list {
        margin: 20px 0;

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            height: 100%;
            width: 20%;
            margin-top: 10px;
            line-height: 28px;

            .list-wrap {
              .p-img {
                padding-left: 15px;
                width: 215px;
                height: 255px;

                a {
                  color: #666;

                  img {
                    max-width: 100%;
                    height: auto;
                    vertical-align: middle;
                  }
                }
              }

              .price {
                padding-left: 15px;
                font-size: 18px;
                color: #c81623;

                strong {
                  font-weight: 700;

                  i {
                    margin-left: -5px;
                  }
                }
              }

              .attr {
                padding-left: 15px;
                width: 85%;
                overflow: hidden;
                margin-bottom: 8px;
                min-height: 38px;
                cursor: pointer;
                line-height: 1.8;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;

                a {
                  color: #333;
                  text-decoration: none;
                }
              }

              .operate {
                padding: 12px 15px;

                .sui-btn {
                  display: inline-block;
                  padding: 2px 14px;
                  box-sizing: border-box;
                  margin-bottom: 0;
                  font-size: 12px;
                  line-height: 18px;
                  text-align: center;
                  vertical-align: middle;
                  cursor: pointer;
                  border-radius: 0;
                  background-color: transparent;
                  margin-right: 15px;
                }

                .btn-bordered {
                  min-width: 85px;
                  background-color: transparent;
                  border: 1px solid #8c8c8c;
                  color: #8c8c8c;

                  &:hover {
                    border: 1px solid #666;
                    color: #fff !important;
                    background-color: #666;
                    text-decoration: none;
                  }
                }

                .btn-danger {
                  border: 1px solid #e1251b;
                  color: #e1251b;

                  &:hover {
                    border: 1px solid #e1251b;
                    background-color: #e1251b;
                    color: white !important;
                    text-decoration: none;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
</style>