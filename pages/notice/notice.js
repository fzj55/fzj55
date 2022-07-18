// pages/notice/notice.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        noticeList_1:[], //id为1的通知列表
        noticeList_2:[],
    },
    getNotice_1(){
        wx.request({
          url: 'https://test.wyu-pesystem.com/notice/normal_port',
          method: 'GET',
          data:{
            id :1
          },
          success:(res) =>
          {
            this.setData({
                noticeList_1:res.data.data
            })
          }
        })
        
    },
    getNotice_2(){
        wx.request({
          url: 'https://test.wyu-pesystem.com/notice/normal_port',
          method: 'GET',
          data:{
            id :2
          },
          success:(res) =>
          {
            this.setData({
                noticeList_2:res.data.data
            })
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
    onShow: function (params) {
if (typeof this.getTabBar === 'function' && this.getTabBar()) {
        this.getTabBar().setData({
          selected: 1
        })
      }
      this.getNotice_1()
      this.getNotice_2()
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