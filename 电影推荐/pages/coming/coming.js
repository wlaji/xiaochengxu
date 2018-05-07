var config = require('../../comm/script/config');
var douban = require('../../comm/script/fetch');
Page({
  data: {
    movies: [],
    start: 0,
    showLoading:true,
    hasMore:true
  },
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '正在加载中',
    })
    douban.filmsDetail.call(that,config.apiList.coming, that.data.start, config.count);
  },
  onPullDownRefresh: function () {
    this.setData({
      movies: [],
      hasMore: true,
      showLoading: true,
      start: 0
    })
    this.onLoad()
  },
  onReachBottom: function () {
    var that = this;
    if (!that.data.showLoading) {
      douban.filmsDetail.call(that, config.apiList.coming, that.data.start, config.count);
    }
  },
  filmsSummary: function (e) {
    var movieId = e.currentTarget.id;
    wx.navigateTo({
      url: "../filmsDetail/filmsDetail?id=" + movieId,
    })
  },

})