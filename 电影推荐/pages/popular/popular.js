var config = require('../../comm/script/config');
var douban = require('../../comm/script/fetch');
var app=getApp();
Page({
  data: {
    bannerList:config.bannerList,
    movies:[],
    showLoading:true,
    start:0,
    hasMore:true,

  },
  onLoad: function (options) {
    var that=this;
    wx.showLoading({
      title: '努力加载中',
      mask:true
    })
    wx.showNavigationBarLoading();
    app.getCity(function(){
      wx.hideNavigationBarLoading();
      wx.setNavigationBarTitle({
        title: '正在热映 - ' + config.city
      })
      douban.loadMovie.call(that,config.apiList.popular,that.data.start);
    })
   
  },
  onReachBottom: function () {
    var that=this;
    if(!that.data.showLoading){
      douban.loadMovie.call(that,config.apiList.popular,that.data.start);
    }
  },
  viewSearch:function(){
    wx.navigateTo({
      url: '../search/search',
    })
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
  filmsSummary:function(e){
    console.log(e);
    var movieId = e.currentTarget.id;
    wx.navigateTo({
      url: "../filmsDetail/filmsDetail?id="+movieId,
    })
  },
  filmsSummarybyTag:function(e){
    
    var movieType = e.currentTarget.dataset.text;
    wx.navigateTo({
      url: '../searchResultByTag/searchResultByTag?tag=' + movieType,
    })
  }

})