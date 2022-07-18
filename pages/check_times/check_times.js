// pages/check_times/check_times.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openplace_list: null,
    real_list: [],
  },
  back() {
    wx.navigateBack({
      delta: 1
    })
  },
  all_residue_degree_port() {
    wx.request({
      url: `https://test.wyu-pesystem.com/user/residue_degree_port?user_id=${this.data.user_id}`,
      method: 'GET',
      header: {
        token: this.data.token
      },
      success: (res) => {
        this.setData({
          real_list:res.data.data
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
    let token = wx.getStorageSync('token');
    let user_id = wx.getStorageSync('user_id');
    this.setData({
      token: token,
      user_id: user_id
    })
    // this.badminton_residue_degree_port()
    this.all_residue_degree_port()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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