// pages/taskDetail/taskDetail.js
import { request, picUpload } from "../../utils/util.js"
import { urlList, fileUrl } from "../../asset/urlList.js"

var sMD5 = require('../../asset/spark-md5.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    previewImage:'',
    previewVideo:'',
    videoContext:'',
    md5:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
    let id = options.id
    that.setData({
      id:id
    })
    console.log('id:',id)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.videoContext = wx.createVideoContext('myVideo')
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  //上传图片
  uploadImage: function () {
    let that = this;
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        let previewImage = that.data.previewImage
        previewImage = res.tempFilePaths[0];
        that.setData({
          previewImage: previewImage
        })
        console.log('test:', that.data.previewImage)

        //验证md5
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePaths[0], //选择图片返回的相对路径
          // encoding: 'binary', //编码格式
          success: res => {
            //成功的回调
            var spark = new sMD5.ArrayBuffer();
            spark.append(res.data);
            var hexHash = spark.end(false);
            console.log('md5 test:',hexHash)
            that.setData({
              md5:hexHash
            })
          }
        })
      }
    })
  },

  //上传视频
  uploadVideo: function () {
    let that = this;
    wx.chooseVideo({
      sourceType: ['camera'],
      maxDuration: 10,
      camera: 'back',
      success(res) {
        console.log(res.tempFilePath)
        that.setData({
          previewVideo:res.tempFilePath
        })
        that.videoContext.stop()

        //验证md5
        wx.getFileSystemManager().readFile({
          filePath: res.tempFilePath, //选择图片返回的相对路径
          // encoding: 'binary', //编码格式
          success: res => {
            //成功的回调
            var spark = new sMD5.ArrayBuffer();
            spark.append(res.data);
            var hexHash = spark.end(false);
            console.log('md5 test:',hexHash)
            that.setData({
              md5:hexHash
            })
          }
        })
      }
    })
  },

  deleteSrc: function(e){
    let that = this
    let type = e.currentTarget.dataset.type
    
    if (type == 0) {
      wx.showModal({
        title: '提示',
        content: '确定删除已选择的图片吗？',
        success (res) {
          if (res.confirm) {
            that.setData({
              previewImage:''
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }else{
      wx.showModal({
        title: '提示',
        content: '确定删除已选择的视频吗？',
        success (res) {
          if (res.confirm) {
            that.videoContext.stop()
            that.setData({
              previewVideo:''
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  //预览图片
  previewImages: function (e) {
    let current = e.target.dataset.src;
    wx.previewImage({
      current: current // 当前显示图片的http链接
    })
  },

  //提交
  submit:function(){
    let that = this
    wx.showModal({
      title: '提示',
      content: '是否确定提交？',
      success (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          let timestamp = Date.parse(new Date())/1000
          let sign = sMD5.hash('key1=QINYUANMAO&timestamp=' + timestamp + '&key2=FILE_SERVER_2019').toUpperCase()
          let data = {
            md5:that.data.md5
          }

          picUpload('POST', urlList.testMD5, data, sign, timestamp, that.getTestMD5Success, that.getTestMD5Fail)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },

  getTestMD5Success(res){
    let that = this
    console.log('res:',res)
    if (res.data.code == 1) {
      //md5验证通过，可以上传文件
      let timestamp = Date.parse(new Date())/1000
      let sign = sMD5.hash('key1=QINYUANMAO&timestamp=' + timestamp + '&key2=FILE_SERVER_2019').toUpperCase()
      wx.uploadFile({
        url: fileUrl + urlList.uploadFile,
        filePath: that.data.previewImage,
        name: 'file',
        header: {
          'sign': sign,
          'timestamp': timestamp
        },
        formData: {
          'md5': that.data.md5
        },
        success (res){
          let token = wx.getStorageSync('token')
          let fileType = ''
          if (that.data.previewImage != '') {
            fileType = 1
          }else if (that.data.previewVideo != '') {
            fileType = 2
          }
          let data = {
            fileType:fileType,
            fileUrl:res.data.result.fileUrl,
            index:0
          }
          request('POST', urlList.sigleTask, data, token, that.submitSuccess, that.submitFail)
        }
      })
    }else{
      let token = wx.getStorageSync('token')
      let data = {
        fileType:1,
        fileUrl:res.data.result.fileUrl,
        index:0
      }
      request('POST', urlList.sigleTask, data, token, that.submitSuccess, that.submitFail)
    }
  },

  submitSuccess(res){
    if (res.data.code == 0) {
      wx.showToast({
        title: '上传成功',
        icon: 'success',
        duration: 1000,
        mask: true,
        success: () => {
          wx.redirectTo({
            url: '/pages/taskList/taskList'
          })
        }
      })
    }else{
      wx.showToast({
        title: res.data.msg,
        icon: 'none',
        duration: 1000
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