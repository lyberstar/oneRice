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
      {'name':'任务1','id':'001'},
      {'name':'任务2','id':'002'},
      {'name':'任务3','id':'003'},
      {'name':'任务4','id':'004'},
      {'name':'任务5','id':'005'},
      {'name':'任务6','id':'006'},
      {'name':'任务7','id':'007'},
      {'name':'任务8','id':'008'},
      {'name':'任务9','id':'009'}
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
    let data = res.data.data
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

  //提交
  submit:function(){
    let that = this
    wx.redirectTo({
      url:'/pages/questionnaire/questionnaire'
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