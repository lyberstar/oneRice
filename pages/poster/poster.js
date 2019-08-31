import { IMG_LIST } from "../../asset/imgList.js"
import { request, getAreaName } from "../../utils/util.js"
import { urlList } from "../../asset/urlList.js"
const app = getApp()

/// 获取倍率
const raterpx = 750.0 / wx.getSystemInfoSync().windowWidth;
const phoneWidth = wx.getSystemInfoSync().windowWidth * raterpx;
const phoneHeight = phoneWidth / 1.415;
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

    teamName:'',
    name:'',
    duration:0,
    doneTime:''
  },

  onLoad: function (options) {
    // 此页面获取用户信息，然后背景图是一张证书图片
    // 图片上文案为：恭喜***战队 队长名、队员名、队员名公益挑战者成功完成“你好，邻居”一勺米公益挑战。您们的爱心和善举将助力打破邻里关系冷漠，激发更多的邻里互动，让社区生活更温暖！
    // 然后手动点击上传海报，保存。参考mySteps页面；
    // 之前做的一个项目数据库被黑了，数据全没了，死翘翘！今晚可能通宵手动模拟数据了
    let that = this;

    // that.againSave();
    // setTimeout(function(){
    //   that.createPoster();
    // },300)
  },

  onShow: function () {
    this.getUserStatus()
  },

  getUserStatus(){
    request('GET', urlList.getUserStatus, {}, app.globalData.openId, this.getUserStatusSuccess, this.getUserStatusFail)
  },

  getUserStatusSuccess(res){
    let that = this
    let data = res.data
    if (data.code == 0) {
      let nametemp = data.result.captainName
      if (data.result.part1 && data.result.part1 != '') {
        nametemp = nametemp + ',' + data.result.part1
      }
      if (data.result.part2 && data.result.part2 != '') {
        nametemp = nametemp + ',' + data.result.part2
      }
      let timetemp = parseInt(data.result.fullTime / 60)
      that.setData({
        teamName:data.result.teamName,
        name:nametemp,
        doneTime:data.result.finish_time.split(' ')[0],
        duration:timetemp
      })
      that.againSave();
      setTimeout(function(){
        that.createPoster();
      },300)
    }else{
      wx.showToast({
        title: data.msg,
        icon: 'none',
        duration: 1500
      })
    }
  },

  /// 创建海报
  createPoster: function () {
    var userinfoStr = wx.getStorageSync('userInfo'); 
    wx.showLoading({
      title: '海报生成中...',
    })
    var that = this;
    var tempname = that.data.name.split(",")
    var personcount = 1
    if (tempname.length == 1) {
      personcount = '一'
    }else if (tempname.length == 2) {
      personcount = '二'
    }else{
      personcount = '三'
    }
    /// 绘制的内容
    const writing = {
      bigImage: 'https://picabstract-preview-ftn.weiyun.com/ftn_pic_abs_v3/fa28cb66053cf1be8f6b89722af10981f8bdd5a6f59cabca53b72563bb9a9c3e9e6f109761726ebaad054b6948f4cd72?pictype=scale&from=30013&version=3.3.3.3&uin=775345792&fname=%E5%BE%AE%E4%BF%A1%E5%9B%BE%E7%89%87_20190829095633.jpg&size=750',
      artice: '　　恭喜' + that.data.teamName + '战队' + that.data.name + personcount + '位公益挑战者,您们用时' + that.data.duration + '分钟,与邻居进行了友善的交流,并成功完成一勺米公益挑战。您们的爱心和善举将助力打破邻里关系冷漠,激发更多的邻里互动,让社区生活更温暖！',
      logo: '义仓发展网络 壹基金（logo）',
      greatWall: '时间：' + that.data.doneTime,


      // avatar: userinfoStr.avatarUrl,
      // code: 'https://zjw-1252328182.cos.ap-beijing.myqcloud.com/fen/mini.png',
      // content: '请您填写详细的通讯地址及联系方式，如中奖，将有工作人员与您联系，具体中奖名单将于活动结束后，在首页公布。您将有机会获得中央纪委国家监委网站提供的纪念铅笔一套（名额20人）',
      // name: userinfoStr.nickName,
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
    console.log('testttttttttttt:',options.ctx.measureText(options.str).width)
    var allRow = Math.ceil(options.ctx.measureText(options.str).width / options.maxWidth);
    /// 限制行数
    var count = allRow >= options.maxLine ? options.maxLine : allRow,
    // var count = options.maxLine,
      /// 当前字符串的截断点
      endPos = 0;
    /// 设置文字颜色
    options.ctx.setFillStyle(options.style ? options.style : '#000');
    /// 设置字体大小
    options.ctx.setFontSize(options.fontSize ? options.fontSize : rate(20));
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

      /// 同步回调
      Promise.all(
        [promise1]
      ).then(res => {

        /// 绘制底色
        // ctx.setFillStyle('white');
        // ctx.fillRect(0, 0, rate(cavW), rate(cavH));

        /// 绘制背景图
        ctx.drawImage(res[0], 0, 0, rate(phoneWidth), rate(phoneHeight));
        ctx.restore();

        // 绘制用户名   
        this.drawText({
          ctx: ctx,
          str: writing.artice,
          maxLine: 5,
          maxWidth: rate(580),
          x: rate(80),
          y: rate(250),
          height: rate(35)
        })
        ctx.restore();

        // // 绘制公司名   
        // this.drawText({
        //   ctx: ctx,
        //   str: writing.logo,
        //   maxLine: 1,
        //   maxWidth: rate(300),
        //   x: rate(300),
        //   y: rate(380),
        //   height: rate(35)
        // })
        // ctx.restore();

        // 绘制时间   
        this.drawText({
          ctx: ctx,
          str: writing.greatWall,
          maxLine: 1,
          maxWidth: rate(300),
          x: rate(500),
          y: rate(400),
          height: rate(35)
        })
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