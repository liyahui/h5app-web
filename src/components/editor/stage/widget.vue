<template>
  <div 
    class="widget"
    :class="{'widget--focus': widget.state.focus}" 
    :style="outerStyle">

    <div 
      class="widget__main"
      :class="'widget__main--' + widget.type" 
      :style="innerStyle">
      
      <!-- 文本 -->
      <template v-if="widget.type === 'text'">
        <div 
          class="widget__input"
          ref="input"
          v-text="widget.content"
          :contenteditable="widget.state.focus && operate"
          @input="inputText"
          @mousedown="mouseDownText"
          @contextmenu.stop.prevent>
        </div>
      </template>
      
      <!-- 图片 -->
      <template v-if="widget.type === 'image'">
        <img :src="widget.url" class="widget__image">
      </template>
    </div>
    
    <control
      data-name="control"
      v-if="operate"
      v-clickoutside="clickoutside"
      :state="widget.state"
      :disable-height="widget.type === 'text'"
      @change="setWidgetStyle"
      @mousedown="setWidgetID"
      @dblclick.native="focusText"
      @contextmenu.native.stop.prevent="$emit('contextmenu', $event)">
    </control>
  </div>
</template>

<script>
  import * as types from 'store/types'
  import { mapState } from 'vuex'
  import { autoPX } from 'utils'
  import control from './control'

  export default {
  	props: {
  		widget: {
  			type: Object,
        default: () => {}
  		},
      operate: {
        type: Boolean,
        default: true
      }
  	},
    components: {
      control
    },
    computed: {
      ...mapState(['play', 'widgetID']),

      outerStyle() {
        let { width, height, left, top } = this.widget.style
        let style = { width, height, left, top }

        for (let key in style) {
          style[key] += 'px'
        }

        return style
      },
      innerStyle() {
        let { width, height, left, top, ...other } = this.widget.style

        for (let key in other) {
          if (autoPX.includes(key)) {
            other[key] += 'px'
          }
        }

        let transform = other.transform
        other.transform = `rotate(${transform.rotate}deg)`

        return other
      }
    },
    methods: {
      // 设置按下的组件为当前组件
      setWidgetID(e) {
        if (this.operate && this.widget.id !== this.widgetID) {
          e.stop = true
          this.$store.commit(types.SET_WIDGET_ID, { id: this.widget.id })
        }
      },

      // 设置组件样式
      setWidgetStyle(style) {
        this.$store.commit(types.SET_WIDGET_STYLE, { style })
      },

      clickoutside(e) {
        if (!e.stop && this.widgetID === this.widget.id) {
          this.$store.commit(types.SET_WIDGET_ID, { id: 0 })
        }
      },

      // 双击文本框获取焦点
      focusText() {
        if (this.widget.type === 'text' && !this.widget.state.lock) {
          this.$store.commit(types.SET_WIDGET_STATE, { 
            state: { focus: true }
          })
        }
      },

      // 点击文本框阻止取消选中组件
      mouseDownText(e) {
        e.stop = true
      },

      // 设置文本内容
      inputText(e) {
        this.setTextHeight()

        this.$store.commit(types.SET_TEXT_CONTENT, {
          content: e.target.textContent
        })
      },

      // 设置文本高度
      setTextHeight() {
        this.setWidgetStyle({
          height: this.$refs.input.offsetHeight + this.widget.style.borderWidth * 2
        })
      },

      // 选中文本内容
      selectText(val) {
        if (!val) return
        this.setTextHeight()

        this.$nextTick(() => {
          let range = document.createRange()
          range.selectNodeContents(this.$refs.input)
          range.setStart(this.$refs.input, 0);
          range.setEnd(this.$refs.input, this.$refs.input.childNodes.length);
          let select = window.getSelection()
          select.removeAllRanges()
          select.addRange(range)
        })
      },

      // 播放动画
      playAnimation(index) {
        if (index === true) { 
          this.animations = this.widget.animations.filter(animation => !!animation.name)
        } else if (index === false) {
          this.$el.style.animation = ''
        }else {
          this.animations = [this.widget.animations[index]]
        }
        this.nextAnimation()
      },

      // 循环播放
      nextAnimation() {
        if (this.animations.length) {
          let animation = this.animations.shift()
          let name = animation.name.replace('$1', animation.direction)
          let { duration, timing, delay, count } = animation
          count = count === 0 ? 1 : count

          this.$el.style.animation = `${name} ${duration}s ${timing} ${delay}s ${count} both`
        } else {
          this.$el.style.animation = ''
        }
      }
    },
    mounted() {
      if (this.operate) {
        this.$watch('widget.state.play', this.playAnimation)

        if (this.widget.type === 'text') {
          this.$watch('widget.state.focus', this.selectText, { immediate: true })
          this.$watch('widget.style.width', this.setTextHeight)
          this.$watch('widget.style.lineHeight', this.setTextHeight)
          this.$watch('widget.style.fontSize', this.setTextHeight)
          this.$watch('widget.style.borderWidth', this.setTextHeight)
        }

        this.$el.addEventListener('webkitAnimationEnd', this.nextAnimation, false)
      }
    },
    data() {
      return {
        animations: []
      }
    }
  }
</script>

<style lang="sass">
  @include B(widget) {
    position: absolute;
    z-index: 0;
    
    @include M(focus) {
      @include E(main) {
        z-index: 1;
      }
    }

    @include E(main) {
      position: relative;
      left: 0px;
      top: 0px;
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    @include E(input) {
      word-break: break-all;
      padding: 5px 10px;
      &:focus {
        outline: none;
      }
    }

    @include E(image) {
      width: 100%;
      height: 100%;
      position: absolute;
      left: 0px;
      top: 0px;
    }
  }
</style>