<template>
  <div class="ui-tabs">
		<div class="ui-tabs__nav">
			<div 
				v-for="nav in navs" 
				v-text="nav.label" 
        class="ui-tabs__tab"
				:class="classNames(nav)"
				@click="changeActive(nav.name)">
			</div>
		</div>
		<div class="ui-tabs__content">
  		<slot></slot>
  	</div>
  </div>
</template>

<script>
  export default {
  	props: {
  		value: String,
  		width: {
  			type: Number,
  			default: 160
  		}
  	},
  	methods: {
  		changeActive(name) {
  			this.$emit('input', name)
  		},
      classNames(nav) {
        return {
          'ui-tabs__tab--active': nav.name === this.value || this.navs.length === 1,
          'ui-tabs__tab--border': this.navs.length === 1
        }
      }
  	},	
    data() {
      return {
        navs: []
      }
    },
  	mounted() {
  		this.navs = this.$children.map(item => {
  			let { name, label } = item
  			return { name, label }
  		})
  	}
  }
</script>

<style lang="sass">
  @include B(ui-tabs) {
    height: 100%;

    @include E(nav) {
      display: flex;
      text-align: center;
    }

    @include E(tab) {
      flex: 1;
      height: 40px;
      line-height: 40px;
      background: $borderColor;
      cursor: pointer;

      @include M(active) {
        background: none;
      }

      @include M(border) {
        border-bottom: 1px solid $borderColor;
        cursor: default;
      }
    }
    
    @include E(content) {
      height: calc(100% - 40px);
    }
  }
</style>