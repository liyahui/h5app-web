<template>
  <menus :list="list" @click="operate"></menus>
</template>

<script>
  import * as types from 'store/types'
  import menus from './menus'

  export default {
    components: {
      menus
    },
    methods: {
      operate(type, e) {
        let fn = this[type]
        fn && fn(e)
      },
      preview() {
        this.$store.dispatch(types.PREVIEW_PROJECT)
      },
      save() {
        this.$store.dispatch(types.SAVE_PROJECT)
      },
      setting() {
        this.$store.commit(types.SET_PROJECT, {
          setting: true
        })
      }
    },
    data() {
      return {
        list: {
          setting: {
            name: '设置'
          },
          save: {
            name: '保存'
          },
          preview: {
            name: '预览'
          }
        }
      }
    }
  }
</script>

<style lang="sass">
  
</style>