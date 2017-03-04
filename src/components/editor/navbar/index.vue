<template>
  <div class="navbar">
  	<div class="navbar__brand"></div>
    <div class="navbar__widgets">
      <widgets></widgets>
    </div>
		<div class="navbar__operate" data-project-stop>
			<operate></operate>
		</div>
  </div>
</template>

<script>
  import widgets from './widgets'
	import operate from './operate'

  export default {
  	components: {
      widgets,
      operate
  	}
  }
</script>

<style lang="sass">
  @include B(navbar) {
    height: 50px;
    background: #333;
    display: flex;
    color: #fff;
    position: relative;
    z-index: 99;

    @include E(brand) {
      width: 160px;
      font-size: 32px;
      text-align: center;
      font-family: Arial;
      height: 50px;
      background: url(~assets/img/logo-white.png) no-repeat center / auto 20px;
    }

    @include E(operate) {
      position: absolute;
      right: 0px;
      top: 0px;
    }
  }
</style>