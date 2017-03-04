<template>
  <div class="ui-number" :class="{'ui-number--disabled': disabled}">
  	<input 
  		type="text"
  		class="ui-number__input"
      :disabled="disabled" 
  		:value="inputValue"
      @focus="handleFocus"
      @input="handleInput"
      @blur="handleBlur"
      @keydown.up.prevent="increaseStep"
      @keydown.down.prevent="decreaseStep">
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
      unit: {
        type: String,
        default: ''
      },
      min: {
        type: Number,
        default: Number.NEGATIVE_INFINITY
      },  
      max: {
        type: Number,
        default: Number.POSITIVE_INFINITY
      },
      step: {
      	type: Number,
      	default: 1
      },
      disabled: {
        type: Boolean,
        default: false
      }
  	},
  	watch: {
  		value: {
  			immediate: true,
  			handler(newVal) {
  				this.setCurrentValue(newVal, false)
  			}
  		},
      min() {
        this.setCurrentValue(this.value)
      },
      max() {
        this.setCurrentValue(this.value)
      }
  	},
  	computed: {
  		inputValue() {
  			return this.unitVisible ? this.currentValue + this.unit : this.currentValue
  		},
      precision() {
        return getPrecision(this.step)
      }
  	},
    methods: {
      handleFocus() {
        this.unitVisible = false
      },
      handleInput({ target }) {
        this.setCurrentValue(target.value)
      },
      handleBlur(e) {
        this.unitVisible = true
      },
      setCurrentValue(value, emit = true) {
        let oldVal = this.currentValue

        if (isNaN(value)) {
          value = oldVal
        }

        value = Math.max(value, this.min)
        value = Math.min(value, this.max)

        value = setPrecision(value, this.precision)

        this.currentValue = value

        value !== oldVal && emit && this.$emit('input', value)
      },
      increaseStep() {
        let newVal = this.currentValue + this.step
        this.setCurrentValue(newVal)
      },
      decreaseStep() {
        let newVal = this.currentValue - this.step
        this.setCurrentValue(newVal)
      }
    },
  	data() {
  		return {
  			currentValue: 0,
  			unitVisible: true
  		}
  	}
  }
</script>

<style lang="sass">
	@include B(ui-number) {
    width: 100%;
    display: flex; 
    height: 30px;

    @include E(input) {
      width: 100%;
      height: 100%;
      border: none;
      width: 100%;
      background: none;
      text-align: center;
      border: 1px solid $borderColor;
      background: #fff;
      border-radius: 3px;

      &:focus {
        outline: none;
        border-color: $primaryColor;
      }
    }

    @include M(disabled) {
      cursor: not-allowed;

      @include E(input) {
        background: #f3f3f3;
        cursor: inherit;
      }
    }
  }
</style>