import { uiToast } from 'ui'

export default {
	install(Vue, options) {
		const Toast = Vue.extend(uiToast)

		let vm = new Toast({
			el: document.createElement('div')
		})

		document.body.appendChild(vm.$el)

		Vue.$toast = {
			show(options = '') {
				if (typeof options === 'string') {
					vm.text = options
				} else if (typeof options === 'object') {
					Object.keys(options).forEach(key => {
						vm[key] = options[key]
					})
				}

				if (options.onShow || options.onHide) {
					vm.$watch('value', val => {
						if (val) {
							options.onShow && options.onShow(vm)
						} else {
							options.onHide && options.onHide(vm)
						}
					})
				}
				vm.value = true
				vm.$on('input', val => {
					vm.value = val
				})
			},
			hide() {
				vm.show  = false
			}
		}

		Vue.mixin({
			created() {
				this.$toast = Vue.$toast
			}
		})
	}
}