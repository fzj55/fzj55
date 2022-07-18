// pages/bind/bind.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
      imgUrl:'https://test.wyu-pesystem.com/ImgVcode_port',
    userN:'',
    passW:'',
    nickN:'',
    au_list:[],
    order_id:'',
    token:'',
    user_id:''
    },
    back(){
      wx.navigateBack({
        delta:1
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
  loginBtnClick:function(){
      let arr = []
      if(this.data.userN){
        arr.push(this.data.userN)
      }
      if(this.data.passW){
        arr.push(this.data.passW)
      }
      if(this.data.nickN){
        arr.push(this.data.nickN)
      }
      this.setData({
          au_list:arr
      })
      console.log(this.data.au_list)
     if(this.data.au_list){
          wx.request({
            url: `https://test.wyu-pesystem.com/order/inviteuser_port?user_id=${this.data.user_id}`,
            method: 'POST',
            header:{
            token:this.data.token
            },
            data:{
                order_id:this.data.order_id,
                auth_codelist:this.data.au_list
            },
            success:(res) =>
              {
                console.log(res)
                if(res.data.code == 0){
                  wx.showToast({
                    title: '提交成功',
                    duration: 1500,
                    icon:'success'
                  })   
                }
                else{
                  // wx.showToast({
                  //   title: res.data.msg,
                  //   duration: 1500,
                  //   icon:'error'
                  // })
                  wx.showModal({
                                title: '提示',
                                content: res.data.msg,
                                confirmText: "知道了", //默认是“确定”
                                confirmColor: 'skyblue', //确定文字的颜色
                                showCancel: false,
                                success: function(res) {
                                  if (res.cancel) {
                                    //点击取消
                                    console.log("您点击了取消")
                                  } else if(res.confirm){
                                    //点击确定
                                    console.log("您点击了确定")
                                  }
                                }
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
        console.log(options.order_id)
        this.setData({
          order_id:options.order_id
        })
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