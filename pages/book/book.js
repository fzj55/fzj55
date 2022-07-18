// pages/booking/booking.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        index:'',
        not:1,
        openplace_list : null,
        maxMember:'',//最大页码
        memberNum:'',
        tyindex:1,
        place_id:null,
        token:null,
        user_id:null,
        clickId:-1,
        noticeList_1:'',
    },
    pagesFn:function (e){
      let number = e.currentTarget.dataset.number;
      let _that = this;
        _that.setData({
          memberNum:number
        })
    },
    getNotice_1(){
      wx.request({
        url: 'https://test.wyu-pesystem.com/notice/urgent_port',
        method: 'GET',
        success:(res) =>
        {
          console.log(res)
          this.setData({
              noticeList_1:res.data.data.title + res.data.data.content
          })
        }
      })
      
  },
    onRefresh(){
      //在当前页面显示导航条加载动画
      wx.showNavigationBarLoading(); 
      //显示 loading 提示框。需主动调用 wx.hideLoading 才能关闭提示框
      wx.showLoading({
        title: '刷新中...',
        duration:1000,
      })
      this.getOpenPlace();
    },
    record_time: function (res) {
      console.log(res.currentTarget.dataset.text)
      this.getbook_num(res.currentTarget.dataset.text)
      if (this.data.clickId == res.currentTarget.id){
        this.setData({
          clickId: -1
        })
       return;
      }
      this.setData({
        send_timetable_id:res.currentTarget.dataset.text,
        clickId: res.currentTarget.id
      })
    },
    Draw(res){
      console.log(res.currentTarget.dataset.text)
        this.setData({
          place_id:res.currentTarget.dataset.text
        })
        if(!this.data.memberNum){
          this.setData({
            memberNum :4
          })
        }
        wx.request({
          url: `https://test.wyu-pesystem.com/order/joindraw_port?user_id=${this.data.user_id}`,
          method: 'POST',
          data:{
            place_id:this.data.place_id,
            book_num:this.data.memberNum,
        },
        header:{
            token:this.data.token
        },
          success:(res) =>{
            console.log(res)
            if(res.data.code != 0){
              wx.showToast({
                title: res.data.msg,
                duration:1000,
                icon:'error'
              })
            }else{
              wx.showToast({
                title: res.data.msg,
                duration:1000,
                icon:'success'
              })
            }
              
          }
      })
      
    },
    getOpenPlace(){
      wx.request({
        url: `https://test.wyu-pesystem.com/place/open_port`,
        method: 'GET',
        success:(res) =>
        {
          //console.log(res)
          if (!res.data.data){
            this.setData({
              not:0
            })
          }
          this.setData({
            openplace_list:res.data.data,
            memberNum:res.data.data[0].max_book_num,
            maxMember:res.data.data[0].max_book_num
          })
        }
      })
    },
    change_id(res){
      console.log(res.currentTarget.dataset.text)
      // wx.request({
      //   url: `http://175.178.206.114:5000/place/open_port`,
      //   method: 'GET',
      //   success:(res) =>
      //   {
      //     console.log(res)
      //     this.setData({
      //       memberNum:res.data.data[0].max_book_num
      //     })
      //   }
      // })
    },

    changehandle(e){
     // console.log(this.data.openplace_list[e.detail.current].max_book_num)
      if(!this.data.openplace_list[e.detail.current].max_book_num){
        this.setData({
          maxMember:'',
          memberNum:''
        })
        return
      }
      this.setData({
        maxMember:this.data.openplace_list[e.detail.current].max_book_num,
        memberNum:''
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
          selected: 0  // 数字是当前页面在tabbar的索引,如我的查询页索引是2，因此这边为2，同理首页就为0，消息中心页面为1
        })
      }

      let token=wx.getStorageSync('token');
      let user_id=wx.getStorageSync('user_id');
      this.setData({
        token:token,
        user_id:user_id,
        index:0
      })
      this.getOpenPlace()
      this.getNotice_1()
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