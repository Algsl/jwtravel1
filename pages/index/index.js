var app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //顶部轮播图图片
    images: [
      'https://jwtravel.gesilaa6.club/travel/sp.png',
      'https://jwtravel.gesilaa6.club/travel/sp.png',
      'https://jwtravel.gesilaa6.club/travel/sp.png'
    ],
    //轮播图下方的5个导航图片和文字
    content1: [
      { id: 1, img: 'https://jwtravel.gesilaa6.club/travel/i1.png', txt: '行程列表' },
      { id: 2, img: 'https://jwtravel.gesilaa6.club/travel/i4.png', txt: '服务中心' },
      { id: 3, img: 'https://jwtravel.gesilaa6.club/travel/i5.png', txt: '关于我们' },
    ],
    //后台获取自驾游的旅游景区信息
    content2: [],
    //后台获取周边游的旅游景区信息
    content3: [],
    //设置滚动区域高度
    sHeight: 0,
    array: [],
  },
  impower: function () {

  },
  onLoad: function (options) {
    var that = this
    //获取系统信息--屏幕高度
    wx.getSystemInfo({
      success: function (res) {
        that.setData({ sHeight: res.screenHeight - 70 })
      },
    })
    //通过类型（自驾游）获取旅游景区信息
    wx.request({
      url: 'https://jwtravel.gesilaa6.club/index.php/index/travel/getTravelByType.html',
      data: { type: 0 },
      success: function (res) {
        that.setData({ content2: res.data.data })
      }
    })
    //通过类型（周边游）获取旅游景区信息
    wx.request({
      url: 'https://jwtravel.gesilaa6.club/index.php/index/travel/getTravelByType.html',
      data: { type: 1 },
      success: function (res) {
        that.setData({ content3: res.data.data })
      }
    })
    //设置头部导航标题
    wx.setNavigationBarTitle({
      title: '精卫旅游',
    })
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
})