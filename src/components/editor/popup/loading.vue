<template>
	<transition name="fade" appear>
	  <div class="editor-loading">
	  	<div class="editor-loading__main">
		  	<div class="editor-loading__spinner">
				  <div class="editor-loading__bounce"></div>
				  <div class="editor-loading__bounce"></div>
				</div>
	  	</div>
	  </div>
  </transition>
</template>

<style lang="sass">
	@include B(editor-loading) {
		width: 100%;
		height: 100%;
		position: fixed;
		background: #fafafa;
		left: 0px;
		top: 0px;
		z-index: 9999;

		@include E(main) {
			width: 4rem;
			position: absolute;
			left: 50%;
			top: 30%;
			margin-left: -2rem;
		}

		@include E(spinner) {
			width: 4rem;
		  height: 4rem;
		  position: relative;
		}

		@include E(bounce) {
			width: 100%;
		  height: 100%;
		  border-radius: 50%;
		  background-color: #49a9ee;
		  opacity: 0.6;
		  position: absolute;
		  top: 0;
		  left: 0;
		  animation: editorLoading 2.0s infinite ease-in-out;

		  &:last-child {
		  	animation-delay: -1.0s;
		  }
		}
	}

	@keyframes editorLoading {
	  0%, 100% { 
	    transform: scale(0.0);
	  } 50% { 
	    transform: scale(1.0);
	  }
	}
</style>
