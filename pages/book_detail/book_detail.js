// pages/book_detail/book_detail.js
Page({

    /**
     * 页面的初 始数据
     */
    data: {
      openlist:null,
      opendic:{},
        recvList:null,//接受导航传参
        placeNumList:[],//记录开放的场所的子场地
        recordtimemsgList:[],//
        timeStr:null,
        placeStr:null,
        placecode:null,//判断有无子场地
        placeTimeList:[],//记录子场地的时间
        PeopleStr:null,
        user_id:null,
        token:null,
        index:null,
        message:null,
        clickId:-1,
        clickId_2:-1,
        send_timetable_id:null,
        set_book_num:[],
        send_book_num:null
    },
    record_time: function (res) {
      console.log(res.currentTarget.dataset.text)
      this.getbook_num(res.currentTarget.dataset.text)
      if (this.data.clickId == res.currentTarget.id){
        this.setData({
          clickId: -1
        })
       return;
      }
      this.setData({
        send_timetable_id:res.currentTarget.dataset.text,
        clickId: res.currentTarget.id
      })
    },
    record_num: function (res) {
      console.log(res.currentTarget.dataset.text)
      if (this.data.clickId_2 == res.currentTarget.id){
        this.setData({
          clickId_2: -1
        })
       return;
      }
      this.setData({
        send_book_num:res.currentTarget.dataset.text,
        clickId_2: res.currentTarget.id
      })
    },
    getbook_num(timetable_id){
      wx.request({
        url: `https://test.wyu-pesystem.com/place/detail_port?user_id=${this.data.user_id}`,
        method: 'GET',
        data:{
          place_id:1
      },
      header:{
          token:this.data.token
      },
        success:(res) =>
        {
          console.log(res)
          if (res.data.code == 1){
              res.data.data.detail.forEach(element => {
                element.timetable.forEach(e=>{
                  if (e.id == timetable_id){
                    console.log(e)
                    this.setData({
                      set_book_num:e.ticket_num
                    })
                  }
                })
                })      

          }
        }
      })
      
  },
  back(){
    wx.navigateBack({
      delta:1
  })
  },
    getAll_pt(){
        wx.request({
          url: `https://test.wyu-pesystem.com/place/detail_port?user_id=${this.data.user_id}`,
          method: 'GET',
          data:{
            place_id:1
        },
        header:{
            token:this.data.token
        },
          success:(res) =>
          {
            console.log(res)
            if (res.data.code == 1){
              let arr = []
              let arr_2 = [] 
              let arr_3 = []
              let dic = {}
              let index = 1
              let a = 0 
              res.data.data.detail.forEach(element => {
                arr.push(element.name.substr(3,))
              })
              res.data.data.time.forEach(element => {
                arr_2.push(element.split(' '))
              })
              res.data.data.time.forEach(options => {
                res.data.data.detail.forEach(element => {
                  if(element.timetable.length === 0){
                    arr_3.push({id:'0'})
                    dic[a] = 0
                    a += 1
                  }
                  else{ 
                    for(let i=0;i<element.timetable.length;i++){
                      if(element.timetable[i].time === options){ 
                        arr_3.push({id:element.timetable[i].id,num:element.timetable[i].ticket_num})
                        dic[element.timetable[i].id] = element.timetable[i].can_book_num[element.timetable[i].can_book_num.length-1]
                        index = null
                        break
                      }
                      else{
                        continue
                      }
                    }
                    if(index){
                      arr_3.push({id:'0'})
                    }
                    index = 1
                      }  
                  })      
              })
              this.setData({
                placeNumList:arr,
                placeTimeList:arr_2,
                openlist:arr_3,
                opendic:dic
              })
              console.log(this.data.openlist)
            }
          }
        })
        
    },
   submit(){
     console.log(this.data.send_timetable_id)
     wx.request({
       url: `https://test.wyu-pesystem.com/order/book_port?user_id=${this.data.user_id}`,
       method: 'POST',
       data:{
         timetable_id:this.data.send_timetable_id,
         book_num:this.data.send_book_num
     },
     header:{
         token:this.data.token
     },
     success:(res) =>
          {
          console.log(res)
           if(res.data.code == 0 ){
            wx.showToast({
              title: '提交成功',
              duration:1500,
              icon:'success',
              success:function(){
                 setTimeout(function () {
                     //要延时执行的代码
                     wx.switchTab({
                       url: '/pages/book/book'
                     })
                   }, 2000) //延迟时间
              }
            })
           }
           else{
            wx.showToast({
              title: res.data.msg,
              duration:1500,
              icon:'error',
            })
           }
          }
     })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({ 
            recvList: options
        });
        // this.getOpenplace()
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
        let token=wx.getStorageSync('token');
        let user_id=wx.getStorageSync('user_id');
      this.setData({
        token:token,
        user_id:user_id
      })
      this.getAll_pt()
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