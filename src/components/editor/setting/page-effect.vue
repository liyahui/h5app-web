<template>
  <div class="properties__item">
    <ui-row>
      <ui-col :span="6">切换效果</ui-col>
      <ui-col :span="18">
        <ui-select 
        	:options="options" 
      		:value="value"
      		:clear="clear"
      		@change="handleChange">
    		</ui-select>
      </ui-col>
    </ui-row>
  </div>
</template>

<script>
	import { uiRow, uiCol, uiSelect } from 'ui'

  export default {
  	props: {
  		value: [String, Number],
  		clear: {
  			type: Boolean,
  			default: false
  		}
  	},
  	components: {
  		uiRow,
  		uiCol,
  		uiSelect
  	},
  	methods: {
  		handleChange(value) {
  			this.$emit('change', value)
  		}
  	},
  	data() {
  		return {
  			options: [{
				  value: 'slide',
				  label: '推进'
				}, {
				  value: 'push',
				  label: '推压'
				}, {
				  value: 'rotate',
				  label: '旋转',
				}, {
				  value: 'zoom-push',
				  label: '缩放推压'
				}, {
				  value: 'zoom',
				  label: '缩放'
				}, {
				  value: 'fade',
				  label: '渐隐'
				}]
  		}
  	}
  }
</script>