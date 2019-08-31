// pages/allowDetail/allowDetail.js
import { urlList } from "../../asset/urlList.js"
import { request } from "../../utils/util.js"
import { IMG_LIST } from "../../asset/imgList.js"
const app = getApp()

Page({
  data: {
    IMG_LIST,
  },
  getUserInfo() {
    wx.getUserInfo({ //获取用户的授权信息
      success: res => {
        wx.setStorageSync('userInfo', res.userInfo)
        app.globalData.userInfo = res.userInfo
        wx.login({
          success: res => {
            this.getOpenid(res.code)
          }
        })
        console.log("获取信息", res)
      },
      fail: res => {
        console.log("调用失败")
      }
    })
  },
  // 获取Openid
  getOpenid(code) {
    let token = wx.getStorageSync('token')
    request('POST', urlList.getOpenId, { code }, token, this.handleSuccess, this.handleFail)
  },
  handleSuccess(res) {
    if (res.data.code == 0) {
      wx.setStorageSync('token',res.data.result.token)
      wx.switchTab({
        url: '../index/index'
      })
      // app.globalData.isExist = res.data.result.isExist
      // if (res.data.result.isExist) {
      //   wx.switchTab({
      //     url: '../index/index'
      //   })
      // } else {
      //   wx.navigateTo({
      //     url: '../form/form',
      //   })
      // }
    } else {
      console.log('get openid失败', res.data)
    }
  },
  handleFail(err) {
    console.log('getOpenid err')
  },
})