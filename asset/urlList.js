const urlList = {
  getOpenId: '/login', // 换取sessionkey
  getUserStatus: '/get_user_info',  //获取用户状态
  getActivityDetail: '/be/getAboutDetail', // 获取活动介绍
  rankList: '/rankList', // 获取区域个人排行列表
}
const baseUrl = 'https://www.easy-mock.com/mock/5d513bbb5499932132a80e4d/mock'
module.exports = {
  urlList,
  baseUrl,
}