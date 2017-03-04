<template>
  <transition name="zoom">
    <div 
      class="ui-contextmenu"
      data-control-stop
      v-show="value"
      :style="style"  
      @contextmenu.prevent.stop 
      v-clickoutside="clickoutside">
  		<div 
  			class="ui-contextmenu__item"
  			v-for="item, key in list" 
        v-text="item.name"
        v-if="item.visible"
        :class="{'ui-contextmenu__item--disable': item.disable}"
        @click="clickItem(key, $event)">
  		</div>
    </div>
  </transition>
</template>

<script>
  export default {
  	props: {
  		value: {
  			type: Boolean,
  			default: false
  		},
  		position: {
  			type: Object,
  			default: true
  		},
  		list: {
  			type: Object,
  			default: () => {}
  		}
  	},
    computed: {
      style() {
        return {
          left: `${this.position.x}px`,
          top: `${this.position.y}px`
        }
      }
    },
    methods: {
      clickoutside(e) {
        this.value && this.$emit('input', false)
      },
      clickItem(key, e) {
        if (!this.list[key].disable) {
          this.$emit('click', key, e)
          this.$emit('input', false)
        }
      }
    }
  }
</script>

<style lang="sass">
	@include B(ui-contextmenu) {
    width: 100px;
    z-index: 100;
    border-radius: 3px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.3);
    background: rgba(255, 255, 255, 0.95);
    padding: 5px 0px;
    position: absolute;
    transform-origin: left top;

    @include E(item) {
    	line-height: 30px;
	    height: 30px;
	    padding: 0px 15px;
	    cursor: pointer;

	    @include M(disable) {
	    	color: lighten($grayLight, 10%);
      	cursor: not-allowed;
	    }

	    &:hover:not(.ui-contextmenu__item--disable) {
	      background: lighten($grayLight, 25%);
	    }
    }
	}
</style>