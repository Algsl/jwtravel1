var app = getApp()
Page({
  data: {
    scart: [],//购物车商品
    sum: 0,//总价个
    cnumber: 0,//点击次数,
    array: [],//景区id
    isDelete: false,
  },
  onLoad: function (options) {
    //设置标题背景
    wx.setNavigationBarTitle({
      title: '购物车',
    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: '#ffffff',
    })
  },
  onShow: function () {
    //后台获取购物车内商品
    var that = this
    wx.request({
      url: 'https://jwtravel.gesilaa6.club/index.php/index/caco/getAllFromCart.html',
      data: { openId: app.globalData.openId },
      success: function (res) {
        that.setData({ scart: res.data.data })
      }
    })
  },
  onShareAppMessage: function () {

  },
  //单选函数
  checkbox: function (e) {
    //循环获取购物车商品价格并修改总价
    var that = this
    var sum = 0
    var array = new Array()
    for (var i = 0; i < e.detail.value.length; i++) {
      array[i] = e.detail.value[i]
      wx.request({
        url: 'https://jwtravel.gesilaa6.club/index.php/index/caco/getOneFromCart.html',
        data: { openId: app.globalData.openId, travel_id: e.detail.value[i] },
        success: function (res) {
          //计算总价
          sum += parseFloat(res.data.data.price * res.data.data.quantity)
          that.setData({ sum: sum })
        }
      })
      that.setData({ array: array })
    }
    that.setData({ sum: 0 })
  },
  //全选函数
  all: function (e) {
    var that = this
    var cnumber = this.data.cnumber
    var sum = 0
    var array = new Array()
    for (var i = 0; i < this.data.scart.length; i++) {
      array[i] = this.data.scart[i].id
      //计算总价
      sum += parseInt(this.data.scart[i].price * this.data.scart[i].quantity)
      //根据点击次数修改复选框样式和总价
      if (cnumber % 2 == 0) {//全选
        that.setData({ cchoose: true, sum: sum, array: array })
      } else {//全部选
        that.setData({ cchoose: false, sum: 0, array: null })
      }
    }
    cnumber++
    that.setData({ cnumber: cnumber })
  },
  //结算按钮事件处理
  compute: function () {
    var that = this
    wx.navigateTo({
      url: '../scart/calculate/calculate?sum=' + this.data.sum + '&array=' + this.data.array+'&status=-1',
    })
    that.setData({ sum: 0 })
  },
  edit: function () {
    var that = this
    that.setData({ isDelete: !this.data.isDelete })

  },
  delete: function () {
    var that = this
    for (var i = 0; i < this.data.array.length; i++) {
      wx.request({
        url: 'https://jwtravel.gesilaa6.club/index.php/index/caco/delCollect.html',
        data: { openId: app.globalData.openId, type: 0, travel_id: this.data.array[i] },
        success: function () {
          that.setData({ cchoose: false, sum: 0 })
          that.onShow()
        }
      })
    }

  }
})