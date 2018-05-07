var app=getApp()
var WxParse = require('../../wxParse/wxParse.js');
Page({
  data: {
    content:"",
  },
  onLoad: function (options) {
    console.log(options.id);
    var that = this;
    wx.request({
      url: 'https://v.juhe.cn/toutiao/index?key=d6a57d6ad7ee803aaea9f25390c6f011',
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {   
        var url=res.data.result.data[1].url;
        console.log(url);
        wx.request({
          url: url, //仅为示例，并非真实的接口地址
          header: {
            'content-type': 'json' // 默认值
          },
          success: function (res) {
            var content = res.data.substring(16)
            var start=content.indexOf("<title>");
            var end=content.lastIndexOf("</title>")+8;
            var a=content.substring(start,end);
            content=content.replace(a,"");
            console.log(a);
            console.log(start);
            console.log(end);
            console.log(content);
            var content=WxParse.wxParse('content', 'html', content, that, 5);
            that.setData({
            content:content,
        })
          }
        })
        
        
      }
    })
   
  }
})


