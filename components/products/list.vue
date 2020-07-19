<template>
	<div class="m-products-list">
		<dl>
			<dd v-for="item in nav"
					:key="item.name"
					:class="[item.name, item.active ? 'nav-active' : '' ]"
					@click="handleNavSelect">
				{{ item.txt }}
			</dd>
			<ul>
				<list-item
				  v-for="(item, idx) in list"
				  :key="idx"
				  :meta="item" />
			</ul>
		</dl>
	</div>
</template>

<script>
import listItem from './product.vue';
export default {
	components: {
		listItem
	},
	props: {
		list: {
			type: Array,
			default() {
				return [];
			}
		}
	},
	data() {
		return {
			nav: [
				{
					name: 'default',
					txt: '智能排序',
					active: true
				},
				{
					name: 'price',
					txt: '价格最低',
					active: false
				},
				{
					name: 'visit',
					txt: '人气最高',
					active: false
				},
				{
					name: 'comment',
					txt: '评论最高',
					active: false
				}
			]
		}
	},
	methods: {
		handleNavSelect: function() {
			console.log('select')
		}
	}
}
</script>