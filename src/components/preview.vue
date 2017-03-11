<template>
  <div class="project-preview">
  	<ui-modal :value="preview.visible" @input="closePreview" :title="preview.project.title">
			<iframe :src="appShowURL" frameborder="0"></iframe>
			<template slot="foot">
				预览地址：{{appShowURL}}
			</template>
  	</ui-modal>
  </div>
</template>

<script>
	import * as types from 'store/types'
	import { uiModal } from 'ui'
	import { mapState } from 'vuex'
	import { PREVIEW_PATH } from 'utils'

  export default {
  	components: {
  		uiModal
  	},
  	computed: {
  		...mapState(['preview']),

  		appShowURL() {
  			return `${PREVIEW_PATH}/?id=${this.preview.project.id}`
  		}
  	},
  	methods: {
  		closePreview() {
  			this.$store.commit(types.PREVIEW_PROJECT, {
  				visible: false,
  				project: {}
  			})
  		}
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
			margin-top: -335px;
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
			padding: 10px;
			background: #d9d9d9;
			-webkit-user-select: text;
			user-select: text;
		}
	}
</style>