import * as types from 'store/types'
import { PAGE_NAME, widgetNames, VIEWPORT_WIDTH, VIEWPORT_HEIGHT, isDefined, sizeScale } from 'utils'
import store from 'store'
import extend from 'extend'
import animationModel from 'models/animation/model'
import widgetModels from 'models/widgets'
import pageModel from 'models/page'
import cacheListModel from 'models/cacheList'
import h5appModel from 'models/h5app'

const mutations = {
  // 添加页面
  [types.ADD_PAGE](state, payload = { copy: false }) {
    const page = extend(true, {}, payload.copy ? store.getters.page : pageModel)

    if (payload.copy) {
      page.name = PAGE_NAME
    }

    page.id = store.getters.nextPageID
    page.name += page.id
    state.h5app.pages.push(page)
    mutations[types.SET_PAGE_ID](state, { id: page.id })
  },

  // 设置当前页面ID
  [types.SET_PAGE_ID](state, payload) {
    mutations[types.SET_WIDGET_ID](state, { id: 0 })
    state.pageID = payload.id
  },

  // 设置页面名称
  [types.SET_PAGE_NAME](state, { name }) {
    store.getters.page.name = name
  },

  // 设置页面样式
  [types.SET_PAGE_BACKGROUND](state, payload) {
    let page = store.getters.page
    page.background = {...page.background, ...payload.background }
  },

  // 页面排序
  [types.SORT_PAGE](state, payload) {
    let index = store.getters.pageIndex
    let pages = state.h5app.pages

    let swap = pos => pages.splice(pos, 1, pages[index]).shift()

    switch (payload.key) {
      case 'up':
        pages[index] = swap(index - 1)
        break
      case 'down':
        pages[index] = swap(index + 1)
        break
    }
  },

  // 删除页面
  [types.DELETE_PAGE](state, payload) {
    let index = store.getters.pageIndex
    let prev = state.h5app.pages[index - 1]
    let next = state.h5app.pages[index + 1]

    state.h5app.pages.splice(index, 1)

    if (next) {
      mutations[types.SET_PAGE_ID](state, { id: next.id })
    } else if (prev) {
      mutations[types.SET_PAGE_ID](state, { id: prev.id })
    } else {
      mutations[types.SET_PAGE_ID](state, { id: 0 })
    }
  },

  // 播放/停止页面动画
  [types.PAGE_ANIMATION](state, { play }) {
    store.getters.page.widgets.forEach(widget => {
      widget.state.play = play
    })
  },

  // 添加组件
  [types.ADD_WIDGET](state, payload) {
    if (!state.pageID) return

    let widgets = store.getters.page.widgets
    let widget = payload.copy ? state.clipboard : widgetModels[payload.type]
    widget = extend(true, {}, widget, payload)
    widget.id = store.getters.nextWidgetID

    if (payload.copy) {
      widget.name = widgetNames[widget.type.toUpperCase()]
    }

    const size = sizeScale(widget.style)
    widget.style.width = size.width
    widget.style.height = size.height

    widget.name += widget.id
    widgets.push(widget)

    mutations[types.SET_WIDGET_ID](state, { id: widget.id })

    !payload.copy && mutations[types.SET_WIDGET_POSITION](state, {
      value: 'center'
    })
  },

  // 设置当前组件ID
  [types.SET_WIDGET_ID](state, payload = { id: 0 }) {
    // 取消旧组件
    let oldWidget = store.getters.widget
    if (oldWidget) {
      oldWidget.state.resize = oldWidget.state.border = false
      if (oldWidget.type === 'text') {
        oldWidget.state.focus = false
      }
    }

    // 设置新组件
    state.widgetID = payload.id

    // 选中新组件
    let newWidget = store.getters.widget
    if (newWidget && !newWidget.state.lock) {
      newWidget.state.resize = newWidget.state.border = true
    }
  },

  // 设置组件名称
  [types.SET_WIDGET_NAME](state, { name }) {
    store.getters.widget.name = name
  },

  // 设置组件样式
  [types.SET_WIDGET_STYLE](state, payload) {
    let widget = store.getters.widget
    if (widget && !widget.state.lock) {
      widget.style = {...widget.style, ...payload.style }
    }
  },

  // 设置组件位置
  [types.SET_WIDGET_POSITION](state, { value }) {
    let style = store.getters.widget.style
    switch (value) {
      case 'left':
        style.left = 0
        break
      case 'center':
        style.left = (VIEWPORT_WIDTH - style.width) / 2
        break
      case 'right':
        style.left = VIEWPORT_WIDTH - style.width
        break
      case 'top':
        style.top = 0
        break
      case 'middle':
        style.top = (VIEWPORT_HEIGHT - style.height) / 2
        break
      case 'bottom':
        style.top = VIEWPORT_HEIGHT - style.height
        break
    }
  },

  // 添加组件动画
  [types.ADD_WIDGET_ANIMATION](state) {
    let data = extend(true, {}, animationModel)
    store.getters.widget.animations.push(data)
  },

  // 设置组件动画
  [types.SET_WIDGET_ANIMATION](state, { index, key, value }) {
    let animations = store.getters.widget.animations
    animations[index][key] = value
  },

  // 删除组件动画
  [types.DELETE_WIDGET_ANIMATION](state, { index }) {
    store.getters.widget.animations.splice(index, 1)
  },

  // 设置组件状态
  [types.SET_WIDGET_STATE](state, payload) {
    let widget = store.getters.widget
    if (widget) {
      widget.state = {...widget.state, ...payload.state }
    }
  },

  // 设置组件顺序
  [types.SORT_WIDGET](state, payload) {
    if (store.getters.widget.lock) return

    let index = store.getters.widgetIndex
    let widgets = store.getters.page.widgets
    let swap = pos => widgets.splice(pos, 1, widgets[index]).shift()

    switch (payload.key) {
      case 'up':
        widgets[index] = swap(index + 1)
        break
      case 'down':
        widgets[index] = swap(index - 1)
        break
      case 'top':
        widgets.push(widgets.splice(index, 1).shift())
        break
      case 'bottom':
        widgets.unshift(widgets.splice(index, 1).shift())
        break
    }
  },

  // 删除组件
  [types.DELETE_WIDGET](state) {
    if (store.getters.widget.lock) return

    store.getters.page.widgets.splice(store.getters.widgetIndex, 1)
    mutations[types.SET_WIDGET_ID](state, { id: 0 })
  },

  // 复制组件到粘贴板
  [types.COPY_WIDGET](state) {
    if (store.getters.widget) {
      state.clipboard = extend(true, {}, store.getters.widget)
    } else {
      state.clipboard = null
    }
  },

  // 设置文本内容
  [types.SET_TEXT_CONTENT](state, { content }) {
    if (store.getters.widget.lock) return
    store.getters.widget.content = content
  },

  // 打开/关闭指定资源
  [types.RESOURCE_TARGET](state, { type, target }) {
    const data = state.cacheList[type]
    data.target = target
  },

  // 登录/注册弹窗
  [types.SET_PASSPORT](state, payload) {
    state.passport = payload
  },

  // 设置用户信息
  [types.SET_USER](state, { user, token }) {
    state.user = user

    if (isDefined(token)) {
      localStorage.token = token
    }
  },

  // 设置当前编辑的项目数据
  [types.SET_PROJECT](state, payload) {
    state.h5app = { ...state.h5app, ...payload }

    if (state.h5app.pages.length === 0) {
      mutations[types.ADD_PAGE](state)
    } else {
      const id = state.h5app.pages[0].id
      mutations[types.SET_PAGE_ID](state, { id })
    }
  },

  // 设置项目扩展属性
  [types.SET_PROJECT_EXTENDS](state, payload) {
    state.h5app.extends = {
      ...state.h5app.extends,
      ...payload
    }
  },

  // 重置项目
  [types.RESET_PROJECT](state) {
    state.pageID = 0
    state.widgetID = 0
    state.clipboard = null
    state.h5app = extend(true, {}, h5appModel)
  },

  // 重置缓存列表
  [types.RESET_CACHE_LIST] (state) {
    state.cacheList = extend(true, {}, cacheListModel)
  },

  // 设置指定类型缓存列表
  [types.SET_CACHE_LIST](state, { type, list, total, page, offset }) {
    const data = state.cacheList[type]

    data.list = list
    data.page = page

    if (total && isDefined(offset)) {
      data.init = true
      data.total = total

      list.forEach((item, index) => {
        data.cache[offset + index] = item
      })
    }
  },

  // 指定类型缓存列表添加一项
  [types.ADD_CACHE_LIST](state, {type, item}) {
    const data = state.cacheList[type]
    data.cache.unshift(item)
    data.total += 1
    store.dispatch(types.GET_CACHE_LIST, { type, page: 1 })
  },

  // 更新指定类型缓存列表中的一项
  [types.UPDATE_CACHE_LIST](state, { type, item }) {
    const data = state.cacheList[type]
    const index = data.cache.findIndex(cache => cache && cache.id === item.id)
    index !== -1 && data.cache.splice(index, 1, item)
  },

  // 指定类型缓存列表删除一项
  [types.DELETE_CACHE_LIST](state, { type, item }) {
    const data = state.cacheList[type]
    const index = data.cache.findIndex(cache => cache && cache.id === item.id)
    index !== -1 && data.cache.splice(index, 1)
    data.total -= 1
    const page = data.total % data.size === 0 && data.page > 1 ? data.page - 1 : data.page
    store.dispatch(types.GET_CACHE_LIST, { type, page })
  }
}

export default mutations
