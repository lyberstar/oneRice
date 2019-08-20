// pages/taskDetail/taskDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    previewImage:'',
    previewVideo:''
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
      sourceType: ['album', 'camera'],
      success(res) {
        // tempFilePath可以作为img标签的src属性显示图片
        let previewImage = that.data.previewImage
        previewImage = res.tempFilePaths[0];
        that.setData({
          previewImage: previewImage
        })
        console.log('test:', that.data.previewImage)
      }
    })
  },

  //上传视频
  uploadVideo: function () {
    let that = this;
    wx.chooseVideo({
      sourceType: ['album','camera'],
      maxDuration: 60,
      camera: 'back',
      success(res) {
        console.log(res.tempFilePath)
        that.setData({
          previewVideo:res.tempFilePath
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
          wx.redirectTo({
            url:'/pages/taskList/taskList'
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
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