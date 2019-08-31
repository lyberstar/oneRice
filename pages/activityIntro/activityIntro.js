import { request } from "../../utils/util.js"
import { urlList } from "../../asset/urlList.js"
const WxParse = require('../../wxParse/wxParse.js');
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: {},
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { communityId } = options
    this.getActivityDetail(communityId)
  },
  getActivityDetail(communityId) {
    request('POST', urlList.getActivityDetail, { id: communityId }, app.globalData.openId, this.getActivityDetailSuccess)
  },
  getActivityDetailSuccess(res) {
    const that = this
    WxParse.wxParse('article', 'html', res.data.result.content, that, 5)

    this.setData({
      detail: res.data.result,
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