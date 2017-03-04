<template>
  <div 
    class="ui-select__option"
    :class="{'ui-select__option--selected': selected}" 
    @click="$parent.handleSelectItem(value, $event)">
  	<slot>
  		{{label}}
  	</slot>
  </div>
</template>

<script>
  export default {
  	props: {
  		value: [String, Number],
  		label: [String, Number]
  	},
    computed: {
      selected() {
        return this.value === this.$parent.currentValue
      }
    },
    created() {
      if (this.selected) {
        this.$parent.setSelectedIndex(this.value)
      }
    }
  }
</script>