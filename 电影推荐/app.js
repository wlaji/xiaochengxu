//app.js
var config = require("comm/script/config");
App({
  getCity: function (cb) {
    var that = this
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var locationParam = res.latitude + ',' + res.longitude + '1';
        wx.request({
          url: config.apiList.baiduMap,
          data: {
            ak: config.baiduAK,
            location: locationParam,
            output: 'json',
            pois: '1'
          },
          method: 'GET',
          success: function (res) {
            console.log(res);
            config.city = res.data.result.addressComponent.city.slice(0, -1)
            typeof cb == "function" && cb(res.data.result.addressComponent.city.slice(0, -1))
          },
          fail: function (res){
            that.getCity();
          }
        })
      }
    })
  },
  
})