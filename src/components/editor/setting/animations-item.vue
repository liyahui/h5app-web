<template>
  <div class="animations-item">
  	<div class="animations__item">
      <div class="animations__title" @click="$emit('open')">
        <ui-row>
          <ui-col :span="16">{{animationTitle}}</ui-col>
          <ui-col :span="8" justify="flex-end">
            <i class="iconfont icon-delete" @click.stop="$emit('delete')"></i>
            <i class="iconfont icon-play" @click="noticePlay"></i>
          </ui-col>
        </ui-row>
      </div>
      <div class="animations__options" v-if="open">
        <ui-row>
          <ui-col :span="4">类型</ui-col>
          <ui-col :span="20">
            <ui-button-group>
              <ui-button 
                v-for="scene, index in sceneList"
                v-text="scene.label"
                :type="sceneIndex === index ? 'primary' : 'default'" 
                @click="sceneIndex = index">
              </ui-button>
            </ui-button-group>
          </ui-col>
        </ui-row>
        <ui-row>
          <ui-col :span="4">动效</ui-col>
          <ui-col :span="20">
            <ui-select 
              :height="300"
            	:value="value.name"
            	:options="animationOptions"
            	@change="setAnimationProp('name', $event)">
            </ui-select>
          </ui-col>
        </ui-row>

        <ui-row v-if="directionOptions">
          <ui-col :span="4">方向</ui-col>
          <ui-col :span="20">
            <ui-select 
              placeholder="默认"
              :value="value.direction"
              :options="directionOptions"
              @change="setAnimationProp('direction', $event)">
            </ui-select>
          </ui-col>
        </ui-row>

        <ui-row>
          <ui-col :span="4">加速</ui-col>
          <ui-col :span="20">
            <ui-select 
              :value="value.timing"
              :options="timingOptions"
              @change="setAnimationProp('timing', $event)">
            </ui-select>
          </ui-col>
        </ui-row>

        <range-input
          unit="s"
          label="时间"
          :value="value.duration"
          :min="0"
          :max="100"
          :step="0.1"
          @change="setAnimationProp('duration', $event, false)">
        </range-input>

        <range-input
          unit="s"
          label="延时"
          :value="value.delay"
          :min="0"
          :max="20"
          :step="0.1"
          @change="setAnimationProp('delay', $event, false)">
        </range-input>

        <range-input
          unit="次"
          label="次数"
          :value="value.count"
          :min="0"
          :max="100"
          @change="setAnimationProp('count', $event, false)">
        </range-input>
      </div>
    </div>
  </div>
</template>

<script>
	import { uiRow, uiCol, uiNumber, uiSelect, uiButton, uiButtonGroup } from 'ui'
  import rangeInput from './range-input'
  import animations from 'models/animation/list'

  export default {
  	props: {
      open: {
        type: Boolean,
        default: true
      },
  		value: Object
  	},
  	components: {
      uiRow,
      uiCol,
      uiNumber,
      uiSelect,
      rangeInput,
      uiButton,
      uiButtonGroup
    },
    computed: {
      scene() {
        return this.sceneList[this.sceneIndex]
      },
      animationOptions() {
        return animations[this.scene.value]
      },
      animation() {
        return this.animationOptions.find(item => item.value === this.value.name)
      },
      directionOptions() {
        return this.animation && this.animation.directions
      },
      direction() {
        return this.directionOptions && this.directionOptions.find(item => {
          return item.value === this.value.direction
        })
      },
      animationTitle() {
        if (this.animation) {
          let direction = ''
          if (this.direction && this.direction.value) {
            direction = this.direction.label
          }
          return direction + this.animation.label
        }
        return '无动画'
      }
    },
    watch: {
      'value.name'() {
        if (this.directionOptions) {
          let defVal = this.directionOptions[0].value
          this.setAnimationProp('direction', defVal)
        }
      }
    },
    methods: {
      setAnimationProp(key, value) {
        this.$emit('input', {
          key,
          value
        })

        let namePlay = key === 'name' && !this.directionOptions
        let directionPlay = key === 'direction' && this.directionOptions
        let timingPlay = key === 'timing'
        
        if (namePlay || directionPlay || timingPlay) {
          this.noticePlay()
        }
      },
      noticePlay() {
        if (this.value.name && this.value.duration > 0) {
          this.$emit('play')
        }
      }
    },
    data() {
    	return {
    		timingOptions: [{
          value: 'linear',
          label: '无'
        }, {
          value: 'ease-in',
          label: '抹入'
        }, {
          value: 'ease-out',
          label: '抹出'
        }, {
          value: 'ease-in-out',
          label: '抹入抹出'
        }],

        sceneIndex: 0,
        sceneList: [{
          value: 'in',
          label: '出现'
        }, {
          value: 'on',
          label: '动作'
        }, {
          value: 'out',
          label: '消失'
        }]
    	}
    }
  }
</script>

<style lang="sass">
	@include B(animations) {
		@include E(item) {
      border: 1px solid $borderColor;
      border-radius: $borderRadius;
      margin-bottom: 10px;
    }

    @include E(title) {
      background: lighten($borderColor, 2%);
      padding: 0px 10px;
      line-height: 36px;
      height: 36px;

      .iconfont {
        font-size: 24px;
        cursor: pointer;
        color: $grayLight;
        margin-left: 5px;
        &:hover {
          color: $gray;
        }
      }
    }

    @include E(options) {
      background: lighten($borderColor, 7%);
      padding: 0px 10px;
      padding-top: 0px;
      .ui-row {
        margin-top: 10px;
        &:last-child {
          margin-bottom: 10px;
        }
      }
    }
	}
</style>