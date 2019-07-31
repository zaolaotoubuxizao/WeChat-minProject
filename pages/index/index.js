// 引入数据请求组件
import {request} from "../../request/request.js"
// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperData:[],
    floordata:[],
    catitemsData:[]
  },
  // 声明周期函数，页面加载时触发
  onLoad(){
    this.getSwiperData()
    this.getFloorData()
    this.getCatitemsData()
  },
  getSwiperData(){
    request({url:"/home/swiperdata"})
      .then(res=>{
        // console.log(res)
        this.setData({
          swiperData:res.message
        })
      })
  },
  getCatitemsData(){
    request({url:"/home/catitems"})
      .then(res=>{
        console.log(res.message)
        this.setData({
          catitemsData:res.message
        })
      })
  },
  getFloorData(){
    request({url:"/home/floordata"})
      .then(res=>{
        // console.log(res.message)
        this.setData({
          floordata:res.message
        })
      })
  }

})