var app = getApp()
Page({
  data: {
    current: 0,
    travel: [],
  },
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '我的卡券',
    })
  },
  onShow: function () {


  },
  onShareAppMessage: function () {

  },
  switchNav: function (e) {
    var that = this
    that.setData({ current: e.target.id })
  }
})