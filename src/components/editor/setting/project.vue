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

  	<hr>
    
    <page-effect 
      :value="h5app.extends.effect"
      @change="setProjectExtends('effect', $event)">
    </page-effect>
    <div class="properties__tips">
      全局切换效果，每个页面可以单独设置切换效果
    </div>

    <hr>

  	<div class="properties__item">
      <ui-row>
        <ui-col :span="6">滑动方向</ui-col>
        <ui-col :span="18">
        	<ui-button-group>
        		<ui-button 
	      			v-for="direction in slideDirections"
	      			v-text="direction.label"
	      			:type="direction.value === h5app.extends.direction ? 'primary' : 'default'"
	      			@click="setProjectExtends('direction', direction.value)">
	      		</ui-button>
        	</ui-button-group>
        </ui-col>
      </ui-row>
    </div>
  
    <div class="properties__item">
      <ui-row>
        <ui-col :span="6">循环播放</ui-col>
        <ui-col :span="18">
        	<ui-button-group>
        		<ui-button 
        			v-for="loop in loopOptions"
        			v-text="loop.label"
        			:type="loop.value === h5app.extends.loop ? 'primary' : 'default'"
        			@click="setProjectExtends('loop', loop.value)">
        		</ui-button>
        	</ui-button-group>
        </ui-col>
      </ui-row>
    </div>
  </div>
</template>

<script>
	import * as types from 'store/types'
	import { mapState } from 'vuex'
	import { uiRow, uiCol, uiButton, uiInput, uiButtonGroup } from 'ui'
  import pageEffect from './page-effect'

  export default {
  	components: {
  		uiRow,
  		uiCol,
  		uiButton,
  		uiButtonGroup,
  		uiInput,
      pageEffect
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
  		},
  		setProjectExtends(key, value) {
  			this.$store.commit(types.SET_PROJECT_EXTENDS, {
  				[key]: value
  			})
  		}
  	},
  	data() {
  		return {
  			slideDirections: [{
  				value: 'vertical',
  				label: '垂直'
  			}, {
  				value: 'horizontal',
  				label: '水平'
  			}],
  			loopOptions: [{
  				value: true,
  				label: '是'
  			}, {
  				value: false,
  				label: '否'
  			}]
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