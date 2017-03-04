<template>
  <div class="ui-col" :style="colStyle" :class="[`ui-col-${span}`, `ui-col-offset-${offset}`]">
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
  		offset: {
  			type: Number,
  			default: 0
  		},
  		span: {
  			validator(val) {
  				return Number.isInteger(val) && val >=1 && val <=24
  			},
  			default: 24
  		}
  	},
  	computed: {
  		colStyle() {
  			let style = {
  				justifyContent: this.justify,
  				alignItems: this.align
  			}

  			if (this.$parent.gutter) {
  				style.paddingLeft = style.paddingRight = (this.$parent.gutter / 2) + 'px'
  			}

  			return style
  		}
  	}
  }
</script>

<style lang="sass">
	$colTotal: 24;
	$rowWidth: 100% / $colTotal;

	@for $i from 1 through $colTotal {
		.ui-col-#{$i} {
			width: $rowWidth * $i;
		}
		.ui-col-offset-#{$i} {
			margin-left: $rowWidth * $i;
		}
	}

	.ui-col {
		display: flex;
	}
</style>