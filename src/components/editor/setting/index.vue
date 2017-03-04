<template>
  <div class="setting" data-control-stop>
  	<ui-tabs v-model="widgetActiveName"  v-if="widgetID" key="widget">
      <ui-tab-item label="属性" name="properties">
      	<properties></properties>
      </ui-tab-item>
      <ui-tab-item label="动画" name="animations">
        <animations></animations>
      </ui-tab-item>
    </ui-tabs>

    <ui-tabs v-if="pageID && !widgetID && !h5app.setting" key="page">
    	<ui-tab-item label="页面">
    		<page></page>
    	</ui-tab-item>
    </ui-tabs>

    <ui-tabs 
      key="project"
      data-name="project"
      v-if="h5app.setting"
      v-clickoutside="hideSettingApp">
      <ui-tab-item label="应用">
        <project></project>
      </ui-tab-item>
    </ui-tabs>
  </div>
</template>

<script>
  import * as types from 'store/types'
	import { mapState } from 'vuex'
	import { uiTabs, uiTabItem } from 'ui'
	import properties from './properties'
  import animations from './animations'
  import page from './page'
  import project from './project'

  export default {
  	components: {
  		uiTabs,
  		uiTabItem,
  		properties,
      animations,
      page,
      project
  	},
  	computed: {
  		...mapState(['widgetID', 'pageID', 'h5app'])
  	},
    methods: {
      hideSettingApp(e) {
        this.$store.commit(types.SET_PROJECT, {
          setting: false
        })
      }
    },
  	data() {
  		return {
  			widgetActiveName: 'properties'
  		}
  	}
  }
</script>

<style lang="sass">
	@include B(setting) {
		position: absolute;
		right: 0px;
		top: 0px;
		width: 300px;
		height: 100%;
		border-left: 1px solid $borderColor;
		background: #eee;
    transform: translateZ(0);
	}
</style>