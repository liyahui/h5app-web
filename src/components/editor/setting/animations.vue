<template>
  <div class="animations">
    <div class="animations__head">
      <ui-row>
        <ui-col :span="11">
          <ui-button 
            type="default" 
            icon="plus" 
            block
            @click="addAnimation">
            增加动画
          </ui-button>
        </ui-col>
        <ui-col :span="2"></ui-col>
        <ui-col :span="11">
          <ui-button 
            type="primary" 
            icon="triangle-right" 
            block
            @click="playAllAnimation">
            播放动画
          </ui-button>
        </ui-col>
      </ui-row>
    </div>
    <div class="animations__body">
      
      <animations-item 
        v-for="value, index in animations"
        :value="value"
        :key="`${pageIndex}-${widgetIndex}-${index}`"
        :open="openIndex === index"
        @input="setAnimation(index, $event)"
        @play="playAnimation(index)"
        @open="openAnimation(index)"
        @delete="deleteAnimation(index)">
      </animations-item>
      <div class="animations__tips">
         * 次数填写0次为循环播放
      </div>
    </div>
  </div>
</template>

<script>
  import * as types from 'store/types'
  import { mapGetters } from 'vuex'
  import { uiButton, uiButtonGroup, uiRow, uiCol, uiSelect } from 'ui'
  import rangeInput from './range-input'
  import animationsItem from './animations-item'

  export default {
    components: {
      uiButton,
      uiButtonGroup,
      uiRow,
      uiCol,
      animationsItem,
      uiSelect
    },
    computed: {
      ...mapGetters(['widget', 'pageIndex', 'widgetIndex']),

      animations() {
        return this.widget.animations
      }
    },
    watch: {
      animations(val) {
        this.openAnimation(val.length - 1)
      }
    },
    methods: {
      setAnimation(index, animation) {
        this.$store.commit(types.SET_WIDGET_ANIMATION, {
          index,
          ...animation
        })
      },
      playAnimation(index) {
        let commit = play => {
          this.$store.commit(types.SET_WIDGET_STATE, {
            state: { play }
          })
        }
        
        // 暂停当前播放
        commit(false)

        this.$nextTick(() => {
          commit(index)
        })
      },
      playAllAnimation() {
        this.playAnimation(true)
      },
      addAnimation() {
        this.$store.commit(types.ADD_WIDGET_ANIMATION)
      },
      openAnimation(index) {
        this.openIndex = index
      },
      deleteAnimation(index) {
        this.$store.commit(types.DELETE_WIDGET_ANIMATION, {
          index
        })
      }
    },
    data() {
      return {
        openIndex: 0
      }
    },
    created() {
      this.openAnimation(0)
    }
  }
</script>

<style lang="sass">
  @include B(animations) {
    height: 100%;

    @include E(head) {
      padding: 15px;
    }

    @include E(body) {
      height: calc(100% - 110px);
      padding: 0px 15px;
      line-height: 30px;
      overflow-y: auto;
    }

    @include E(empty) {
      color: $grayLight;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    @include E(foot) {
      padding: 10px 15px;
      border-top: 1px solid $borderColor;
      background: lighten($borderColor, 5%);
    }

    @include E(tips) {
      color: $gray;
    }
  }
</style>