Component({
    /**
     * 组件的属性列表
     */
    properties: {
  
    },
  
    /**
     * 组件的初始数据
     */
    data: {
        selected: 0,
        color: "#7A7E83",
    selectedColor: "#FF1C6C",
        "list": [{
            "pagePath":"/pages/book/book",
            "text": "抽签",
            "iconPath": "/img/book.png",
            "selectedIconPath": "/img/book.png"
          },{
            "pagePath":"/pages/notice/notice",
            "text": "公告",
            "iconPath": "/img/announcement.png",
            "selectedIconPath": "/img/announcement.png"
          },{
            "pagePath":"/pages/my/my",
            "text": "我的",
            "iconPath": "/img/my.png",
            "selectedIconPath": "/img/my.png"
          }]
    },
  
    /**
     * 组件的方法列表
     */
    methods:{
        switchTab(e) {
            
            let that = this
            const idx = e.currentTarget.dataset.index
            const path = e.currentTarget.dataset.path
            // 跳转页面
            console.log(path)
            wx.switchTab({
               url: path,
            })
            that.setData({
              selected: idx
            })
          }
    }
    
  })