// pages/newsDetail/newsDetail.js
import { request } from "../../utils/util.js"
import { urlList } from "../../asset/urlList.js"
const WxParse = require('../../wxParse/wxParse.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { id } = options
    this.getActivityDetail(id)
  },

  getActivityDetail(id) {
    wx.showLoading({
      title: '加载中',
    })
    request('POST', urlList.newsDetail, { id: id }, app.globalData.openId, this.getActivityDetailSuccess)
  },
  getActivityDetailSuccess(res) {
    const that = this
    WxParse.wxParse('article', 'html', res.data.data.detail.content, that, 5)
    wx.hideLoading()
    this.setData({
      detail: res.data.data.detail,
    })
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

  }
})