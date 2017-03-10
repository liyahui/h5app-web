import index from 'components'
import home from 'components/home'
import list from 'components/list'
import editor from 'components/editor'

export default [{
  path: '/',
  component: index,
  children: [{
    path: '/',
    component: home
  }, {
    path: '/cases',
    meta: { auth: false },
    component: list
  }, {
    path: '/projects',
    component: list
  }]
}, {
  path: '/editor/:id',
  component: editor
}, {
	path: '*',
	redirect: '/'
}]
