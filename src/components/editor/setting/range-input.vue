<template>
	<ui-row>
    <ui-col :span="4">{{label}}</ui-col>
    <ui-col :span="13" align="center">
      <ui-range 
      	:value="value" 
      	:min="min" 
      	:max="max" 
      	:step="step" 
      	@change="changeValue">
    	</ui-range>
    </ui-col>
    <ui-col :span="6" :offset="1">
      <ui-number 
      	:value="value" 
      	:min="min" 
      	:max="max" 
      	:step="step" 
      	:unit="unit" 
      	@input="changeValue">
    	</ui-number>
    </ui-col>
  </ui-row>
</template>

<script>
	import { uiRow, uiCol, uiNumber, uiRange } from 'ui'

  export default {
  	props: ['label', 'value', 'min', 'max', 'step', 'unit'],
  	components: {
  		uiRow,
  		uiCol,
  		uiNumber,
  		uiRange
  	},
  	methods: {
  		changeValue(value) {
  			this.$emit('change', value)
  		}
  	}
  }
</script>

<style lang="sass">

</style>