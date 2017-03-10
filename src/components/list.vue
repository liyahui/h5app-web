<template>
  <div class="project-list">
  	<div class="clearfix">
	  	<div 
        class="project-list__item" 
        v-for="item in project.list"
        :key="type + item.id">
	  		<div class="project-list__img">
	  			<img :src="item.cover" v-if="item.cover">
          <div class="project-operate">
            <div class="project-operate__qrcode">
              <img :src="qrcodeURL(item)" alt="">
            </div>
            <div class="project-operate__item"> 
              <i class="iconfont icon-eye" @click="previewProject(item)"></i>
              预览
            </div>
            <div class="project-operate__item" @click="copyProject(item)"> 
              <i class="iconfont icon-copy"></i>
              复制
            </div>
            <template v-if="self">
              <div class="project-operate__item" @click="editProject(item)"> 
                <i class="iconfont icon-pencil"></i>
                编辑
              </div>
              <div class="project-operate__item"> 
                <i class="iconfont icon-trash" @click="deleteProject(item)"></i>
                删除
              </div>
            </template>
          </div>
        </div>
        <div class="project-list__title" v-text="projectTitle(item)"></div>
	  	</div>
      <div class="project-list__empty" v-if="!project.list.length && project.init">
        暂无作品，点击右上角创建
      </div>
	  </div>
  	<div class="project-list__foot">
      <transition name="page">
  			<ui-pagination 
  				:size="project.size" 
  				:total="project.total" 
  				:current="project.page"
  				@change="projectList">
  			</ui-pagination>
      </transition>
  	</div>
    <preview></preview>
  </div>
</template>

<script>
	import * as types from 'store/types'
	import { mapState } from 'vuex'
	import { uiPagination } from 'ui'
  import preview from './preview'
  import { PREVIEW_PATH } from 'utils'

  export default {
  	components: {
  		uiPagination,
      preview
  	},
  	computed: {
  		...mapState(['user', 'cacheList']),

  		self() {
  			return this.$route.path === '/projects'
  		},

  		type() {
  			return this.self ? 'user' : 'show'
  		},

  		project() {
  			return this.cacheList[this.type]
  		}
  	},
  	watch: {
  		$route: 'routeChange',

      user(val) {
        if (!val) {
          this.projectList()
        } 
      }
  	},
  	methods: {
  		editProject(item) {
        if (item.uid === this.user.id) {
  			 this.$router.push(`editor/${item.id}`)
        } else {
          this.$toast.show('非法操作')
        }
  		},
      async copyProject(item) {
        const project = await this.$store.dispatch(types.ADD_PROJECT, { item })
        project && this.$router.push(`/editor/${project.id}`)
      },
      deleteProject(item) {
        this.$store.dispatch(types.DELETE_PROJECT, { item })
      },  
  		routeChange() {
  			this.projectList()
  		},
  		projectList(page = 1) {
  			this.$store.dispatch(types.GET_CACHE_LIST, {
  				type: this.type,
  				page
  			})
  		},
      projectTitle(item) {
        return item.title || `未命名${item.id}`
      },
      previewProject(item) {
        this.$store.commit(types.PREVIEW_PROJECT, {
          visible: true,
          project: item
        })
      },
      qrcodeURL(item) {
        return `http://qr.liantu.com/api.php?text=${PREVIEW_PATH}?id=${item.id}`
      }
  	},
  	async created() {
			this.projectList()  		
  	}
  }
</script>

<style lang="sass">
	@include B(project-list) {
    margin-top: 20px;

		@include E(item) {
			width: 180px;
			float: left;
			margin-right: 25px;
			margin-top: 25px;
			background: #fff;
			border-radius: 5px;
			overflow: hidden;
      position: relative;

			&:nth-child(5n) {
				margin-right: 0px;
			}
		}

		@include E(img) {
			width: 100%;
			height: 284px;
      background: #ddd;
      position: relative;

			img {
				width: 100%;
				height: 100%;
				display: block;
			}
		}

		@include E(title) {
			padding: 10px;
			height: 40px;
			line-height: 20px;
			color: $gray;
			text-overflow:ellipsis;
			white-space: nowrap;
			overflow: hidden;
		}

		@include E(foot) {
			margin-top: 50px;
		}

    @include E(empty) {
      text-align: center;
      font-size: 12px;
      color: $grayLight;
      padding: 50px 0px;
    }
	}

  @include B(project-operate) {
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    left: 0px;
    top: 0px;
    color: #fff;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    opacity: 0;
    transition: opacity 0.5s;
    align-items: flex-end;
    border-radius: 5px 5px 0px;

    @include E(item) {
      font-size: 12px;
      line-height: 24px;
      width: 30px;
      text-align: center;
      cursor: pointer;

      .iconfont {
        font-size: 20px;
        background: rgba(255, 255, 255, 0.3);
        width: 100%;
        height: 30px;
        display: flex;
        border-radius: 50%;
        justify-content: center;
        align-items: center;
      }
    }

    @include E(qrcode) {
      position: absolute;
      left: 0px;
      top: 25px;
      padding: 10px;
      img {
        border-radius: $borderRadius;
        display: block;
      }
    }
  }

  .project-list__item:hover {
    .project-operate {
      opacity: 1;
    }

    .project-operate__item {
      animation: fadeInUp 0.5s both;
    }

    .project-operate__qrcode {
      animation: zoomIn 0.5s both;
    }
  }

  @for $i from 1 through 5 {
    .project-list__item:nth-child(#{$i}) {
      animation: zoomIn 0.5s #{$i * 0.1s} both;
    }
  }

  .page-enter-active {
    animation: fadeInUp 0.5s;
  }

  .page-leave-active {
    animation: fadeOutDown 0.5s;
  }
</style>