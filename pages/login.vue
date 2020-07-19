<template>
	<div class="page-login">
		<div class="login-header">
			<a href="/" class="logo"></a>
		</div>
		<div class="login-panel">
			<div class="banner">
				<img src="//s0.meituan.net/bs/file/?f=fe-sso-fs:build/page/static/banner/www.jpg" width="480" height="370" alt="美团网">
			</div>
			<div class="form">
				<h4 v-if="errorMsg" class="tips">
					<i>
						{{ errorMsg }}
					</i>
				</h4>
				<p><span>账号登录</span></p>
				<el-input
					v-model="username"
					prefix-icon="profile"
				></el-input>
				<el-input
					v-model="password"
					prefix-icon="password"
					type="password"
				></el-input>
				<div class="foot">
					<el-checkbox v-model="checked">7天内免登陆</el-checkbox>
					<b>忘记密码？</b>
				</div>
				<el-button
					class="btn-login"
					type="success"
					size="mini"
					@click="login"
				>
					登录
				</el-button>
			</div>
		</div>
	</div>
</template>

<script>
import CryptoJS from 'crypto-js';
export default {
	data() {
		return {
			errorMsg: '',
			username: '',
			password: '',
			checked: ''
		}
	},
	layout: 'blank',
	methods: {
		login: function() {
			let _self = this;
			this.$axios.post('/users/signin', {
				username: encodeURIComponent(this.username),
				password: CryptoJS.MD5(this.password).toString()
			}).then(({status, data}) => {
				if (status === 200) {
					if (data && data.code === 0) {
						location.href = '/'
					} else {
						_self.errorMsg = data.msg;
					}
				} else {
					_self.errorMsg = `服务器出错，错误码为: ${status}`
				}

				setTimeout(function() {
					_self.errorMsg = '';
				}, 1500)
			})
		}
	}
}
</script>

<style lang="scss">
@import "@/assets/css/login/index.scss"
</style>