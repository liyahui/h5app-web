import Vue from 'vue'
import * as types from 'store/types'
import axios from 'axios'
import { API_PATH } from 'utils'

axios.defaults.baseURL = API_PATH
axios.defaults.headers.common['Authorization'] = localStorage.token

export default {
  // 上传资源
  async [types.UPLOAD_RESOURCE]({ commit }, { type, data }) {
    const res = await axios.post(`resources/${type}`, data)

    if (res.data.code === 0) {
      commit(types.ADD_CACHE_LIST, {
        type,
        item: res.data.resource
      })
    } else {
      Vue.$toast.show(res.data.message)
    }
  },

  // 删除资源
  async [types.DELETE_RESOURCE]({ commit }, { type, item }) {
    const res = await axios.delete(`resources/${type}/${item.id}`)

    if (res.data.code === 0) {
      commit(types.DELETE_CACHE_LIST, { type, item })
    } else {
      Vue.$toast.show(res.data.message)
    }
  },

  // 用户登录/注册
  async [types.SET_USER]({ state, commit }, { username, password }) {
    const res = await axios.post(`user/${state.passport.type}`, { username, password })

    if (res.data.code === 0) {
      axios.defaults.headers.common['Authorization'] = res.data.token
      commit(types.SET_USER, {
        user: res.data.user,
        token: res.data.token
      })
    } else {
      Vue.$toast.show(res.data.message)
    }
  },

  // 获取用户信息
  async [types.GET_USER]({ commit }) {
    const res = await axios.get('user/current')

    if (res.data.code === 0) {
      commit(types.SET_USER, {
        user: res.data.user
      })
    }
  },

  // 创建项目
  async [types.ADD_PROJECT]({ state, commit }, payload) {
    let params = {}
    if (payload && payload.item) {
      params.id = payload.item.id
    } else {
      params.pages = state.h5app.pages
      params.props = state.h5app.props
    }

    const res = await axios.post('projects', params)
    const user = state.cacheList.user

    if (res.data.code === 0) {
      user.init && commit(types.ADD_CACHE_LIST, {
        type: 'user',
        item: res.data.project
      })
      return res.data.project
    } else {
      Vue.$toast.show(res.data.message)
    }
  },

  // 删除项目
  async [types.DELETE_PROJECT]({ commit }, { item }) {
    const res = await axios.delete(`projects/${item.id}`)
    if (res.data.code === 0) {
      commit(types.DELETE_CACHE_LIST, { type: 'show', item })
      commit(types.DELETE_CACHE_LIST, { type: 'user', item })
    } else {
      Vue.$toast.show(res.data.message)
    }
  },

  // 获取项目数据
  async [types.GET_PROJECT]({ commit }, { id }) {
    const res = await axios.get(`projects/${id}`)

    if (res.data.code === 0) {
      const { id, title, desc, icon, pages, props } = res.data.project
      commit(types.SET_PROJECT, {
        id,
        title,
        desc,
        icon,
        pages,
        props
      })
    } else {
      Vue.$toast.show(res.data.message)
    }
    return res.data.project
  },

  // 保存项目数据
  async [types.SAVE_PROJECT]({ commit, state }) {
    commit(types.SET_WIDGET_ID)

    const homePage = document.querySelector('.stage .viewport .page')
    const canvas = await html2canvas(homePage, { useCORS: true })
    const cover = canvas.toDataURL('image/jpeg')

    const item = {
      title: state.h5app.title,
      desc: state.h5app.desc,
      icon: state.h5app.icon,
      cover: cover,
      pages: state.h5app.pages,
      props: state.h5app.props
    }

    const res = await axios.put(`projects/${state.h5app.id}`, item)

    if (res.data.code === 0) {
      item.id = state.h5app.id
      item.uid = state.h5app.uid
      item.cover = res.data.cover
      commit(types.UPDATE_CACHE_LIST, { type: 'show', item })
      commit(types.UPDATE_CACHE_LIST, { type: 'user', item })
    }

    Vue.$toast.show(res.data.message)
  },

  // 获取指定类型列表数据
  async [types.GET_CACHE_LIST]({ state, commit }, { type, page }) {
    if (!type || !page) return

    const data = state.cacheList[type]
    const limit = data.size
    const offset = (page - 1) * limit
    const end = Math.min(offset + limit, data.total)
    let existCache = end > offset

    for (let i = offset; i < end; i++) {
      if (!data.cache[i]) {
        existCache = false
      }
    }

    if (data.init && data.total === 0) {
      existCache = true
    }

    if (existCache) {
      const list = data.cache.slice(offset, offset + limit)
      commit(types.SET_CACHE_LIST, { type, list, page })
    } else {
      const res = await axios.get(data.path, {
        params: { offset, limit, ...data.params }
      })
      const { list, total } = res.data
      commit(types.SET_CACHE_LIST, { type, list, total, page, offset })
    }
  }
}
