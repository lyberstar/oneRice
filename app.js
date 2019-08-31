import { urlList } from "asset/urlList.js"
import { request } from "utils/util.js"

App({
  onLaunch () {
    wx.login({
      success: res => {
        // 利用code获取唯一标示openid
        this.getOpenid(res.code)
      }
    })
  },
  handleSuccess(res) {
    if (res.data.code == 0) {
      this.globalData.openId = res.data.result.openId
      wx.switchTab({
        url: '../index/index'
      })
    } else {
      console.log('get openid失败', res.data)
    }
  },
  handleFail(err) {
    console.log('getOpenid err')
  },
  // 获取Openid
  getOpenid(code) {
    request('POST', urlList.getOpenId, { code }, this.globalData.openId, this.handleSuccess, this.handleFail)
  },
  globalData: {
    userInfo: {},
    openId: '',
    token: '',
    isExist: false,
    start_finish:false,  //是否做完开始上传的第一步
    ask_finish:false,   //是否做完问卷
  }
})