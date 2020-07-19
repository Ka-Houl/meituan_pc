<template>
	<div class="m-crumbs">
		<el-breadcrumb separator-class="el-icon-arrow-right">
		  <el-breadcrumb-item :to="{ path: '/' }">
				{{ $store.state.geo.position.city.replace('市', '')}}美团
		  </el-breadcrumb-item>
		  <el-breadcrumb-item>
				{{ $store.state.geo.position.city.replace('市', '')}} {{ type }}
		  </el-breadcrumb-item>
		  <el-breadcrumb-item>
				{{ $store.state.geo.position.city.replace('市', '')}} {{ decodeURIComponent(keyword) }}
		  </el-breadcrumb-item>
		</el-breadcrumb>
	</div>
</template>

<script>
export default {
	props: {
		type: {
			type: String,
			default: ''
		},
		keyword: {
			type: String,
			default: ''
		}
	}
}
</script>






