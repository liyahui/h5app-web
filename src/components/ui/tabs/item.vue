<template>
  <div class="ui-tabs__item" v-if="name === $parent.value || $parent.navs.length === 1">
		<slot></slot>
  </div>
</template>

<script>
  export default {
  	props: {
  		name: String,
  		label: String
  	}
  }
</script>

<style lang="sass">
  @include B(ui-tabs) {

    @include E(item) {
      height: 100%;
    }
  }
</style>