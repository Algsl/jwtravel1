//3440599524@qq.com
App({
  onLaunch: function () {
    var that=this

    // 登录
    wx.login({
      success: function (res) {
        wx.request({
          url: 'https://jwtravel.gesilaa6.club/index.php/index/message/getOpenId.html',
          data: { code: res.code },
          success: function (res) {
            that.globalData.openId = res.data.data.openid
            that.globalData.session_key = res.data.data.session_key
          }
        })
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    openId:null,
    userInfo: null
  }
})