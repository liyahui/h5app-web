<template>
	<transition name="zoom" appear>
	  <div class="ui-toast" v-if="value">
	  	<div class="ui-toast__text" v-text="text"></div>
	  </div>
  </transition>
</template>

<script>
  export default {
  	props: {
      text: {
        type: String
      },
      value: {
        type: Boolean,
        default: false
      },
      duration: {
        type: Number,
        default: 2000
      }
    },
    watch: {
      value(val) {
        if (val) {
          setTimeout(() => {
            this.$emit('input', false)
            this.$emit('on-hide')
          }, this.duration)
        }
      }
    }
  }
</script>

<style lang="sass">
	@include B(ui-toast) {
		position: absolute;
		left: 0px;
		top: 70px;
		width: 100%;
		height: 40px;
		z-index: 999;
		display: flex;
		justify-content: center;

		@include E(text) {
			padding: 0px 20px;
			line-height: 40px;
			height: 40px;
			background: rgba(0, 0, 0, 0.6);
			color: #fff;
			border-radius: $borderRadius;
		}
	}
</style>