<template>
  <div class="properties">
  	<template v-if="isText">
	  	<div class="properties__item">
	  		<ui-row>
			    <ui-col :span="4">字体</ui-col>
			    <ui-col :span="4">
			      <ui-color 
			      	:value="style.color" 
			      	:empty="false"
			      	@input="setWidgetStyle('color', $event)">
		      	</ui-color>
			    </ui-col>
			    <ui-col :span="7" :offset="1">
		        <ui-number 
		        	unit="px"
		        	:value="style.fontSize" 
		        	:min="16" 
		        	:max="100"
		        	@input="setWidgetStyle('fontSize', $event)">
	        	</ui-number>
			    </ui-col>
			    <ui-col :span="7" :offset="1">
			      <ui-select 
			      	:value="style.lineHeight" 
			      	:options="lineHeightOptions"
			      	@change="setWidgetStyle('lineHeight', $event)">
			      </ui-select>
			    </ui-col>
			  </ui-row>
	  	</div>
	  	<div class="properties__item">
		  	<ui-row class="styles__property">
			    <ui-col :span="3" v-for="item, index in textStyles" :offset="index === 0 ? 0 : 1">
			      <ui-button 
			      	block
			      	:icon="'text-' + item.val"
			      	:type="style[item.key] ? 'primary' : 'default'"
			      	@click="setWidgetStyle(item.key, style[item.key] ? '' : item.val)">
		      	</ui-button>
			    </ui-col>
			    <ui-col :span="1"></ui-col>
			    <ui-col :span="3" :offset="1" v-for="value in textAligns">
			      <ui-button 
			      	block
			      	:icon="'text-' + value" 
			      	:type="style.textAlign === value ? 'primary' : 'default'" 
			      	@click="setWidgetStyle('textAlign', value)" >
		      	</ui-button>
			    </ui-col>
			  </ui-row>
	  	</div>
	  	<hr>
  	</template>
	
		<template v-if="style.backgroundColor">
	  	<div class="properties__item">
				<ui-row>
		      <ui-col :span="4">背景</ui-col>
		      <ui-col :span="20" justify="center">
		        <ui-color 
		        	:value="style.backgroundColor" 
		        	@input="setWidgetStyle('backgroundColor', $event)">
	        	</ui-color>
		      </ui-col>
		    </ui-row>
	  	</div>
	  	<hr>
  	</template>
		
		<div class="properties__item">
			<range-input 
				label="圆角"
				unit="px"
				:value="style.borderRadius"
				:min="0"
				:max="maxBorderRadius"
				@change="setWidgetStyle('borderRadius', $event)">
			</range-input>
	  </div>

	  <div class="properties__item">
			<range-input 
				label="旋转"
				unit="deg"
				:value="style.transform.rotate"
				:min="0"
				:max="360"
				@change="setWidgetStyleTransform('rotate', $event)">
			</range-input>
	  </div>

	  <div class="properties__item">
			<range-input 
				label="透明"
				unit="%"
				:value="widgetOpacity"
				:min="0"
				:max="100"
				@change="widgetOpacity = $event">
			</range-input>
	  </div>
		
		<div class="properties__item">
		  <ui-row>
	      <ui-col :span="4">边框</ui-col>
	      <ui-col :span="5" align="center">
	        <ui-color 
	        	:value="style.borderColor"
	        	@input="setWidgetStyle('borderColor', $event)">
        	</ui-color>
	      </ui-col>
	      <ui-col :span="7" :offset="1">
	        <ui-select 
	        	:value="style.borderStyle" 
	        	:clear="true" 
	        	@change="setWidgetStyle('borderStyle', $event)">
	          <ui-option v-for="item in borderStyleOptions" :value="item.value">
	            <div 
	            	class="properties__border--custom" 
	            	v-text="item.label" 
	            	:style="{border: `1px ${item.value} #333`}">
            	</div>
	          </ui-option>
	        </ui-select>
	      </ui-col>
	      <ui-col :span="6" :offset="1">
	        <ui-number
	        	unit="px"
	        	:value="style.borderWidth" 
	        	:min="0" 
	        	:max="maxBorderWidth" 
	        	@input="setWidgetStyle('borderWidth', $event)">
        	</ui-number>
	      </ui-col>
	    </ui-row>
    </div>

    <hr>

    <div class="properties__item">
      <ui-row>
        <ui-col :span="4">水平</ui-col>
        <ui-col :span="20">
          <ui-button-group>
            <ui-button
              v-for="label, value in horizontal"
              v-text="label"
              @click="setWidgetPosition(value)">
            </ui-button>
          </ui-button-group>
        </ui-col>
      </ui-row>
    </div>

    <div class="properties__item">
      <ui-row>
        <ui-col :span="4">垂直</ui-col>
        <ui-col :span="20">
          <ui-button-group>
            <ui-button
              v-for="label, value in vertical"
              v-text="label"
              @click="setWidgetPosition(value)">
            </ui-button>
          </ui-button-group>
        </ui-col>
      </ui-row>
    </div>

    <hr>
		
		<div class="properties__item">
	    <ui-row>
	      <ui-col :span="4">大小</ui-col>
	      <ui-col :span="4" justify="center">宽</ui-col>
	      <ui-col :span="isText ? 16 : 6">
	        <ui-number 
	          	unit="px"
	          	:value="style.width"
	          	@input="setWidgetStyle('width', $event)">
          	</ui-number>
	      </ui-col>
	      <template v-if="!isText">
	        <ui-col :span="4" justify="center">高</ui-col>
	        <ui-col :span="6">
	          <ui-number 
	          	unit="px"
	          	:value="style.height"
	          	@input="setWidgetStyle('height', $event)">
          	</ui-number>
	        </ui-col>
	      </template>
	    </ui-row>
	  </div>

	  <div class="properties__item">
	    <ui-row>
	      <ui-col :span="4">位置</ui-col>
	      <ui-col :span="4" justify="center">X</ui-col>
	      <ui-col :span="6">
	        <ui-number 
          	unit="px"
          	:value="style.left"
          	@input="setWidgetStyle('left', $event)">
        	</ui-number>
	      </ui-col>
        <ui-col :span="4" justify="center">Y</ui-col>
        <ui-col :span="6">
          <ui-number 
          	unit="px"
          	:value="style.top"
          	@input="setWidgetStyle('top', $event)">
        	</ui-number>
        </ui-col>
	    </ui-row>
	  </div>
  </div>
</template>

<script>
	import * as types from 'store/types'
  import { mapGetters } from 'vuex'
  import { uiNumber, uiRange, uiColor, uiRow, uiCol, uiButton, uiButtonGroup, uiSelect, uiOption } from 'ui'
  import rangeInput from './range-input'

  export default {
  	components: {
  		uiNumber,
  		uiRange,
  		uiColor,
  		uiRow,
  		uiCol,
  		uiButton,
  		uiButtonGroup,
  		uiSelect,
  		uiOption,
  		rangeInput
  	},
  	computed: {
      ...mapGetters(['widget']),
      style() {
        return this.widget.style
      },
      isText() {
      	return this.widget.type === 'text'
      },
      lineHeightOptions() {
      	let options = []
      	for (let i = 10; i <= 20; i += 1) {
      		let val = Number(i / 10).toFixed(1)
      		options.push({
      			value: parseFloat(val),
      			label: val + '倍'
      		})
      	}
      	return options
      },
      maxBorderRadius() {
        return Math.ceil(Math.max(this.style.width, this.style.height) / 2)
      },
      maxBorderWidth() {
      	return Math.ceil(Math.min(this.style.width, this.style.height) / 2)
      },
      widgetOpacity: {
      	get() {
      		return parseInt(100 - this.style.opacity * 100)
      	},
      	set(newVal) {
      		this.setWidgetStyle('opacity', 1 - newVal / 100)
      	}
      }
    },
    methods: {
    	setWidgetStyle(key, value) {
    		this.$store.commit(types.SET_WIDGET_STYLE, {
    			style: { [key]: value }
    		})
    	},
    	setWidgetStyleTransform(key, value) {
    		this.$store.commit(types.SET_WIDGET_STYLE, {
    			style: { 
    				transform: {
    					[key]: value
    				}
    			}
    		})
    	},
    	setWidgetPosition(value) {
    		this.$store.commit(types.SET_WIDGET_POSITION, {
    			value
    		})
    	}
    },
    data() {
    	return {
    		textAligns: ['left', 'center', 'right'],
    		textStyles: [{
    			key: 'fontWeight',
    			val: 'bold'
    		}, {
    			key: 'textDecoration',
    			val: 'underline'
    		}, {
    			key: 'fontStyle',
    			val: 'italic'
    		}],
    		borderStyleOptions: [{
          value: 'solid',
          label: '实线'
        }, {
          value: 'dashed',
          label: '虚线'
        }, {
          value: 'dotted',
          label: '点线'
        }],
        horizontal: {
        	left: '左对齐',
        	center: '居中',
        	right: '右对齐'
        },
        vertical: {
        	top: '顶对齐',
        	middle: '居中',
        	bottom: '底对齐'
        }
    	}
    }
  }
</script>

<style lang="sass">
	@include B(properties) {
    padding: 15px;

    @include E(item) {
      line-height: 30px;
      margin-bottom: 10px;
    }

    @include E(border) {
      @include M(custom) {
        height: 20px;
        font-size: 12px;
        text-align: center;
        line-height: 18px;
        margin-top: 4px;
      }
    }

    @include E(tips) {
      color: $grayLight;
      font-size: 12px;
    }
  }

  .ui-select__option--selected {
  	.properties__border--custom {
  		border-color: #fff !important;
  	}
  }
</style>