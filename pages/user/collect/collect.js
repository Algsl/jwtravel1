var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    collect: [],//我收藏的旅游景区信息
    cnumber: 0,//收藏该景区的人数
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的收藏',
    })
  },
  onShow: function () {
    var that = this
    wx.request({
      url: 'https://jwtravel.gesilaa6.club/index.php/index/caco/getAllCollect.html',
      data: { openId: app.globalData.openId },
      success: function (res) {
        that.setData({ collect: res.data.data })
      }
    })
  },
  onShareAppMessage: function () {

  }
})