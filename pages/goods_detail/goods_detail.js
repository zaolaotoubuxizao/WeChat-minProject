// 引入封装好的请求方法
import {request} from "../../request/request.js";
// 引入库 使小程序支持es7的async语法
import regeneratorRuntime from '../../lib/runtime/runtime';
//Page Object
Page({
  data:{
    // 商品详情数据s
    goodsDetail:{}
  },
  // 商品id
  goods_id:0,
  onLoad(options){
    // console.log(options);
    this.goods_id=options.goods_id;
    this.getGoodsDetail();

  }
  ,
  // 获取商品详情数据
  async getGoodsDetail(){
    const res=await request({url:"/goods/detail",data:{goods_id:this.goods_id}})
    // console.log(res);
    let {goods_name,goods_price,goods_introduce,pics}=res.message;
    this.setData({
      goodsDetail:{goods_name,goods_price,goods_introduce,pics}
    })
  }
  ,
  // 点击展示轮播图大图
  handlePreviewImage(e){
    // console.log(e);
    const {id}=e.currentTarget.dataset;
    let urls=this.data.goodsDetail.pics.map(v=>{
      return v.pics_big
    });
    let current=urls[id];
    // console.log(id,urls,current)
    wx.previewImage({
      current, // 当前显示图片的http链接
      urls// 需要预览的图片http链接列表
    })
  }
  ,
});
  