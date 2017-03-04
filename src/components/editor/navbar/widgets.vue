<template>
  <menus :list="list" @click="create"></menus>
</template>

<script>
  import * as types from 'store/types'
  import { mapGetters } from 'vuex'
  import menus from './menus'

  export default {
    components: {
      menus
    },
    methods: {
      create(type, e) {
        e.stopPropagation()

        switch (type) {
          case 'text':
            this.$store.commit(types.ADD_WIDGET, { type })
          break
          case 'image': 
            this.$store.commit(types.RESOURCE_TARGET, { 
              type: 'image', 
              target: 'widget' 
            })
          break
        }
      }
    },  
    data() {
      return {
        list: {
          text: {
            name: '文本'
          },
          image: {
            name: '图片'
          },
          /*
          button: {
            name: '按钮'
          },
          music: {
            name: '音乐'
          }
          */
        }
      }
    }
  }
</script>

<style lang="sass">
  
</style>