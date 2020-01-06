var app = getApp()
Page({

  data: {
    hasAddress: false,
    address: [],
    travel: [],
  },
  onLoad: function (options) {
    var that = this
    that.setData({ sum: options.sum })
    var array = options.array.split(',')
    for (var i = 0; i < array.length; i++) {
      const travel = 'travel[' + i + ']'
      wx.request({
        url: 'https://jwtravel.gesilaa6.club/index.php/index/caco/getOneFromCart.html',
        data: { openId: app.globalData.openId, travel_id: array[i],status:options.status },
        success: function (res) {
          that.setData({ [travel]: res.data.data })
        }
      })
    }
  },
  onShow: function () {

  },
  onShareAppMessage: function () {

  },
  chooseAdd: function () {
    var that = this
    wx.chooseAddress({
      success(res) {
        that.setData({ address: res, hasAddress: true })
      }
    })
  },
  pay: function () {
    var travel = this.data.travel
    var openId = app.globalData.openId
    for (var i = 0; i < travel.length; i++) {
      wx.request({
        url: 'https://jwtravel.gesilaa6.club/index.php/index/caco/changeStatus.html',
        data: { openId: app.globalData.openId, travel_id: travel[i].id, status: '1' },
        success: function (res) {

        }
      })
    }
    wx.switchTab({
      url: '../../user/user',
    })
  }
})