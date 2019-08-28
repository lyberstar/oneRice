
/// 获取倍率
const raterpx = 750.0 / wx.getSystemInfoSync().windowWidth;
const phoneWidth = wx.getSystemInfoSync().windowWidth * raterpx;
const phoneHeight = wx.getSystemInfoSync().windowHeight * raterpx;
console.log(phoneHeight, phoneWidth, raterpx);
/// 获取canvas转化后的rpx
const rate = function (rpx) {
  return rpx / raterpx
};

Page({

  data: {
    isCreate: false,
    isShow: false,
    phoneWidth: phoneWidth,
    phoneHeight: phoneHeight,
    fraction: ''
  },

  onLoad: function (options) {
    // 此页面获取用户信息，然后背景图是一张证书图片
    // 图片上文案为：恭喜***战队 队长名、队员名、队员名公益挑战者成功完成“你好，邻居”一勺米公益挑战。您们的爱心和善举将助力打破邻里关系冷漠，激发更多的邻里互动，让社区生活更温暖！
    // 然后手动点击上传海报，保存。参考mySteps页面；
    // 之前做的一个项目数据库被黑了，数据全没了，死翘翘！今晚可能通宵手动模拟数据了
    var myFraction = 30;
    var that = this;
    that.againSave();
    var fraction = '';
    if(myFraction == 0){
      fraction = 'https://zjw-1252328182.cos.ap-beijing.myqcloud.com/fen/0.png'
    }else if(myFraction == 10){
      fraction = 'https://zjw-1252328182.cos.ap-beijing.myqcloud.com/fen/10.png'
    }else if(myFraction == 20){
      fraction = 'https://zjw-1252328182.cos.ap-beijing.myqcloud.com/fen/20.png'
    }else if(myFraction == 30){
      fraction = 'https://zjw-1252328182.cos.ap-beijing.myqcloud.com/fen/30.png'
    }else if(myFraction == 40){
      fraction = 'https://zjw-1252328182.cos.ap-beijing.myqcloud.com/fen/40.png'
    }else if(myFraction == 50){
      fraction = 'https://zjw-1252328182.cos.ap-beijing.myqcloud.com/fen/50.png'
    }else if(myFraction == 60){
      fraction = 'https://zjw-1252328182.cos.ap-beijing.myqcloud.com/fen/60.png'
    }else if(myFraction == 70){
      fraction = 'https://zjw-1252328182.cos.ap-beijing.myqcloud.com/fen/70.png'
    }else if(myFraction == 80){
      fraction = 'https://zjw-1252328182.cos.ap-beijing.myqcloud.com/fen/80.png'
    }else if(myFraction == 90){
      fraction = 'https://zjw-1252328182.cos.ap-beijing.myqcloud.com/fen/90.png'
    }else if(myFraction == 100){
      fraction = 'https://zjw-1252328182.cos.ap-beijing.myqcloud.com/fen/100.png'
    }
    that.setData({
      fraction:fraction
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
      // bigImage: 'https://zjw-1252328182.cos.ap-beijing.myqcloud.com/fen/jianbian.png',
      bigImage: 'https://zjw-1252328182.cos.ap-beijing.myqcloud.com/fen/debug/jianbian.png?v=1',
      avatar: userinfoStr.avatarUrl,
      // artice: 'https://zjw-1252328182.cos.ap-beijing.myqcloud.com/fen/wenan.png',
      artice: 'https://zjw-1252328182.cos.ap-beijing.myqcloud.com/fen/debug/wenan-min.png?v=1',
      fraction: that.data.fraction,
      // logo: 'https://zjw-1252328182.cos.ap-beijing.myqcloud.com/fen/logo.png',
      logo: 'https://zjw-1252328182.cos.ap-beijing.myqcloud.com/fen/debug/logo-min.png?v=1',
      // greatWall: 'https://zjw-1252328182.cos.ap-beijing.myqcloud.com/fen/changcheng.png',
      greatWall: 'https://zjw-1252328182.cos.ap-beijing.myqcloud.com/fen/debug/changcheng.png?v=1',
      code: 'https://zjw-1252328182.cos.ap-beijing.myqcloud.com/fen/mini.png',
      content: '请您填写详细的通讯地址及联系方式，如中奖，将有工作人员与您联系，具体中奖名单将于活动结束后，在首页公布。您将有机会获得中央纪委国家监委网站提供的纪念铅笔一套（名额20人）',
      name: userinfoStr.nickName,
    };
    /// 绘制
    this.draw('poster', phoneWidth, phoneHeight, writing).then(res => {
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

      /// 获取分数
      let promise5 = new Promise(function (resolve, reject) {
        wx.getImageInfo({
          src: writing.fraction,
          success: function (res) {
            resolve(res.path);
          },
          fail: function (err) {
            reject(err);
          }
        })
      });

      /// 获取长城背景
      let promise6 = new Promise(function (resolve, reject) {
        wx.getImageInfo({
          src: writing.greatWall,
          success: function (res) {
            resolve(res.path);
          },
          fail: function (err) {
            reject(err);
          }
        })
      });

      /// 获取logo背景
      let promise7 = new Promise(function (resolve, reject) {
        wx.getImageInfo({
          src: writing.logo,
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
        [promise1, promise2, promise3, promise4, promise5, promise6,promise7]
      ).then(res => {

        /// 绘制底色
        // ctx.setFillStyle('white');
        // ctx.fillRect(0, 0, rate(cavW), rate(cavH));

        /// 绘制背景图
        ctx.drawImage(res[0], 0, 0, rate(phoneWidth), rate(phoneHeight));


        // 绘制长城背景图
        const diameter_greatWall_w = rate(750);
        const diameter_greatWall_h = rate(908);
        /// 圆参数 
        const arc_greatWall = {
          radii_w: diameter_greatWall_w / 2,
          radii_h: diameter_greatWall_h / 2,
          x: rate(0),
          y: rate(phoneHeight - 908 - 146)
        };
        // 绘制长城
        ctx.drawImage(res[5], arc_greatWall.x, arc_greatWall.y, diameter_greatWall_w, diameter_greatWall_h);
        ctx.restore();

        /// 用户头像
        const diameter_userhead_bg = rate(120);
        /// 圆参数 
        const arc_userhead_bg = {
          radii: diameter_userhead_bg / 2,
          x: rate(44),
          y: rate(76)
        };

        // 绘制头像
        ctx.save();
        ctx.beginPath();
        ctx.arc(arc_userhead_bg.x + arc_userhead_bg.radii, arc_userhead_bg.y + arc_userhead_bg.radii, arc_userhead_bg.radii, 0, Math.PI * 2, false);
        ctx.clip();
        ctx.drawImage(res[1], arc_userhead_bg.x, arc_userhead_bg.y, diameter_userhead_bg, diameter_userhead_bg);
        ctx.restore();

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


        // 绘制logo背景图
        const diameter_logo_w = rate(750);
        const diameter_logo_h = rate(146);
        /// 圆参数 
        const arc_logo = {
          radii_w: diameter_logo_w / 2,
          radii_h: diameter_logo_h / 2,
          x: rate(0),
          y: rate(phoneHeight - 146)
        };
        // 绘制logo
        ctx.drawImage(res[6], arc_logo.x, arc_logo.y, diameter_logo_w, diameter_logo_h);
        ctx.restore();

        // 文案
        const diameter_artice_w = rate(630);
        const diameter_artice_h = rate(300);
        /// 圆参数 
        const arc_artice = {
          radii_w: diameter_artice_w / 2,
          radii_h: diameter_artice_h / 2,
          x: rate(50),
          y: rate(280)
        };
        // 绘制文案
        ctx.drawImage(res[3], arc_artice.x, arc_artice.y, diameter_artice_w, diameter_artice_h);
        ctx.restore();

        // 分数
        const diameter_fraction_w = rate(360);
        const diameter_fraction_h = rate(100);
        /// 圆参数 
        const arc_fraction = {
          radii_w: diameter_fraction_w / 2,
          radii_h: diameter_fraction_h / 2,
          x: rate(260),
          y: rate(380)
        };
        // 绘制分数
        ctx.drawImage(res[4], arc_fraction.x, arc_fraction.y, diameter_fraction_w, diameter_fraction_h);
        ctx.restore();


        /// 直径
        const diameter_userhead = rate(350);
        /// 圆参数 
        const arc_userhead = {
          radii: diameter_userhead / 2,
          x: rate(200),
          y: rate((phoneHeight+100)/2)
        };

        // 绘制二维码
        ctx.beginPath();
        ctx.arc(arc_userhead.x + arc_userhead.radii, arc_userhead.y + arc_userhead.radii, arc_userhead.radii, 0, Math.PI * 2, false);
        ctx.clip();
        ctx.drawImage(res[2], arc_userhead.x, arc_userhead.y, diameter_userhead, diameter_userhead);
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