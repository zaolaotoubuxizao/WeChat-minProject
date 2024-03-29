// 引入封装好的请求方法
import {
  request
} from "../../request/request.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  data: {
    // tabs栏的数据
    tabsData1: [{
        id: 0,
        title: "综合",
        isActive: true
      },
      {
        id: 1,
        title: "销量",
        isActive: false
      },
      {
        id: 2,
        title: "价格",
        isActive: false
      }
    ],
    // 商品列表的数据
    goodsList: []
  },
  // 请求商品列表数据所需参数
  queryParam: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10,
  },
  // 总的页数
  totalPages: 1,
  // 下拉刷新防御性变量
  flag: false,
  // 生命周期函数，监听页面加载
  onLoad(options) {
    // console.log(options);
    this.queryParam.cid = options.cid
    this.getGoodsList()
  },
  // 获取商品列表数据
  async getGoodsList() {
    const res = await request({
      url: "/goods/search",
      data: this.queryParam
    })
    //  计算总的页数
    this.totalPages = Math.ceil(res.message.total / this.queryParam.pagesize)
    // 要拼接数组
    this.setData({
      goodsList: [...this.data.goodsList, ...res.message.goods]
    })
    // 成功拿回数据后，判断操作是否是由下刷新触发，然后关闭下拉刷新
    if (this.flag) {
      // console.log("是下拉刷新触发");
      // 关闭下拉刷新
      wx.stopPullDownRefresh()
      // 再将防御性变量初始化
      this.flag = false;
    }
  },
  // 页面上拉 滚动条触底事件
  onReachBottom() {
    // 当触底时当前页面+1
    // queryParam:{
    //   query:"",
    //   cid:"",
    //   pagenum:1,
    //   pagesize:10,
    if (this.queryParam.pagenum >= this.totalPages) {
      // 没有下一页数据
      // console.log("没有下一页数据");
      // Toast 会自动显示的提示框
      wx.showToast({
        title: '没有下一页数据',
        icon: 'none',
      });
    } else {
      this.queryParam.pagenum++;
      this.getGoodsList()
    }
  },
  // 下拉刷新重置页面
  onPullDownRefresh: function () {
    // 只有当下拉刷新给防御性变量赋值，再判断变量是否关闭下拉刷新
    this.flag = true;
    // 将页数 和 初始数据数组重置
    this.queryParam.pagenum = 1;
    this.setData({
      goodsList: []
    })
    // 再调用请求数据方法载入初始数据
    this.getGoodsList()
  },
  // 子组件触发的事件 获取子组件tab选中的tab的id值
  handleItemChange(active) {
    // console.log(active);
    const {id} = active.detail;
    let {
      tabsData1
    } = this.data
    // 修改当前类，并重置data中的数据
    tabsData1.forEach(v => {
      v.id === id ? v.isActive = true : v.isActive = false
    });
    this.setData({
      tabsData1
    })
  }
})