<template>
  <div class="ui-input">
  	<template v-if="type === 'area'">
  		<textarea 
  			class="ui-input__box"
  			v-text="value"
  			:rows="rows" 
  			:placeholder="placeholder"
  			@input="input">
			</textarea>
  	</template>
  	<template v-else>
  		<input 
  			class="ui-input__box" 
  			:type="type"
  			:value="value" 
  			:placeholder="placeholder"
  			@input="input">
  	</template>
  </div>
</template>

<script>
  export default {
  	props: {
  		value: [String, Number],
  		type: {
  			type: String,
  			default: 'text'
  		},
  		rows: {
  			type: Number,
  			default: 3
  		},
  		placeholder: String
  	},
  	methods: {
  		input(e) {
  			this.$emit('input', e.target.value)
  		}
  	}
  }
</script>

<style lang="sass">
	@include B(ui-input) {
		width: 100%;

		.ui-input__box {
			width: 100%;
			border: none;
			border: 1px solid $borderColor;
			border-radius: $borderRadius;
			background: #fff;
			display: block;

			&:focus {
				outline: none;
				border-color: $primaryColor;
			}
		}

		input {
			padding: 0px 10px;
			height: 30px;
		}

		textarea {
			padding: 10px;
			resize: none;
		}
	}
</style>