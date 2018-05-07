var config = require('../../comm/script/config');
Page({
  data: {
    inputValue: "",
    searchData: [],
    show: 'none',
    showDelete:'none',
    value: "",
    focus: true,
    hot: config.hotTag,
    tags: ["动作", "喜剧", "热血", "爱情", "犯罪", "枪战", "动画", "恐怖", "科幻", "青春", "其他"]

  },
  onLoad: function (options) {
    var that = this;
    var searchData = wx.getStorageSync('searchData') || [];
    this.setData({
      searchData: searchData,
    })
    if(searchData.length!=0){
      that.setData({
        showDelete:"block"
      })
    }
  },
  onShow: function () {
    var searchData = wx.getStorageSync('searchData') || [];
    this.setData({
      searchData: searchData,
    })

  },
  searchNameInput: function (e) {
    var that = this;
    this.setData({
      inputValue: e.detail.value,
      value: e.detail.value
    })
    if (this.data.value != "") {
      that.setData({
        show: 'block',
      })

    }
  },
  search: function () {
    var that = this;
    if (this.data.inputValue != "") {
      var inputValue = that.data.inputValue
      var searchData = wx.getStorageSync('searchData') || [];
      function contains(){
        for (let i = 0, len = searchData.length; i < len; i++) {
          if (that.data.inputValue === searchData[i]) {
            return true;
          } 
        }
      }
      wx.redirectTo({
        url: '../searchResult/searchResult?q='+inputValue,
      })
      if (!contains()){
        searchData.unshift(this.data.inputValue);
        wx.setStorageSync('searchData', searchData);
        that.setData({
          showDelete: "block"
        })
        if (searchData.length > 10) {
          searchData.splice(10, searchData.length);
          wx.setStorageSync('searchData', searchData);
        }
      }
      if (searchData.length == 0) {
        searchData.unshift(this.data.inputValue);
        wx.setStorageSync('searchData', searchData);
      }
      
    } else {
      wx.showToast({
        title: '搜索内容是空的',
        image: '../../img/icon/nocentent.svg',
        duration: 1000,
        mask:true
      })
    }
  },
  deleteHistory: function () {
    var that = this;
    wx.showModal({
      title: '提示',
      content: '是否删除历史记录',
      success: function (res) {
        if (res.confirm) {
          wx.setStorageSync('searchData', []);
          var searchData = wx.getStorageSync('searchData') || [];
          that.setData({
            searchData: searchData,
            showDelete:"none",
          })
        }
      }
    })
    
  },
  cancel: function () {
    wx.switchTab({
      url: '../../pages/popular/popular'
    })
  },
  deleteValue: function () {
    var that = this;
    this.setData({
      inputValue: "",
      value: "",
    })
    if (this.data.value == "") {
      that.setData({
        show: 'none',
      })
    }

  },
  searchBytext:function(e){
    var textValue=e.currentTarget.dataset.text;
    wx.redirectTo({
      url: '../searchResult/searchResult?q=' + textValue,
    })
  },
  filmsSummarybyTag: function (e) {
    var movieType = e.currentTarget.dataset.text;
    wx.redirectTo({
      url: '../searchResultByTag/searchResultByTag?tag=' + movieType,
    })
  }
})