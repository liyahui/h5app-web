const nodeList = []

window.addEventListener('mousedown', e => {
	nodeList.forEach(node => node.clickoutside(e))
}, false)

export default {
	bind(el, binding, vnode) {
		nodeList.push(el)

		el[binding.name] = e => {
			let stops = [el]

			if (el.dataset.name) {
				let other = Array.from(document.querySelectorAll(`[data-${el.dataset.name}-stop]`))
				stops = stops.concat(other)
			}

			let call = stops.every(stop => !stop.contains(e.target))
			let method = binding.expression
			call && method && vnode.context[method] && vnode.context[method](e)
		}
	},

	unbind(el) {
		let index = nodeList.findIndex(node => node === el)
		nodeList.splice(index, 1)
	}
}