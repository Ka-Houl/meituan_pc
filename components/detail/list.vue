<template>
	<div class="m-detail-list">
		<ul>
			<li>
				{{ list.filter(item => item.photos.length).length }}款堂食套餐
			</li>
			<list-item v-for="(item, idx) in list"
								 :key="idx"
								 :meta="item" />
		</ul>
	</div>
</template>

<script>
import listItem from './listItem.vue';
export default {
	components: {
		listItem
	},
	props: {
		list: {
			type: Array,
			default() {
				return []
			}
		}
	}
}
</script>