<template>
  <div class="properties" v-if="page">
  	<div class="properties__item">
			<ui-row>
	      <ui-col :span="4">背景</ui-col>
	      <ui-col :span="20">
	        <ui-color 
	        	:value="page.background.color" 
	        	@input="setPageBackground('color', $event)">
        	</ui-color>
	      </ui-col>
	    </ui-row>
  	</div>

    <div class="properties__item">
      <div class="bg-image transparent">
        <div class="iconfont icon-plus" @click="openResource" v-if="!page.background.image"></div>
        <div class="bg-image__preview" :style="previewStyle"></div>
      </div>
      <ui-row v-if="page.background.image">
        <ui-col :span="11">
          <ui-button 
            block 
            @click="setPageBackground('image', '')">
            移除图片
          </ui-button>
        </ui-col>
        <ui-col :span="2"></ui-col>
        <ui-col :span="11">
          <ui-button 
            block
            type="primary" 
            @click="openResource">
            重新选择
          </ui-button>
        </ui-col>
      </ui-row>
    </div>
    
    <hr>

    <page-effect
      :clear="true"
      :value="page.effect"
      @change="setPage('effect', $event)">
    </page-effect>
    <div class="properties__tips">
      默认使用全局设置的切换效果
    </div>
  </div>
</template>

<script>
  import * as types from 'store/types'
	import { mapGetters } from 'vuex'
	import { uiColor, uiRow, uiCol, uiButton } from 'ui'
  import pageEffect from './page-effect'

  export default {
  	components: {
  		uiColor,
  		uiRow,
  		uiCol,
  		uiButton,
      pageEffect
  	},
  	computed: {
  		...mapGetters(['page']),

      previewStyle() {
        return {
          backgroundImage: `url(${this.page.background.image})`
        }
      }
  	},
  	methods: {
  		setPageBackground(key, value) {
        this.$store.commit(types.SET_PAGE_BACKGROUND, {
          [key]: value
        })
  		},
      setPage(key, value) {
        this.$store.commit(types.SET_PAGE, {
          [key]: value
        })
      },
      openResource() {
        this.$store.commit(types.RESOURCE_TARGET, {
          type: 'image',
          target: 'page'
        })
      }
  	}
  }
</script>

<style lang="sass">
  @include B(bg-image) {
    height: 269px;
    border-radius: $borderRadius;
    border: 1px solid $borderColor;
    line-height: 260px;
    text-align: center;
    overflow: hidden;
    position: relative;
    padding: 10px;
    margin-bottom: 10px;

    .iconfont {
      font-size: 50px;
      color: $grayLight;
      cursor: pointer;
      transition: color 0.5s;
      &:hover {
        color: $gray;
      }
    }

    @include E(preview) {
      width: 100%;
      height: 100%;
      background-position: center;
      background-size: contain;
      background-repeat: no-repeat;
    }
  }
</style>