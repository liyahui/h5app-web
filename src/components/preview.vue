<template>
  <div class="project-preview">
  	<ui-modal :value="value" @input="$emit('input', false)" :title="data.title">
			<iframe src="http://localhost:8888/" frameborder="0"></iframe>
			<div class="project-preview__data">
				
			</div>
  	</ui-modal>
  </div>
</template>

<script>
	import { uiModal } from 'ui'

  export default {
  	props: {
  		value: Boolean,
  		data: Object
  	},
  	components: {
  		uiModal
  	}
  }
</script>

<style lang="sass">
	@include B(project-preview) {
		@include E(data) {
			width: 100px;
			height: 100px;
			background: #fff;
		}

		.ui-modal__main {
			width: 375px;
			margin-left: -187.5px;
			top: 50%;
			margin-top: -315.315px;
		}

		.ui-modal__body {
			padding: 0px;
			height: 590.625px;

			iframe {
				width: 100%;
				height: 100%;
			}
		}

		.ui-modal__foot {
			display: none;
		}
	}
</style>