// pages/index/more/more.js
Page({
  data: {
    //SwitchTab的标识位，包含综合、最新、价格、销量
    sindex: 0,
    //后台获取自驾游/周边游所有旅游景区的信息
    lists: [],
    //类型id：自驾游、周边游有
    tid: 0,
  },
  onLoad: function (options) {
    var that = this
    //后台获取旅游景区信息（默认综合排序）
    wx.request({
      url: 'https://jwtravel.gesilaa6.club/index.php/index/travel/travelSort.html',
      data: { type: options.id, sindex: 0 },
      success: function (res) {
        that.setData({ lists: res.data.data })
      }
    })
    //获取旅游类型：自驾游、周边游
    that.setData({ tid: options.id })

    if (that.data.tid == 0) {
      wx.setNavigationBarTitle({
        title: '自驾游',
      })
    } else {
      wx.setNavigationBarTitle({
        title: '周边游',
      })
    }

    //设置头部导航字体颜色及背景颜色
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
    })
  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  },
  switch: function (e) {
    var that = this
    that.setData({ sindex: e.target.id })
    //后台获取旅游景区信息并根据switchTab进行排序
    wx.request({
      url: 'https://jwtravel.gesilaa6.club/index.php/index/travel/travelSort.html',
      data: { type: that.data.tid, sindex: e.target.id },
      success: function (res) {
        that.setData({ lists: res.data.data })
      }
    })
  }
})