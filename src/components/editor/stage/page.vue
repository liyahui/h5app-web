<template>
  <div class="page">
    <div class="page__bg" v-if="data.background" :style="bgStyle"></div>

  	<widget 
      v-for="widget in data.widgets" 
      :key="`${data.id}-${widget.id}`"
      :widget="widget" 
      :operate="operate"
      @contextmenu="showContextmenu">
    </widget>

    <ui-contextmenu 
      v-if="operate"
      v-model="contextmenu.show"
      :list="contextmenu.list"
      :position="contextmenu.position"
      @click="clickContextmenu">
    </ui-contextmenu>
  </div>
</template>

<script>
  import * as types from 'store/types'
  import { mapState, mapGetters } from 'vuex'
  import { uiContextmenu } from 'ui'
  import widget from './widget'
  import contextmenuModel from 'models/contextmenu'
  import contextmenuMixin from 'utils/contextmenu'

  export default {
    mixins: [contextmenuMixin],
  	props: {
  		data: {
  			type: Object,
        required: true
  		},
      operate: {
        type: Boolean,
        default: true
      }
  	},
  	components: {
      widget,
      uiContextmenu
    },
    computed: {
      ...mapState(['clipboard']),
      ...mapGetters(['widget', 'widgetIndex']),

      bgStyle() {
        const { color, image } = this.data.background
        return {
          backgroundColor: color,
          backgroundImage: `url(${image})`
        }
      }
    },
    methods: {
      // 选中菜单选项
      clickContextmenu(key) {
        switch (key) {
          case 'up':
          case 'down':
          case 'top':
          case 'bottom':
            this.$store.commit(types.SORT_WIDGET, { key })
            break
          case 'copy':
            this.$store.commit(types.COPY_WIDGET)
            break
          case 'delete': 
            this.$store.commit(types.DELETE_WIDGET)
            break
          case 'lock':
            this.$store.commit(types.SET_WIDGET_STATE, {
              state: { lock: true, resize: false }
            })
            break
          case 'unlock':
            this.$store.commit(types.SET_WIDGET_STATE, {
              state: { lock: false, resize: true }
            })
            break
        }
      },

      // 判断菜单状态
      widgetMenuState() {
        let list = this.contextmenu.list

        if (this.widget.state.lock) {
          for (let key in list) {
            list[key].disable = true
          }

          list.unlock.visible = true
          list.unlock.disable = false
          list.lock.visible = false
        } else {
          for (let key in list) {
            list[key].disable = false
          }

          list.unlock.visible = false
          list.lock.visible = true

          if (this.widgetIndex === 0) {
            list.down.disable = list.bottom.disable = true
          } else {
            list.down.disable = list.bottom.disable = false
          }

          if (this.widgetIndex === this.data.widgets.length - 1) {
            list.up.disable = list.top.disable = true
          } else {
            list.up.disable = list.top.disable = false
          }
        }
      },

      watchState() {
        this.$watch('widgetIndex', val => {
          if (this.widget) {
            this.widgetMenuState()
          }
        })

        this.$watch('widget.state.lock', val => {
          if (this.widget) {
            this.widgetMenuState()
          }
        })
      }
    },
    created() {
      if (this.operate) {
        this.contextmenu.list = contextmenuModel.widget
        this.watchState()
      }
    }
  }
</script>

<style lang="sass">
	@include B(page) {
		position: relative;
		width: $viewportWidth;
    height: $viewportHeight;
    background: #fafafa;
    position: absolute;
    left: 0px;
    top: 0px;
    
    @include E(bg) {
      position: absolute;
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
    }
	}
</style>