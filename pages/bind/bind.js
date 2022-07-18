// pages/bind/bind.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      imgUrl:'https://test.wyu-pesystem.com/ImgVcode_port',
    infoMess: '',
    userName: '',
    userN:'',
    passWd: '',
    passW:'',
    vcode:'',
    voceV:'',
    nickN:'',
    nickName:''
    },
    //刷新验证码
    refreshImg:function(e){
      var that = this;
      that.setData({
        imgUrl: that.data.imgUrl + '?' + Math.random() / 9999
      })
    },
      //用户名和密码输入框事件
  userNameInput:function(e){
    this.setData({
      userN:e.detail.value
    })
  },
  nickNameInput:function(e){
    this.setData({
      nickN:e.detail.value
    })
  },
  passWdInput:function(e){
    this.setData({
      passW:e.detail.value
    })
    },
    passVcInput:function(e){
        this.setData({
            voceV:e.detail.value
        })
    },
  loginBtnClick:function(){
    if(this.data.userN.length == 0 || this.data.passW.length == 0 || this.data.voceV.length == 0 || this.data.nickN.length == 0){
        wx.showToast({
          title: '不能为空',
          icon:'error'
        })
    } 
    else{
      this.setData({
        infoMess:'',
        userName:this.data.userN,
        passWd:this.data.passW,
        vcode:this.data.voceV,
        nickName:this.data.nickN
      })
      wx.request({
        url: 'https://test.wyu-pesystem.com/login_port',
        method:'POST',
        data:{
            name:this.data.userName,
            password:this.data.passWd,
            code:this.data.vcode
        },
        success:(res) =>
          {
            console.log(res)
            if(res.data.code===0){
              wx.setStorageSync('token', res.data.data.token)
            wx.setStorageSync('user_id', res.data.data.user_id)
            wx.setStorageSync('studentnum', this.data.userName)
            wx.setStorageSync('nickname', this.data.nickName)
            wx.navigateBack({
                delta:1
            })
            }
            else{
              wx.showToast({
                title: '输入有误',
                icon:'error',
              })
            }
        }
      })
    }
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