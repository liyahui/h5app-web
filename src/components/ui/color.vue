<template>
  <div class="ui-color" :class="{'ui-color--empty': empty}">
		<div class="ui-color__preview sp-preview" ref="preview" :style="previewStyle"></div>
  </div>
</template>

<script>
	import $ from 'jquery'
	import spectrum from 'spectrum-colorpicker'

  export default {
  	props: {
  		value: {
  			type: String,
  			default: ''
  		},
  		empty: {
  			type: Boolean,
  			default: true
  		}
  	},
  	computed: {
  		previewStyle() {
        let style = {}
  			if (this.value !== 'transparent') {
          style.background = this.value
        }
        return style
  		}
  	},
  	methods: {
  		createSpectrum() {
  			$(this.$refs.preview).spectrum({
          color: this.value,
	  			allowEmpty: this.empty,
	  			showInput: true,
	  			showButtons: false,
	  			preferredFormat: 'hex',
	  			containerClassName: 'ui-color__container',
	  			appendTo: this.$refs.preview.parentNode,
	  			move: this.changeColor
	  		})
  		},
  		changeColor(color) {
				this.$emit('input', color ? color.toRgbString() : 'transparent')
  		}
  	},
  	mounted() {
  		this.createSpectrum()
  	},
  	beforeDestroy() {
  		$(this.$refs.preview).spectrum('destroy')
  	}
  }
</script>

<style lang="sass">
  @import '~spectrum-colorpicker/spectrum';
  
  @include B(ui-color) {
    width: 100%;

    @include E(preview) {
      height: 30px;
      width: 100%;
      border-radius: 3px;
      background-color: transparent;
      cursor: pointer;
      border-color: $borderColor;
    }

    @include E(container) {
      background: transparent;
      border: none;
      padding: 5px 0px;
    }

    @include M(empty) {
      .sp-input-container {
        padding-right: 20%;
      }
    }
    
    .sp-color,
    .sp-picker-container {
      border: none;
    }

    .sp-picker-container {
      background: #333;
      border-radius: 3px;
      padding-bottom: 10px;
      margin-bottom: 0px;
      font-size: 0px;
    }

    .sp-input-container {
      margin-bottom: 0px;
      margin-top: 10px;
      box-sizing: border-box;
    }

    .sp-input {
      border-radius: 0px;
      border: 1px solid #999;
      color: #999;
      height: 26px;
      &:focus {
        outline: none;
        border-color: #ccc;
        color: #ccc;
      }
    }

    .sp-hue,
    .sp-clear {
      border: none;
    }

    .sp-clear-enabled {
      .sp-clear {
        top: 100%;
        background: #fff;
        height: 26px;
        margin-top: 10px;

        &:before {
          display: block;
          content: ' ';
          width: 80%;
          height: 2px;
          background: red;
          position: absolute;
          left: 10%;
          top: 50%;
          transform: rotate(-45deg);
        }
      }

      .sp-hue {
        top: 0px;
        height: 100%;
      }
    }

    .sp-top {
      margin-bottom: 0px;
    }
  }
</style>