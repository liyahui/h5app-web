<template>
  <div class="viewport">
    <page :data="homePage" v-if="page" :operate="false"></page>
    <div class="viewport__mask"></div>
    <div class="viewport__app" :style="viewportStyle">
      <page :data="page" v-if="page"></page>
    </div>
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
      },

      viewportStyle() {
        return {
          background: this.h5app.props.bgcolor
        }
      }
  	}
  }
</script>

<style lang="sass">
  @include B(viewport) {
    width: $viewportWidth;
    height: $viewportHeight;
    position: relative;
    box-shadow: 0px 0px 30px 5px rgba(0, 0, 0, 0.1);

    & > div {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0px;
      top: 0px;
    }

    @include E(mask) {
      background: rgb(250, 250, 250);
    }
  }
</style>