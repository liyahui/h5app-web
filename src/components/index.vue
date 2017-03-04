<template>
  <div class="index">
    <navbar 
      @login="setPassport('login')" 
      @register="setPassport('register')"
      @logout="logout">
    </navbar>
      
    <div class="center">
      <router-view></router-view>
    </div>

    <passport 
      @login="setPassport('login')" 
      @register="setPassport('register')"
      @close="setPassport('', false)">
    </passport>
  </div>
</template>

<script>
	import * as types from 'store/types'
  import { mapState } from 'vuex'
  import navbar from './navbar'
  import passport from './passport'

  export default {
    components: {
      navbar,
      passport
    },
    computed: {
      ...mapState(['user'])
    },
    watch: {
      user(val) {
        if (!val) {
          this.$router.push('/')
        }
      }
    },
    methods: {
      setPassport(type, visible = true) {
        this.$store.commit(types.SET_PASSPORT, { visible, type })
      },
      logout() {
        this.$store.commit(types.SET_USER, { token: '', user: null })
        this.$store.commit(types.RESET_CACHE_LIST)
      }
    }
  }
</script>

<style lang="sass">
  .index {
    padding-top: 50px;
  }
</style>