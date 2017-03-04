<template>
  <div class="stage" @contextmenu.prevent="showContextmenu">
  	<viewport ref="viewport"></viewport>

    <div 
      class="stage__mask"
      v-for="mask, key in masks"  
      :class="[`stage__mask--${key}`]" 
      :style="mask">
    </div>

    <ui-contextmenu 
      v-model="contextmenu.show"
      :position="contextmenu.position"
      :list="contextmenu.list"
      @click="clickContextmenu">
    </ui-contextmenu>
  </div>
</template>

<script>
  import * as types from 'store/types'
  import contextmenuModel from 'models/contextmenu'
  import extend from 'extend'
  import { mapState } from 'vuex'
  import { uiContextmenu } from 'ui'
  import viewport from './viewport'
  import contextmenuMixin from 'utils/contextmenu'

  export default {
    mixins: [contextmenuMixin],
  	components: {
  		viewport,
      uiContextmenu
  	},
    computed: {
      ...mapState(['widgetID', 'clipboard'])
    },
    watch: {
      clipboard(val) {
        this.contextmenu.list.paste.disable = !val
      }
    },
    methods: {
      clickContextmenu(key, e) {
        switch (key) {
          case 'paste':
            let viewport = this.$refs.viewport.$el.getBoundingClientRect()
            this.$store.commit(types.ADD_WIDGET, {
              copy: true,
              style: {
                left: parseInt(e.clientX - viewport.left),
                top: parseInt(e.clientY - viewport.top)
              }
            })
          break
        }
      }
    },
    created() {
      this.contextmenu.list = contextmenuModel.stage
    },
    data() {
      return {
        masks: {
          left: {},
          top: {},
          right: {},
          bottom: {}
        }
      }
    }
  }
</script>

<style lang="sass">
  @include B(stage) {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		position: relative;

    @include E(mask) {
      position: absolute;
      background: #e2e5e8;
      opacity: 0.7;
      pointer-events: none;
    }
  }

  $widthLR: calc((100% - #{$viewportWidth}) / 2);
  $heightTB: calc((100% - #{$viewportHeight}) / 2);
  
  .stage__mask--left,
  .stage__mask--right {
    width: $widthLR;
    height: 100%;
  }

  .stage__mask--left {
    left: 0px;
  }

  .stage__mask--right {
    right: 0px;
  }

  .stage__mask--top,
  .stage__mask--bottom {
    width: $viewportWidth;
    height: $heightTB;
  }

  .stage__mask--top {
    top: 0px;
  }

  .stage__mask--bottom {
    bottom: 0px;
  }
</style>