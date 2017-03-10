<template>
  <div class="header">
    <div class="center">
      <div class="header__nav">
        <ul>
          <li><router-link to="/" exact>首页</router-link></li>
          <li><router-link to="/cases" exact>案例展示</router-link></li>
          <li><router-link to="/projects" v-if="user">我的作品</router-link></li>
        </ul>
      </div>
      <div class="header__operate">
        <template v-if="user">
          <div class="header__name" v-text="user.username"></div>
          <ui-button type="primary" @click="createProject">创建</ui-button>
          <ui-button @click="$emit('logout')">退出</ui-button>
        </template>
        <template v-else>
          <ui-button type="primary" @click="$emit('login')">登录</ui-button>
          <ui-button @click="$emit('register')">注册</ui-button>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
  import * as types from 'store/types'
  import { mapState } from 'vuex'
  import { uiButton } from 'ui'

  export default {
  	components: {
      uiButton
    },
    computed: {
      ...mapState(['user'])
    },
    methods: {
      async createProject() {
        const project = await this.$store.dispatch(types.ADD_PROJECT)
        project && this.$router.push(`/editor/${project.id}`)
      }
    }
  }
</script>

<style lang="sass">
	@include B(header) {
    width: 100%;
		height: 50px;
		border-bottom: 1px solid $borderColor;
		background: #fff;
    position: fixed;
    left: 0px;
    top: 0px;
    z-index: 999;

    .center {
      display: flex;
    }

    @include E(operate) {
      position: absolute;
      height: 50px;
      right: 0px;
      top: 0px;
      display: flex;
      justify-content: space-between;
      align-items: center;

      .ui-button {
        padding: 0px 18px;
        margin-left: 10px;
      }
    }

    @include E(name) {
      width: 100px;
      height: 50px;
      line-height: 50px;
      overflow: hidden;
      text-align: right;
      word-break: break-all;
    }

    @include E(nav) {
      line-height: 50px;
      padding-right: 160px;
      ul {
        display: flex;
      }

      li {
        margin-right: 20px;
      }

      a {
        color: $grayDark;
        padding: 0px 5px;
        position: relative;
        display: block;
        transition: color 0.5s;

        &:after {
          height: 2px;
          width: 100%;
          content: ' ';
          display: none;
          position: absolute;
          background: $primaryColor;
          left: 0px;
          bottom: 0px;
        }

        &:hover {
          color: $primaryColor;
        }

        &.router-link-active {
          color: $primaryColor;
          &:after {
            display: block;
          }
        }
      }
    }
	}
</style>