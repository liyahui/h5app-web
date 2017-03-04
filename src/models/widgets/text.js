import base from './base'
import extend from 'extend'
import { widgetNames } from 'utils'

export default extend(true, {} ,base, {
	name: widgetNames.TEXT,
	style: {
		width: 200,
		height: '',
		left: 70,
		lineHeight: 1.4,
    fontSize: 18,
		color: '#333',
		textAlign: 'left',
		fontWeight: '',
		fontStyle: '',
		textDecoration: '',
		backgroundColor: 'transparent'
	},
	
	content: '输入文本',

	state: {
		focus: true
	}
})