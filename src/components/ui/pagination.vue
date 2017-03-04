<template>
  <div class="ui-pagination" v-if="pages > 1">
    <ui-button-group>
      <ui-button 
        :disabled="disabledPrev" 
        @click="handleClick(currentPage - 1)">
        <i class="iconfont icon-arrow-left"></i>
      </ui-button>

      <ui-button 
        v-text="1"
        :type="buttonType(1)" 
        @click="handleClick(1)">
      </ui-button>

      <ui-button 
        v-if="showPrevMore"
        @click="handleClick(currentPage - 5)">
        <i class="iconfont icon-ellipsis"></i>
        <i class="iconfont icon-arrows-left"></i>
      </ui-button>

      <ui-button 
        v-for="value in numbers" 
        v-text="value"
        :type="buttonType(value)"
        @click="handleClick(value)">
      </ui-button>

      <ui-button 
        v-if="showNextMore"
        @click="handleClick(currentPage + 5)">
        <i class="iconfont icon-ellipsis"></i>
        <i class="iconfont icon-arrows-right"></i>
      </ui-button>

      <ui-button 
        v-text="pages"
        :type="buttonType(pages)" 
        @click="handleClick(pages)">
      </ui-button>

      <ui-button 
        :disabled="disabledNext"
        @click="handleClick(currentPage + 1)">
        <i class="iconfont icon-arrow-right"></i>
      </ui-button>
    </ui-button-group>
  </div>
</template>

<script>
  import uiButton from './button'
  import uiButtonGroup from './button/group'

  export default {
    props: {
      total: {
        type: Number
      },
      size: {
        type: Number,
        default: 10
      },
      current: {
        type: Number,
        default: 1
      }
    },
    components: {
      uiButton,
      uiButtonGroup
    },
    computed: {
      pages() {
        return Math.ceil(this.total / this.size)
      },
      numbers() {
        let result = [], limit = 7, start = 0, end = 0

        this.showPrevMore = this.pages > limit && this.currentPage > limit - 2
        this.showNextMore = this.pages > limit && this.currentPage < this.pages - 3

        if (this.showPrevMore && !this.showNextMore) {
          start = this.pages - (limit - 2)
          end = this.pages
        } else if (!this.showPrevMore && this.showNextMore) {
          start = 2
          end = limit
        } else if (this.showPrevMore && this.showNextMore) {
          let offset = Math.floor(limit / 2) - 1
          start = this.currentPage - offset
          end = this.currentPage + offset + 1
        } else {
          start = 2
          end = this.pages
        }

        for (let i = start; i < end; i++) {
          result.push(i)
        }
        return result
      },
      disabledPrev() {
        return this.currentPage === 1
      },
      disabledNext() {
        return this.currentPage === this.pages
      }
    },
    watch: {
      current(val) {
        this.handleClick(val)
        this.currentPage = val
      }
    },
    methods: {
      handleClick(page) {
        if (this.currentPage !== page) {
          this.currentPage = page
          this.$emit('change', page)
        }
      },
      buttonType(value) {
        return value === this.currentPage ? 'primary' : 'default'
      }
    },
    data() {
      return {
        showPrevMore: false,
        showNextMore: false,
        currentPage: this.current
      }
    }
  }
</script>

<style lang="sass">
  @include B(ui-pagination) {
    .ui-button-group {
      .ui-button {
        width: 30px;
        flex: none;
        padding: 0px;
        font-size: 12px;

        .iconfont {
          font-size: 14px;
          margin-top: 2px;
          display: inline-block;
        }

        .icon-arrows-left,
        .icon-arrows-right {
          display: none;
        }

        &:hover {
          .icon-arrows-left,
          .icon-arrows-right {
            display: inline-block;
          }

          .icon-ellipsis {
            display: none;
          }
        }
      }
    }
  }
</style>