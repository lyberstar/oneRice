
import { request } from "../../utils/util.js"
import { urlList } from "../../asset/urlList.js"
const app = getApp()

Page({
  data: {
    question1:[
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
      }
    ],
    question2:[
      {
        question_name:'Q2:你认为一勺米公益挑战是否有助于打破邻里冷漠？',
        question_id: "question_0002",
        question_style:2,
        answer_list:[
          {
            answer_name: "是",
            answer_code: "A",
          },
          {
            answer_name: "否",
            answer_code: "B",
          }
        ]
      },
      {
        question_name:'Q3:你认为当前邻里关系现状是？',
        question_id: "question_0003",
        question_style:2,
        answer_list:[
          {
            answer_name: "亲密",
            answer_code: "A",
          },
          {
            answer_name: "舒适",
            answer_code: "B",
          },
          {
            answer_name: "疏离",
            answer_code: "C",
          },
          {
            answer_name: "冷漠",
            answer_code: "D",
          }
        ]
      }
    ],
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
      question1: new_itmes  
    })
  },
  getQ1Answer(question_0001) {
    let new_question_0001 = []
    question_0001.map(item => {
      switch(item) {
        case "0":
          new_question_0001.push('A')
          break
        case "1":
          new_question_0001.push('B')
          break
        case "2":
          new_question_0001.push('C')
          break
        case "3":
          new_question_0001.push('D')
          break
        case "4":
          new_question_0001.push('E')
          break
      }
    })
    return new_question_0001.join()
  },
  formSubmit:function(e){
    let { question_0001, question_0002, question_0003 } = e.detail.value
    question_0001 = this.getQ1Answer(question_0001)
    if (!question_0001 || !question_0002 || !question_0003) {
      wx.showToast({
        title: '请完成所有题目',
        icon: 'none',
        duration: 1000,
      });
      return
    }
    wx.showLoading({
      title: '提交中',
    })
    const answer = {question_0001, question_0002, question_0003}
    this.uploadAnswer(answer)
  },

  uploadAnswer(answer){
    let temp = JSON.stringify(answer)
    request('POST', urlList.uploadAnswer, {survey: temp}, app.globalData.openId, this.uploadAnswerSuccess)
  },

  uploadAnswerSuccess(res){
    if (res.data.code == 0) {
      wx.hideLoading()
      wx.redirectTo({
        url:'/pages/poster/poster'
      })
    }
  },
})