var config = require('../../comm/script/config');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cast:[],
    works:[],
    showLoading:true,
    sum1:"",
    sum2:"",
    more:"查看更多>",
    profession:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title: '努力加载中',
    })
    console.log(options.castId);
    var castId = options.castId;
    this.loadCastDetail(castId);
  },
  loadCastDetail:function(castId){
    var that=this;
    wx.request({
      url: config.apiList.personDetail+castId, //仅为示例，并非真实的接口地址
      header: {
        'content-type': 'json' // 默认值
      },
      success: function (res) {
        console.log(res.data)
        that.processInfo(res.data);
        that.setData({
          cast:res.data,
          works:res.data.works,
          showLoading:false,
        })
        wx.setNavigationBarTitle({
          title: that.data.cast.name,
        })
        wx.hideLoading();
      }
    })
  },
  processInfo:function(data){
    var professions = data.professions
    var profession=""
    for (let i in professions){
      profession = profession + professions[i]+"/";
    }
    console.log(profession)
    if (profession!=""){
      var profession = profession.substring(0, profession.length - 1);
    }
    
    var text=data.summary;
    var sum=this.removeAllSpace(text);
    var sumSubstring=sum.substring(0,100).concat("...");
    this.setData({
      sum1: sum,
      sum2: sumSubstring,
      profession: profession,
    })
    
    
  },
  removeAllSpace:function(str){
    return str.replace(/\s+/g, "");
  },
  filmsSummary: function (e) {
    var movieId = e.currentTarget.id;
    console.log(e.currentTarget.id);
    wx.navigateTo({
      url: "../filmsDetail/filmsDetail?id=" + movieId,
    })
  },
  viewMore:function(){
    let sum1=this.data.sum1;
    let sum2 = this.data.sum2;
    if(this.data.more=="查看更多>"){
      this.setData({
        sum2: sum1,
        sum1:sum2,
        more: "<收起"
      })
    }else{
      this.setData({
        sum2: sum1,
        sum1:sum2,
        more: "查看更多>"
      })
    }
  }
})