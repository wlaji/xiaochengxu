var config = require('../../comm/script/config');
var douban = require('../../comm/script/fetch');
Page({
  data: {
    movies: [],
    start: 0,
    showLoading: true,
    hasMore:false,
    isNull:false,
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var movieName=options.q;
    var that = this;
    wx.showLoading({
      title: '正在加载中',
    })
    douban.filmsDetail.call(that, config.apiList.search.byKeyword + movieName, that.data.start, config.count,function(data){
      console.log(data);
      if(data.subjects.length==0){
        that.setData({
          isNull:true,
          showLoading:false,
        })
        wx.hideLoading();
      }
    });
    //douban.loadMovie.call(that, config.apiList.coming, that.data.start);

  },
  filmsSummary: function (e) {
    var movieId = e.currentTarget.id;
    wx.navigateTo({
      url: "../filmsDetail/filmsDetail?id=" + movieId,
    })
  },

})