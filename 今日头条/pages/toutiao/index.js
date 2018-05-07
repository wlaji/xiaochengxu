var app = getApp()
Page({
  //生命周期
  onLoad: function () {
    this.resetData();
    this.loading();
    this.getTypeData(app.page);
  },
  onShow: function (e) {
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          windowHeight: res.windowHeight,
          windowWidth: res.windowWidth
        })
      }
    })
  },
  //变量
  data: {
    title: [],
    imgUrls: [],
    author: [],
    date: [],
    url: [],
    requestUrl: 'top',
    cssActive: 0,
    dataId: 0,
    windowHeight: '',
    windowWidth: '',
    page: 0,
    data:"",
  },
  //下拉刷新
  pullDownRefresh: function (e) {
    this.onLoad();
  },
  //上拉加载
  pullUpLoad: function (e) {
    app.page += 5;
    this.setData({
      page: app.page
    })
    console.log(TAG + ' | 上拉加载' + app.page);
    this.loading();
    this.getTypeData(app.page);
  },
  //点击TAB
  check: function (e) {
    app.cssActive = e.target.dataset.id
    app.requestUrl = e.target.id;
    this.resetData();
    this.setData({
      dataId: app.cssActive,
      title: app.title,
      imgUrls: app.imgUrls,
      author: app.author,
      date: app.date,
      url: app.url,
      requestUrl: app.requestUrl,
      page: app.page
    })
    this.loading();
    this.getTypeData(app.page);
  },
  getTypeData: function (page) {
    wx.request({
      url: 'https://v.juhe.cn/toutiao/index?key=d6a57d6ad7ee803aaea9f25390c6f011&type=',
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: (res) => {
        var data = res.data.result.data;
        for (var i = page; i < page + 5; i++) {
          app.title.push(data[i].title);
          app.imgUrls.push(data[i].thumbnail_pic_s);
          app.author.push(data[i].author_name);
          app.date.push(data[i].date);
          app.url.push(data[i].url);
        }
        this.setData({
          title: app.title,
          imgUrls: app.imgUrls,
          author: app.author,
          date: app.date,
          url: app.url,
          page: app.page,
          data:data,
        })
      },
      fail: function () {
      },
      complete: function () {
        wx.hideToast();
      }
    })
  },
  resetData: function () {
    app.title = [];
    app.imgUrls = [];
    app.author = [];
    app.date = [];
    app.url = [];
    app.page = 0;
  },
  loading: function () {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 10000
    })
  },
  // 方法声明
  detail:function(e){
    getApp().detail(e);
  }
})