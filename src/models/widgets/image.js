import base from './base'
import extend from 'extend'
import { widgetNames } from 'utils'

export default extend(true, {}, base, {
	name: widgetNames.IMAGE,
	style: {
		width: 160,
		height: 243
	},
	url: 'http://res.70c.com/cloudapppic/2016/12/30/9519107b035f89af.jpg',
})