// 申明一个初始变量，每次调用++，请求编译完--，判断是否为零时，则所有异步请求完成，关闭提示框
let ajaxTimes=0;
export const request=(requestData)=>{
    // 调用即发送请求前显示loading提示框
    ++ajaxTimes;
    // console.log("请求第"+ajaxTimes+"次")
    wx.showLoading({
        title: '加载中',
      })
    const baseUrl="https://api.zbztb.cn/api/public/v1"
    return new Promise((resolve,reject)=>{
        wx.request({...requestData,url:baseUrl+requestData.url,
        success:(result)=>{
            resolve(result.data)
        },
        fail:(err)=>{
            reject(err)
        },
        // 接口调用结束的回调函数（调用成功、失败都会执行）	
        complete(){
            --ajaxTimes;
            // console.log(ajaxTimes)
            // 当变量为零时，则所有异步请求完成，关闭提示框
            if(ajaxTimes===0){
                wx.hideLoading();  
            }
        }
        })
    })
}
