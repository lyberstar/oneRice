// pages/signTable/signTable.js
import { IMG_LIST } from "../../asset/imgList.js"
import { checkPhone, request, getAreaName } from "../../utils/util.js"
import { urlList } from "../../asset/urlList.js"
import { cityList } from "../../asset/cityList.js"
const app = getApp()

var list = []
var idList = ["52"]

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:['请选择','南天门','北天门'],
    index:0,
    multiIndex:[0,0],
    multiArray: [['北京', '安徽', "福建", "甘肃", "广东", "广西", "贵州", "海南", "河北", "河南", "黑龙江", "湖北", "湖南", "吉林", "江苏", "江西", "辽宁", "内蒙古", "宁夏", "青海", "山东", "山西", "陕西", "上海", "四川", "天津", "西藏", "新疆", "云南", "浙江", "重庆", "香港", "澳门", "台湾"], ['北京']],
    objectMultiArray: [],
    isChecked:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    that.setData({
      objectMultiArray:cityList.list
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
    wx.getStorage({
      key: 'partItem',
      success: (res) => {
        console.log(res)
        const { partName, partCode } = JSON.parse(res.data)
        this.setData({
          partName,
          partCode,
        })
      }
    })
  },
  goPartList() {
    wx.navigateTo({
      url: '/pages/partList/partList'
    })
  },

  bindMultiPickerChange: function(e){
    let that = this
    that.setData({
      "multiIndex[0]": e.detail.value[0],
      "multiIndex[1]": e.detail.value[1]
    })
    console.log(e)
  },

  bindMultiPickerColumnChange: function (e){
    let that = this
    switch (e.detail.column){
      case 0:
        list = []
        idList = []
        for (var i = 0; i < that.data.objectMultiArray.length;i++){
          if (that.data.objectMultiArray[i].parid == that.data.objectMultiArray[e.detail.value].regid){
            list.push(that.data.objectMultiArray[i].regname)
            idList.push(that.data.objectMultiArray[i].regid)
          }
        }
        that.setData({
          "multiArray[1]": list,
          "multiIndex[0]": e.detail.value,
          "multiIndex[1]" : 0
        })
        console.log(idList)
    }
  },

  bindPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      index: e.detail.value
    })
  },

  formSubmit: function (e) {
    let that = this
    if (!e.detail.value.teamname) {
      wx.showToast({title:'请输入队名',icon:'none'})
      return false
    }else if (e.detail.value.teamname.length > 12) {
      wx.showToast({title:'队名不超过12个字符',icon:'none'})
      return false
    }else if (e.detail.value.name1 == 0) {
      wx.showToast({title:'请输入家长姓名',icon:'none'})
      return false
    }else if (!checkPhone(e.detail.value.phone.trim())) {
      wx.showToast({ title: '请输入手机号', icon: 'none' })
      return false
    }else if (e.detail.value.part == 0) {
      wx.showToast({title:'请选择落地机构',icon:'none'})
      return false
    }else if (that.data.isChecked == false) {
      wx.showToast({title:'请阅读并同意《免责声明》',icon:'none'})
      return false
    }
    let tempLoc = e.detail.value.regid
    e.detail.value.regid = idList[e.detail.value.regid[1]]
    let partTemp = JSON.parse(wx.getStorageSync('partItem'))
    e.detail.value.partName = partTemp.partName
    e.detail.value.partCode = partTemp.partCode
    console.log('tempLoc：', tempLoc)
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
    wx.showModal({
      title: '提示',
      content: '是否确定提交？请及时联系落地机构。',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.removeStorage({ key: 'partItem'} )
          let tempData = e.detail.value
          let token = wx.getStorageSync('token')
          request('POST', urlList.firstUpload, tempData, token, that.handleSuccess, that.handleFail)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  handleSuccess(res){
    let that = this
    let data = res.data
    if (data.code == 0) {
      wx.showToast({
        title: '报名成功',
        icon: 'none',
        duration: 1500
      })
      setTimeout(function () {
        wx.navigateBack({
          delta: 1
        })
      }, 1000)
    }else{
      wx.showToast({
        title: data.msg,
        icon: 'none',
        duration: 1500
      })
    }
  },

  turnTip:function(){
    wx.navigateTo({
      url:'/pages/tips/tips'
    })
  },

  checkboxChange: function(e) {
    let that = this
    console.log('checkbox发生change事件，携带value值为：', e.detail.value)
    if (e.detail.value.length == 0) {
      that.setData({
        isChecked:false
      })
    }else{
      that.setData({
        isChecked:true
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