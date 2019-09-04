// pages/taskList/taskList.js
import { IMG_LIST } from "../../asset/imgList.js"
import { request, getAreaName } from "../../utils/util.js"
import { urlList } from "../../asset/urlList.js"
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemData:[
      {'name':'第一户','id':'1'},
      {'name':'第二户','id':'2'},
      {'name':'第三户','id':'3'},
      {'name':'第四户','id':'4'},
      {'name':'第五户','id':'5'},
      {'name':'第六户','id':'6'},
      {'name':'第七户','id':'7'},
      {'name':'第八户','id':'8'},
      {'name':'第九户','id':'9'}
    ],
    next_index:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    this.getUserStatus()
  },

  //获取用户状态
  getUserStatus(){
    request('POST', urlList.getUserStatus, {}, app.globalData.openId, this.getUserStatusSuccess, this.getUserStatusFail)
  },

  getUserStatusSuccess(res){
    let that = this
    let data = res.data.result
    that.setData({
      next_index:data.next_index
    })
  },

  getUserStatusFail() {

  },

  station:function(e){
    let that = this;
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url:'/pages/taskDetail/taskDetail?id=' + id
    })
  },

  goDetail(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/taskDetail/taskDetail?id=' + id + '&getDetail=1'
    })
  },

  //提交
  submit:function(){
    wx.showLoading({
      title: '提交中'
    })
    request('GET', urlList.getUserStatus, {}, app.globalData.openId, this.getTimeSuccess, this.getTimeFail) 
  },

  getTimeSuccess(res){
    let that = this
    let data = res.data
    if (data.code == 0) {
      let timestampDiff = Math.floor(data.result.sign_to_now / 60);
      wx.hideLoading()
      if (timestampDiff < 60) {
        wx.showToast({
          title: '总任务用时最低60分钟，请稍后重试。',
          icon: 'none',
          duration: 1500
        })
      }else{
        if (app.globalData.ask_finish) {
          wx.redirectTo({
            url:'/pages/poster/poster'
          })
        }else{
          wx.redirectTo({
            url:'/pages/questionnaire/questionnaire'
          })
        }
      }
    }else{
      wx.showToast({
        title: data.msg,
        icon: 'none',
        duration: 1500
      })
    }
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