// pages/partList/partList.js
import { PART_LIST } from "../../asset/partList.js"

Page({

  /**
   * 页面的初始数据
   */
  data: {
    PART_LIST,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  choosePart(e) {
    const { item } = e.currentTarget.dataset
    wx.setStorage(
      {
        key: 'partItem',
        data: JSON.stringify(item),
        success: () => {
          wx.navigateBack()
        }
      }
    )
    console.log('partItem:',JSON.parse(wx.getStorageSync('partItem')))
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