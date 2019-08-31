// pages/rank/rank.js
import { IMG_LIST } from "../../asset/imgList.js"
import { request, getAreaName } from "../../utils/util.js"
import { urlList } from "../../asset/urlList.js"
const app = getApp()

Page({
  data: {
    rankImg: [IMG_LIST.num1, IMG_LIST.num2, IMG_LIST.num3],
    myRank: {
      areaName: '区域',
      name: '姓名',
      steps: 0,
      likes: 0,
      rank: 0,
    },
    rankList: [],
    pageIndex: 1,
    pageSize: 20,
    pageCount: 1,
    freshData: false,
    rankType: 0, // 0:area 1: total
  },
  onLoad: function (options) {
    this.setData({
      canLoad: true,
      rankList: [],
    }, () => {
      this.loadRank()
    })
  },
  loadMoreRank() {
    const { pageIndex, pageSize, pageCount, canLoad, rankType } = this.data
    if (pageIndex === pageCount || !canLoad) {
      return
    }
    const data = {
      pageIndex: pageIndex+1,
      pageSize,
      type: rankType,
    }
    this.setData({
      freshData: false,
    }, () => {
      this.requestLoadRank(data)
    })
  },
  loadRank() {
    const { pageSize, canLoad, rankType } = this.data
    if (!canLoad) {
      return
    }
    const data = {
      pageIndex: 1,
      pageSize,
      type: rankType,
    }
    this.setData({
      freshData: true,
    }, () => {
      this.requestLoadRank(data)
    })
  },
  requestLoadRank(data) {
    const { pageIndex, rankType, freshData }  = this.data

    const that =  this
    that.setData({
      canLoad: false
    })
    wx.showLoading({
      title: '加载中',
    })
    setTimeout(function () {
      wx.hideLoading()
    }, 600)
    request('POST', urlList.rankList, data, app.globalData.openId, this.getPersonRankSuccess, this.getPersonRankFail)
    // 1000ms之后才可以继续加载，防止加载请求过多
    setTimeout(function () {
      that.setData({
        canLoad: true
      })
    }, 1000)
  },
  getPersonRankSuccess(res) {
    let { rankList, freshData, pageIndex, rankType } = this.data
    const pageRankList = rankType === 0 ? res.data.result.regRank.data : res.data.result.partRank.data
    const newRankList = freshData ? pageRankList : [...rankList, ...pageRankList]
    const newPageIndex = freshData ? 1 : pageIndex + 1
    this.setData({
      rankList: newRankList,
      pageCount: res.data.result.pageCount,
      pageIndex: newPageIndex,
    })
  },
  switchToArea() {
    this.switchRankType(0)
  },
  switchToTotal() {
    this.switchRankType(1)
  },
  switchRankType(currentType) {
    const { pageSize, rankType } = this.data
    if (rankType === currentType) {
      return
    }
    const data = {
      pageIndex: 1,
      pageSize,
      type: currentType,
    }
    this.setData({
      pageIndex: 1,
      canLoad: true,
      freshData: true,
      rankType: currentType,
    }, () => {
      this.requestLoadRank(data)
    })
  },
})