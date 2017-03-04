<template>
  <div class="menus">
    <div class="menus__item" v-for="item, key in list" @mousedown="clickItem(key, $event)">
      <i class="menus__icon iconfont" :class="`icon-${key}`"></i>
      <span v-text="item.name"></span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      list: {
        type: Object,
        required: true
      },
      inverse: {
        type: Boolean,
        default: false
      },
      vertical: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      clickItem(key, e) {
        this.$emit('click', key, e)
      }
    }
  }
</script>

<style lang="sass">
  @include B(menus) {
    font-size: 12px;
    line-height: 20px;
    display: flex;
    color: #e6e6e6;

    @include E(item) {
      display: flex;
      flex-direction: column;
      position: relative;
      width: 50px;
      height: 50px;
      text-align: center;
      cursor: pointer;
      justify-content: center;
      padding-top: 4px;
      transition: all 0.3s;
      &:hover {
        color: #fff;
        background-color: #222;
      }

      .iconfont {
        font-size: 20px;
      }
    }

    @include E(icon) {
      height: 20px;
      font-size: 20px;
    }
  }
</style>