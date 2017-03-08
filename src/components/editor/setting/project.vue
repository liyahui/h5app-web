<template>
  <div class="properties">
  	<div class="properties__item">
			<div class="project-icon">
				<div class="project-icon__preview transparent">
					<img :src="h5app.icon" v-if="h5app.icon">
				</div>
				<div class="project-icon__operate">
					<ui-button @click="openResource('image', 'project')" type="primary" block>选择图标</ui-button>
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

    <div class="properties__item">
      <ui-row>
        <ui-col :span="6">
          背景颜色
        </ui-col>
        <ui-col :span="18">
          <ui-color 
            :empty="false"
            :value="h5app.props.bgcolor"
            @input="setProjectProps('bgcolor', $event)">
          </ui-color>
        </ui-col>
      </ui-row>
    </div>
    <div class="properties__tips">
      全局背景颜色，每个页面可以单独设置背景颜色
    </div>

    <hr>

    <page-effect 
      :value="h5app.props.effect"
      @change="setProjectProps('effect', $event)">
    </page-effect>
    <div class="properties__tips">
      全局切换效果，每个页面可以单独设置切换效果
    </div>

    <hr>

    <div class="properties__item">
      <ui-row>
        <ui-col :span="6">背景音乐</ui-col>
        <template v-if="h5app.props.music.url">
          <ui-col :span="10">
            <ui-button 
              block
              key="2"
              type="primary"
              @click="openResource('music', true)">
              <div class="properties__music-name">
                {{h5app.props.music.name}}
              </div>
            </ui-button>
          </ui-col>
          <ui-col :span="3" :offset="1">
            <ui-button 
              block 
              :icon="musicPlay ? 'stop' : 'triangle-right'" 
              @click="toggleMusic">
              <audio :src="h5app.props.music.url" ref="music"></audio>
            </ui-button>
          </ui-col>
          <ui-col :span="3" :offset="1">
            <ui-button block icon="trash" @click="clearMusic"></ui-button>
          </ui-col>
        </template>
        <template v-else>
          <ui-col :span="18">
            <ui-button
              block
              key="1"
              @click="openResource('music', true)">
              选择音乐
            </ui-button>
          </ui-col>
        </template>
      </ui-row>
    </div>

  	<div class="properties__item">
      <ui-row>
        <ui-col :span="6">滑动方向</ui-col>
        <ui-col :span="18">
        	<ui-button-group>
        		<ui-button 
	      			v-for="direction in slideDirections"
	      			v-text="direction.label"
	      			:type="direction.value === h5app.props.direction ? 'primary' : 'default'"
	      			@click="setProjectProps('direction', direction.value)">
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
        			:type="loop.value === h5app.props.loop ? 'primary' : 'default'"
        			@click="setProjectProps('loop', loop.value)">
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
	import { uiRow, uiCol, uiButton, uiInput, uiButtonGroup, uiColor } from 'ui'
  import pageEffect from './page-effect'

  export default {
  	components: {
  		uiRow,
  		uiCol,
  		uiButton,
  		uiButtonGroup,
  		uiInput,
      pageEffect,
      uiColor
  	},
  	computed: {
  		...mapState(['h5app']),
  	},
  	methods: {
  		openResource(type, target) {
  			this.$store.commit(types.RESOURCE_TARGET, { type, target })
  		},
  		setProject(key, value) {
  			this.$store.commit(types.SET_PROJECT, {
  				[key]: value
  			})
  		},
  		setProjectProps(key, value) {
  			this.$store.commit(types.SET_PROJECT_PROPS, {
  				[key]: value
  			})
  		},
      toggleMusic() {
        this.$nextTick(() => {
          if (this.musicPlay) {
            this.musicPlay = false
            this.$refs.music.pause()
          } else {
            this.musicPlay = true
            this.$refs.music.pause()
            this.$refs.music.play()
          }
        })
      },
      clearMusic() {
        this.setProjectProps('music', '')
        this.musicPlay = false
        this.$refs.music.pause()
      }
  	},
  	data() {
  		return {
        musicPlay: false,
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

  @include B(properties) {
    .icon-trash {
      font-size: 20px;
      margin-left: -5px;
    }

    .icon-stop {
      margin-left: -1px;
    }

    @include E(music-name) {
      width: 90px;
      display: inline-block;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }
</style>