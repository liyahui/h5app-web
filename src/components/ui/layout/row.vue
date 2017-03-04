<template>
	<div class="ui-row" style="rowStyle" :class="className">
		<slot></slot>
	</div> 
</template>

<script>
  export default {
  	props: {
  		justify: {
  			type: String,
  			default: ''
  		},
  		align: {
  			type: String,
  			default: ''
  		},
  		gutter: {
  			type: Number,
  			default: 0
  		},
  		className: {
  			type: String
  		}
  	},
  	computed: {
  		rowStyle() {
  			let style = {
  				justifyContent: this.justify,
  				alignItems: this.align
  			}

  			if (this.gutter) {
  				style.marginLeft = style.marginRight = (-this.gutter / 2) + 'px'
  			}

  			return style
  		}
  	}
  }
</script>

<style lang="sass">
	.ui-row {
		display: flex;

		&:after {
			content: '\20';
	    display: block;
	    height: 0;
	    clear: both;
	    visibility: hidden;
		}

		& > div {
			float: left;
		}
	}

</style>