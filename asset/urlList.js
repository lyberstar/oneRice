const urlList = {
  getOpenId: '/wx/login', // 换取sessionkey
  getUserStatus: '/wx/get_user_info',  //获取用户状态
  firstUpload: '/task/list_upload',   //报名
  sigleTask: '/task/task_upload',
  getActivityDetail: '/be/getAboutDetail', // 获取活动介绍
  rankList: '/rankList', // 获取区域个人排行列表
  newsList: '/be/getNewsList',  //获取新闻列表
  newsDetail: '/be/getNewsDetail', //新闻详情

  testMD5: '/file/queryByMd5',
  uploadFile: '/file/uploadFile'
}

// const baseUrl = 'https://www.easy-mock.com/mock/5d513bbb5499932132a80e4d/mock'

const baseUrl = 'http://25u4199n99.qicp.vip:12081'

const fileUrl = 'https://files.cdstwlkj.com'

module.exports = {
  urlList,
  baseUrl,
  fileUrl,
}