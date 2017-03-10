<template>
  <div class="h5app-home">
  	<div class="h5app-home__title">
  		一个快速创建场景应用的工具
  	</div>
  	<div class="h5app-home__editor">
  		<img src="~assets/img/h5app.jpg">
  	</div>
  </div>
</template>

<style lang="sass">
	@include B(h5app-home) {

		@include E(title) {
			font-size: 28px;
			text-align: center;
			padding: 50px 0px;
			color: $gray;
			animation: fadeInDown 1s;
		}

		@include E(editor) {
			text-align: center;
			animation: fadeInUp 1s;
			img {
				width: 80%;
				border-radius: $borderRadius;	
				box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
			}
		}
	}
</style>