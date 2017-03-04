<template>
  <div class="editor">
    <navbar></navbar>
    <div class="container">
      <sidebar></sidebar>
      <stage></stage>
      <setting></setting>
    </div>
    <resource type="image"></resource>
  </div>
</template>

<script>
  import * as types from 'store/types'
  import { mapState, mapGetters } from 'vuex'
  import navbar from './navbar'
  import sidebar from './sidebar'
  import stage from './stage'
  import setting from './setting'
  import resource from './popup/resource'

  export default {
    components: {
      navbar,
      sidebar,
      stage,
      setting,
      resource
    },
    computed: {
      ...mapState(['h5app', 'user']),
      ...mapGetters(['pageIndex', 'widgetIndex'])
    },
    watch: {
      $route: 'getProjectData'
    },
    methods: {
      async getProjectData() {
        this.resetEditorState()

        const project = await this.$store.dispatch(types.GET_PROJECT, {
          id: this.$route.params.id
        })

        if (!project || project.uid !== this.user.id) {
          this.$router.push('/')
        }
      },
      resetEditorState() {
        this.$store.commit(types.RESET_PROJECT)
      }
    },
    beforeRouteLeave(to, from, next) {
      this.resetEditorState()
      next()
    },
    created() {
      this.getProjectData()
    }
  }
</script>

<style lang="sass">
  .editor {
    height: 100%;
    overflow: hidden;
  }
</style>