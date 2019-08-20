import { IMG_LIST } from "../../asset/imgList.js"
import { request, getAreaName } from "../../utils/util.js"
import { urlList } from "../../asset/urlList.js"
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    isSignUp:0,   //是否报名  0否  1是
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
    let data = res.data.data
    console.log(res)
    that.setData({
      isSignUp:data.isSignUp
    })
    //是否做完开始上传的第一步
    app.globalData.start_finish = data.start_finish
    //是否做完问卷
    app.globalData.ask_finish = data.ask_finish
  },

  getUserStatusFail() {

  },

  turnSign:function(){
  	let that = this
  	wx.navigateTo({
  		url:'/pages/signTable/signTable'
  	})
  },

  turnStart:function(){
    let that = this
    let start_finish = app.globalData.start_finish
    if (start_finish == 0) {
      wx.navigateTo({
        url:'/pages/firstSign/firstSign'
      })
    }else{
      wx.navigateTo({
        url:'/pages/taskList/taskList'
      })
    }
  },

  turnIntro:function(){
    let that = this
    wx.navigateTo({
      url:'/pages/activityIntro/activityIntro'
    })
  },

  turnNews:function(){
    let that = this
    wx.navigateTo({
      url:'/pages/newsList/newsList'
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