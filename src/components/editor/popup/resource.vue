<template>
  <div class="resource" data-project-stop>
  	<ui-modal :value="visible" title="我的图片" @input="close" size="large">
      <template slot="body">
        <div class="resource__images" v-if="type === 'image'">
          <div 
            class="resource__image transparent"
            v-for="item in data.list" 
            v-if="item">
            <div 
              class="resource__elem" 
              :style="{backgroundImage: `url(${item.url})`}">
            </div>
            <div class="resource__operate">
              <i class="iconfont icon-checked" @click="select(item)"></i>
              <i class="iconfont icon-delete" @click="remove(item)"></i>
            </div>
          </div>
        </div>
        <hr>
      </template>
      <template slot="foot">
        <ui-row>
          <ui-col :span="12">
            <ui-pagination 
              :total="data.total" 
              :current="data.page" 
              :size="data.size" 
              @change="fetch">
            </ui-pagination>
          </ui-col>
          <ui-col :span="12" justify="flex-end">
            <div class="resource__btns">
              <ui-button type="primary">
                上传图片
                <input 
                  multiple
                  type="file" 
                  class="upload" 
                  @change="upload">
              </ui-button>
            </div>
          </ui-col>
        </ui-row>
      </template>
    </ui-modal>
  </div>
</template>

<script>
  import * as types from 'store/types'
  import { mapState } from 'vuex'
	import { uiModal, uiPagination, uiRow, uiCol, uiButton } from 'ui'

  export default {
  	props: {
  		type: {
  			type: String,
  			default: 'image'
  		}
  	},
    components: {
      uiModal, 
      uiPagination, 
      uiRow, 
      uiCol, 
      uiButton
    },
    computed: {
      ...mapState(['cacheList']),

      data() { 
        return this.cacheList[this.type]
      },
      visible() {
        return !!this.data.target
      }
    },
  	methods: {
  		upload(e) {
        Array.from(e.target.files).forEach(file => {
          const data = new FormData()
          data.append('file', file)
          this.$store.dispatch(types.UPLOAD_RESOURCE, {
            type: this.type,
            data
          })
        })
  		},
  		select(item) {
        switch (this.data.target) {
          case 'widget':
            this.$store.commit(types.ADD_WIDGET, {
              type: 'image',
              url: item.url,
              style: {
                width: item.width,
                height: item.height
              }
            })
          break
          case 'page':
            this.$store.commit(types.SET_PAGE_BACKGROUND, {
              background: {
                image: item.url
              }
            })
          break
          case 'project':
            this.$store.commit(types.SET_PROJECT, {
              icon: item.url + '?imageMogr2/thumbnail/200x200!'
            })
          break
        }
        this.close()
  		},
  		remove(item) {
        this.$store.dispatch(types.DELETE_RESOURCE, {
          type: this.type,
          item
        })
  		},
  		fetch(page = 1) {
        this.$store.dispatch(types.GET_CACHE_LIST, { 
          type: this.type, 
          page 
        })
  		},
  		close() {
        this.$store.commit(types.RESOURCE_TARGET, {
          type: this.type,
          target: false
        })
  		}
  	},
    created() {
      this.fetch(this.data.current)
    }
  }
</script>

<style lang="sass">
  @include B(resource) {
    @include E(cate) {
      width: calc(100% + 15px);
      line-height: 24px;
      display: flex;
      flex-wrap: wrap;
      margin-top: -5px;
      a {
        margin-right: 15px;
        color: $gray;
        font-size: 12px;
        &.is_active {
          color: $primaryColor;
        }
      }
    }

    @include E(images) {
      width: calc(100% + 15px);
      height: 300px;
      margin-top: -10px;
      padding-bottom: 5px;
    }

    @include E(image) {
      width: 83px;
      height: 83px;
      margin-top: 15px;
      float: left;
      margin-right: 15px;
      border: 1px solid $grayLight;
      cursor: pointer;
      padding: 5px;
      position: relative;
    }

    @include E(elem) {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }

    @include E(btns) {
      display: flex;
      .ui-button {
        position: relative;
        margin-left: 15px;

        .upload {
          position: absolute;
          width: 100%;
          height: 100%;
          left: 0px;
          top: 0px;
          opacity: 0;
        }
      }
    }

    @include E(operate) {
      position: absolute;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.6);
      left: 0px;
      top: 0px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-around;
      opacity: 0;
      transition: opacity 0.3s;

      .iconfont {
        cursor: pointer;
        padding: 5px;
      }
      
      .icon-checked {
        font-size: 30px;
        color: $successColor;
        &:hover {
          color: darken($successColor, 5%);
        }
      }

      .icon-delete {
        font-size: 24px;
        color: $dangerColor;
        &:hover {
          color: darken($dangerColor, 5%);
        }
      }
    }

    .ui-modal__body {
      padding-bottom: 0px;
    }

    .ui-modal__foot {
      padding-top: 5px;
    }
  }

  .resource__image {
    &:hover {
      .resource__operate {
        opacity: 1;
      }
    }
  }
</style>