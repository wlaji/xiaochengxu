var config = require('../../comm/script/config');
var douban = require('../../comm/script/fetch');
Page({
  data: {
    collectionImg: "../../img/icon/icon-heart.svg",
    collection: "收藏",
    contained: false,
    star1: "",
    movie: {},
    text: "",
    line: 4,
    moreInfo: "../../img/icon/down.svg",
    showLoading: true,
    reviews: "",
    reviewsSplice: "",
    value: "加载全部",
    list:"",
  },
  onLoad: function (options) {
    var that = this;
    wx.showLoading({
      title: '努力加载中',
      mask: true
    })
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
  onShareAppMessage: function () {
    return {
      title: '电影推荐系统',
      path: '/pages/filmsDetail/filmsDetail'
    }
  },
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
          movie: subject,
          star1: star,
          text: subject.text,
          reviews: subject.popular_reviews,
          reviewsSplice: subject.popular_reviews.slice(0, 4),
          showLoading: false,
        })
        wx.setNavigationBarTitle({
          title: that.data.movie.title,
        })
        wx.hideLoading();
      }
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
  viewCastInfo: function (e) {
    var castId = e.currentTarget.id;
    wx.navigateTo({
      url: '../castsDetail/castsDetail?castId=' + castId,
    })
  },
  loadMore: function () {
    var reviews = this.data.reviews;
    var reviewsSplice = this.data.reviewsSplice;
    if (reviewsSplice.length == 4) {
      this.setData({
        reviewsSplice: reviews,
        reviews: reviewsSplice,
        value: "收起",
      })
    } else {
      this.setData({
        reviewsSplice: reviews,
        reviews: reviewsSplice,
        value: "加载全部",
      })
    }
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
      url: '../play/play?id='+this.data.movie.id,
    })
   
 
  }
})