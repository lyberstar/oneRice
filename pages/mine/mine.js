// pages/mine/mine.js
import { IMG_LIST } from "../../asset/imgList.js"
import { request } from "../../utils/util.js"
import { urlList } from "../../asset/urlList.js"
const app = getApp()
Page({
  data: {
    userInfo: {},
    IMG_LIST,
  },
  onShow: function (options) {
    this.getUserInfo()
  },
  getUserInfo() {
    request('GET', urlList.getUserInfo, {}, app.globalData.openId, this.getUserInfoSuccess, this.getUserInfoFail)
  },
  getUserInfoSuccess(res) {
    let userInfo = res.data.result
    let newSteps = (userInfo.steps / 1000).toFixed(1)
    userInfo.newSteps = newSteps
    this.setData({
      userInfo,
    })
  },
  getUserInfoFail() {

  },
  clickMyStep() {
    const { userInfo } = this.data
    wx.navigateTo({
      url: '../mySteps/mySteps?newSteps=' + userInfo.newSteps + '&days=' + userInfo.days,
    })
  },
  clickRule() {
    wx.navigateTo({
      url: '../about/about',
    })
  }, 
  clickPrize() {
    wx.navigateTo({
      url: '../prize/prize',
    })
  }, 
})