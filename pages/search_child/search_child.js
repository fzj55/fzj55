// pages/search_child/search_child.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        order_id:'',
        token:'',
        user_id:'',
        stadium:[{
          'childorder_id':'1111',
          'belong_username':'3119004309'
          }],
        index:0
    },
    back(){
      wx.navigateBack({
        delta:1
    })
    },
    To_write(){
        wx.navigateTo({
          url: `/pages/write/write?order_id=${this.data.order_id}`
        })
      },
      del_child(option){
        var that = this
        wx.showModal({
                      title: '提示',
                      content: res.data.msg,
                      confirmText: "确定", //默认是“确定”
                      confirmColor: 'skyblue', //确定文字的颜色
                      success: function(res) {
                        if (res.cancel) {
                          //点击取消
                          console.log("您点击了取消")
                        } else if(res.confirm){
                          //点击确定
          wx.request({
            url: `https://test.wyu-pesystem.com/order/del_childorder_port?user_id=${that.data.user_id}`,
            method:'GET',
            header:{
              token:that.data.token
          },
          data:{
            parent_order_id:that.data.order_id,
            child_order_id:option.currentTarget.dataset.text
          },
            success:(res)=>{
              if(res.data.code == 0){
                that.Get_childlist()
              }
            },
          })
                                }
                              }
                          })
      },
    Get_childlist(){
        wx.request({
            url: `https://test.wyu-pesystem.com/order/search_childorder_port?user_id=${this.data.user_id}`,
            method:'GET',
            header:{
              token:this.data.token
          },
          data:{
            order_id:this.data.order_id
          },
            success:(res)=>{
                console.log(res.data.data)
                if(res.data.data.length){
                    this.setData({
                        index:1
                    })
                }
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
            user_id:user_id
        })
        this.Get_childlist()
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