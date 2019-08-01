// 1 引入自己封装过的接口的代码
// 2 以前vue node中引入js文件的时候  
// 3 小程序中 不要省略 建议把引入的路径名补充完整 
import { request } from "../../request/request.js";
// pages/category/category.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 右侧商品详情数据
    rightGoodsList:[],
    // 左侧商品分类列表数据
    leftMenuList:[],
    // 点击左侧菜单选中的当前索引
    currentIndex:0,
    // 每次点击将滚动条重置
    scrollTop:0
  },
    // 接口的返回值 数组格式
  // 小程序中不建议把没有必要的数据定义在data中，因为内部会把data中的所有的数据都会传递到
  // 视图层 wxml，容易导致页面特别卡 
    // 全局数据
    categories:[],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 1.获取缓存得数据，判断是否又缓存数据
    const cates=wx.getStorageSync("cates");
    // 2.判断有没有缓存数据  -没有数据  -有数据但是过期 -有数据且没有过期
    if(!cates){
      // 没有缓存数据，则存入数据
      this.getCategories()
    }
    else if(Date.now()-cates.time>1000*10){
      // 缓存数据过期  过期时间是10s
      this.getCategories()
    }
    else{
      // 有数据且没过期，直接读取
      const categories=cates.data
      // 给全局数据进行赋值
      this.categories=categories
        // 分离左侧列表数据
      const leftMenuList=categories.map(v=>({
        cat_id:v.cat_id,cat_name:v.cat_name
      }))
      // 右侧商品数据
      const rightGoodsList=categories[this.data.currentIndex].children
      // 刷新数据
      this.setData({
        leftMenuList,
        rightGoodsList,
      })
    }
  },
  // 获取商品分类数据
  getCategories(){
    request({url:"/categories"})
      .then(res=>{
        // console.log(res.message);
        // 给全局数据赋值
        this.categories=res.message
        // 将数据存入本地缓存中
        wx.setStorageSync("cates",{time:Date.now(),data:this.categories});
        // 分离左侧列表数据
        const leftMenuList=this.categories.map(v=>{
          return {cat_id:v.cat_id,cat_name:v.cat_name}
        })
        // let index=this.data.currentIndex
        this.setData({
          leftMenuList,
          rightGoodsList:this.categories[this.data.currentIndex].children
        })
        // console.log(this.leftMenuList);
      })
  },
  // 点击左侧列表事件
  handleMenuChange(e){
    // console.log(e);
    // 获取索引
    const {index}=e.currentTarget.dataset
    // 根据索引来获取对应得商品信息
    const rightGoodsList=this.categories[index].children
    // 更新右侧数据，渲染页面
    this.setData({
      currentIndex:index,
      rightGoodsList,
      scrollTop:0
    })
  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})