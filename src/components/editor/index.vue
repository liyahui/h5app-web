<template>
  <div class="editor">
    <navbar></navbar>
    <div class="container">
      <sidebar></sidebar>
      <stage></stage>
      <setting></setting>
    </div>
    <preview></preview>
    <resource type="image"></resource>
    <loading v-if="loading"></loading>
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
  import loading from './popup/loading'
  import preview from '../preview'

  export default {
    components: {
      navbar,
      sidebar,
      stage,
      setting,
      resource,
      preview,
      loading
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

        this.loading = false
      },
      resetEditorState() {
        this.$store.commit(types.RESET_PROJECT)
        this.$store.commit(types.PREVIEW_PROJECT, {
          visible: false,
          project: {}
        })
      }
    },
    beforeRouteLeave(to, from, next) {
      this.resetEditorState()
      next()
    },
    data() {
      return {
        loading: true
      }
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