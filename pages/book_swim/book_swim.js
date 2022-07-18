// pages/book_swim/book_swim.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        swim_list:null
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
            place_id:2
        },
        header:{
            token:this.data.token
        },
          success:(res) =>
          {
            console.log(res)
            this.setData({
                swim_list:res.data.data
            })
          }
        })
        
    },
    submit(res){
        wx.request({
          url: `https://test.wyu-pesystem.com/order/book_port?user_id=${this.data.user_id}`,
          method: 'POST',
          data:{
            book_num:1,
            timetable_id:res.currentTarget.dataset.text,
        },
        header:{
            token:this.data.token
        },
          success:(res) =>
          {
            console.log(res)
            this.setData({
                swim_list:res.data.data.detail
            })
            if(res.data.code == 0){
              wx.showToast({
                title: res.data.msg,
                icon:'success'
              })
            }
            else{
              wx.showToast({
                title: res.data.msg,
                icon:'error'
              })
            }
            
          }
        })
        
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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