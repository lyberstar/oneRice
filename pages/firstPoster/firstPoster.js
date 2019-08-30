// pages/firstPoster/firstPoster.js
/// 获取倍率
const raterpx = 750.0 / wx.getSystemInfoSync().windowWidth;
const phoneWidth = wx.getSystemInfoSync().windowWidth * raterpx;
// const phoneHeight = wx.getSystemInfoSync().windowHeight * raterpx;
// console.log(phoneHeight, phoneWidth, raterpx);
/// 获取canvas转化后的rpx
const rate = function (rpx) {
  return rpx / raterpx
};

Page({

  data: {
    isCreate: false,
    isShow: false,
    phoneWidth: phoneWidth,
    phoneHeight: '',
    backimg:''
  },

  onLoad: function (options) {
    // 此页面获取用户信息，然后背景图是一张证书图片
    // 图片上文案为：恭喜***战队 队长名、队员名、队员名公益挑战者成功完成“你好，邻居”一勺米公益挑战。您们的爱心和善举将助力打破邻里关系冷漠，激发更多的邻里互动，让社区生活更温暖！
    // 然后手动点击上传海报，保存。参考mySteps页面；
    // 之前做的一个项目数据库被黑了，数据全没了，死翘翘！今晚可能通宵手动模拟数据了
    let that = this;
    that.againSave();
    let image = options.pic
    that.setData({
      // backimg:'http://tmp/wxb42c66ec2dff1182.o6zAJs1fKALbyIHfTWFsitYJUfSc.8a0iZEAezyvna43c4775776914ff5c3bd0ce740bf11d.jpg',
      backimg:options.pic,
      phoneHeight:380* raterpx
    })

    setTimeout(function(){
      that.createPoster();
    },300)
  },

  /// 创建海报
  createPoster: function () {
    var userinfoStr = wx.getStorageSync('userInfo'); 
    wx.showLoading({
      title: '海报生成中...',
    })
    var that = this;
    /// 绘制的内容
    const writing = {
      bigImage: 'https://picabstract-preview-ftn.weiyun.com/ftn_pic_abs_v3/677f9cdc847f7972cccec1521d96076ce3c167c7d581ca1b7f740620741928d31e5335896aeb89c267e7410656bc4aa6?pictype=scale&from=30013&version=3.3.3.3&uin=775345792&fname=white.jpg&size=750',
      avatar: userinfoStr.avatarUrl,
      artice: that.data.backimg,
      code: 'https://picabstract-preview-ftn.weiyun.com/ftn_pic_abs_v3/4ea200cbf6f6f3bdcbff50920d1918f1b7bf6d9e253db9b66ed06cdc256ab8140d7beb2030e99d9baafd1e0544f2d596?pictype=scale&from=30013&version=3.3.3.3&uin=775345792&fname=1566987791_567260.png&size=750',
      name: userinfoStr.nickName,
    };
    /// 绘制
    this.draw('poster', phoneWidth, that.data.phoneHeight, writing).then(res => {
      setTimeout(() => {
        wx.hideLoading();
        this.setData({
          isCreate: true,
          isShow: true
        })
        wx.showToast({
          title: '点击图片保存',
          icon:'none',
          duration:2000
        })
      }, 300)
    }, err => {
      setTimeout(() => {
        wx.hideLoading();
        wx.showToast('生成海报失败');
      }, 300)
    })
    // });
  },



  // 绘制文本
  drawText: function (options) {
    /// 获取总行数
    var allRow = Math.ceil(options.ctx.measureText(options.str).width / options.maxWidth);
    /// 限制行数
    var count = allRow >= options.maxLine ? options.maxLine : allRow,
      /// 当前字符串的截断点
      endPos = 0;
    /// 设置文字颜色
    options.ctx.setFillStyle(options.style ? options.style : '#fff');
    /// 设置字体大小
    options.ctx.setFontSize(options.fontSize ? options.fontSize : rate(36));
    /// 循环截断
    for (var j = 0; j < count; j++) {
      /// 当前剩余的字符串
      var nowStr = options.str.slice(endPos),
        /// 每一行当前宽度
        rowWid = 0,
        /// 每一行顶部距离
        y = options.y + (count == 1 ? 0 : j * options.height);
      /// 如果当前的字符串宽度大于最大宽度，然后开始截取
      if (options.ctx.measureText(nowStr).width > options.maxWidth) {
        for (var m = 0; m < nowStr.length; m++) {
          /// 计算当前字符串总宽度
          rowWid += options.ctx.measureText(nowStr[m]).width;
          if (rowWid > options.maxWidth) {
            /// 如果是最后一行
            if (j === options.maxLine - 1) {
              options.ctx.fillText(nowStr.slice(0, m - 1) + '...', options.x, y);
            } else {
              options.ctx.fillText(nowStr.slice(0, m), options.x, y);
            }
            /// 保留下次截断点
            endPos += m;
            break;
          }
        }
      } else { /// 如果当前的字符串宽度小于最大宽度就直接输出
        options.ctx.fillText(nowStr.slice(0), options.x, y);
      }
    }
  },

  /// 绘制海报 1、canvas对象 2、canvas宽 3、canvas高 4、绘制的内容
  draw: function (canvas, cavW, cavH, writing) {
    var that = this;
    return new Promise((resolve, reject) => {

      if (!writing || !canvas) {
        reject();
        return;
      }

      /// 创建context
      var ctx = wx.createCanvasContext(canvas);
      ctx.clearRect(0, 0, rate(cavW), rate(cavH));

      /// 获取大的背景图
      let promise1 = new Promise(function (resolve, reject) {
        wx.getImageInfo({
          src: writing.bigImage,
          success: function (res) {
            resolve(res.path);
          },
          fail: function (err) {
            reject(err);
          }
        })
      });

      /// 获取店铺头像图片
      let promise2 = new Promise(function (resolve, reject) {
        wx.getImageInfo({
          src: writing.avatar,
          success: function (res) {
            resolve(res.path);
          },
          fail: function (fail) {
            resolve(fail);
          }
        })
      });

      /// 获取小程序码图片
      let promise3 = new Promise(function (resolve, reject) {
        wx.getImageInfo({
          src: writing.code,
          success: function (res) {
            resolve(res.path);
          },
          fail: function (err) {
            reject(err);
          }
        })
      });

      /// 获取文案
      let promise4 = new Promise(function (resolve, reject) {
        wx.getImageInfo({
          src: writing.artice,
          success: function (res) {
            resolve(res.path);
          },
          fail: function (err) {
            reject(err);
          }
        })
      });

      /// 同步回调
      Promise.all(
        [promise1, promise2, promise3, promise4]
      ).then(res => {

        /// 绘制背景图
        ctx.drawImage(res[0], 0, 0, rate(phoneWidth), rate(that.data.phoneHeight));

        // 绘制用户名   
        this.drawText({
          ctx: ctx,
          str: writing.name,
          maxLine: 1,
          maxWidth: rate(300),
          x: rate(200),
          y: rate(150),
          height: rate(36)
        })

        // 照片
        const diameter_artice_w = rate(630);
        const diameter_artice_h = rate(473);
        /// 圆参数 
        const arc_artice = {
          radii_w: diameter_artice_w / 2,
          radii_h: diameter_artice_h / 2,
          x: rate(60),
          y: rate(60)
        };
        // 绘制照片
        ctx.drawImage(res[3], arc_artice.x, arc_artice.y, diameter_artice_w, diameter_artice_h);
        ctx.restore();


        /// 宽高
        const diameter_userhead_w = rate(600);
        const diameter_userhead_h = rate(92);
        /// 圆参数 
        const arc_userhead = {
          x: rate(100),
          y: rate((that.data.phoneHeight+430)/2)
        };

        // 绘制文字
        ctx.beginPath();
        ctx.drawImage(res[2], arc_userhead.x, arc_userhead.y, diameter_userhead_w, diameter_userhead_h);
        ctx.restore();


        // 绘制  
        ctx.draw(false, () => {
          wx.canvasToTempFilePath({
            canvasId: 'poster',
            fileType: 'png',
            success: res => {
              this.setData({
                poster: res.tempFilePath
              })
              resolve();
            },
            fail: err => {
              reject();
            }
          })
        });
      }, err => {
        reject();
      })
    })
  },

  /// 保存图片
  btnCreate: function (obj) {
    var that = this;
    var notShare = wx.getStorageSync('notShare');
    if (notShare == false) {
      wx.openSetting({
        success: function success(res) {
          console.log(res);
          if (!res.authSetting["scope.writePhotosAlbum"]) {
            console.log(res)
          }
          that.againSave();
        }, fail(res) {
          console.log(res);
          that.againSave();
        }
      });
    } else {
      wx.showLoading({
        title: '海报保存中...',
      })
      wx.saveImageToPhotosAlbum({
        filePath: this.data.poster,
        success: res => {
          wx.hideLoading();
          // this.catchtap(() => {
          wx.showToast({
            title: '保存成功'
          })
          // });
          that.againSave();
        },
        fail: err => {
          wx.hideLoading();
          console.log(err);
          if (err.errMsg == 'saveImageToPhotosAlbum:fail auth deny') {
            that.againSave();
          }
          // this.catchtap(() => {
          wx.showToast({
            title: '保存失败',
            icon: 'none'
          })
          that.againSave();
          // });
        }
      });
    }
  },
  againSave:function(){
    var that = this;
    wx.getSetting({
      success: function success(res) {
        console.log(res);
        if (res.authSetting["scope.writePhotosAlbum"] == false) {
          var res = false;
          wx.setStorageSync('notShare', res)
        } else if (res.authSetting["scope.writePhotosAlbum"]) {
          var res = true;
          wx.setStorageSync('notShare', res)
        } else {
          var res = true;
          wx.setStorageSync('notShare', res)
        }
      },fail(res){
        console.log(res);
      }
    });
  }
})