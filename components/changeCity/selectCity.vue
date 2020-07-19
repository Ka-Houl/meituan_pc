<template>
	<div class="m-selectCity">
		<span class="name">按省份选择:</span>
		<el-select v-model="pvalue" placeholder="省份">
			<el-option
			  v-for="item in province"
			  :key="item.value"
			  :label="item.label"
			  :value="item.value">
			</el-option>
		</el-select>
		<el-select v-model="cvalue" :disabled="!city.length" placeholder="城市">
			<el-option
			  v-for="item in city"
			  :key="item.value"
			  :label="item.label"
			  :value="item.value">
			</el-option>
		</el-select>
		<span class="search">直接搜索：</span>
		<el-autocomplete
		  v-model="input"
		  :fetch-suggestions="querySearchAsync"
		  placeholder="请输入城市中文或拼音"
		  @select="handleSelect"
		></el-autocomplete>
	</div>
</template>

<script>
import _ from 'lodash';
export default {
	data() {
		return {
			pvalue: '',
			province: [],
			cvalue: '',
			city: [],
			input: '',
			allCities: []
		}
	},
	watch: {
		pvalue: async function(newPvalue) {
			let {status, data: {city}} = await this.$axios.get(`/geo/province/${newPvalue}`);
			if (status === 200) {
				this.city = city.map(item => {
					return {
						value: item.id,
						label: item.name
					}
				})
				this.cvalue = '';
			}
		}
	},
	async mounted() {
		let { status, data: {province}} = await this.$axios.get('/geo/province');

		if (status === 200) {
			this.province = province.map(item => {
				return {
					value: item.id,
					label: item.name
				}
			})
		}
	},
	methods: {
		querySearchAsync: _.debounce(async function(query, cb) {
			let _self = this;
			if (this.allCities.length) {
				cb(_self.allCities.filter(item => item.value.indexOf(query) != -1));
			} else {
				let { status, data: {city}} = await this.$axios.get('/geo/city');
				if (status === 200) {
					this.allCities = city.map(item => {
						return {
							value: item.name
						}
					})
					cb(_self.allCities.filter(item => item.value.indexOf(query) != -1));
				} else {
					cb([]);
				}
			}
		}, 300),
		handleSelect: function(item) {
			console.log(item.value);
		}
	}
}
</script>

<style lang="scss">
@import "@/assets/css/changeCity/selectCity.scss";
</style>