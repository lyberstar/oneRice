// pages/newsList/newsList.js
import { IMG_LIST } from "../../asset/imgList.js"
import { request, getAreaName } from "../../utils/util.js"
import { urlList } from "../../asset/urlList.js"
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    canLoad:true,
    rankList: [],
    page: 1,
    totalPage: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.initData()
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

  initData() {
    let that = this;
    let { page, rankList, nomore } = that.data
    let data = {
      page: page
    }
    if (!nomore) {
      wx.showLoading({
        title: '加载中',
      })
      request('POST', urlList.newsList, data, app.globalData.openId, this.getPersonRankSuccess, this.getPersonRankFail)
    }else{
      console.log('没数据了')
      wx.hideLoading()
      return false
    }
  },

  getPersonRankSuccess(res) {
    let that = this
    wx.hideLoading()
    let { page, rankList } = that.data
    if (res.data.pageCount == page) {
      that.setData({
        nomore:true
      })
    }
    rankList = rankList.concat(res.data.data.list)
    that.setData({
      rankList:rankList,
      page:page + 1,
      totalPage:res.data.data.pageCount
    })
    console.log(that.data.rankList)
  },

  turnNews(e){
    let that = this
    let id = e.currentTarget.dataset.id
    wx.navigateTo({
      url:'/pages/newsDetail/newsDetail?id=' + id
    })
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