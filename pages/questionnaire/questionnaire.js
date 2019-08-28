
Page({

  /**
   * 页面的初始数据
   */
  data: {
    has_data: false,
    nav_id: '0',
    question:[
      {
        question_name:'Q1:与邻居交流时，聊天的话题主要涉及哪些内容？',
        question_id: "question_0001",
        question_style:1,
        answer_list:[
          {
            answer_name: "一勺米活动信息"
          },
          {
            answer_name: "主办方机构信息"
          },
          {
            answer_name: "关心参与个人信息"
          },
          {
            answer_name: "参与公益活动信息"
          },
          {
            answer_name: "你们社区的信息"
          }
        ]
      },
      {
        question_name:'Q2:你认为一勺米公益挑战是否有助于打破邻里冷漠？',
        question_id: "question_0002",
        question_style:2,
        answer_list:[
          {
            answer_name: "是"
          },
          {
            answer_name: "否"
          }
        ]
      },
      {
        question_name:'Q3:你认为当前邻里关系现状是？',
        question_id: "question_0003",
        question_style:2,
        answer_list:[
          {
            answer_name: "亲密"
          },
          {
            answer_name: "舒适"
          },
          {
            answer_name: "疏离"
          },
          {
            answer_name: "冷漠"
          }
        ]
      }
    ]
  },
  onLoad: function(options) {
    // wx.showLoading({
    //   title: '问卷生成中',
    // })
    // var that = this;
    // var questionnaire_id = 'questionnaire001';
    // var questionnaire_name = '2019年乘客满意度调查问卷';
    // var questionnaire_description = '为进一步提升我们的服务水平，为乘客提供更舒适便捷的乘车服务，现开展2019年乘客满意度调查。';
    // console.log(questionnaire_id, questionnaire_name, questionnaire_description);
    // this.setData({
    //   questionnaire_id: questionnaire_id,
    //   questionnaire_name: questionnaire_name,
    //   questionnaire_description: questionnaire_description
    // });
    // // 调取接口获取问卷内容
    // wx.request({
    //   url: 'https://xcx.cdmetrokyb.com/questionnaire_detail.php',
    //   data: {
    //     questionnaire_id,
    //     questionnaire_name,
    //     questionnaire_description
    //   },
    //   success(res) {
    //     setTimeout(function() {
    //       wx.hideLoading()
    //     }, 200)
    //     console.log(res.data)
    //     that.setData({
    //       question: res.data.data,
    //       has_data: true
    //     })
    //   }
    // })
    // // 获取用户open_id
    // wx.getStorage({
    //   key: 'openid',
    //   success(res) {
    //     // console.log(res.data);
    //     that.setData({
    //       open_id: res.data.openid
    //     })
    //   }
    // });
  },
  onShow: function() {

  },

  checkboxChange: function (e) {  
    var that = this;  
    var skin = e.detail.value  
    //新建数组全部设置为没被选中  
    var new_itmes = [
      {
        question_name:'Q1:与邻居交流时，聊天的话题主要涉及哪些内容？',
        question_id: "question_0001",
        question_style:1,
        answer_list:[
          {
            answer_name: "一勺米活动信息"
          },
          {
            answer_name: "主办方机构信息"
          },
          {
            answer_name: "关心参与个人信息"
          },
          {
            answer_name: "参与公益活动信息"
          },
          {
            answer_name: "你们社区的信息"
          }
        ]
      },
      {
        question_name:'Q2:你认为一勺米公益挑战是否有助于打破邻里冷漠？',
        question_id: "question_0002",
        question_style:2,
        answer_list:[
          {
            answer_name: "是"
          },
          {
            answer_name: "否"
          }
        ]
      },
      {
        question_name:'Q3:你认为当前邻里关系现状是？',
        question_id: "question_0003",
        question_style:2,
        answer_list:[
          {
            answer_name: "亲密"
          },
          {
            answer_name: "舒适"
          },
          {
            answer_name: "疏离"
          },
          {
            answer_name: "冷漠"
          }
        ]
      }
    ] 
    if (skin.length > 2) {  
      //取出倒数三个值  
      var key1 = skin[skin.length - 1];  
      var key2 = skin[skin.length - 2];  
      //设置最后三个值为选中状态  
      new_itmes[0].answer_list[key1]['checked'] = 'true'  
      new_itmes[0].answer_list[key2]['checked'] = 'true'  
  
      //删除被选中的第一个值  
      skin.splice(0, 1);  
    } else {  
      //被选中少于三个，直接设置被选中  
      for (var i = 0; i < skin.length; i++) {  
        var key = skin[i]  
        new_itmes[0].answer_list[key]['checked'] = 'true'  
      }  
    }  
    //存入  
    that.setData({  
      question: new_itmes  
    })
  },

  formSubmit:function(e){
    let that = this
    console.log(e.detail.value)
    wx.navigateTo({
      url:'/pages/poster/poster'
    })
  },
  // formSubmit: function(e) {
  //   var that = this;
  //   console.log('form发生了submit事件，携带数据为：', e.detail.value);
  //   var answer = e.detail.value;
  //   for (var key in answer) {
  //     if (answer[key] == '') {
  //       var key_id = key.substr(-4);
  //       if (key_id.substr(0, 3) == '000') {
  //         var key_id_one = key_id.substr(-1);
  //         wx.showToast({
  //           title: '您第' + key_id_one + '题未填写',
  //           icon: 'none',
  //           duration: 1500,
  //         });
  //         return false;
  //       }
  //       if (key_id.substr(0, 2) == '00') {
  //         var key_id_two = key_id.substr(-2);
  //         wx.showToast({
  //           title: '您第' + key_id_two + '题未填写',
  //           icon: 'none',
  //           duration: 1500,
  //         });
  //         return false;
  //       }
  //       if (key_id.substr(0, 1) == '0') {
  //         var key_id_three = key_id.substr(-3);
  //         wx.showToast({
  //           title: '您第' + key_id_three + '题未填写',
  //           icon: 'none',
  //           duration: 1500,
  //         });
  //         return false;
  //       }
  //     }
  //   }
  //   wx.showLoading({
  //     title: '问卷提交中~',
  //   })
  //   // 对问卷答案做处理
  //   // var arr = answer.split(',');
  //   var arr = [];
  //   var questionnaire_detail = [];
  //   for (var key in answer) {
  //     arr.push(answer[key])
  //   }
  //   for (var i = 0; i < arr.length; i++) {
  //     if (i < 10) {
  //       if (typeof(arr[i]) == 'string') {
  //         questionnaire_detail[i] = {
  //           "question_id": "question_000" + (i + 1), //问题的id
  //           "answer_content": arr[i] //假设该问题类型是单选或是多选（用'，'分割）
  //         }
  //       } else if (typeof(arr[i]) == 'number') {
  //         var answer_content = arr[i] + '';
  //         questionnaire_detail[i] = {
  //           "question_id": "question_000" + (i + 1), //问题的id
  //           "answer_content": answer_content //假设该问题类型是单选或是多选（用'，'分割）
  //         }
  //         console.log('这是数字', typeof(arr[i]))
  //       } else if (typeof(arr[i]) == 'object') {
  //         var inner_arr = [];
  //         var answer_content = '';
  //         // console.log(inner_arr);
  //         for (var key in arr[i]) {
  //           inner_arr.push(arr[i])
  //         }

  //         // 取值
  //         var now_arr = inner_arr[0];
  //         for (var x = 0; x < now_arr.length; x++) {
  //           var content = now_arr[x];
  //           if (answer_content == '') {
  //             var answer_content = content;
  //           } else {
  //             var answer_content = answer_content + ',' + content;
  //           }
  //           questionnaire_detail[i] = {
  //             "question_id": "question_000" + (i + 1),
  //             "answer_content": answer_content
  //           }
  //         }
  //       }
  //       that.setData({
  //         questionnaire_detail: questionnaire_detail
  //       })
  //       // console.log(that.data.questionnaire_detail);
  //     } else {
  //       if (typeof(arr[i]) == 'string') {
  //         questionnaire_detail[i] = {
  //           "question_id": "question_00" + (i + 1), //问题的id
  //           "answer_content": arr[i] //假设该问题类型是单选或是多选（用'，'分割）
  //         }
  //       } else if (typeof(arr[i]) == 'number') {
  //         var answer_content = arr[i] + '';
  //         questionnaire_detail[i] = {
  //           "question_id": "question_00" + (i + 1), //问题的id
  //           "answer_content": answer_content //假设该问题类型是单选或是多选（用'，'分割）
  //         }
  //         // console.log('这是数字', typeof(arr[i]))
  //       } else if (typeof(arr[i]) == 'object') {
  //         var inner_arr = [];
  //         var answer_content = '';
  //         // console.log(inner_arr);
  //         for (var key in arr[i]) {
  //           inner_arr.push(arr[i])
  //         }

  //         // 取值
  //         // console.log(inner_arr[0], inner_arr[0].length, typeof (inner_arr[0]))
  //         var now_arr = inner_arr[0];
  //         for (var x = 0; x < now_arr.length; x++) {
  //           // console.log(now_arr[x], '这个是字符串')
  //           var content = now_arr[x];
  //           if (answer_content == '') {
  //             var answer_content = content;
  //           } else {
  //             var answer_content = answer_content + ',' + content;
  //           }
  //           questionnaire_detail[i] = {
  //             "question_id": "question_00" + (i + 1),
  //             "answer_content": answer_content
  //           }
  //         }
  //       }
  //       that.setData({
  //         questionnaire_detail: questionnaire_detail
  //       })
  //     }
  //   }
  //   // 获取最终传的参数
  //   // console.log(that.data.questionnaire_detail);
  //   var questionnaire_detail = that.data.questionnaire_detail;
  //   var open_id = that.data.open_id;
  //   var questionnaire_id = that.data.questionnaire_id;
  //   var data = {
  //     'data': {
  //       questionnaire_detail: questionnaire_detail,
  //       open_id: open_id,
  //       questionnaire_id: questionnaire_id
  //     }
  //   }

  //   var nav_id = ++that.data.nav_id;
  //   console.log(nav_id)
  //   if (nav_id < 2) {
  //     wx.request({
  //       url: 'https://xcx.cdmetrokyb.com/submit_questionnaire.php',
  //       data: {
  //         passenger_questionnaire: data
  //       },
  //       success: function(res) {
  //         console.log(res);
  //         if (res.data.msg == 'ok') {
  //           setTimeout(function() {
  //             setTimeout(function() {
  //               wx.hideLoading()
  //             }, 200)
  //             wx.reLaunch({
  //               url: '/pages/questionnaire-success/questionnaire-success'
  //             })
  //           }, 500);
  //         } else if (res.data.msg == 'error' && res.data.error_log == "too many") {
  //           wx.showToast({
  //             title: '您已经提交过问卷了~',
  //             icon: 'none',
  //             duration: 1500
  //           })
  //         }
  //       },
  //       fail: function() {
  //         wx.showToast({
  //           title: '提交失败请稍后再试~',
  //           icon: 'none',
  //           duration: 1500
  //         })
  //       }
  //     })
  //     that.setData({
  //       nav_id: '0'
  //     })
  //   }
  //   that.setData({
  //     nav_id: nav_id
  //   })
  // },
  onHide: function() {
    this.setData({
      nav_id: '0'
    })
  }
})