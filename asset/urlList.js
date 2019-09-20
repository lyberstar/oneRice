const urlList = {
  getOpenId: '/wx/login', // 换取sessionkey
  getUserStatus: '/wx/get_user_info',  //获取用户状态
  firstUpload: '/task/list_upload',   //报名
  sigleTask: '/task/task_upload',     //单个任务提交
  uploadAnswer: '/task/ask_upload',     //单个任务提交
  tastDetail: '/task/task_detail',    //任务详情   
  getActivityDetail: '/task/cover_intro', // 获取活动介绍
  rankList: '/task/rankList', // 获取区域个人排行列表
  newsList: '/wx/news',  //获取新闻列表
  newsDetail: '/wx/newsDetail', //新闻详情

  testMD5: '/file/queryByMd5',
  uploadFile: '/file/uploadFile',

  localList:'/dic/org'
}

// const baseUrl = 'https://www.easy-mock.com/mock/5d513bbb5499932132a80e4d/mock'

const baseUrl = 'https://or.cdstwlkj.com/api/v1'

const fileUrl = 'https://files.cdstwlkj.com'

module.exports = {
  urlList,
  baseUrl,
  fileUrl,
}