<template>
	<div class="search-panel">
	  <el-row class="m-header-searchbar">
	  	<el-col class="left" :span="3">
				<img src="//s0.meituan.net/bs/fe-web-meituan/e5eeaef/img/logo.png" alt="美团">
	  	</el-col>
	  	<el-col class="center" :span="15">
				<div class="wrapper">
					<el-input 
						v-model="search"
						placeholder="搜索商家或地点"
						@focus="handleFocus"
						@blur="handleBlur"
						@input="handleInput">
						</el-input>
					<button class="el-button el-button--primary">
						<i class="el-icon-search"></i>
					</button>
					<dl class="hot-search" v-if="isHotSearch">
						<dt>热门搜索</dt>
						<dd v-for="(item, idx) in $store.state.home.hotSearch.slice(0, 5)" :key="idx">
							<a :href="'/products?keyword=' + encodeURIComponent(item.name)">
								{{ item.name }}
							</a>
						</dd>
					</dl>
					<dl class="search-list" v-if="isSearchList">
						<dd v-for="(item, idx) in searchList" :key="idx">
							<a :href="'/products?keyword=' + encodeURIComponent(item.name)">
								{{ item.name }}
							</a>
						</dd>
					</dl>
				</div>
				<p class="suggest">
					<a :href="'/products?keyword=' + encodeURIComponent(item.name)" 
							v-for="(item, idx) in $store.state.home.hotSearch.slice(0, 5)" :key="idx">
						{{ item.name }}
					</a>
				</p>
				<ul class="nav">
					<li>
						<nuxt-link to="/" class="takeout">美团外卖</nuxt-link>
					</li>
					<li>
						<nuxt-link to="/" class="movie">猫眼电影</nuxt-link>
					</li>
					<li>
						<nuxt-link to="/" class="hotel">美团酒店</nuxt-link>
					</li>
					<li>
						<nuxt-link to="/" class="apartment">民宿/公寓</nuxt-link>
					</li>
					<li>
						<nuxt-link to="/" class="business">商家入驻</nuxt-link>
					</li>
				</ul>
	  	</el-col>
	  	<el-col class="right" :span="6">
	  		<ul class="security">
	  			<li><i class="refund">随时退</i></li>
	  			<li><i class="free">不满意免单</i></li>
	  			<li><i class="overdue">过期退</i></li>
	  		</ul>
	  	</el-col>
	  </el-row>
	</div>
</template>

<script>
import _ from 'lodash';
export default {
	data() {
		return {
			search: '',
			isFocus: false,
			hotSearch: [],
			searchList: []
		}
	},
	computed: {
		isHotSearch: function() {
			return this.isFocus && !this.search
		},
		isSearchList: function() {
			return this.isFocus && this.search
		}
	},
	methods: {
		handleFocus: function() {
			this.isFocus = true;
		},
		handleBlur: function() {
			let _self = this;
			setTimeout(function() {
				_self.isFocus = false;
			}, 200)
		},
		handleInput: _.debounce(async function() {
			let city = this.$store.state.geo.position.city.replace('市', '');
			this.searchList = [];
			if (this.search.length) {
				let { status, data: {top}} = await this.$axios.get('/search/top', {
					params: {
						input: this.search,
						city
					}
				})
				this.searchList = top.slice(0, 10);
			}
		}, 300)
	}
}
</script>