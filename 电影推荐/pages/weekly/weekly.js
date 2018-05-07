var config = require('../../comm/script/config');
var douban = require('../../comm/script/fetch');
var app = getApp();
Page({
  data: {
    movies: [],
    showLoading: true,
    start: 0,
    hasMore: false
  },
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '努力加载中',
      mask: true
    })
    douban.loadMovie.call(that, config.apiList.weekly, that.data.start);
  },

  onPullDownRefresh: function () {
    var that = this;
    that.setData({
      movies: [],
      hasMore: true,
      showLoading: true,
      start: 0
    })
    that.onLoad()
  },
  filmsSummary: function (e) {
    console.log(e);
    var movieId = e.currentTarget.id;
    wx.navigateTo({
      url: "../filmsDetail/filmsDetail?id=" + movieId,
    })
  },
})