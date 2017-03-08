<template>
  <div class="resource" data-project-stop>
  	<ui-modal :value="visible" :title="`我的${resource.name}`" @input="close" size="large">
      <template slot="body">
        <div class="resource__list">
          <div 
            class="resource__item"
            v-for="item, index in data.list" 
            v-if="item">
            <template v-if="type === 'image'">
              <div 
                class="resource__image" 
                :style="{backgroundImage: `url(${item.url})`}">
              </div>
            </template>
            <template v-if="type === 'music'">
              <div class="resource__music" v-text="item.name"></div>
            </template>
            <div class="resource__operate">
              <div class="resource__checked" @click="select(item)">
                <div class="iconfont icon-checked"></div>
                <div 
                  class="iconfont icon-play" 
                  v-if="type === 'music' && index !== playIndex"
                  @click.stop="playMusic(index)">
                </div>
                <div 
                  class="iconfont icon-pause" 
                  v-if="type === 'music' && index === playIndex" 
                  @click.stop="stopMusic(index)">
                </div>
              </div>
              <i class="iconfont icon-clear" @click="remove(item)"></i>
              <div class="resource__name" v-text="item.name"></div>
            </div>
          </div>
          <div class="resource__empty" v-if="!data.list.length">
            暂无{{resource.name}}
          </div>
          <audio :src="item.url" v-if="type === 'music' && item" ref="music"></audio>
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
            <div class="resource__tips">
              一次最多上传10个{{resource.name}}，单个不能大于{{resource.size}}K
            </div>
            <div class="resource__btns">
              <ui-button type="primary">
                上传{{resource.name}}
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
      },
      resource() {
        return this.resourceMap[this.type]
      },
      item() {
        return this.data.list[this.playIndex]
      }
    },
  	methods: {
  		upload(e) {
        if (e.target.files.length > this.resource.limit) {
          return this.$toast.show(`最多上传${this.resource.limit}个${this.resource.name}`)
        }

        const message = []

        Array.from(e.target.files).forEach(file => {
          if (file.size <= this.resource.size * 1024) {
            const data = new FormData()
            data.append('file', file)
            this.$store.dispatch(types.UPLOAD_RESOURCE, {
              type: this.type,
              data
            })
          } else {
            message.push(file.name)
          }
        })

        if (message.length) {
          this.$toast.show(`${message.join(', ')}大小超出限制，请压缩后再上传`)
        }
  		},
  		select(item) {
        switch (this.type) {
          case 'image':
            this.selectImage(item)
          break
          case 'music':
            this.selectMusic(item)
          break
        }
        this.close()
  		},
      selectImage(item) {
        switch (this.data.target) {
          case 'widget':
            this.$store.commit(types.ADD_WIDGET, {
              type: 'image',
              url: item.url,
              style: {
                width: item.props.width,
                height: item.props.height
              }
            })
          break
          case 'page':
            this.$store.commit(types.SET_PAGE_BACKGROUND, {
              image: item.url
            })
          break
          case 'project':
            this.$store.commit(types.SET_PROJECT, {
              icon: item.url + '?imageMogr2/thumbnail/200x200!'
            })
          break
        }
      },
      selectMusic(item) {
        this.$store.commit(types.SET_PROJECT_PROPS, {
          music: {
            name: item.name,
            url: item.url
          }
        })
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
  		},
      playMusic(index) {
        this.playIndex = index
        this.$nextTick(() => {
          this.$refs.music.pause()
          this.$refs.music.play()
        })
      },
      stopMusic(index) {
        this.playIndex = -1
        this.$refs.music.pause()
      }
  	},
    created() {
      this.fetch(this.data.current)
    },
    data() {
      return {
        playIndex: -1,
        resourceMap: {
          image: {
            name: '图片',
            limit: 10,
            size: 512
          },
          music: {
            name: '音乐',
            limit: 5,
            size: 1024
          }
        }
      }
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

    @include E(list) {
      width: calc(100% + 15px);
      height: 300px;
      margin-top: -10px;
      padding-bottom: 5px;
    }

    @include E(item) {
      width: 83px;
      height: 83px;
      margin-top: 15px;
      float: left;
      margin-right: 15px;
      border: 1px solid $grayLight;
      cursor: pointer;
      padding: 5px;
      position: relative;
      background: rgba(0, 0, 0, 0.2);
    }

    @include E(image) {
      width: 100%;
      height: 100%;
      background-repeat: no-repeat;
      background-size: contain;
      background-position: center;
    }

    @include E(name) {
      position: absolute;
      width: 100%;
      left: 0px;
      bottom: 0px;
      font-size: 12px;
      background: rgba(0, 0, 0, 0.7);
      color: #fff;
      line-height: 20px;
      overflow: hidden;
      text-align: center;
      opacity: 0;
      transition: opacity 0.3s;
      z-index: 1;
      padding: 0px 5px;
      word-break: break-all;
      height: 20px;
    }

    @include E(music) {
      width: 100%;
      height: 100%;
      word-break: break-all;
      font-size: 12px;
      text-align: center;
      display: flex;
      justify-content: center;
      align-items: center;
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

    @include E(tips) {
      font-size: 12px;
      color: $grayLight;
      line-height: 30px;
    }

    @include E(empty) {
      color: $grayLight;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      font-size: 12px;
    }

    @include E(operate) {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0px;
      top: 0px;
      opacity: 0;
      transition: opacity 0.3s;
      background: rgba(255, 255, 255, 0.7);

      .iconfont {
        font-size: 24px;
        line-height: 24px;
        cursor: pointer;
      }

      .icon-checked {
        color: $successColor;
        &:hover {
          color: darken($successColor, 5%);
        }
      }

      .icon-play,
      .icon-pause {
        color: $primaryColor;
        margin-left: 10px;
        &:hover {
          color: darken($primaryColor, 5%);
        }
      }

      .icon-clear {
        position: absolute;
        right: 0px;
        top: 0px;
        color: $dangerColor;
        &:hover {
          color: darken($dangerColor, 5%);
        }
      }
    }

    @include E(checked) {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0px;
      top: 0px;
      display: flex;
      justify-content: center;
      align-items: center;
      padding-bottom: 5px;
    }

    .ui-modal__body {
      padding-bottom: 0px;
    }

    .ui-modal__foot {
      padding-top: 5px;
    }
  }

  .resource__item {
    &:hover {
      .resource__operate {
        opacity: 1;
      }

      .resource__name {
        opacity: 1;
      }
    }
  }
</style>