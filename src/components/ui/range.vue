<template>
  <div class="ui-range" ref="range">
    <div class="ui-range__wrap">
    	<div class="ui-range__bar">
    		<div class="ui-range__value" :style="{width: currentPos + '%'}"></div>
    	</div>
    	<div 
        class="ui-range__handle"
        ref="handle" 
        :style="{left: currentPos + '%'}" 
        @mousedown.prevent="handleStart">
      </div>
    </div>
  </div>
</template>

<script>
  import { getPrecision, setPrecision } from 'utils'

  export default {
    props: {
      value: {
        type: Number,
        default: 0
      },  
      min: {
        type: Number,
        default: -100
      },
      max: {
        type: Number,
        default: 100
      },
      step: {
        type: Number,
        default: 1
      }
    },
    computed: {
      rangeWidth() {
        return parseInt(getComputedStyle(this.$refs.range).width)
      },
      diffValue() {
        return this.max - this.min
      },
      precision() {
        return getPrecision(this.step)
      }
    },
    watch: {
      value: {
        immediate: true,
        handler() {
          this.setPosition()
        }
      },
      min(){
        this.setPosition()
      },
      max() {
        this.setPosition()
      }
    },
    methods: {
      handleStart(e) {
        this.startX = e.clientX
        this.startPos = parseInt(e.target.style.left)

        document.addEventListener('mousemove', this.handleMove, false)
        document.addEventListener('mouseup', this.handleEnd, false)
      },
      handleMove(e) {
        let movePos = (e.clientX - this.startX) / this.rangeWidth * 100
        this.setPosition(this.startPos + movePos)
      },
      handleEnd() {
        document.removeEventListener('mousemove', this.handleMove, false)
        document.removeEventListener('mouseup', this.handleEnd, false)
      },
      setPosition(pos) {
        let propChange = pos === undefined
        let value

        if (propChange) {
          value = this.value
        } else {
          pos = Math.min(pos, 100)
          pos = Math.max(pos, 0)

          let step = 100 / (this.diffValue / this.step)
          let steps = Math.round(pos / step)
          value = steps * step * this.diffValue / 100 + this.min
        }

        value = setPrecision(value, this.precision)
        this.currentPos = (value - this.min) / this.diffValue * 100

        if (propChange) return

        this.$emit('input', value)
        
        if (value !== this.currentValue) {
          this.$emit('change', value, this.currentValue) 
          this.currentValue = value
        }
      }
    },
    data() {
      return {
        startX: 0,
        currentX: 0,
        startPos: 0,
        currentPos: 0,
        currentValue: 0
      }
    }
  }
</script>

<style lang="sass">
	$rangeSize: 18px;
  $barHeight: 4px;

  @include B(ui-range) {
    width: 100%;
    position: relative;
    height: $rangeSize;
    padding: 0px ($rangeSize / 2);
    
    &:before,
    &:after {
      display: block;
      content: ' ';
      position: absolute;
      height: $barHeight;
      width: ($rangeSize / 2);
      top: 50%;
      margin-top: -($barHeight / 2);
    }

    &:before {
      left: 0px;
      background: $primaryColor;
    }

    &:after {
      right: 0px;
      background: #fff;
    }

    @include E(wrap) {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    @include E(bar) {
      background: #fff;
      height: $barHeight;
      width: 100%;
    }

    @include E(value) {
      height: 100%;
      background-color: $primaryColor;
      width: 0px;
    }

    @include E(handle) {
      width: $rangeSize;
      height: $rangeSize;
      background: #fff;
      border-radius: 50%;
      box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.3);
      position: absolute;
      top: 0px;
      left: 0px;
      margin-left: -($rangeSize / 2);
    }
  }
</style>