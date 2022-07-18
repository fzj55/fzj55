// pages/history/history.js
const app = getApp()
var util = require('../../utils/util.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        is_dark:0,
        token:null,
        user_id:null,
        stadium:{},
        time:null,
        isShow:false,
        show_starttime:'',
        show_endtime:'',
        show_studentname:'',
        show_placename:'',
        show_ticketid:''
    },
    back(){
      wx.navigateBack({
        delta:1
    })
    },
    To_write(res){
      wx.navigateTo({
        url: `/pages/search_child/search_child?order_id=${res.currentTarget.dataset.text}`
      })
    },
    book_del(e){
      var that = this
      wx.showModal({
            title: '提示',
            content: '确认要删除吗？',
            confirmText: "确定", //默认是“确定”
            confirmColor: 'skyblue', //确定文字的颜色
            success: function(res){
              if (res.cancel) {
                //点击取消
                console.log("您点击了取消")
              } else if(res.confirm){
                //点击确定
            wx.request({
                url: `https://test.wyu-pesystem.com/order/del_order_port?user_id=${that.data.user_id}`,
                method:'GET',
                header:{
                  token:that.data.token
              },
              data:{
                id:e.currentTarget.dataset.gid
              },
                success:(res)=>{
                  if(res.data.code == 0){
                    that.getGym()
                  }
                  else{
                    wx.showToast({
                      title: res.data.msg,
                      duration:1500,
                      icon:'error'
                    })
                  }
                },
        })
                      }
                    }
                })
  },
  handleback(){ 
    this.setData({
      isShow:!this.data.isShow
    })
  },
  handleshow(e){
    var a = e.currentTarget.dataset.starttime
    if(parseInt(a.substring(11,13))>18){
      this.setData({
        is_dark:1
      })
    }else{
      this.setData({
        is_dark:0
      })
    }
    console.log(e.currentTarget.dataset)
    this.setData({
      isShow:!this.data.isShow,
      show_starttime:e.currentTarget.dataset.starttime,
      show_endtime:e.currentTarget.dataset.endtime,
      show_studentname:wx.getStorageSync('studentnum'),
      show_placename:e.currentTarget.dataset.placename,
      show_ticketid:e.currentTarget.dataset.ticketid
    })
  },
    getGym(){
        wx.request({
          url: `https://test.wyu-pesystem.com/order/order_port?user_id=${this.data.user_id}`,
          method:'GET',
          header:{
            token:this.data.token
        },
          success:(res)=>{
            console.log(res)
              this.setData({
                stadium:res.data.data
              })
          },
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      let token=wx.getStorageSync('token');
      let user_id=wx.getStorageSync('user_id');
      this.setData({
          token:token,
          user_id:user_id
      })
      this.getGym()
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
      var Time = util.formatTime(new Date());
      this.setData({
        time:Time
      })
      let token=wx.getStorageSync('token');
      let user_id=wx.getStorageSync('user_id');
      this.setData({
          token:token,
          user_id:user_id
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