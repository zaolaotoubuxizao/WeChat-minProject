export const request=(requestData)=>{
    const baseUrl="https://api.zbztb.cn/api/public/v1"
    return new Promise((resolve,reject)=>{
        wx.request({...requestData,url:baseUrl+requestData.url,
        success:(result)=>{
            resolve(result.data)
        },
        fail:(err)=>{
            reject(err)
        }
        })
    })
}
