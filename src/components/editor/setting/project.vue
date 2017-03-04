<template>
  <div class="properties">
  	<div class="properties__item">
			<div class="project-icon">
				<div class="project-icon__preview transparent">
					<img :src="h5app.icon" v-if="h5app.icon">
				</div>
				<div class="project-icon__operate">
					<ui-button @click="openResource" type="primary" block>选择图标</ui-button>
					<ui-button block v-if="h5app.icon" @click="setProject('icon', '')">移除</ui-button>
				</div>
			</div>
  	</div>

  	<div class="properties__item">
  		<ui-input 
  			placeholder="标题" 
  			:value="h5app.title"
  			@input="setProject('title', $event)">
			</ui-input>
  	</div>

  	<div class="properties__item">
			<ui-input 
				type="area" 
				placeholder="描述" 
				:value="h5app.desc"
				@input="setProject('desc', $event)">
			</ui-input>
  	</div>
  </div>
</template>

<script>
	import * as types from 'store/types'
	import { mapState } from 'vuex'
	import { uiRow, uiCol, uiButton, uiInput } from 'ui'

  export default {
  	components: {
  		uiRow,
  		uiCol,
  		uiButton,
  		uiInput
  	},
  	computed: {
  		...mapState(['h5app'])
  	},
  	methods: {
  		openResource() {
  			this.$store.commit(types.RESOURCE_TARGET, {
  				type: 'image',
  				target: 'project'
  			})
  		},
  		setProject(key, value) {
  			this.$store.commit(types.SET_PROJECT, {
  				[key]: value
  			})
  		}
  	}
  }
</script>

<style lang="sass">
	@include B(project-icon) {
		height: 140px;
		display: flex;
		justify-content: space-between;
		
		margin-bottom: 10px;

		@include E(preview) {
			width: 140px;
			height: 100%;
			border-radius: $borderRadius;
			border: 1px solid $borderColor;

			img {
				width: 100%;
				height: 100%;
			}
		}

		@include E(operate) {
			width: 100px;
			height: 100%;
			display: flex;
			flex-direction: column;
			.ui-button {
				margin-bottom: 10px;
			}
		}
	}
</style>