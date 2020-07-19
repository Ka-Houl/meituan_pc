<template>
	<div class="page-changeCity">
		<el-row>
			<el-col :span="24">
				<select-city />
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<hot-city />
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="24">
				<category />
			</el-col>
		</el-row>
	</div>
</template>

<script>
import selectCity from '@/components/changeCity/selectCity.vue';
import hotCity from '@/components/changeCity/hotCity.vue';
import category from '@/components/changeCity/category.vue';
export default {
	components: {
		selectCity,
		hotCity,
		category
	}
}
</script>