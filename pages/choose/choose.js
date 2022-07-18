// pages/choose/choose.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        openplace_list:null
        
    },
    back(){
        wx.navigateBack({
          delta:1
      })
      },
    getOpenPlace(){
        wx.request({
          url: `https://test.wyu-pesystem.com/place/open_port`,
          method: 'GET',
          data:{
            open_time:1
          },
          success:(res) =>
          {
            console.log(res)
            this.setData({
              openplace_list:res.data.data,
              memberNum:res.data.data[0].max_book_num
            })
          }
        })
      },
      To_choose(res){
        if(res.currentTarget.dataset.text == 1)
        wx.navigateTo({
          url: `/pages/book_detail/book_detail`
        })
        if(res.currentTarget.dataset.text == 2)
        wx.navigateTo({
          url: `/pages/book_swim/book_swim`
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
        this.getOpenPlace()
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