import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
import * as types from 'store/types'
import routes from 'utils/routes'
import clickoutside from 'utils/clickoutside'
import keyCodes from 'utils/keyCodes'
import Toast from 'utils/toast'
import { dev } from 'utils'

import 'normalize.css'
import 'animate.css'
import 'assets/iconfont'
import 'assets/scss/global.scss'

Vue.use(VueRouter)
Vue.use(Toast)
Vue.directive('clickoutside', clickoutside)
Vue.config.keyCodes = keyCodes
Vue.config.devtools = dev

const router = new VueRouter({ routes })

router.beforeEach((to, from, next) => {
  const user = store.state.user
  if (to.path !== '/' && !user && to.meta.auth !== false) {
    return next('/')
  }
  next()
})

store.dispatch(types.GET_USER).then(() => {
  new Vue({ store, router }).$mount('.h5app')
})
