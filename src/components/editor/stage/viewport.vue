<template>
  <div class="viewport" :style="viewportStyle">
    <page :data="homePage" v-if="page" :operate="false"></page>
    <page :data="page" v-if="page"></page>
  </div>
</template>

<script>
  import { mapState, mapGetters } from 'vuex'
  import page from './page'

  export default {
    components: {
      page
    },
  	computed: {
      ...mapState(['h5app']),
      ...mapGetters(['page']),

      homePage() {
        return this.h5app.pages[0] || {}
      }
  	}
  }
</script>

<style lang="sass">
  @include B(viewport) {
    width: $viewportWidth;
    height: $viewportHeight;
    position: relative;
    background: rgb(250, 250, 250);
    box-shadow: 0px 0px 30px 5px rgba(0, 0, 0, 0.1);
  }
</style>