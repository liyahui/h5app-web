<template>
  <div class="passport">
  	<ui-modal 
  		size="small"
  		:title="current.title"
  		:value="passport.visible"  
  		@input="$emit('close')">
  		<div class="passport__form">
  			<div class="passport__item">
  				<input 
  					type="text" 
  					v-model.trim="username.value"
  					:class="{'is-danger': username.error}"
  					:placeholder="username.name"
            @keydown.enter="submit"
  					@input="validate('username')">
  				<div class="passport__tips" v-if="username.error" v-text="username.error"></div>
  			</div>
  			<div class="passport__item">
  				<input 
  					type="password" 
  					v-model.trim="password.value"
  					:class="{'is-danger': password.error}"
  					:placeholder="password.name"
            @keydown.enter="submit"
  					@input="validate('password')">
					<div class="passport__tips" v-if="password.error" v-text="password.error"></div>
  			</div>
  			<div class="passport__item">
  				<ui-button type="primary" v-text="current.title" @click="submit" block></ui-button>
  			</div>
  			<div class="passport__item">
  				<ui-button v-text="current.tips" @click="change" block></ui-button>
  			</div>
  		</div>
  	</ui-modal>
  </div>
</template>

<script>
  import * as types from 'store/types'
	import { mapState } from 'vuex'
	import { uiModal, uiButton } from 'ui' 

	const dataMapping = {
		login: {
			title: '登录',
			tips: '没有帐号去注册',
			event: 'register'
		},
		register: {
			title: '注册',
			tips: '已有帐号去登录',
			event: 'login'
		}
	}

  export default {
  	components: {
  		uiModal,
  		uiButton
  	},
  	computed: {
  		...mapState(['passport', 'user']),

  		current() {
  			return dataMapping[this.passport.type] || {}
  		}
  	},
  	watch: {
  		passport() {
        this.username.value = ''
  			this.username.error = ''
        this.password.value = ''
  			this.password.error = ''
  		},
      user(val) {
        if (val) {
          this.$emit('close')
        }
      }
  	},
  	methods: {
  		change() {
  			const event = this.current.event
  			this.$emit(event)
  		},
  		validate(field) {
  			field = this[field]

  			if (field.value === '') {
  				field.error = `请输入${field.name}`
  			} else if (field.value.length < field.min) {
  				field.error = `${field.name}长度不能少于${field.min}个字符`
  			} else if (field.value.length > field.max) {
  				field.error = `${field.name}长度不能大于${field.max}个字符`
  			} else {
  				field.error = ''
  			}
  		},
  		submit() {
        this.validate('username')
        this.validate('password')

        if (this.username.error || this.password.error) return

        this.$store.dispatch(types.SET_USER, {
          username: this.username.value,
          password: this.password.value
        })
  		}
  	},
  	data() {
  		return {
  			username: {
  				name: '帐号',
  				value: 'liyahui',
  				error: '',
  				min: 4,
  				max: 18
  			},
  			password: {
  				name: '密码',
  				value: '628111',
  				error: '',
  				min: 6,
  				max: 18
  			}
  		}
  	}
  }
</script>

<style lang="sass">
	@include B(passport) {
		@include E(form) {
			position: relative;
		}

		@include E(tips) {
			position: absolute;
			top: 5px;
			line-height: 30px;
			right: 0px;
			padding: 0px 10px;
			color: $dangerColor;
			font-size: 12px;
		}

		@include E(item) {
			padding: 5px 0px;
			position: relative;
			input {
				width: 100%;
				height: 30px;
				border: 1px solid $borderColor;
				padding: 0px 10px;
				border-radius: $borderRadius;

				&.is-danger {
					border-color: $dangerColor;
				}

				&:focus {
					outline: none;
				}

				&:focus:not(.is-danger) {
					border-color: $primaryColor;
				}
			}
		}

    .ui-modal__main {
      top: 180px;
    }

		.ui-modal__body {
			padding: 30px;
		}

		.ui-modal__foot {
			display: none;
		}
	}
</style>