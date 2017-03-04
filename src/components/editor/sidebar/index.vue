<template>
  <div class="sidebar">
  	<ui-tabs v-model="activeName">
      <ui-tab-item label="页面" name="pages">
        <pages></pages>
      </ui-tab-item>
      <ui-tab-item label="图层" name="layers">
        <layers></layers>
      </ui-tab-item>
    </ui-tabs>
  </div>
</template>

<script>
  import { uiTabs, uiTabItem } from 'components/ui'
  import pages from './Pages'
  import layers from './Layers'

  export default {
  	components: {
  		uiTabs,
      uiTabItem,
      pages,
      layers
  	},
  	data() {
  		return {
  			activeName: 'pages'
  		}
  	}
  }
</script>

<style lang="sass">
  @include B(sidebar) {
    position: absolute;
    z-index: 99;
    width: 160px;
    height: calc(100%);
    left: 0px;
    top: 0px;
    background: #eee;
    border-right: 1px solid $borderColor;
  }
</style>