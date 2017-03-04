<template>
  <div class="ui-button-group">
    <slot></slot>
  </div>
</template>

<script>
  
</script>

<style lang="sass">
  .ui-button-group {
    width: 100%;
    display: flex;

    .ui-button {
      border-radius: 0px;
      flex: 1;

      &:not(:first-child) {
        border-left: none;

        &.ui-button--primary,
        &:hover:not(.is-disabled) {
          box-shadow: -1px 0 0 0 $primaryColor;
        }
      }

      &:first-child {
        border-radius: 3px 0px 0px 3px;
      }

      &:last-child {
        border-radius: 0px 3px 3px 0px;
      }
    }
  }
</style>