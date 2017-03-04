import index from 'components'
import list from 'components/list'
import editor from 'components/editor'

export default [{
  path: '/',
  component: index,
  children: [{
    path: '/',
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
