var config=require("./config.js")
function loadMovie(url,start,count) {
  var that = this;
  wx.request({
    url:url, 
    data: {
      city: config.city,
      start: start,
      count:config.count
    },
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      var subjects = res.data.subjects;
      if (subjects.length === 0) {
        that.setData({
          hasMore: false,
        })
      } else {
        that.setData({
          movies: that.data.movies.concat(subjects),
          start: that.data.start +subjects.length,
          showLoading: false,
        })
      }
      wx.hideLoading();
      wx.stopPullDownRefresh();
    }
  })

}
function filmsDetail(url, start, count,cb) {
  var that = this;
  wx.request({
    url: url,
    data: {
      start: start,
      count: count
    },
    header: {
      "Content-Type": "json"
    },
    success: function (res) {
      var subjects = res.data.subjects;
      if (subjects.length === 0) {
        that.setData({
          hasMore: false
        })
      } else {
        processSubjects(subjects);
        that.setData({
          movies: that.data.movies.concat(subjects),
          start: that.data.start + subjects.length,
          showLoading: false,
        })
        wx.hideLoading();
        wx.stopPullDownRefresh();
      }
      typeof cb == 'function' && cb(res.data)

    }
  })
}
function processSubjects(subjects) {
  for (let subject of subjects) {
    processSubject(subject);
  }
}
function processSubject(subject) {
  var title = subject.title;
  var directors = subject.directors;
  var director = "";
  for (let i in directors) {
    director = director + directors[i].name + "/";
  }
  if (director != "") {
    director = director.substring(0, director.length - 1)
  }

  var casts = subject.casts;
  var cast = "";
  for (let i in casts) {
    cast = cast + casts[i].name + "/";
  }
  if (cast != "") {
    cast = cast.substring(0, cast.length - 1)
  }

  var genres = subject.genres;
  var genre = "";
  for (let i in genres) {
    genre = genre + genres[i] + "/";
  }
  if (genre != "") {
    genre = genre.substring(0, genre.length - 1)
  }
  var year = subject.year;
  var text = "名称:" + title + "\n导演:" + director + "\n主演:" + cast + "\n类型:" + genre + "\n上映时间:" + year;
  subject.text = text;
  subject.director = director;
  subject.cast = cast;
  subject.genre = genre;
}
function loadTop(url) {
  var that = this;
  wx.request({
    url:url, //仅为示例，并非真实的接口地址
    data: {
      city: config.city,
      start: 0,
      count: 8,
    },
    header: {
      "Content-Type": "json"// 默认值
    },
    success: function (res) {
      var subjects = res.data.subjects;
      console.log(subjects)
      that.setData({
        movies: subjects
      })
    }
  })
}
function loadWeekly(url) {
  var that = this;
  wx.request({
    url: url, //仅为示例，并非真实的接口地址
    header: {
      "Content-Type": "json" // 默认值
    },
    success: function (res) {
      var subjects = res.data.subjects;
      console.log(subjects)
      that.setData({
        weeklyMovies: subjects
      })
      
    }
  })
}
function loadusBox(url) {
  var that = this;
  wx.request({
    url: url, //仅为示例，并非真实的接口地址

    header: {
      "Content-Type": "json"// 默认值
    },
    success: function (res) {
      var subjects = res.data.subjects;
      that.setData({
        usBoxMovies: subjects
      })
    
    }
  })
}
function loadnewMovies(url) {
  var that = this;
  wx.request({
    url: url, //仅为示例，并非真实的接口地址

    header: {
      "Content-Type": "json"// 默认值
    },
    success: function (res) {
      var subjects = res.data.subjects;
      that.setData({
        newMovies: subjects,
        showLoading:false,
      })
      wx.hideLoading()
    }
  })
}

module.exports={
  loadMovie:loadMovie,
  filmsDetail:filmsDetail,
  processSubject: processSubject,
  loadTop:loadTop,
  loadWeekly: loadWeekly,
  loadusBox: loadusBox,
  loadnewMovies: loadnewMovies

}