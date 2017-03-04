export default {
  image: {
    init: false,
    path: 'image',
    params: {},
    target: false,
    total: 0,
    list: [],
    cache: [],
    size: 24,
    page: 1
  },
  show: {
    init: false,
    path: 'projects',
    params: {},
    total: 0,
    page: 1,
    size: 10,
    list: [],
    cache: []
  },
  user: {
    init: false,
    path: 'projects',
    params: {
      user: true
    },
    total: 0,
    page: 1,
    size: 10,
    list: [],
    cache: []
  }
}
