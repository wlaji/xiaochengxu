var config = require("../../comm/script/config.js");
var douban = require("../../comm/script/fetch.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bannerList: config.bannerList,
    movies:[],
    weeklyMovies:[],
    usBoxMovies: [],
    newMovies: [],
    showLoading:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '努力加载中',
      mask: true
    })
    var that=this
    douban.loadTop.call(that, config.apiList.top);
    douban.loadWeekly.call(that,config.apiList.weekly);
    douban.loadusBox.call(that, config.apiList.us_box);
    douban.loadnewMovies.call(that, config.apiList.new_movies);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },
  filmsSummary: function (e) {
    var movieId = e.currentTarget.id;
    console.log(e.currentTarget.id);
    wx.navigateTo({
      url: "../filmsDetail/filmsDetail?id=" + movieId,
    })
  }
  
})