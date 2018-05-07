const app = getApp()
Page({
  data: {
    defaultSize: 'default',
    plain: true,
  },

  click:function(){
    wx.navigateTo({
      url: '../logs/logs',
    })
  }


})
