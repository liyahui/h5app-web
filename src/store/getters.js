export default {
	// 获取当前页面
	page(state, getters) {
		return state.h5app.pages[getters.pageIndex]
	},

	// 当前页面索引
	pageIndex(state, getters) {
    if (state.pageID) {
		  return state.h5app.pages.findIndex(page => page.id === state.pageID)
    }
    return -1
	},

	// 获取当前组件
	widget(state, getters) {
    if (getters.page) {
      return getters.page.widgets[getters.widgetIndex]
    }
	},

	// 当前组件索引
	widgetIndex(state, getters) {
    if (getters.page) {
		  return getters.page.widgets.findIndex(widget => widget.id === state.widgetID)
    }
    return -1
	},

	// 下一个页面ID
	nextPageID(state, getters) {
		let id = 0
		state.h5app.pages.forEach(page => {
			if (page.id > id) {
				id = page.id
			}
		})
		return id + 1
	},

  // 下一个组件
  nextWidgetID(state, getters) {
    let id = 0
    getters.page.widgets.forEach(widget => {
      if (widget.id > id) {
        id = widget.id
      }
    })
    return id + 1
  }
}