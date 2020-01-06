var app = getApp()
Page({
  data: {
    current: 0,
    travel: [],
  },
  onLoad: function (options) {
    var that = this
    that.setData({ current: options.id })
    wx.request({
      url: 'https://jwtravel.gesilaa6.club/index.php/index/caco/getTravelByStatus.html',
      data: { openId: app.globalData.openId, status: options.id },
      success: function (res) {
        that.setData({ travel: res.data.data })
      }
    })
  },
  onShow: function () {


  },
  onShareAppMessage: function () {

  },
  switchNav: function (e) {
    var that = this
    that.setData({ current: e.target.id })
    wx.request({
      url: 'https://jwtravel.gesilaa6.club/index.php/index/caco/getTravelByStatus.html',
      data: { openId: app.globalData.openId, status: e.target.id },
      success: function (res) {
        that.setData({ travel: res.data.data })
      }
    })
  }
})