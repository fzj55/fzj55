// pages/notice/notice.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      token:null,
      user_id:null,
      studentnum:null,
      nickname:null,
      avaurl:null,
      authority_id:null,
  },
  dropOut:function(){
    wx.removeStorageSync('token')
    wx.removeStorageSync('user_id')
    wx.removeStorageSync('studentnum')
    wx.navigateTo({
      url: '/pages/bind/bind',
    })
  },
  authorization_code(){
    wx.navigateTo({
      url: '/pages/authorization_code/authorization_code',
    })
  },
  To_login(){
    wx.navigateTo({
      url: '/pages/bind/bind',
    })
  },
  To_draw(){
    wx.navigateTo({
      url: '/pages/draw/draw',
    })
  },
  to_order(){
    wx.navigateTo({
      url: '/pages/history/history',
    })
  },
  check_times(){
    wx.navigateTo({
      url: '/pages/check_times/check_times',
    })
  },
  my_detail(){
    wx.navigateTo({
      url: '/pages/my_detail/my_detail',
    })
  },
  to_choose(){
    wx.navigateTo({
      url: '/pages/choose/choose',
    })
  },
  check_status(){
    wx.request({
      url: `https://test.wyu-pesystem.com/user/message_port?user_id=${this.data.user_id}`,
      method: 'GET',
      header:{
          token:this.data.token
      },
      success:(res) =>
      {
        console.log(res)
        if(res.data.code==0){
          this.setData({
            authority_id:res.data.data.authority_id
          })
        }
        else{
          wx.navigateTo({
            url: '../bind/bind',
          })
        }
      }
    })
  },
  notlog_notice(){
    wx.showToast({
      title: '请先登录',
      icon:'error'
    })
  },
  get_avatarUrl(){
    wx.getUserProfile({
      desc: '登录', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res.userInfo.avatarUrl)
        this.setData({
          avaurl: res.userInfo.avatarUrl
        })
        wx.setStorageSync('avaurl', res.userInfo.avatarUrl)
      }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
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
        selected: 2  // 数字是当前页面在tabbar的索引,如我的查询页索引是2，因此这边为2，同理首页就为0，消息中心页面为1
      })
    }
    let token=wx.getStorageSync('token');
    let user_id=wx.getStorageSync('user_id');
    let studentnum=wx.getStorageSync('studentnum');
    let nickname=wx.getStorageSync('nickname');
    let avaurl = wx.getStorageSync('avaurl');
      this.setData({
        token:token,
        user_id:user_id,
        studentnum:studentnum,
        nickname:nickname,
        avaurl:avaurl
      })
      this.check_status()
  },
    handle(){
        wx.showToast({
          title: '成功，请稍等',
          icon:'success',
          duration:1000
        })
        let link = 'https://test.wyu-pesystem.com/static/word/instruction.docx'
        //下载文件
        wx.downloadFile({
          url: link,
          success (res) {
            console.log(res)
            if (res.statusCode === 200) {
            const filePath = res.tempFilePath
              wx.openDocument({
                filePath: filePath,
              showMenu:true, //关键点
                success: function (res) {
                  console.log('打开文档成功')
                }
              })
            }
          },
          fail:(res)=>{
            console.log(res)
          }
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