/*
备注
city: 城市（在程序载入时获取一次）
count: 返回结果数量
baiduAK: 百度地图AK
apiList: api列表
hotKeyword: 搜索页热门关键词关键词
hotTag: 搜索页热门类型
bannerList: 首页（热映页）轮播图列表列表
skinList: “我的”页面背景列表
shakeSound: 摇一摇音效地址（带url表示远程地址）
shakeWelcomeImg: 摇一摇欢迎图片
*/
var url = 'https://static.sesine.com/wechat-weapp-movie'
module.exports = {
  city: '',
  count: 20,
  baiduAK: 'oy11pDepQKEgbjrw3xACqsQPYNOf4X3w',
  apiList: {
    popular: 'https://douban.uieee.com/v2/movie/in_theaters',
    coming: 'https://douban.uieee.com/v2/movie/coming_soon',
    top: 'https://douban.uieee.com/v2/movie/top250',
    weekly: 'https://douban.uieee.com/v2/movie/weekly',
    us_box: 'https://douban.uieee.com/v2/movie/us_box',
    new_movies: 'https://douban.uieee.com/v2/movie/new_movies',
    search: {
      byKeyword: 'https://douban.uieee.com/v2/movie/search?q=',
      byTag: 'https://douban.uieee.com/v2/movie/search?tag='
    },
    filmDetail: 'https://douban.uieee.com/v2/movie/subject/',
    personDetail: 'https://douban.uieee.com/v2/movie/celebrity/',
    baiduMap: 'https://api.map.baidu.com/geocoder/v2/'
  },

  hotTag: ['唐人街探案2', '捉妖记2', '西游记女儿国', '战狼2','降临','小萝莉的猴神大叔','盗梦空间','肖申克的救赎','大话西游之月光宝盒','你的名字'],
  bannerList: [
    { type: 'film', id: '26683290', imgUrl: url + '/images/banner_1.jpg' },
    { type: 'film', id: '25793398', imgUrl: url + '/images/banner_2.jpg' },
    { type: 'film', id: '26630781', imgUrl: url + '/images/banner_3.jpg' },
    { type: 'film', id: '26415200', imgUrl: url + '/images/banner_4.jpg' },
    { type: 'film', id: '3025375', imgUrl: url + '/images/banner_5.jpg' }
  ],
  skinList: [
    { title: '公路', imgUrl: url + '/images/user_bg_1.jpg' },
    { title: '黑夜森林', imgUrl: url + '/images/user_bg_2.jpg' },
    { title: '鱼与水', imgUrl: url + '/images/user_bg_3.jpg' },
    { title: '山之剪影', imgUrl: url + '/images/user_bg_4.jpg' },
    { title: '火山', imgUrl: url + '/images/user_bg_5.jpg' },
    { title: '科技', imgUrl: url + '/images/user_bg_6.jpg' },
    { title: '沙漠', imgUrl: url + '/images/user_bg_7.jpg' },
    { title: '叶子', imgUrl: url + '/images/user_bg_8.jpg' },
    { title: '早餐', imgUrl: url + '/images/user_bg_9.jpg' },
    { title: '英伦骑车', imgUrl: url + '/images/user_bg_10.jpg' },
    { title: '草原', imgUrl: url + '/images/user_bg_11.jpg' },
    { title: '城市', imgUrl: url + '/images/user_bg_12.jpg' }
  ],
}