var config = require('../../comm/script/config');
var douban = require('../../comm/script/fetch');
Page({
  data: {
    collectedImg: "../../img/icon/heart.svg",
    collected: "",
    star1: "",
    movie: [],
    text: "",
    showLoading: true,
    url: config.skinList[7].imgUrl,
  },
  onLoad: function () {
    var that = this;
    wx.showLoading({
      title: '努力加载中',
      mask: true
    })
    var collected = wx.getStorageSync('collectionId') || [];
    this.setData({
      collected: collected.length,
    })
    if (collected.length!=0){
      for (var i = 0, len = collected.length; i < len; i++) {
        that.loadMovieDetail(collected[i]);
      }
    }else{
      this.setData({
        showLoading:false,
      })
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }
   
  },
  // onShow:function(){
  //   this.onPullDownRefresh();
  // },
  loadMovieDetail: function (movieId) {
    var that = this;
    wx.request({
      url: config.apiList.filmDetail + movieId,
      header: {
        'content-type': 'json' // 默认值
      },
      success: function (res) {
        var subject = res.data;
        try {
          var star = Math.round(subject.rating.average);
        }
        catch (err) {
        }
        douban.processSubject(subject);
        that.setData({
          movie: that.data.movie.concat(subject),
          star1: star,
          text: subject.text,
          showLoading: false,
        })
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }
    })
  },
  onPullDownRefresh: function () {
    this.setData({
      collected: "",
      star1: "",
      movie: [],
      text: "",
      showLoading: true,
      url: config.skinList[7].imgUrl,
    })
    this.onLoad()
  },
  filmsSummary: function (e) {
    var movieId = e.currentTarget.id;
    wx.navigateTo({
      url: "../filmsDetail/filmsDetail?id=" + movieId,
    })
  },
  filmsSummarybyTag: function (e) {
    var movieType = e.currentTarget.dataset.text;
    wx.navigateTo({
      url: '../searchResultByTag/searchResultByTag?tag=' + movieType,
    })
  },
  cancelCollected:function(e){
    var collectionId=wx.getStorageSync("collectionId")||[];
    var id = e.currentTarget.id;
    for (var i = 0, len = collectionId.length; i < len; i++) {
      if (collectionId[i] == id) {
        collectionId.splice(i, 1)
      }
    }
    wx.setStorageSync('collectionId', collectionId);
    this.onPullDownRefresh();
  }



})