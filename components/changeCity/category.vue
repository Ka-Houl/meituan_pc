<template>
	<div>
		<dl class="m-category">
			<dt>按拼音首字母选择：</dt>
			<dd 
				v-for="item in list"
			  :key="item">
				<a :href="'#city-' + item">
					{{ item }}
				</a>
			</dd>
		</dl>
		<dl 
		  v-for="item in block"
		  :key="item.title"
		  class="m-category-section">
			<dt :id="'city-' + item.title">{{ item.title }}</dt>
			<dd>
				<span v-for="city in item.cities">
					{{ city }}
				</span>
			</dd>
		</dl>
	</div>
</template>

<script>
import jspy from 'js-pinyin';
export default {
	data() {
		return {
			list: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split(''),
			block: []
		}
	},
	async mounted() {
		let blocks = [];
		let { status, data: {city} } = await this.$axios.get('/geo/city');
		if (status === 200) {
			let firstLetter;
			let letterPos;
			let temp = {};
			city.forEach(item => {
				firstLetter = jspy.getFullChars(item.name).toLocaleLowerCase().slice(0, 1);
				letterPos = firstLetter.charCodeAt(0);
				if( letterPos > 96 && letterPos < 123 ) {
					if (!temp[firstLetter]) {
						temp[firstLetter] = [];
					}
					temp[firstLetter].push(item.name)
				} 
			})
			for (let [key, value] of Object.entries(temp)) {
				blocks.push({
					title: key.toUpperCase(), 
					cities: value            
				})
			}
			blocks.sort((a, b) => a.title.charCodeAt(0) - b.title.charCodeAt(0));
			this.block = blocks;
		}
	}
}
</script>

<style lang="scss">
@import "@/assets/css/changeCity/category.scss";
</style>