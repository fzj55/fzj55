// pages/authorization_code/authorization_code.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        token:null,
        user_id:null,
        au_code:null
    },
    back(){
      wx.navigateBack({
        delta:1
    })
    },
    getAu_code(){
        wx.request({
            url: `https://test.wyu-pesystem.com/user/auth_code?user_id=${this.data.user_id}`,
            method: 'GET',
          header:{
              token:this.data.token
          },
          success:(res) =>
          {
            if(res.data.code == 0){
              wx.setStorageSync('au_code', res.data.data)
              this.setData({
                  au_code:res.data.data
              })
            }
            else{
              wx.showToast({
                title: res.data.msg,
                duration:1000,
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
        let au_code=wx.getStorageSync('au_code');
          this.setData({
            token:token,
            user_id:user_id,
            au_code:au_code
          })
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