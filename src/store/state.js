import extend from 'extend'
import h5app from 'models/h5app'
import cacheList from 'models/cacheList'

export default {
  user: null,
  pageID: 0,
  widgetID: 0,
  clipboard: null,

  passport: {
    visible: false,
    type: ''
  },

  preview: {
    visible: false,
    project: {}
  },

  h5app: extend(true, {}, h5app),

  cacheList: extend(true, {}, cacheList),
}
