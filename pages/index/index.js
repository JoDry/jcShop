//index.js
//获取应用实例
const app = getApp()
var common = require('../../utils/common.js')
// console.log(common.host);

Page({
  data: {
    indicatorDots: false,
    autoplay: false,
    interval: 5000,
    duration: 1000
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {

    this.getBannerImgs();
    this.getNav();
    this.getShorts();
    
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse){
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  getUserInfo: function(e) {
    // console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getBannerImgs: function() {
    wx.request({
      url: common.host + 'api/ajax.ashx?action=banner_get',
      dataType: 'json',
      success: res => {
        if (res.data.success) {
          var resArr = res.data.res;
          var urls = [];
          for (var i in resArr) {
            var o = resArr[i];
            urls.push(common.host+o.url)
          }
          // console.log(urls);
          this.setData({
            banners: urls
          })
        }
      }
    })
  },
  getNav: function() {
    wx.request({
      url: common.host + 'api/ajax.ashx?action=type_get',
      dataType: 'json',
      success: res => {
        // console.log(res.data.res.length);
        if(res.data.success){
          this.setData({
            navs: res.data.res
          })
        }
      }
    })
  },
  getShorts: function() {
    wx.request({
      url: common.host + 'api/ajax.ashx?action=get_pro_list&page=1&num=30',
      dataType: 'json',
      success: res => {
        console.log(res);
        if (res.data.success) {
          this.setData({
            shorts: res.data.res
          })
        }
      }
    })
  }
})
