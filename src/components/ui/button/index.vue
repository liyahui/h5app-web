<template>
  <button class="ui-button" :class="buttonClass" @click="clickButton">
  	<i class="iconfont" :class="`icon-${icon}`" v-if="icon"></i>
  	<slot></slot>
  </button>
</template>

<script>
  export default {
    name: 'ui-button',
  	props: {
  		type: {
  			type: String,
  			default: 'default'
  		},
      size: {
        type: String,
        default: ''
      },
  		disabled: {
  			type: Boolean,
  			default: false
  		},
      plain: {
        type: Boolean,
        default: false
      },    
  		block: {
  			type: Boolean,
  			default: false
  		},
  		icon: {
  			type: String,
  			default: ''
  		}
  	},
  	computed: {
  		buttonClass() {
        let list = [
          this.type ? `ui-button--${this.type}` : '',
          this.size ? `ui-button--${this.size}` : ''
        ]

        list.push({
          'is-block': this.block,
          'is-disabled': this.disabled
        })

        return list
  		}
  	},
    methods: {
      clickButton(e) {
        if (!this.disabled) {
          this.$emit('click', e)
        }
      }
    }
  }
</script>

<style lang="sass">
	@include B(ui-button) {
		height: 30px;
		padding: 0px 10px;
		background: none;
		color: $gray;
		border: 1px solid $borderColor;
		border-radius: $borderRadius;
		cursor: pointer;
		background: #fff;
    transition: all 0.3s;

		&:focus {
			outline: none;
		}

    &.is-block {
      display: block;
      width: 100%;
    }

    &.is-disabled {
      cursor: not-allowed;
    }

		@include M(default) {
			&:hover:not(.is-disabled) {
				color: $primaryColor;
				border-color: $primaryColor;
			}

      &.is-disabled {
        color: lighten($grayLight, 10%);
        border-color: lighten($grayLight, 20%);
        background: lighten($grayLight, 30%)
      }
		}

		@include M(primary) {
			border-color: $primaryColor;
			background: $primaryColor;
			color: #fff;

      &:hover:not(.is-disabled) {
        border-color: darken($primaryColor, 10%);
        background: darken($primaryColor, 10%);
      }

      &.is-disabled {
        border-color: lighten($primaryColor, 10%);
        background: lighten($primaryColor, 10%);
      }
		}

    @include M(small) {
      height: 24px;
    }
	}
</style>