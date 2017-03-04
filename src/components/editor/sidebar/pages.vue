<template>
  <div class="pages">
    <div class="pages__scroll">
      <div 
        class="pages__item" 
        v-for="page in h5app.pages"
        :key="page.id" 
        :class="{'pages__item--active': page.id === pageID}"
        @mousedown="changePage(page.id)"
        @contextmenu.stop.prevent="showContextmenu">
        <div class="pages__viewport">
          <page :data="page" :operate="false"></page>
        </div>
        <div class="pages__name" v-text="page.name"></div>
      </div>
    </div>
    <div class="pages__add" @click="addPage">
      <i class="iconfont icon-plus"></i>
    </div>

    <ui-contextmenu 
      v-model="contextmenu.show"
      :position="contextmenu.position"
      :list="contextmenu.list"
      @click="clickContextmenu">
    </ui-contextmenu>

  </div>
</template>

<script>
  import * as types from 'store/types'
  import { mapState, mapGetters } from 'vuex'
  import { uiContextmenu } from 'ui'
  import contextmenuModel from 'models/contextmenu'
  import extend from 'extend'
  import page from '../stage/page'
  import contextmenuMixin from 'utils/contextmenu'

  export default {
    mixins: [contextmenuMixin],
    components: {
      page,
      uiContextmenu
    },
    computed: {
      ...mapState(['pageID', 'h5app', 'widgetID']),
      ...mapGetters(['pageIndex'])
    },
    watch: {
      pageIndex() {
        this.pagesMenuState()
      }
    },
    methods: {
      addPage() {
        this.$store.commit(types.ADD_PAGE)
      },
      changePage(id) {
        if (id !== this.pageID) {
          this.$store.commit(types.SET_PAGE_ID, {
            id
          })
        }
      },
      clickContextmenu(key) {
        switch (key) {
          case 'up':
          case 'down':
            this.$store.commit(types.SORT_PAGE, { key })
            break
          case 'copy':
            this.$store.commit(types.ADD_PAGE, {
              copy: true
            })
            break
          case 'delete':
            this.$store.commit(types.DELETE_PAGE)
            break
        }
      },
      pagesMenuState() {
        let list = this.contextmenu.list

        if (this.pageIndex === 0) {
          list.up.disable = true
        } else {
          list.up.disable = false
        }

        if (this.pageIndex === this.h5app.pages.length - 1) {
          list.down.disable = true
        } else {
          list.down.disable = false
        }
      }
    },
    created() {
      this.contextmenu.list = contextmenuModel.pages
    }
  }
</script>

<style lang="sass">
  @include B(pages) {
    height: 100%;
    position: relative;

    @include E(scroll) {
      padding-top: 10px;
      height: calc(100% - 50px);
      overflow-x: hidden;
      overflow-y: auto;
    }

    @include E(item) {
      width: 140px;
      height: 164px;
      border: 4px solid rgba(214, 214, 214, 0);
      overflow: hidden;
      margin: 0 auto;
      margin-bottom: 10px;
      position: relative;

      @include M(active) {
        border-color: $primaryColor;
      }
    }
    
    @include E(name) {
      position: absolute;
      left: 0px;
      bottom: 0px;
      width: 100%;
      text-align: center;
      line-height: 25px;
      height: 25px;
      overflow: hidden;
      font-size: 12px;
      padding-top: 2px;
    }

    @include E(viewport) {
      width: $viewportWidth;
      height: $viewportHeight;
      transform: scale(0.26);
      background: #fff;
      transform-origin: 28px 0px;
      position: relative;
      overflow: hidden;
    }

    @include E(add) {
      line-height: 50px;
      height: 50px;
      color: #fff;
      background: #242527;
      text-align: center;
      position: absolute;
      left: 0px;
      bottom: 0px;
      width: 100%;
      cursor: pointer;

      .icon-plus {
        font-size: 20px;
      }
    }
  }

  .pages__item--active {
    .pages__name {
      background: $primaryColor;
      color: #fff;
    }
  }
</style>