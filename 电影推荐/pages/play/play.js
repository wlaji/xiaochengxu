var config = require('../../comm/script/config');
var douban = require('../../comm/script/fetch');
Page({
  data: {
    list:'http://localhost:8000/mp4/1.mp4',
    movie:"",
    collectionImg: "../../img/icon/icon-heart.svg",
    collection: "收藏",
    contained: false,
    line: 4,
    moreInfo: "../../img/icon/down.svg",
  },
  onLoad: function (options) {
    var that = this;
    this.loadMovieDetail(options.id);
    var contained = this.contained(options.id);
    if (contained) {
      that.setData({
        collectionImg: "../../img/icon/heart.svg",
        collection: "已收藏",
        contained: true,
      })
    }
  },
  loadMovieDetail: function (movieId) {
    var that = this;
    wx.request({
      url: config.apiList.filmDetail + movieId,
      header: {
        'content-type': 'json'
      },
      success: function (res) {
        var subject = res.data;
        that.setData({
          movie: subject,
        })
        wx.setNavigationBarTitle({
          title: that.data.movie.title,
        })
      }
    })
  },
  collection: function () {
    var collectionId = wx.getStorageSync('collectionId') || [];
    var id = this.data.movie.id;
    var contained = this.data.contained;
    if (!contained) {
      collectionId.unshift(id);
      wx.setStorageSync('collectionId', collectionId);
      this.setData({
        collection: "已收藏",
        collectionImg: "../../img/icon/heart.svg",
        contained: true,
      })
    } else {
      for (var i = 0, len = collectionId.length; i < len; i++) {
        if (collectionId[i] == id) {
          collectionId.splice(i, 1)
        }
      }
      wx.setStorageSync('collectionId', collectionId);
      this.setData({
        collection: "收藏",
        collectionImg: "../../img/icon/icon-heart.svg",
        contained: false,
      })
    }


  },
  contained: function (movieId) {
    var collectionId = wx.getStorageSync('collectionId') || [];
    for (let i = 0, len = collectionId.length; i < len; i++) {
      if (movieId === collectionId[i]) {
        return true;
      }
    }
  },
  view: function () {
    wx.navigateTo({
      url: '../play/play?id=' + this.data.movie.id,
    })


  },
  moreInfo: function () {
    if (this.data.line == 4) {
      this.setData({
        line: 20,
        moreInfo: "../../img/icon/up.svg"
      })
    } else {
      this.setData({
        line: 4,
        moreInfo: "../../img/icon/down.svg"
      })
    }

  },
  
})