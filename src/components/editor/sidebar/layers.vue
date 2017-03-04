<template>
  <div class="layers" v-if="page">
  	<div class="layers__scroll">
			<div 
				class="layers__item" 
				v-for="widget in page.widgets" 
				:key="widget.id"
				:class="{'layers__item--selected': widget.id === widgetID}"
				@mousedown.stop="activeWidget(widget.id)">
				<div class="layers__thumb">
					<i class="iconfont icon-text" v-if="widget.type === 'text'"></i>
					<img class="layers__img" :src="widget.url" alt="" v-if="widget.type === 'image'">
				</div>
				<div class="layers__name">
					<input 
            type="text"
            class="layers__input"  
            :value="widget.name"
            :placeholder="inputPlaceholder(widget)" 
            @input="editWidgetName">
				</div>
				<div class="layers__state">
					<i class="iconfont icon-lock" v-if="widget.state.lock"></i>
				</div>
			</div>
		</div>
  </div>
</template>

<script>
	import * as types from 'store/types'
	import { mapState, mapGetters } from 'vuex'
  import { widgetNames } from 'utils'

  export default {
  	computed: {
  		...mapState(['widgetID']),
  		...mapGetters(['page'])
  	},
  	methods: {
			// 设置按下的组件为当前组件
  		activeWidget(id) {
        this.$store.commit(types.SET_WIDGET_ID, { id })
  		},
  		editWidgetName(e) {
  			this.$store.commit(types.SET_WIDGET_NAME, {
          name: e.target.value
        })
  		},
      inputPlaceholder(widget) {
        return widgetNames[widget.type.toUpperCase()] + widget.id
      }
  	},
  	mounted() {

  	}
  }
</script>

<style lang="sass">

  @include B(layers) {
    position: relative;
    height: 100%;
    overflow-x: hidden;
    overflow-y: auto;
    width: 100%;

    @include E(scroll) {
      display: flex;
      flex-direction: column-reverse;
      justify-content: flex-end;
    }

    @include E(item) {
      width: 100%;
      display: flex;
      height: 27px;
      font-size: 12px;
      padding: 5px;
      line-height: 16px;
      border-bottom: 1px solid #d6d6d6;
      color: #999;
      flex: 1;

      &:hover:not(.layers__item--selected) {
        background: #ddd;

        .layers__input {
          background: #ddd;
        }
      }

      @include M(selected) {
        background: $primaryColor;
        color: #fff;
        border-color: $primaryColor;
      }
    }

    @include E(thumb) {
      width: 16px;
      height: 16px;
      display: flex;
      justify-content: center;
      align-items: center;
      overflow: hidden;

      .icon-text {
        font-size: 15px;
        margin-top: 1px;
      }
    }

    @include E(img) {
      max-width: 100%;
      max-height: 100%;
      display: block;
    }

    @include E(name) {
      width: 74px;
      overflow: hidden;
      margin: 0px 5px;
    }

    @include E(input) {
      border: none;
      background: #eee;
      height: 100%;
      color: #666;
      width: 100%;
      &:focus {
        outline: none;
      }
    }

    @include E(state) {
      font-size: 14px;
      width: 50px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
</style>