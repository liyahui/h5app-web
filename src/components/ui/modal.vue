<template>
  <transition name="modal" appear>
    <div class="ui-modal" :class="classNames" v-if="value">
      <div class="ui-modal__mask"></div>
      <div class="ui-modal__main">
        <div class="ui-modal__head">
          {{title}}
        </div>
        <div class="ui-modal__close" @click="$emit('input', false)">
        	<i class="iconfont icon-close"></i>
        </div>
        <div class="ui-modal__body">
        	<slot v-if="$slots.default"></slot>
        	<slot name="body"></slot>
        </div>
        <div class="ui-modal__foot">
          <slot name="foot"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
  import uiButton from './button'

  export default {
    props: {
      value: {
        type: Boolean,
      },
      size: {
        type: String,
        default: ''
      },
      title: {
        type: String,
        default: '标题'
      }
    },
    components: {
      uiButton
    },
    computed: {
      classNames() {
        return {
          [`ui-modal--${this.size}`]: this.size
        }
      }
    }
  }
</script>

<style lang="sass">
  @include B(ui-modal) {
    position: fixed;
    width: 100%;
    height: 100%;
    left: 0px;
    top: 0px;
    z-index: 999;
    overflow: hidden;

    @include M(large) {
      @include E(main) {
        width: 800px;
        margin-left: -400px;
      }
    }

    @include M(small) {
      @include E(main) {
        width: 400px;
        margin-left: -200px;
      }
    }


    @include E(mask) {
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.5);
      position: absolute;
      left: 0px;
      top: 0px;
    }

    @include E(main) {
      background: #fff;
      position: absolute;
      top: 100px;
      left: 50%;
      width: 600px;
      margin-left: -300px;
      border-radius: $borderRadius;
      overflow: hidden;
    }

    @include E(head) {
      height: 40px;
      line-height: 40px;
      background: $borderColor;
      padding: 0px 15px;
    }

    @include E(close) {
    	position: absolute;
    	top: 0px;
    	right: 0px;
    	color: $grayLight;
    	cursor: pointer;
    	padding: 10px 15px;
    	&:hover {
    		color: $gray;
    	}
    }

    @include E(body) {
      padding: 15px;
    }

    @include E(foot) {
      padding: 15px;
      padding-top: 0px;
    }
  }

  .modal-enter-active {
    animation: fadeIn 0.3s;
    .ui-modal__main {
      animation: zoomIn 0.3s;
    }
  }

  .modal-leave-active {
    animation: fadeOut 0.3s;
    .ui-modal__main {
      animation: zoomOut 0.3s;
    }
  }
</style>