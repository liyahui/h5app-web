<template>
  <div 
    class="control" 
    :class="{'control--active': state.resize || state.border}">

    <div 
      class="control__move" 
      @mousedown="mouseDown($event, '', false)">
    </div>
    
  	<div 
  		class="control__resize" :class="[`control__resize--${dir}`]"
      v-for="dir in directions" 
      v-if="state.resize"
  		@mousedown="mouseDown($event, dir, true)">
  	</div>

  </div>
</template>

<script>
	let direction, original, rect

  export default {
  	props: {
      state: {
        type: Object
      },
      disableHeight: {
        type: Boolean,
        default: false
      }
  	},
    watch: {
      disableHeight: {
        immediate: true,
        handler(val) {
          if (val) {
            this.directions = ['w', 'e']
          }
        }
      }
    },
  	methods: {
      mouseDown(e, dir, split) {
      	this.$emit('mousedown', e)
        
        e.preventDefault()

        this.updateOuterRect()

        
        direction = split ? dir.split('') : [dir]

        original = {
          x: e.clientX - rect.offsetLeft,
          y: e.clientY - rect.offsetTop
        }
      
        document.addEventListener('mousemove', this.mouseMove, false)
        document.addEventListener('mouseup', this.mouseUp, false)
      },

      mouseMove(e) {
        direction.forEach(dir => {
          dir = dir === '' ? 'dragMove' : `${dir}Resize`
          this[dir](e)
        })
      },

      mouseUp() {
        this.$emit('mouseup')
         
        direction = original = rect = null

        document.removeEventListener('mousemove', this.mouseMove, false)
        document.removeEventListener('mouseup', this.mouseUp, false)
      },

      // 左方向 resize
      wResize(e) {
        let width = rect.left + rect.width - e.clientX
        let left = e.clientX - rect.left + rect.offsetLeft
        this.updateStyle({ width, left })
      },

      // 上方向 resize
      nResize(e) {
        let height = rect.top + rect.height - e.clientY
        let top = e.clientY - rect.top + rect.offsetTop

        this.updateStyle({ height, top })
      },

      // 右方向 resize
      eResize(e) {
        let width = e.clientX - rect.left
        this.updateStyle({ width })
      },

      // 下方向 resize
      sResize(e) {
        let height = e.clientY - rect.top
        this.updateStyle({ height })
      },

      // 拖拽
      dragMove(e) {
        let left = e.clientX - original.x
        let top = e.clientY - original.y
        this.updateStyle({ left, top })
      },

      // 设置样式
  		updateStyle(style = {}) {
        if (style.width && style.width < 0) {
          style.width = 0
          
          if (style.left) {
            style.left = rect.offsetLeft + rect.width
          }
        }

        if (style.height && style.height < 0) {
          style.height = 0

          if (style.top) {
            style.top = rect.offsetTop + rect.height
          }
        }

        Object.keys(style).forEach(key => style[key] = parseInt(style[key]))

        this.$emit('change', style)
      },

      // 更新矩形对象
      updateOuterRect() {
        let outer = this.$el.parentNode
        let { offsetLeft, offsetTop } = outer
        rect = outer.getBoundingClientRect()
        rect.offsetLeft = offsetLeft
        rect.offsetTop = offsetTop
      }
  	},
  	data() {
  		return {
  			directions: ['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']
  		}
  	}
  }
</script>

<style lang="sass">
	$borderColor: darken($primaryColor, 10%);
	$borderWidth: 1px;
	$pointSize: 12px;
	$pointOffset: -($pointSize) / 2;
	$directionList: (nw, n, ne, w, e, sw, s, se);

  @include B(control) {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    cursor: move;

    @include E(move) {
      width: 100%;
      height: 100%;
    }

    @include E(resize) {
      width: $pointSize;
      height: $pointSize;
      border-radius: 50%;
      background: #fff;
      border: 1px solid $borderColor;
      position: absolute;
      
      @each $direction in $directionList {
        @include M($direction) {
          cursor: #{$direction}-resize;
        }
      }
    }
  }

  .control--active,
  .control:hover {
    outline: $borderWidth solid $borderColor;
  }

  .control__resize--nw,
  .control__resize--w,
  .control__resize--sw {
    left: $pointOffset;
  }

  .control__resize--nw,
  .control__resize--n,
  .control__resize--ne {
    top: $pointOffset;
  }

  .control__resize--ne,
  .control__resize--e,
  .control__resize--se {
    right: $pointOffset;
  }

  .control__resize--sw,
  .control__resize--s,
  .control__resize--se {
    bottom: $pointOffset;
  }

  .control__resize--n,
  .control__resize--s {
    left: 50%;
    margin-left: $pointOffset;
  }

  .control__resize--w,
  .control__resize--e {
    top: 50%;
    margin-top: $pointOffset;
  }
</style>