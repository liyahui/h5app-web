<template>
  <div class="ui-select" :class="classNames" v-clickoutside="handleClose">
  	<div class="ui-select__selected" @mousedown="handleOpen">
  		<div class="ui-select__label" v-html="selectedLabel"></div>
  		<div class="ui-select__arrow"><i class="iconfont icon-select"></i></div>
  		<div class="ui-select__clear" @mousedown="handleClear">
  			<i class="iconfont icon-clear"></i>
			</div>
  	</div>
  	<transition name="zoom-in-top" @after-leave="handleLeave">
	  	<div class="ui-select__options" v-show="open" :style="{maxHeight: height + 'px'}">
				<slot v-if="$slots.default && !options"></slot>
				<template v-else>
					<ui-option
						v-for="option in options"
						:value="option.value"
						:label="option.label">
					</ui-option>
				</template>
	  	</div>
  	</transition>
  </div>
</template>

<script>
	import uiOption from './option'

	export default {
		props: {
  		placeholder: {
  			type: String,
  			default: '请选择'
  		},
  		clear: {
  			type: Boolean,
  			default: false
  		},
      height: {
        type: Number,
        default: 212
      },
  		options: Array,
  		value: [Number, String],
  	},
  	components: {
  		uiOption
  	},
  	computed: {
  		selected() {
  			return this.$children[this.index]
  		},
  		selectedLabel() {
  			if (!this.selected) {
          return this.placeholder
        }

        return this.selected.label !== undefined ? 
      		this.selected.label : 
      		this.selected.$slots.default[0].elm.outerHTML
  		},
  		classNames() {
  			return {
  				'ui-select--open': this.open,
  				'ui-select--visible': this.visible,
  				'ui-select--empty': !this.selected,
  				'ui-select--clear': this.selected && this.clear
  			}
  		}
  	},
  	watch: {
  		value(newVal) {
        this.currentValue = newVal
        this.setSelectedIndex(newVal)
  		},
  		options() {
        this.$nextTick(() => {
          this.setSelectedIndex(this.value)
        })
  		}
  	},
  	methods: {
  		handleOpen(e) {
  			if (e.clear) return

  			this.open = !this.open
  			this.visible = true
  		},
  		handleClose() {
  			this.open = false
  		},
  		handleClear(e) {
  			this.index = -1
  			e.clear = true
  			this.handleSelectItem(null)
  		},
  		handleLeave() {
  			if (!this.open) {
  				this.visible = false
  			}
  		},
  		handleSelectItem(value) {
  			this.setSelectedIndex(value)
  			this.open = false

  			this.$emit('input', value)

  			if (value !== this.currentValue) {
  				this.$emit('change', value, this.currentValue)
  				this.currentValue = value
  			}
  		},
  		setSelectedIndex(value) {
  			this.index = this.$children.findIndex(option => option.value == value)
  		}
   	},
  	data() {
  		return {
  			index: -1,
  			open: false,
  			visible: false,
  			currentValue: this.value
  		}
  	}
	}
</script>

<style lang="sass">
	@include B(ui-select) {
		position: relative;
		width: 100%;

		@include E(selected) {
			height: 30px;
			background: #fff;
			line-height: 28px;
			border-radius: $borderRadius;
			padding: 0px 8px;
			overflow: hidden;
			cursor: pointer;
      border: 1px solid $borderColor;
		}

		@include E(options) {
			position: absolute;
			background: #fff;
			width: 100%;
			border: 1px solid $borderColor;
			border-radius: $borderRadius;
			left: 0px;
			top: 32px;
			overflow: auto;
		}

		@include E(option) {
			height: 30px;
			line-height: 30px;
			overflow: hidden;
			padding: 0px 10px;
			cursor: pointer;

			&:hover:not(.ui-select__option--selected) {
				background-color: lighten($grayLight, 30%);
			}

			@include M(selected) {
				background-color: $primaryColor;
				color: #fff;
			}
		}

		@include E(arrow) {
			position: absolute;
			right: 5px;
			top: 0px;
			font-size: 14px;
			padding-top: 1px;
			transition: transform 0.3s;
		}

		@include E(clear) {
			position: absolute;
			right: 0px;
			top: 0px;
			font-size: 24px;
			color: $grayLight;
			display: none;
		}

		@include E(label) {
			margin-right: 15px;
			overflow: hidden;
		}

		@include M(open) {
			@include E(arrow) {
				transform: rotate(180deg);
			}
		}

		@include M(clear) {
			@include E(selected) {
				&:hover {
					@include E(clear) {
						display: block;
					}

					@include E(arrow) {
						display: none;
					}
				}
			}
		}

		@include M(empty) {
			@include E(label) {
				color: $grayLight;
			}
		}

		@include M(visible) {
      @include E(options) {
			  z-index: 9;
      }
		}
	}
</style>