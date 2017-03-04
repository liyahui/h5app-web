import * as types from 'store/types'

export default {
	methods: {
		showContextmenu(e) {
			let rect = this.$el.getBoundingClientRect()
			let x = e.clientX - rect.left
			let y = e.clientY - rect.top

			this.contextmenu.position.x = x
			this.contextmenu.position.y = y
			this.contextmenu.show = false
			
			this.$nextTick(() => {
        this.$store.commit(types.SET_WIDGET_STATE, {
          state: { 
        		border: true,
        		resize: true
    			}
        })
				this.contextmenu.show = true
			})
		}
	},
	data() {
		return {
			contextmenu: {
				show: false,
				list: {},
				position: {
					x: 0,
					y: 0
				}
			}
		}
	}
}