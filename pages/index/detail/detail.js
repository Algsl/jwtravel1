var app = getApp()
Page({
  data: {
    //商品详情，用图片显示
    imgs: [
      { img: 'https://jwtravel.gesilaa6.club/travel/c1.png' },
      { img: 'https://jwtravel.gesilaa6.club/travel/c1.png' },
      { img: 'https://jwtravel.gesilaa6.club/travel/c1.png' },
      { img: 'https://jwtravel.gesilaa6.club/travel/c1.png' }
    ],
    //商品详情和评价切换的索引
    current: 0,
    //是否添加收藏
    iscollect: true,
    //后台获取某个旅游的详细信息
    travelDetail: [],
    travelId: 0,
    bar: 0,//评价的索引
  },
  onLoad: function (options) {
    var that = this
    that.setData({ travelId: options.id })
    //通过首页点击的id查找某个旅游信息
    wx.request({
      url: 'https://jwtravel.gesilaa6.club/index.php/index/travel/getTravelDetail.html',
      data: { id: options.id },
      success: function (res) {
        wx.setNavigationBarTitle({
          title: res.data.data.title,
        })
        that.setData({ travelDetail: res.data.data })
        console.log()
      }
    })
    wx.request({
      url: 'https://jwtravel.gesilaa6.club/index.php/index/caco/getIsCollect.html',
      data: { openId: app.globalData.openId, type: 1, travel_id: this.data.travelId },
      success: function (res) {
        that.setData({ iscollect: res.data.data })
      }
    })

  },
  onShow: function () {

  },
  //商品详情和评价切换函数
  switchN: function (e) {
    var that = this
    that.setData({ current: e.target.dataset.current })
  },
  //评价切换函数
  switchB: function (e) {
    var that = this
    that.setData({ bar: e.target.dataset.current })
  },

  onShareAppMessage: function () {

  },
  //跳转到首页的函数
  back: function () {
    wx.switchTab({
      url: '../../index/index'
    })
  },
  //是否收藏函数
  collect: function () {
    var that = this
    if (that.data.iscollect) {
      wx.request({
        url: 'https://jwtravel.gesilaa6.club/index.php/index/caco/delCollect.html',
        data: { openId: app.globalData.openId, type: 1, travel_id: this.data.travelId },
        success: function (res) {
          that.setData({ iscollect: false })
        }
      })
    } else {
      wx.request({
        url: 'https://jwtravel.gesilaa6.club/index.php/index/caco/addCaco.html',
        data: { openId: app.globalData.openId, type: 1, travel_id: that.data.travelId },
        success: function (res) {
          that.setData({ iscollect: true })
        }
      })
    }
  },
  addCar: function () {
    var that = this
    wx.request({
      url: 'https://jwtravel.gesilaa6.club/index.php/index/caco/addCaco.html',
      data: { openId: app.globalData.openId, type: 0, travel_id: that.data.travelId },
      success: function (res) {
        wx.showToast({
          title: '添加购物车成功',

        })
      }
    })
  },
  buy: function () {
    var that = this
    wx.request({
      url: 'https://jwtravel.gesilaa6.club/index.php/index/caco/addCaco.html',
      data: { openId: app.globalData.openId, type: 0, travel_id: that.data.travelId },
      success: function (res) {
        wx.request({
          url: 'https://jwtravel.gesilaa6.club/index.php/index/caco/changeStatus.html',
          data: { openId: app.globalData.openId, travel_id: that.data.travelId, status: '0' },
          success: function (res) {

          }
        })
      }
    })
    wx.navigateTo({
      url: '../../scart/calculate/calculate?sum=' + that.data.travelDetail.price + '&array=' + that.data.travelId+'&status=0',
    })
  }
})