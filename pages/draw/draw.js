// pages/authorization_code/authorization_code.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
       draw_list:null,
       record_orderlist:null
    },
    back(){
      wx.navigateBack({
        delta:1
    })
    },
    getDraw_list(){
        wx.request({
            url: `https://test.wyu-pesystem.com/order/draworder_port?user_id=${this.data.user_id}`,
            method: 'GET',
          header:{
              token:this.data.token
          },
          success:(res) =>
          {
            console.log(res.data.data)
            this.setData({
              draw_list:res.data.data
            })
          }
        })
    },
    To_write(res){
      wx.navigateTo({
        url: `/pages/write/write?order_id=${res.currentTarget.dataset.text}`
      })
    },
    cancel(res){
      wx.request({
        url: `https://test.wyu-pesystem.com/order/del_order_port?user_id=${this.data.user_id}`,
        method: 'GET',
      header:{
          token:this.data.token
      },
      data:{
        id:res.currentTarget.dataset.text
      },
      success:(res) =>
      {
        console.log(res)
        if(res.data.code == 0){
          this.getDraw_list()
        }
        else{
          wx.showToast({
            title: res.data.msg,
            duration:1500,
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
            user_id:user_id,
          })
        this.getDraw_list()
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